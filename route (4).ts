import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products, categories, reviews } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return NextResponse.json({ success: false, error: "ID de producto inválido" }, { status: 400 });
    }

    const [product] = await db.select().from(products).where(eq(products.id, productId));

    if (!product) {
      return NextResponse.json({ success: false, error: "Producto no encontrado" }, { status: 404 });
    }

    let category = null;
    if (product.categoryId) {
      const [cat] = await db.select().from(categories).where(eq(categories.id, product.categoryId));
      category = cat;
    }

    const productReviews = await db.select().from(reviews).where(eq(reviews.productId, productId));

    return NextResponse.json({
      success: true,
      product: {
        ...product,
        categoryName: category?.name || "",
        categorySlug: category?.slug || "",
      },
      reviews: productReviews,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Error al obtener producto" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    const body = await request.json();

    const [updatedProduct] = await db.update(products).set({
      name: body.name,
      price: body.price ? body.price.toString() : undefined,
      originalPrice: body.originalPrice ? body.originalPrice.toString() : undefined,
      description: body.description,
      isFeatured: body.isFeatured !== undefined ? body.isFeatured : undefined,
      isBestseller: body.isBestseller !== undefined ? body.isBestseller : undefined,
      stock: body.stock !== undefined ? parseInt(body.stock) : undefined,
    }).where(eq(products.id, productId)).returning();

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Error al actualizar producto" }, { status: 500 });
  }
}
