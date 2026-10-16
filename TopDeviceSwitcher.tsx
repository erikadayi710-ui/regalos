"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { Smartphone, Monitor, Sparkles, ShoppingBag, ShieldCheck } from "lucide-react";

export function TopDeviceSwitcher() {
  const { viewMode, setViewMode, cartCount, setIsCartOpen, setIsCustomizerOpen, setActiveTab } = useApp();

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 text-xs py-2 px-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left branding tag */}
        <div className="flex items-center space-x-2">
          <span className="bg-gradient-to-r from-[#e60067] to-[#ec4899] text-white px-2 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider">
            Auly App
          </span>
          <span className="hidden sm:inline text-slate-300">
            Experiencia Móvil & Web Interactiva
          </span>
        </div>

        {/* Device View Mode Switcher */}
        <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
          <button
            onClick={() => setViewMode("phone")}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-md font-medium transition-all ${
              viewMode === "phone"
                ? "bg-[#e60067] text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Marco iPhone</span>
          </button>
          <button
            onClick={() => setViewMode("fullscreen")}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-md font-medium transition-all ${
              viewMode === "fullscreen"
                ? "bg-[#e60067] text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Pantalla Completa</span>
          </button>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsCustomizerOpen(true)}
            className="hidden md:flex items-center space-x-1 bg-pink-950 text-pink-300 border border-pink-700/50 hover:bg-pink-900 px-2.5 py-1 rounded-md font-medium transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Diseñar Regalo</span>
          </button>

          <button
            onClick={() => setActiveTab("admin")}
            className="flex items-center space-x-1 bg-slate-800 text-slate-300 hover:text-white px-2.5 py-1 rounded-md border border-slate-700 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden sm:inline">Panel Admin</span>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-[#e60067] text-white hover:bg-[#c40057] px-2.5 py-1 rounded-md font-semibold flex items-center space-x-1.5 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Carrito ({cartCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
}
