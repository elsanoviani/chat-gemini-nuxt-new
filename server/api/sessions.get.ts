import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async () => {
  const sessions = await prisma.chatSession.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return sessions
})
