import { NextResponse } from "next/server";
import { seedDatabase } from "@/db/seed";

export async function GET() {
  try {
    await seedDatabase();
    return NextResponse.json({ success: true, message: "Base de datos inicializada correctamente." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Error al sembrar la base de datos." }, { status: 500 });
  }
}
