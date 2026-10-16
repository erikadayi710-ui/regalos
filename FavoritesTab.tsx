"use client";

import React from "react";
import { Product } from "@/lib/types";
import { useApp } from "@/context/AppContext";
import { ProductCard } from "@/components/ProductCard";
import { Heart, Sparkles, ShoppingBag } from "lucide-react";

export function FavoritesTab({ products }: { products: Product[] }) {
  const { favorites, setActiveTab } = useApp();

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <div className="p-2 rounded-full bg-pink-100 text-[#e60067]">
          <Heart className="w-5 h-5 fill-[#e60067]" />
        </div>
        <div>
          <h1 className="text-lg font-bold font-serif text-slate-900">
            Tus Regalos Favoritos
          </h1>
          <p className="text-xs text-slate-500">
            {favoriteProducts.length} ítems guardados en tu lista de deseos
          </p>
        </div>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="text-center py-12 space-y-3 bg-pink-50/50 rounded-3xl p-6 border border-pink-100">
          <Heart className="w-10 h-10 text-pink-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">
            Aún no has guardado favoritos
          </h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Toca el ícono de corazón en cualquier producto para guardarlo aquí y comprarlo después.
          </p>
          <button
            onClick={() => setActiveTab("inicio")}
            className="bg-[#e60067] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md hover:bg-[#c40057]"
          >
            Explorar Productos Destacados
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
