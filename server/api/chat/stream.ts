import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const { sessionId, message } = getQuery(event)

  if (!sessionId || !message) {
    throw createError({ statusCode: 400, message: 'sessionId & message are required' })
  }

  // simpan pesan user
  await prisma.message.create({
    data: { sessionId, role: 'user', content: message }
  })

  // update judul session kalau masih default
  const session = await prisma.chatSession.findUnique({ where: { id: sessionId } })
  if (session && session.title === 'New Chat') {
    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { title: message.substring(0, 30) }
    })
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateMessage?key=${GEMINI_API_KEY}`

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [{ author: 'user', content: [{ text: message }] }],
      candidateCount: 1,
      stream: true
    })
  })

  if (!res.body) throw new Error('No response body from Gemini')

  const reader = res.body.getReader()

  // set SSE headers
  const { nodeRes } = event
  nodeRes.setHeader('Content-Type', 'text/event-stream')
  nodeRes.setHeader('Cache-Control', 'no-cache')
  nodeRes.setHeader('Connection', 'keep-alive')

  let aiText = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    const chunk = new TextDecoder().decode(value)
    try {
      const lines = chunk.split('\n').filter(Boolean)
      for (const line of lines) {
        if (line.trim() === '[DONE]') continue
        const parsed = JSON.parse(line)
        const token = parsed?.delta?.content
        if (token) {
          aiText += token
          nodeRes.write(`data: ${token}\n\n`) // kirim SSE
        }
      }
    } catch (e) { console.error(e) }
  }

  nodeRes.write('data: [DONE]\n\n')
  nodeRes.end()

  await prisma.message.create({
    data: { sessionId, role: 'assistant', content: aiText }
  })
})
