import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { number: '1111111111' },
    update: {},
    create: {
      email: 'alice123@gmail.com',
      number: '1111111111',
      password: await bcrypt.hash('alice', 10),
      name: 'Alice Becker',
      Balance: {
        create: {
          amount: 20000
        }
      },
      HDFCBank: {
        create: {
          status: "Success",
          token: "7459301",
          direction: "In",
          amount: 5000,
          startTime: new Date("Jan 1, 2025 05:00:00").toUTCString(),
          processingTime: new Date("Jan 1, 2025 05:30:00").toUTCString()
        }
      }
    },
  })
  const bob = await prisma.user.upsert({
    where: { number: '2222222222' },
    update: {},
    create: {
      email: 'bob456@yahoo.com',
      number: '2222222222',
      password: await bcrypt.hash('bob', 10),
      name: 'Bob Sanders',
      Balance: {
        create: {
          amount: 2000
        }
      },
      AxisBank: {
        create: {
          status: "Failure",
          token: "1397028",
          direction: "In",
          amount: 2000,
          startTime: new Date("Jan 1, 2025 06:00:00").toUTCString(),
          processingTime: new Date("Jan 1, 2025 06:30:00").toUTCString()
        }
      }
    },
  })
  console.log({ alice, bob })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })