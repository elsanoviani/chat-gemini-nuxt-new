// server/middleware/auth.ts
export default defineEventHandler((event) => {
  // Dummy user supaya API bisa jalan tanpa login
  event.context.user = { id: 'dummy-user-id', email: 'dummy@example.com' }
})
