"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem } from "@/lib/types";
import confetti from "canvas-confetti";

interface AppContextType {
  cart: CartItem[];
  addToCart: (product: Product, options?: { ribbon?: string; roseColor?: string; bagColor?: string; note?: string; quantity?: number }) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  favorites: number[];
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;

  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  viewMode: "phone" | "fullscreen";
  setViewMode: (mode: "phone" | "fullscreen") => void;

  selectedProductModal: Product | null;
  setSelectedProductModal: (product: Product | null) => void;

  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isCustomizerOpen: boolean;
  setIsCustomizerOpen: (open: boolean) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;

  triggerConfetti: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<string>("inicio");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"phone" | "fullscreen">("phone");

  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load cart and favorites from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("auly_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedFavs = localStorage.getItem("auly_favorites");
      if (savedFavs) setFavorites(JSON.parse(savedFavs));
    } catch (e) {
      console.error("Error loading state from localStorage", e);
    }
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("auly_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Error saving cart to localStorage", e);
    }
  }, [cart]);

  // Sync favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("auly_favorites", JSON.stringify(favorites));
    } catch (e) {
      console.error("Error saving favorites to localStorage", e);
    }
  }, [favorites]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#e60067", "#ec4899", "#be185d", "#f472b6", "#fbbf24"],
      });
    } catch (e) {
      // fallback
    }
  };

  const addToCart = (
    product: Product,
    options?: { ribbon?: string; roseColor?: string; bagColor?: string; note?: string; quantity?: number }
  ) => {
    const qty = options?.quantity || 1;
    const optionHash = `${options?.ribbon || ""}-${options?.roseColor || ""}-${options?.bagColor || ""}-${options?.note || ""}`;
    const cartItemId = `${product.id}-${optionHash}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + qty } : item
        );
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            productId: product.id,
            name: product.name,
            price: parseFloat(product.price),
            image: product.images[0] || "/images/hero-banner.jpg",
            quantity: qty,
            selectedRibbon: options?.ribbon,
            selectedRoseColor: options?.roseColor,
            selectedBagColor: options?.bagColor,
            cardNote: options?.note,
          },
        ];
      }
    });

    showToast(`¡"${product.name}" añadido al carrito!`);
    triggerConfetti();
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    showToast("Producto eliminado del carrito");
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast("Eliminado de tus favoritos");
        return prev.filter(id => id !== productId);
      } else {
        showToast("¡Añadido a tus favoritos!");
        return [...prev, productId];
      }
    });
  };

  const isFavorite = (productId: number) => favorites.includes(productId);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        favorites,
        toggleFavorite,
        isFavorite,
        activeTab,
        setActiveTab,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        viewMode,
        setViewMode,
        selectedProductModal,
        setSelectedProductModal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isCustomizerOpen,
        setIsCustomizerOpen,
        isDrawerOpen,
        setIsDrawerOpen,
        triggerConfetti,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
