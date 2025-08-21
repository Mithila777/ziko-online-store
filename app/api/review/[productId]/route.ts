import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
 
export async function GET(req: Request,{ params }: { params: Promise<{ productId: string }> }) {

  try {
    const { productId } =  await params;

    const reviews = await prisma.review.findMany({
      where: { productId },
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
