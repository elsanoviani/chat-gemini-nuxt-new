import prisma from "./prisma";//asumsi logto nuxt sudah setup

export async function getUser(event) {
  const { claims } = await getLogtoContext(event);

  const email = claims.email;
  const logtoId = claims.sub;

  let user = await prisma.user.findUnique({
    where: { logtoId },
  });

  if (!user) {
    user = await prisma.user.create({
      data: { email, logtoId },
    });
  }

  return user;
}
