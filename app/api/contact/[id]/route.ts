import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await prisma.contactMessage.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
