import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request,  { params }: { params: { id: string } }
) {
  const blog = await prisma.blog.findUnique({ where: { id: params.id } });
  if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(blog);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const blog = await prisma.blog.update({
    where: { id: params.id },
    data,
  });
  return NextResponse.json(blog);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.blog.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Blog deleted" });
}
