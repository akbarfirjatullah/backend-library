import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  await prisma.user.upsert({
    where: { username: 'petugas' },
    update: {},
    create: {
      username: 'petugas',
      password: hashedPassword,
      role: 'PETUGAS',
    },
  });

  await prisma.user.upsert({
    where: { username: 'member' },
    update: {},
    create: {
      username: 'member',
      password: hashedPassword,
      role: 'MEMBER',
    },
  });

  console.log('Seed berhasil! 3 user dibuat.');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());