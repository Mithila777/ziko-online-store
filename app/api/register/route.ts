import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  const { name, phone, email, address, password ,role} = await req.json();
  const hashed = await hash(password, 10);

  await prisma.user.create({
    data: { name, phone, email, address,      role: role || 'user', password: hashed },
  });

  return NextResponse.json({ message: "User created" });
}
