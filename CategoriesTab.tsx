"use client";

import React, { useState } from "react";
import { Product, Category } from "@/lib/types";
import { useApp } from "@/context/AppContext";
import { ProductCard } from "@/components/ProductCard";
import { Search, Filter, SlidersHorizontal, Sparkles, RefreshCw } from "lucide-react";

export function CategoriesTab({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const [sortOption, setSortOption] = useState<string>("default");

  // Filter products by search and category
  let filtered = products.filter((product) => {
    // Category filter
    if (selectedCategory !== "all") {
      const cat = categories.find((c) => c.slug === selectedCategory);
      if (cat && product.categoryId !== cat.id) {
        return false;
      }
    }

    // Search filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchTag = product.tags?.some((t) => t.toLowerCase().includes(q));
      return matchName || matchDesc || matchTag;
    }

    return true;
  });

  // Sort
  if (sortOption === "price_asc") {
    filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (sortOption === "price_desc") {
    filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  } else if (sortOption === "rating") {
    filtered.sort((a, b) => parseFloat(b.rating || "0") - parseFloat(a.rating || "0"));
  }

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Category Header */}
      <div>
        <h1 className="text-lg font-bold font-serif text-slate-900">
          Catálogo Auly Regalos & Bolsos
        </h1>
        <p className="text-xs text-slate-500">
          Encuentra el regalo ideal, flores eternas o bolsos exclusivos
        </p>
      </div>

      {/* Category Pills Slider */}
      <div className="flex space-x-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
            selectedCategory === "all"
              ? "bg-[#e60067] text-white shadow-xs"
              : "bg-pink-50 text-slate-700 hover:bg-pink-100"
          }`}
        >
          Todos ({products.length})
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
              selectedCategory === cat.slug
                ? "bg-[#e60067] text-white shadow-xs"
                : "bg-pink-50 text-slate-700 hover:bg-pink-100"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Search & Sort Row */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-pink-400" />
          <input
            type="text"
            placeholder="Filtrar por nombre o palabra..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#e60067]"
          />
        </div>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="text-xs p-2 bg-white border border-pink-200 rounded-full text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-[#e60067]"
        >
          <option value="default">Más recientes</option>
          <option value="price_asc">Precio: Menor a Mayor</option>
          <option value="price_desc">Precio: Mayor a Menor</option>
          <option value="rating">Mejor Valorados ⭐</option>
        </select>
      </div>

      {/* Product List Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
        <span>Mostrando {filtered.length} productos</span>
        {(selectedCategory !== "all" || searchQuery !== "") && (
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="text-[#e60067] hover:underline flex items-center space-x-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Limpiar Filtros</span>
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 space-y-3 bg-pink-50/50 rounded-3xl p-6 border border-pink-100">
          <Sparkles className="w-8 h-8 text-pink-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">
            No se encontraron productos con ese filtro
          </h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Prueba a buscar otro término o explora nuestras categorías principales.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="bg-[#e60067] text-white text-xs font-bold px-4 py-2 rounded-full"
          >
            Ver todos los productos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
