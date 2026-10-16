"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { AulyLogo } from "@/components/AulyLogo";
import { Menu, ShoppingBag, Search, Heart, X } from "lucide-react";

export function Header() {
  const {
    cartCount,
    setIsCartOpen,
    setIsDrawerOpen,
    searchQuery,
    setSearchQuery,
    setActiveTab,
    favorites,
  } = useApp();

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-pink-100 px-4 py-2.5 transition-all">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Hamburger Menu Trigger */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Abrir menú"
            className="p-2 rounded-full text-slate-700 hover:text-[#e60067] hover:bg-pink-50 transition-colors focus:outline-none"
          >
            <Menu className="w-6 h-6 stroke-[2]" />
          </button>

          {/* Center Brand Logo */}
          <button
            onClick={() => {
              setActiveTab("inicio");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="focus:outline-none"
          >
            <AulyLogo className="scale-105" />
          </button>

          {/* Right Action Icons: Search & Cart */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Buscar productos"
              className="p-2 rounded-full text-slate-700 hover:text-[#e60067] hover:bg-pink-50 transition-colors"
            >
              <Search className="w-5 h-5 stroke-[2]" />
            </button>

            {/* Cart Icon with pink badge (matching screenshot) */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Carrito de compras"
              className="relative p-2 rounded-full text-slate-700 hover:text-[#e60067] hover:bg-pink-50 transition-colors"
            >
              <ShoppingBag className="w-5 h-5 stroke-[2]" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#e60067] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white animate-bounce-short">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Quick Search Dropdown Bar */}
        {isSearchOpen && (
          <div className="mt-2 pt-2 border-t border-pink-100 max-w-4xl mx-auto flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-pink-400" />
              <input
                type="text"
                placeholder="Buscar rosas eternas, bolsos, ramos, cajas..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.trim() !== "") {
                    setActiveTab("categorias");
                  }
                }}
                className="w-full pl-9 pr-8 py-1.5 text-xs bg-pink-50/70 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#e60067] focus:bg-white text-slate-800 placeholder-slate-400"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-xs font-semibold text-[#e60067] px-2 py-1"
            >
              Cerrar
            </button>
          </div>
        )}
      </header>
    </>
  );
}
