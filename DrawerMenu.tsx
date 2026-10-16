"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { AulyLogo } from "@/components/AulyLogo";
import {
  X,
  Home,
  LayoutGrid,
  Gift,
  Flower2,
  ShoppingBag,
  Heart,
  Sparkles,
  Package,
  ShieldCheck,
  MessageCircle,
  ChevronRight,
} from "lucide-react";

export function DrawerMenu() {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    setActiveTab,
    setSelectedCategory,
    setIsCustomizerOpen,
  } = useApp();

  if (!isDrawerOpen) return null;

  const categoriesList = [
    { id: "regalos", name: "Regalos Especiales", icon: Gift },
    { id: "flores-eternas", name: "Flores Eternas", icon: Flower2 },
    { id: "bolsos-y-accesorios", name: "Bolsos y Accesorios", icon: ShoppingBag },
    { id: "personalizados", name: "Detalles Personalizados", icon: Heart },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-start bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xs h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
        {/* Top Header */}
        <div className="p-4 border-b border-pink-100 flex items-center justify-between bg-pink-50/50">
          <AulyLogo className="scale-90" />
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-1.5 rounded-full text-slate-500 hover:bg-pink-100/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {/* Main Views */}
          <div className="space-y-1">
            <button
              onClick={() => {
                setActiveTab("inicio");
                setIsDrawerOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-pink-50 text-slate-800 font-bold text-xs transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <Home className="w-4 h-4 text-[#e60067]" />
                <span>Inicio</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => {
                setSelectedCategory("all");
                setActiveTab("categorias");
                setIsDrawerOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-pink-50 text-slate-800 font-bold text-xs transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <LayoutGrid className="w-4 h-4 text-[#e60067]" />
                <span>Catálogo Completo</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Categories Submenu */}
          <div className="pt-2 border-t border-pink-100 space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 px-2 tracking-wider">
              Categorías Auly
            </span>

            {categoriesList.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setActiveTab("categorias");
                    setIsDrawerOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-pink-50 text-slate-700 text-xs font-semibold transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className="w-4 h-4 text-pink-500" />
                    <span>{cat.name}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                </button>
              );
            })}
          </div>

          {/* Special Tools */}
          <div className="pt-2 border-t border-pink-100 space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 px-2 tracking-wider">
              Servicios & Cuenta
            </span>

            <button
              onClick={() => {
                setIsDrawerOpen(false);
                setIsCustomizerOpen(true);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-2xl bg-gradient-to-r from-pink-50 to-pink-100/50 text-[#e60067] font-bold text-xs transition-colors border border-pink-200"
            >
              <div className="flex items-center space-x-2.5">
                <Sparkles className="w-4 h-4 text-[#e60067]" />
                <span>Diseñar Regalo a la Medida</span>
              </div>
              <ChevronRight className="w-4 h-4 text-pink-400" />
            </button>

            <button
              onClick={() => {
                setActiveTab("perfil");
                setIsDrawerOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-pink-50 text-slate-700 font-semibold text-xs transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <Package className="w-4 h-4 text-slate-500" />
                <span>Mis Pedidos & Rastreo</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            </button>

            <button
              onClick={() => {
                setActiveTab("admin");
                setIsDrawerOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-pink-50 text-slate-700 font-semibold text-xs transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-slate-500" />
                <span>Gestión Administrador</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            </button>
          </div>
        </div>

        {/* Footer Contact */}
        <div className="p-4 border-t border-pink-100 bg-pink-50/50 space-y-2">
          <a
            href="https://wa.me/573000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-full text-xs shadow-xs"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Asesoría por WhatsApp</span>
          </a>

          <p className="text-[10px] text-slate-400 text-center">
            Auly Regalos & Bolsos © 2026 • Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
