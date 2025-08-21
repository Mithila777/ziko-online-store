import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";  // ✅ import from lib/auth
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { name, phone, address } = body;

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { name, phone, address},
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
