export interface Category {
  id: number;
  slug: string;
  name: string;
  description?: string | null;
  iconName: string;
  image?: string | null;
  displayOrder?: number | null;
}

export interface ProductCustomOptions {
  ribbonColors?: string[];
  roseColors?: string[];
  allowCardNote?: boolean;
  bagColors?: string[];
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  categoryId?: number | null;
  categoryName?: string;
  categorySlug?: string;
  price: string;
  originalPrice?: string | null;
  description: string;
  shortDescription?: string | null;
  images: string[];
  isFeatured: boolean;
  isBestseller: boolean;
  stock: number;
  rating: string;
  reviewCount: number;
  tags?: string[] | null;
  customizable?: boolean | null;
  customOptions?: ProductCustomOptions | null;
  createdAt?: string;
}

export interface CartItem {
  id: string; // unique cart item id (product.id + options hash)
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedRibbon?: string;
  selectedRoseColor?: string;
  selectedBagColor?: string;
  cardNote?: string;
}

export interface Review {
  id: number;
  productId: number;
  userName: string;
  userAvatar?: string | null;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  city: string;
  recipientName?: string | null;
  cardMessage?: string | null;
  ribbonColor?: string | null;
  deliveryDate?: string | null;
  paymentMethod: string;
  items: Array<{
    productId: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    selectedOptions?: Record<string, string>;
  }>;
  subtotal: string;
  discount: string;
  total: string;
  status: string;
  createdAt: string;
}

export interface CustomRequest {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  requestType: string;
  budget?: string | null;
  description: string;
  ribbonColor?: string | null;
  cardMessage?: string | null;
  status: string;
  createdAt: string;
}
