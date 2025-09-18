<template>
  <div class="sidebar">
    <button @click="$emit('new-chat')">New Chat</button>
    <ul>
      <li
        v-for="session in sessions"
        :key="session.id"
        @click="$emit('select', session.id)"
      >
        {{ session.title }}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({ sessions: Array });

const emit = defineEmits(['new-chat'])
const handleNewChat = () => {
  console.log("New chat clicked")
  emit('new-chat')
}

</script>

<style scoped>
.sidebar {
  width: 240px;
  background: #f8fafc; /* abu soft */
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e5e7eb;
  height: 100vh; /* penuh layar */
  box-sizing: border-box;
}

button {
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background 0.2s;
}
button:hover {
  background: #1d4ed8;
}

/* scrollable session list */
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  overflow-y: auto; /* ini yang bikin bisa scroll */
}

/* style scrollbar */
ul::-webkit-scrollbar {
  width: 6px;
}
ul::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
ul::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

li {
  cursor: pointer;
  padding: 0.6rem 0.8rem;
  border-radius: 0.4rem;
  margin-bottom: 0.3rem;
  transition: background 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
li:hover {
  background: #e2e8f0;
}
</style>
