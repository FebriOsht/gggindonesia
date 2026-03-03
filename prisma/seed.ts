import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding...");

  const adminPassword = "admin123";
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: "admin@gggindonesia.com" },
    update: { password: hashedPassword },
    create: {
      email: "admin@gggindonesia.com",
      name: "Admin Utama GGG",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Admin ready.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());