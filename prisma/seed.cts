import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@gmail.com";

  // 🔄 Delete old admin (if exists)
  await prisma.user.deleteMany({
    where: { email: adminEmail },
  });

  console.log("🗑️ Old admin deleted (if existed)");

  // 🔑 Create new admin
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.create({
    data: {
      name: "Super Admin",
      phone: "01700000000",
      email: adminEmail,
      address: "Admin HQ",
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log("✅ New admin created:", adminEmail, "password: admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
