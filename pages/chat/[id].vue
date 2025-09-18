<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '~/components/Sidebar.vue'

const input = ref('')
const messages = ref<any[]>([])

const handleSend = async () => {
  if (!input.value || !selectedSession.value) return

  // Kirim pesan ke server
  const response = await $fetch('/api/chat', {
    method: 'POST',
    body: {
      sessionId: selectedSession.value.id,
      userMessage: input.value
    }
  })

  messages.value.push(response.user)
  messages.value.push(response.ai)
  input.value = ''
}
</script>
