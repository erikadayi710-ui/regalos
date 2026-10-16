import { pgTable, text, timestamp, integer, boolean, numeric, jsonb, serial } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  iconName: text("icon_name").notNull(),
  image: text("image"),
  displayOrder: integer("display_order").default(0),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  categoryId: integer("category_id").references(() => categories.id),
  price: numeric("price", { precision: 12, scale: 2 }).notNull(),
  originalPrice: numeric("original_price", { precision: 12, scale: 2 }),
  description: text("description").notNull(),
  shortDescription: text("short_description"),
  images: jsonb("images").$type<string[]>().notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  isBestseller: boolean("is_bestseller").default(false).notNull(),
  stock: integer("stock").default(50).notNull(),
  rating: numeric("rating", { precision: 3, scale: 2 }).default("5.0"),
  reviewCount: integer("review_count").default(0),
  tags: jsonb("tags").$type<string[]>().default([]),
  customizable: boolean("customizable").default(false),
  customOptions: jsonb("custom_options").$type<{
    ribbonColors?: string[];
    roseColors?: string[];
    allowCardNote?: boolean;
    bagColors?: string[];
  }>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id, { onDelete: "cascade" }),
  userName: text("user_name").notNull(),
  userAvatar: text("user_avatar"),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  deliveryAddress: text("delivery_address").notNull(),
  city: text("city").notNull(),
  recipientName: text("recipient_name"),
  cardMessage: text("card_message"),
  ribbonColor: text("ribbon_color"),
  deliveryDate: text("delivery_date"),
  paymentMethod: text("payment_method").notNull(),
  items: jsonb("items").$type<{
    productId: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    selectedOptions?: Record<string, string>;
  }[]>().notNull(),
  subtotal: numeric("subtotal", { precision: 12, scale: 2 }).notNull(),
  discount: numeric("discount", { precision: 12, scale: 2 }).default("0"),
  total: numeric("total", { precision: 12, scale: 2 }).notNull(),
  status: text("status").default("Pendiente").notNull(), // Pendiente, En preparación, Enviado, Entregado, Cancelado
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const customRequests = pgTable("custom_requests", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  requestType: text("request_type").notNull(), // Regalo, Bolso, Ramo Flores, Combo
  budget: text("budget"),
  description: text("description").notNull(),
  ribbonColor: text("ribbon_color"),
  cardMessage: text("card_message"),
  status: text("status").default("Recibido").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
