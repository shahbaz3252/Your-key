import bcrypt from "bcryptjs";
import { prisma } from "../lib/db";

async function main() {
  const name = (process.env.ADMIN_NAME ?? "").trim();
  const email = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "";

  if (!name) {
    throw new Error("ADMIN_NAME is missing");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("ADMIN_EMAIL is missing or not a valid email");
  }

  if (password.length < 10) {
    throw new Error("ADMIN_PASSWORD must be at least 10 characters");
  }

  const existing = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existing) {
    console.log(`User already exists: ${email} (nothing changed)`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: "ADMIN",
      active: true,
    },
    select: { id: true, email: true, role: true },
  });

  const verified = await bcrypt.compare(password, passwordHash);

  console.log(`Admin created: ${user.email} (role ${user.role})`);
  console.log(`Password hash verified: ${verified}`);
}

main()
  .catch((error) => {
    console.error("FAILED:", error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });