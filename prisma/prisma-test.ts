// prisma-test.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Cek apakah Prisma bisa connect + ambil data User
  const users = await prisma.user.findMany()
  console.log(users)
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error(e)
    prisma.$disconnect()
  })
