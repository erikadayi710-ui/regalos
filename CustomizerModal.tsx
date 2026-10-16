"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { formatPrice } from "@/lib/formatters";
import { X, Sparkles, Gift, Flower2, ShoppingBag, Heart, Check, ArrowRight } from "lucide-react";

export function CustomizerModal() {
  const { isCustomizerOpen, setIsCustomizerOpen, addToCart, showToast } = useApp();

  const [step, setStep] = useState(1);
  const [baseType, setBaseType] = useState({
    id: "caja-rosas",
    name: "Caja Cilíndrica Rosas Eternas",
    price: 65000,
    image: "/images/ramo-rosas-eternas.jpg",
  });

  const [roseColor, setRoseColor] = useState("Rosa Fucsia Auly");
  const [ribbonColor, setRibbonColor] = useState("Lazo Fucsia Satinado");
  const [cardMessage, setCardMessage] = useState("");
  const [selectedExtras, setSelectedExtras] = useState<
    Array<{ id: string; name: string; price: number }>
  >([]);

  if (!isCustomizerOpen) return null;

  const baseOptions = [
    {
      id: "caja-rosas",
      name: "Caja Cilíndrica Rosas Eternas",
      price: 65000,
      image: "/images/ramo-rosas-eternas.jpg",
    },
    {
      id: "bolso-tote",
      name: "Bolso Tote Lona & Rosa",
      price: 48000,
      image: "/images/bolso-tote-auly.jpg",
    },
    {
      id: "bolso-[#e60067]",
      name: "Bolso Bandolera Fucsia",
      price: 58000,
      image: "/images/bolso-bandolera.jpg",
    },
    {
      id: "caja-corazon",
      name: "Caja Corazón Romántica",
      price: 82000,
      image: "https://images.pexels.com/photos/7431423/pexels-photo-7431423.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
  ];

  const extraItems = [
    { id: "chocolates", name: "Caja Chocolates Artesanos", price: 15000 },
    { id: "tarjeta-acrilico", name: "Tarjeta Acrílica Grabada", price: 12000 },
    { id: "peluche", name: "Peluche de Oso Suave", price: 18000 },
    { id: "luces-led", name: "Luces Micro-LED Cálidas", price: 8000 },
  ];

  const toggleExtra = (item: { id: string; name: string; price: number }) => {
    setSelectedExtras(prev => {
      const exists = prev.some(e => e.id === item.id);
      if (exists) {
        return prev.filter(e => e.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const totalPrice = baseType.price + extrasTotal;

  const handleFinishCustomizer = () => {
    const customProduct = {
      id: 9999 + Math.floor(Math.random() * 1000),
      slug: `custom-${Date.now()}`,
      name: `Diseño Personalizado: ${baseType.name}`,
      price: totalPrice.toString(),
      description: `Diseño personalizado Auly con ${roseColor}, ${ribbonColor}. Complementos: ${
        selectedExtras.map(e => e.name).join(", ") || "Ninguno"
      }`,
      images: [baseType.image],
      isFeatured: false,
      isBestseller: false,
      stock: 99,
      rating: "5.00",
      reviewCount: 1,
    };

    addToCart(customProduct, {
      ribbon: ribbonColor,
      roseColor: roseColor,
      note: cardMessage,
      quantity: 1,
    });

    setIsCustomizerOpen(false);
    showToast("¡Tu regalo personalizado fue creado y añadido al carrito!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 border-b border-pink-100 flex items-center justify-between bg-gradient-to-r from-pink-500 to-[#e60067] text-white">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-pink-200" />
            <div>
              <h2 className="text-sm font-bold">Diseña tu Regalo Auly</h2>
              <span className="text-[10px] text-pink-100">Crea una sorpresa única paso a paso</span>
            </div>
          </div>
          <button
            onClick={() => setIsCustomizerOpen(false)}
            className="p-1 rounded-full hover:bg-white/20 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps indicator */}
        <div className="grid grid-cols-3 bg-pink-50 text-[11px] font-bold border-b border-pink-100">
          <button
            onClick={() => setStep(1)}
            className={`py-2 text-center border-b-2 transition-all ${
              step === 1 ? "border-[#e60067] text-[#e60067]" : "border-transparent text-slate-500"
            }`}
          >
            1. Base del Regalo
          </button>
          <button
            onClick={() => setStep(2)}
            className={`py-2 text-center border-b-2 transition-all ${
              step === 2 ? "border-[#e60067] text-[#e60067]" : "border-transparent text-slate-500"
            }`}
          >
            2. Tonos & Lazo
          </button>
          <button
            onClick={() => setStep(3)}
            className={`py-2 text-center border-b-2 transition-all ${
              step === 3 ? "border-[#e60067] text-[#e60067]" : "border-transparent text-slate-500"
            }`}
          >
            3. Extras & Mensaje
          </button>
        </div>

        {/* Step Content */}
        <div className="overflow-y-auto p-5 flex-1 space-y-4 no-scrollbar">
          {step === 1 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-800">
                Selecciona la Base para tu Arreglo o Bolso:
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {baseOptions.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setBaseType(opt)}
                    className={`p-2.5 rounded-2xl border cursor-pointer transition-all ${
                      baseType.id === opt.id
                        ? "border-[#e60067] bg-pink-50/80 shadow-md ring-2 ring-[#e60067]"
                        : "border-pink-100 bg-white hover:border-pink-300"
                    }`}
                  >
                    <div className="aspect-square rounded-xl overflow-hidden bg-pink-100 mb-2">
                      <img src={opt.image} alt={opt.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 block line-clamp-1">
                      {opt.name}
                    </span>
                    <span className="text-xs font-extrabold text-[#e60067]">
                      {formatPrice(opt.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              {/* Rose Color */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 block">
                  Color de las Flores / Rosas Eternas:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Rosa Fucsia Auly",
                    "Rojo Pasión Romántico",
                    "Blanco Nieve Elegante",
                    "Rosa Pastel Suave",
                  ].map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => setRoseColor(col)}
                      className={`p-2.5 rounded-2xl text-xs font-semibold text-center border transition-all ${
                        roseColor === col
                          ? "bg-[#e60067] text-white border-[#e60067]"
                          : "bg-white text-slate-700 border-pink-200"
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ribbon Color */}
              <div className="space-y-2 pt-2 border-t border-pink-100">
                <label className="text-xs font-bold text-slate-800 block">
                  Color del Lazo Satinado Auly:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Lazo Fucsia Satinado",
                    "Lazo Rojo Pasión",
                    "Lazo Dorado Lujo",
                    "Lazo Negro Chic",
                  ].map((rib) => (
                    <button
                      key={rib}
                      type="button"
                      onClick={() => setRibbonColor(rib)}
                      className={`p-2.5 rounded-2xl text-xs font-semibold text-center border transition-all ${
                        ribbonColor === rib
                          ? "bg-[#e60067] text-white border-[#e60067]"
                          : "bg-white text-slate-700 border-pink-200"
                      }`}
                    >
                      {rib}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              {/* Extras checklist */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 block">
                  Añadir Detalles Extras al Regalo:
                </label>

                <div className="space-y-2">
                  {extraItems.map((ex) => {
                    const isSelected = selectedExtras.some(e => e.id === ex.id);
                    return (
                      <div
                        key={ex.id}
                        onClick={() => toggleExtra(ex)}
                        className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                          isSelected
                            ? "bg-pink-50 border-[#e60067] text-[#e60067]"
                            : "bg-white border-pink-100 text-slate-700 hover:border-pink-300"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                              isSelected
                                ? "bg-[#e60067] border-[#e60067] text-white"
                                : "border-slate-300 bg-white"
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <span className="text-xs font-bold">{ex.name}</span>
                        </div>
                        <span className="text-xs font-extrabold">+ {formatPrice(ex.price)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dedication Card */}
              <div className="space-y-1.5 pt-2 border-t border-pink-100">
                <label className="text-xs font-bold text-slate-800 block">
                  Escribe tu Dedicatoria Personalizada:
                </label>
                <textarea
                  rows={2}
                  placeholder="Escribe el mensaje para la tarjeta de regalo..."
                  value={cardMessage}
                  onChange={(e) => setCardMessage(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-2xl border border-pink-200 focus:ring-2 focus:ring-[#e60067] focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Customizer Footer */}
        <div className="p-4 border-t border-pink-100 bg-pink-50/50 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 block uppercase font-semibold">
              Total Personalizado
            </span>
            <span className="text-lg font-black text-[#e60067]">{formatPrice(totalPrice)}</span>
          </div>

          <div className="flex space-x-2">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="bg-white border border-pink-200 text-slate-700 text-xs font-bold px-3 py-2.5 rounded-full hover:bg-pink-100"
              >
                Atrás
              </button>
            )}

            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="bg-[#e60067] hover:bg-[#c40057] text-white text-xs font-bold px-5 py-2.5 rounded-full flex items-center space-x-1"
              >
                <span>Siguiente</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinishCustomizer}
                className="bg-gradient-to-r from-[#e60067] to-[#ec4899] hover:from-[#c40057] hover:to-[#db2777] text-white text-xs font-bold px-5 py-2.5 rounded-full flex items-center space-x-1 shadow-md shadow-pink-500/20"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Añadir al Carrito</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
