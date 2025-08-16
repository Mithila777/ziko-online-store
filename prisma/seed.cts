import { PrismaClient } from "../lib/generated/prisma"; // Make sure it points to your generated client
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Hash the password before storing
  const hashedPassword = await hash("admin123", 10);

  // Create or update admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@gmail.com" }, // ensures no duplicates
    update: {}, // do nothing if already exists
    create: {
      name: "Super Admin",
      email: "admin@gmail.com",
      phone: "0123456789",
      address: "Admin HQ",
      password: hashedPassword, // ✅ hashed password
      role: "admin",            // important: admin role
    },
  });

  console.log("Admin user seeded:", admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
