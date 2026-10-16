"use client";

import React from "react";
import { Product } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";
import { useApp } from "@/context/AppContext";
import { ArrowRight, Sparkles } from "lucide-react";

export function FeaturedProducts({ products }: { products: Product[] }) {
  const { setActiveTab, setSelectedCategory } = useApp();

  // Filter featured products
  const featured = products.filter(p => p.isFeatured).slice(0, 6);

  return (
    <section className="px-4 my-6">
      {/* Section Header (Matching screenshot: "Productos destacados" + "Ver todos ->") */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
          <span>Productos destacados</span>
        </h2>

        <button
          onClick={() => {
            setSelectedCategory("all");
            setActiveTab("categorias");
          }}
          className="text-xs font-bold text-[#e60067] hover:text-[#c40057] flex items-center space-x-1 hover:underline transition-all"
        >
          <span>Ver todos</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
