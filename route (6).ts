import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { reviews, products } from "@/db/schema";
import { eq, avg, count } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, userName, rating, comment } = body;

    if (!productId || !userName || !rating || !comment) {
      return NextResponse.json({ success: false, error: "Todos los campos son obligatorios." }, { status: 400 });
    }

    const [newReview] = await db.insert(reviews).values({
      productId: parseInt(productId),
      userName,
      rating: parseInt(rating),
      comment,
    }).returning();

    // Recalculate average rating & review count for the product
    const allReviews = await db.select().from(reviews).where(eq(reviews.productId, parseInt(productId)));
    const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = (totalRating / allReviews.length).toFixed(2);

    await db.update(products).set({
      rating: avgRating,
      reviewCount: allReviews.length,
    }).where(eq(products.id, parseInt(productId)));

    return NextResponse.json({ success: true, review: newReview });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Error al añadir opinión" }, { status: 500 });
  }
}
