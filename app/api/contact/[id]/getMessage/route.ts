// app/api/contact/[id]/getMessage.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(  req: NextRequest,  { params }: { params:Promise <{ id: string }> }
) {
  const { id } = await params;

  try {
    const message = await prisma.contactMessage.findUnique({
      where: { id },
      include: { replies: true }, // ✅ fetch all replies
    });

    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json(message);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
