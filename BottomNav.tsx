"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { Home, LayoutGrid, Heart, User, Sparkles } from "lucide-react";

export function BottomNav() {
  const { activeTab, setActiveTab, favorites } = useApp();

  const navItems = [
    {
      id: "inicio",
      label: "Inicio",
      icon: Home,
    },
    {
      id: "categorias",
      label: "Categorías",
      icon: LayoutGrid,
    },
    {
      id: "favoritos",
      label: "Favoritos",
      icon: Heart,
      badge: favorites.length > 0 ? favorites.length : null,
    },
    {
      id: "perfil",
      label: "Perfil",
      icon: User,
    },
  ];

  return (
    <nav className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-pink-100 py-1.5 px-3 shadow-lg">
      <div className="max-w-md mx-auto grid grid-cols-4 items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`flex flex-col items-center justify-center py-1 transition-all relative ${
                isActive
                  ? "text-[#e60067] font-semibold scale-105"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? "stroke-[2.5]" : "stroke-[1.75]"
                  }`}
                />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 bg-[#e60067] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">
                {item.label}
              </span>

              {/* Active Indicator dot */}
              {isActive && (
                <span className="w-1 h-1 bg-[#e60067] rounded-full mt-0.5 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
