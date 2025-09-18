<template>
  <div class="container">
    <Sidebar
      :sessions="sessions"
      @new-chat="newChat"
      @select="selectSession"
    />
    <ChatWindow
      :messages="messages"
      @send="sendMessage"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Sidebar from "~/components/Sidebar.vue";
import ChatWindow from "~/components/ChatWindow.vue";

const sessions = ref([]);
const messages = ref([]);
const currentSessionId = ref(null);

const loadSessions = async () => {
  sessions.value = await $fetch("/api/sessions");
};

onMounted(async () => {
  await loadSessions();
});

const newChat = async () => {
  const session = await $fetch("/api/sessions", { method: "POST" });
  currentSessionId.value = session.id;
  sessions.value.unshift(session);
  messages.value = [];
};

const selectSession = async (id) => {
  currentSessionId.value = id;
  messages.value = await $fetch(`/api/sessions/${id}`);
};

const sendMessage = async (text) => {
  if (!currentSessionId.value) {
    await newChat();
  }

  // tampilkan pesan user
  messages.value.push({ role: "user", content: text });

  // placeholder AI
  const aiIndex = messages.value.push({ role: "assistant", content: "" }) - 1;

  // Streaming via EventSource
  const es = new EventSource(
    `/api/chat?sessionId=${currentSessionId.value}&message=${encodeURIComponent(text)}`
  );

  es.onmessage = (e) => {
    if (e.data === "[DONE]") {
      es.close();
      loadSessions(); // refresh title
      return;
    }
    messages.value[aiIndex].content += e.data;
  };

  es.onerror = (err) => {
    console.error("SSE error:", err);
    es.close();
  };
};
</script>

<style>
.container {
  display: flex;
  height: 100vh;
}
</style>
