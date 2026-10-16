"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroBanner() {
  const { setActiveTab, setIsCustomizerOpen } = useApp();

  return (
    <div className="relative overflow-hidden rounded-3xl my-3 shadow-md mx-4 group">
      {/* Background Image */}
      <div className="relative h-[210px] sm:h-[240px] w-full bg-slate-900">
        <img
          src="/images/hero-banner.jpg"
          alt="Porque cada detalle es especial - Auly"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Soft Dark Pink Overlay for readable text */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent flex flex-col justify-center p-6 sm:p-8">
          <div className="max-w-[260px] sm:max-w-xs space-y-3">
            <span className="inline-flex items-center space-x-1.5 bg-pink-500/20 backdrop-blur-md text-pink-200 border border-pink-400/30 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase">
              <Sparkles className="w-3 h-3 text-pink-300" />
              <span>Colección Auly 2026</span>
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight font-serif tracking-tight drop-shadow-md">
              Porque cada detalle es especial
            </h1>

            <p className="text-xs text-pink-100/90 font-light line-clamp-2">
              Flores eternas que duran años y bolsos exclusivos diseñados para enamorar.
            </p>

            <div className="pt-1 flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setActiveTab("categorias");
                  window.scrollTo({ top: 400, behavior: "smooth" });
                }}
                className="inline-flex items-center space-x-2 bg-[#e60067] hover:bg-[#c40057] text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg shadow-pink-900/30 transition-all hover:gap-3 active:scale-95"
              >
                <span>Ver productos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsCustomizerOpen(true)}
                className="inline-flex items-center space-x-1 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/40 px-3 py-2 rounded-full text-xs font-semibold transition-all active:scale-95"
              >
                <span>✨ Personalizar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
