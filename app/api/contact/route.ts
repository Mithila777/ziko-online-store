import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const messages = await prisma.contactMessage.findMany({
      include: { user: true, replies: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const { userId, message, name, email } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const newMessage = await prisma.contactMessage.create({
      data: {
        userId: userId ?? undefined, // optional link
        name,                        // optional
        email,                       // optional
        message,                     // required
      },
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to save message" },
      { status: 500 }
    );
  }
}
