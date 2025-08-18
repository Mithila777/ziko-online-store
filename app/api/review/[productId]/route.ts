import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _: Request,
  context: { params: Promise<{ productId: string }> } // 👈 params is a Promise
) {
  try {
    const { productId } = await context.params; // 👈 must await

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
