"use client";

import React from "react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/formatters";
import { useApp } from "@/context/AppContext";
import { Heart, ShoppingBag, Star, Sparkles } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const {
    setSelectedProductModal,
    addToCart,
    isFavorite,
    toggleFavorite,
  } = useApp();

  const favorite = isFavorite(product.id);

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-pink-100/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group relative">
      {/* Product Image Container */}
      <div
        onClick={() => setSelectedProductModal(product)}
        className="relative w-full aspect-square bg-pink-50/50 cursor-pointer overflow-hidden"
      >
        <img
          src={product.images[0] || "/images/hero-banner.jpg"}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Bestseller / Featured Tag */}
        {product.isBestseller && (
          <span className="absolute top-2 left-2 bg-pink-900/80 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1 shadow-xs">
            <Sparkles className="w-2.5 h-2.5 text-pink-300" />
            <span>Favorito</span>
          </span>
        )}

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          aria-label="Añadir a favoritos"
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-slate-700 hover:text-[#e60067] shadow-sm transition-all active:scale-90"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              favorite ? "fill-[#e60067] text-[#e60067]" : "text-slate-600"
            }`}
          />
        </button>
      </div>

      {/* Product Info Content */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center space-x-1 mb-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-[11px] font-semibold text-slate-700">
              {product.rating}
            </span>
            <span className="text-[10px] text-slate-400">
              ({product.reviewCount})
            </span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => setSelectedProductModal(product)}
            className="text-xs sm:text-sm font-semibold text-slate-800 line-clamp-2 hover:text-[#e60067] cursor-pointer transition-colors leading-snug"
          >
            {product.name}
          </h3>
        </div>

        {/* Price & Circular Add to Cart Button */}
        <div className="mt-2.5 pt-2 border-t border-pink-50 flex items-center justify-between">
          <div>
            <span className="text-xs sm:text-sm font-bold text-slate-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="block text-[10px] text-slate-400 line-through -mt-0.5">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Circular pink cart icon button (Matching prompt picture bottom-right button) */}
          <button
            onClick={() => {
              if (product.customizable) {
                setSelectedProductModal(product);
              } else {
                addToCart(product);
              }
            }}
            aria-label="Añadir al carrito"
            className="w-8 h-8 rounded-full bg-[#83003a] hover:bg-[#e60067] text-white flex items-center justify-center shadow-sm hover:shadow transition-all active:scale-90"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
