import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest,{ params }: { params:Promise <{ id: string }> }
) {
  const { id } = await params;

  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { reply } = await req.json();
    if (!reply) {
      return NextResponse.json({ error: "Reply cannot be empty" }, { status: 400 });
    }

    const newReply = await prisma.reply.create({
      data: {
        messageId: id,
        content: reply,
        adminId: session.user.id,
      },
    });

    return NextResponse.json(newReply);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
