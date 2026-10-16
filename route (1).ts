import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { customRequests } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const list = await db.select().from(customRequests).orderBy(desc(customRequests.createdAt));
    return NextResponse.json({ success: true, requests: list });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Error al obtener solicitudes" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, customerPhone, requestType, budget, description, ribbonColor, cardMessage } = body;

    if (!customerName || !customerPhone || !description) {
      return NextResponse.json({ success: false, error: "Nombre, teléfono y descripción son requeridos." }, { status: 400 });
    }

    const [newRequest] = await db.insert(customRequests).values({
      customerName,
      customerEmail: customerEmail || "",
      customerPhone,
      requestType: requestType || "Regalo Personalizado",
      budget: budget || "No especificado",
      description,
      ribbonColor: ribbonColor || "",
      cardMessage: cardMessage || "",
      status: "Recibido",
    }).returning();

    return NextResponse.json({ success: true, customRequest: newRequest });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Error al enviar solicitud personalizada" }, { status: 500 });
  }
}
