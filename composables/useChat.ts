import { ref } from 'vue';

export const useChat = () => {
  const message = ref('');
  const history = ref([]);

  const sendMessage = async () => {
    if (!message.value) return;

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: message.value })
    }).then(r => r.json());

    history.value.push(res);
    message.value = '';
  };

  return { message, history, sendMessage };
};
