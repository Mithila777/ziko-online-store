import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all blogs
export async function GET() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(blogs);
}

// POST add blog
export async function POST(req: Request) {
  const data = await req.json();
  const { title, excerpt, content, image } = data;

  const blog = await prisma.blog.create({
    data: { title, excerpt, content, image },
  });

  return NextResponse.json(blog, { status: 201 });
}
