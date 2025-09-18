import { prisma } from '~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  const sessionId = event.context.params.sessionId;

  return prisma.message.findMany({
    where: { sessionId },
    orderBy: { createdAt: "asc" },
  });
});
