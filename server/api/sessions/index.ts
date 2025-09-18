import { prisma } from '~/server/utils/prisma';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const title = body?.title || 'New Chat';
  return await prisma.chatSession.create({
    data: { title },
  });
});
