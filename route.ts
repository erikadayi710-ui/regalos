import { NextResponse } from "next/server";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { seedDatabase } from "@/db/seed";

export async function GET() {
  try {
    let result = await db.select().from(categories).orderBy(categories.displayOrder);
    if (result.length === 0) {
      await seedDatabase();
      result = await db.select().from(categories).orderBy(categories.displayOrder);
    }
    return NextResponse.json({ success: true, categories: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Error al obtener categorías" }, { status: 500 });
  }
}
