import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// define a params type for clarity
type Params = {
  params: {
    id: string;
  };
};

export async function GET(req: Request, { params }: Params) {  

  const blog = await prisma.blog.findUnique({ where: { id: params.id } });
  if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(blog);
}



export async function PUT(req: Request, { params }: Params) {  const data = await req.json();
  const blog = await prisma.blog.update({
    where: { id: params.id },
    data,
  });
  return NextResponse.json(blog);
}



export async function DELETE(req: Request, { params }: Params) {  
  await prisma.blog.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Blog deleted" });
}
