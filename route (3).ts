import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get("email");

    let userOrders;
    if (email) {
      userOrders = await db.select().from(orders).where(eq(orders.customerEmail, email)).orderBy(desc(orders.createdAt));
    } else {
      userOrders = await db.select().from(orders).orderBy(desc(orders.createdAt));
    }

    return NextResponse.json({ success: true, orders: userOrders });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Error al obtener pedidos" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      deliveryAddress,
      city,
      recipientName,
      cardMessage,
      ribbonColor,
      deliveryDate,
      paymentMethod,
      items,
      subtotal,
      discount,
      total,
    } = body;

    if (!customerName || !customerEmail || !customerPhone || !deliveryAddress || !items || items.length === 0) {
      return NextResponse.json({ success: false, error: "Por favor completa los datos obligatorios del pedido." }, { status: 400 });
    }

    const orderNumber = "AULY-" + Math.floor(100000 + Math.random() * 900000);

    const [newOrder] = await db.insert(orders).values({
      orderNumber,
      customerName,
      customerEmail,
      customerPhone,
      deliveryAddress,
      city: city || "Bogotá",
      recipientName: recipientName || customerName,
      cardMessage: cardMessage || "",
      ribbonColor: ribbonColor || "",
      deliveryDate: deliveryDate || new Date().toISOString().split("T")[0],
      paymentMethod: paymentMethod || "Nequi / Daviplata / Transferencia",
      items,
      subtotal: subtotal.toString(),
      discount: discount ? discount.toString() : "0",
      total: total.toString(),
      status: "Pendiente",
    }).returning();

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Error al registrar el pedido" }, { status: 500 });
  }
}
