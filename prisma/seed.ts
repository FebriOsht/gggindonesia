import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Masukkan email domain asli dan password kuat Anda di sini
  const adminEmail = 'admin@gggindonesia.com';
  const securePassword = 'Admingatha@123'; // Ganti dengan password pilihan Anda

  const hashedPassword = await bcrypt.hash(securePassword, 10);

  // Menggunakan upsert agar jika user sudah ada, hanya diupdate (tidak membuat double)
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
    },
    create: {
      email: adminEmail,
      name: 'Admin GGG Indonesia',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log({ admin });
  console.log('Admin account updated/created successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });