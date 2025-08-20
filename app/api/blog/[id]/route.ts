import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";



export async function GET(req: Request,{ params }: { params: Promise<{ id: string }> }) {
      const { id } = await params;


  const blog = await prisma.blog.findUnique({ where: { id: id } });
  if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(blog);
}



export async function PUT(req: Request,{ params }: { params: Promise<{ id: string }> }) {
        const { id } = await params;
   const data = await req.json();
  const blog = await prisma.blog.update({
    where: { id: id },
    data,
  });
  return NextResponse.json(blog);
}



export async function DELETE(req: Request,{ params }: { params: Promise<{ id: string }> }) {
          const { id } = await params;

  await prisma.blog.delete({ where: { id:id } });
  return NextResponse.json({ message: "Blog deleted" });
}
