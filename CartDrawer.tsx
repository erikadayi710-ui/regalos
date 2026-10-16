"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { formatPrice } from "@/lib/formatters";
import { X, Trash2, ShoppingBag, ArrowRight, Tag, MessageCircle, Sparkles } from "lucide-react";

export function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    setIsCheckoutOpen,
    showToast,
  } = useApp();

  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();

    if (cleanCode === "AULY10") {
      const disc = cartTotal * 0.1;
      setDiscountAmount(disc);
      setAppliedCoupon("AULY10 (10% de Descuento)");
      showToast("¡Cupón AULY10 aplicado con éxito!");
    } else if (cleanCode === "REGALO15") {
      const disc = 15000;
      setDiscountAmount(disc);
      setAppliedCoupon("REGALO15 ($ 15.000 de Regalo)");
      showToast("¡Cupón REGALO15 aplicado!");
    } else {
      showToast("Código de cupón no válido");
    }
  };

  const finalTotal = Math.max(0, cartTotal - discountAmount);

  // Generate WhatsApp Order Text
  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;

    let text = `🌸 *NUEVO PEDIDO AULY REGALOS & BOLSOS* 🌸\n\n`;
    text += `*Productos seleccionados:*\n`;

    cart.forEach((item, i) => {
      text += `${i + 1}. *${item.name}* (x${item.quantity}) - ${formatPrice(item.price * item.quantity)}\n`;
      if (item.selectedRibbon) text += `   • Lazo: ${item.selectedRibbon}\n`;
      if (item.selectedRoseColor) text += `   • Tono Flores: ${item.selectedRoseColor}\n`;
      if (item.selectedBagColor) text += `   • Bolso: ${item.selectedBagColor}\n`;
      if (item.cardNote) text += `   • Dedicatoria: "${item.cardNote}"\n`;
    });

    if (discountAmount > 0) {
      text += `\n*Descuento aplicado:* -${formatPrice(discountAmount)}\n`;
    }
    text += `\n*TOTAL ESTIMADO:* ${formatPrice(finalTotal)}\n\n`;
    text += `Hola Auly, quisiera confirmar la disponibilidad y coordinar la entrega de mi pedido. 😊`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/573000000000?text=${encoded}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 border-b border-pink-100 flex items-center justify-between bg-pink-50/50">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full bg-[#e60067] text-white">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Tu Carrito de Compras</h2>
              <span className="text-[11px] text-slate-500">{cartCount} ítems guardados</span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full text-slate-500 hover:bg-pink-100/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
          {cart.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto text-pink-300">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">Tu carrito está vacío</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Explora nuestras rosas eternas y bolsos únicos para añadir detalles inolvidables.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-[#e60067] text-white text-xs font-bold px-4 py-2 rounded-full shadow-md hover:bg-[#c40057]"
              >
                Ver catálogo de productos
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3 rounded-2xl border border-pink-100 flex gap-3 shadow-2xs relative group"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-pink-50 shrink-0 border border-pink-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-slate-800 truncate pr-2">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-red-500 p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-xs font-extrabold text-[#e60067] block">
                      {formatPrice(item.price)}
                    </span>

                    {/* Options list */}
                    <div className="text-[10px] text-slate-500 space-y-0.5 mt-1">
                      {item.selectedRibbon && <div>• Lazo: {item.selectedRibbon}</div>}
                      {item.selectedRoseColor && <div>• Tono: {item.selectedRoseColor}</div>}
                      {item.selectedBagColor && <div>• Bolso: {item.selectedBagColor}</div>}
                      {item.cardNote && (
                        <div className="italic text-pink-700 bg-pink-50 p-1 rounded-md">
                          "{item.cardNote}"
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-50">
                    <div className="flex items-center space-x-1.5 bg-slate-100 rounded-lg px-1.5 py-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-slate-600 font-bold text-xs px-1 hover:text-[#e60067]"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold text-slate-800 px-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-slate-600 font-bold text-xs px-1 hover:text-[#e60067]"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-bold text-slate-900">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Order Calculation */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-pink-100 bg-pink-50/30 space-y-3">
            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-pink-400" />
                <input
                  type="text"
                  placeholder="Cupón (ej: AULY10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full pl-8 pr-2 py-1.5 text-xs bg-white border border-pink-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#e60067] uppercase"
                />
              </div>
              <button
                type="submit"
                className="bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 rounded-xl text-xs font-semibold"
              >
                Aplicar
              </button>
            </form>

            {appliedCoupon && (
              <div className="text-[11px] text-pink-700 bg-pink-100/70 p-2 rounded-xl flex items-center justify-between">
                <span>✨ Cupón: {appliedCoupon}</span>
                <button
                  onClick={() => {
                    setDiscountAmount(0);
                    setAppliedCoupon(null);
                  }}
                  className="text-slate-500 hover:text-slate-800 font-bold"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Price breakdown */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-pink-600 font-semibold">
                  <span>Descuento</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-1 border-t border-pink-200">
                <span>Total</span>
                <span className="text-[#e60067] text-base">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full bg-[#e60067] hover:bg-[#c40057] text-white font-bold py-3 px-4 rounded-full text-xs shadow-md shadow-pink-500/20 flex items-center justify-center space-x-2 transition-all active:scale-95"
              >
                <span>Finalizar Compra Directa</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-full text-xs shadow-md flex items-center justify-center space-x-2 transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Pedir por WhatsApp Instantáneo</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
