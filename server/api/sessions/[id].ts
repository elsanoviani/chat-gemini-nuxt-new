import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, message: "sessionId required" })
  }

  const messages = await prisma.message.findMany({
    where: { sessionId: id },
    orderBy: { createdAt: 'asc' }
  })

  return messages
})
