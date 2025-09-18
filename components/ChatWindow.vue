<template>
  <div class="chat-window">
    <div class="messages">
      <div
        v-for="(msg, idx) in messages"
        :key="idx"
        :class="['bubble', msg.role]"
      >
        {{ msg.content }}
      </div>
    </div>
    <div class="input-box">
      <input v-model="input" @keyup.enter="send" placeholder="Type a message..." />
      <button @click="send">Send</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({ messages: Array });
const emit = defineEmits(['send']);

const input = ref('');

const send = () => {
  if (!input.value.trim()) return;
  emit('send', input.value);
  input.value = '';
};
</script>

<style scoped>
.chat-window { flex: 1; display: flex; flex-direction: column; }
.messages { flex: 1; padding: 1rem; overflow-y: auto; }
.bubble { padding: 0.5rem 1rem; margin: 0.5rem 0; border-radius: 8px; max-width: 70%; }
.bubble.user { background: #d1e7dd; align-self: flex-end; }
.bubble.assistant { background: #f8d7da; align-self: flex-start; }
.input-box { display: flex; padding: 0.5rem; border-top: 1px solid #ccc; }
input { flex: 1; padding: 0.5rem; }
button { margin-left: 0.5rem; }
</style>
