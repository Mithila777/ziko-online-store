// app/api/contact/myMessages/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const messages = await prisma.contactMessage.findMany({
      where: { userId },
      include: { replies: true },  // get admin replies
      orderBy: { createdAt: "asc" }, // oldest first
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
