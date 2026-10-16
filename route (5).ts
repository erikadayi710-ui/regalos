import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { seedDatabase } from "@/db/seed";
import { eq, like, or, desc, asc, and } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categorySlug = searchParams.get("category");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");
    const sort = searchParams.get("sort"); // price_asc, price_desc, rating, name

    let allProducts = await db.select().from(products);

    if (allProducts.length === 0) {
      await seedDatabase();
      allProducts = await db.select().from(products);
    }

    const allCategories = await db.select().from(categories);

    // Map category details onto products
    let result = allProducts.map(p => {
      const cat = allCategories.find(c => c.id === p.categoryId);
      return {
        ...p,
        categorySlug: cat?.slug || "",
        categoryName: cat?.name || "",
      };
    });

    // Filter by Category
    if (categorySlug && categorySlug !== "all") {
      result = result.filter(p => p.categorySlug === categorySlug);
    }

    // Filter by Featured
    if (featured === "true") {
      result = result.filter(p => p.isFeatured);
    }

    // Filter by Search Query
    if (search) {
      const query = search.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          (p.tags && p.tags.some(t => t.toLowerCase().includes(query)))
      );
    }

    // Sorting
    if (sort === "price_asc") {
      result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sort === "price_desc") {
      result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sort === "rating") {
      result.sort((a, b) => parseFloat(b.rating || "0") - parseFloat(a.rating || "0"));
    } else if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return NextResponse.json({ success: true, products: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Error al obtener productos" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, categoryId, price, originalPrice, description, shortDescription, images, isFeatured, isBestseller, customizable, customOptions, tags } = body;

    if (!name || !price || !description) {
      return NextResponse.json({ success: false, error: "Nombre, precio y descripción son requeridos." }, { status: 400 });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") + "-" + Date.now();

    const [newProduct] = await db.insert(products).values({
      slug,
      name,
      categoryId: categoryId ? parseInt(categoryId) : null,
      price: price.toString(),
      originalPrice: originalPrice ? originalPrice.toString() : null,
      description,
      shortDescription: shortDescription || description.slice(0, 100),
      images: Array.isArray(images) && images.length > 0 ? images : ["/images/hero-banner.jpg"],
      isFeatured: !!isFeatured,
      isBestseller: !!isBestseller,
      stock: 50,
      rating: "5.00",
      reviewCount: 0,
      tags: tags || [],
      customizable: !!customizable,
      customOptions: customOptions || {},
    }).returning();

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Error al crear producto" }, { status: 500 });
  }
}
