"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { Gift, Flower2, ShoppingBag, Heart } from "lucide-react";

export function CategoryCards() {
  const { setSelectedCategory, setActiveTab, selectedCategory } = useApp();

  const categories = [
    {
      id: "regalos",
      name: "Regalos",
      icon: Gift,
      color: "text-[#e60067]",
    },
    {
      id: "flores-eternas",
      name: "Flores Eternas",
      icon: Flower2,
      color: "text-[#e60067]",
    },
    {
      id: "bolsos-y-accesorios",
      name: "Bolsos y Accesorios",
      icon: ShoppingBag,
      color: "text-[#e60067]",
    },
    {
      id: "personalizados",
      name: "Personalizados",
      icon: Heart,
      color: "text-[#e60067]",
    },
  ];

  return (
    <section className="px-4 my-4">
      <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id === selectedCategory ? "all" : cat.id);
                setActiveTab("categorias");
              }}
              className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl transition-all duration-200 group active:scale-95 ${
                isSelected
                  ? "bg-[#e60067] text-white shadow-md shadow-pink-300 ring-2 ring-[#e60067]"
                  : "bg-pink-50/80 hover:bg-pink-100/90 text-slate-800 border border-pink-100/80"
              }`}
            >
              <div
                className={`p-2 rounded-xl mb-1.5 transition-transform group-hover:scale-110 ${
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-white text-[#e60067] shadow-xs"
                }`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
              </div>

              <span
                className={`text-[11px] sm:text-xs font-semibold text-center leading-tight tracking-tight ${
                  isSelected ? "text-white" : "text-slate-800"
                }`}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
