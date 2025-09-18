export default defineNuxtConfig({
  pages: true, // ⬅️ tambahin ini biar folder /pages dipakai
  runtimeConfig: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY
  },
  nitro: {
    plugins: []
  }
})
