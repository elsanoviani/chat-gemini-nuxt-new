<template>
  <div :class="['bubble', message.role]">
    <!-- Pastikan menampilkan response AI atau message user -->
    {{ message.response ?? message.message }}
  </div>
</template>

<script setup>
defineProps({ message: Object });
</script>

<style scoped>
.bubble {
  padding: 0.6rem 1rem;
  border-radius: 1rem;
  margin: 0.4rem 0;
  max-width: 70%;
  line-height: 1.5;
  font-size: 0.95rem;
  word-wrap: break-word;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  animation: fadeIn 0.2s ease-in-out;
}

/* User bubble */
.user {
  background: #2563eb; /* biru elegan */
  color: white;
  align-self: flex-end;
  border-bottom-right-radius: 0.4rem;
}

/* Assistant bubble */
.assistant {
  background: #f1f5f9; /* abu soft */
  color: #111827;
  align-self: flex-start;
  border-bottom-left-radius: 0.4rem;
}

/* Animasi masuk */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

