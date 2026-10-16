"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { formatPrice } from "@/lib/formatters";
import { X, CheckCircle2, Truck, CreditCard, Gift, Sparkles, Send } from "lucide-react";

export function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    clearCart,
    triggerConfetti,
    showToast,
  } = useApp();

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [city, setCity] = useState("Bogotá");
  const [recipientName, setRecipientName] = useState("");
  const [cardMessage, setCardMessage] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Nequi / Daviplata");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !deliveryAddress) {
      showToast("Por favor completa los campos obligatorios");
      return;
    }

    setIsSubmitting(true);
    try {
      const itemsPayload = cart.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        selectedOptions: {
          ribbon: item.selectedRibbon || "",
          roseColor: item.selectedRoseColor || "",
          bagColor: item.selectedBagColor || "",
          cardNote: item.cardNote || "",
        },
      }));

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerPhone,
          deliveryAddress,
          city,
          recipientName: recipientName || customerName,
          cardMessage,
          deliveryDate,
          paymentMethod,
          items: itemsPayload,
          subtotal: cartTotal,
          discount: 0,
          total: cartTotal,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setCompletedOrder(data.order);
        clearCart();
        triggerConfetti();
      } else {
        showToast(data.error || "Error al procesar pedido");
      }
    } catch (err) {
      console.error(err);
      showToast("Error de conexión al procesar la compra");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 border-b border-pink-100 flex items-center justify-between bg-pink-50/50">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-full bg-[#e60067] text-white">
              <Gift className="w-4 h-4" />
            </span>
            <h2 className="text-sm font-bold text-slate-900">
              {completedOrder ? "¡Pedido Confirmado!" : "Finalizar Pedido Auly"}
            </h2>
          </div>
          <button
            onClick={() => {
              setIsCheckoutOpen(false);
              setCompletedOrder(null);
            }}
            className="p-1.5 rounded-full text-slate-500 hover:bg-pink-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 space-y-4 no-scrollbar">
          {completedOrder ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#e60067] uppercase tracking-wider bg-pink-50 px-3 py-1 rounded-full">
                  Número de Pedido: {completedOrder.orderNumber}
                </span>
                <h3 className="text-lg font-serif font-extrabold text-slate-900 mt-2">
                  ¡Muchas Gracias por tu Compra!
                </h3>
                <p className="text-xs text-slate-600 max-w-xs mx-auto mt-1">
                  Hemos registrado tu pedido correctamente. Nos pondremos en contacto contigo a través de WhatsApp/Teléfono para coordinar el envío.
                </p>
              </div>

              <div className="bg-pink-50/60 p-4 rounded-2xl text-left border border-pink-100 text-xs space-y-1.5 text-slate-700">
                <div><strong>Cliente:</strong> {completedOrder.customerName}</div>
                <div><strong>Teléfono:</strong> {completedOrder.customerPhone}</div>
                <div><strong>Dirección de Entrega:</strong> {completedOrder.deliveryAddress}, {completedOrder.city}</div>
                <div><strong>Destinatario:</strong> {completedOrder.recipientName}</div>
                <div><strong>Método de Pago:</strong> {completedOrder.paymentMethod}</div>
                <div className="pt-2 border-t border-pink-200 font-bold text-slate-900 flex justify-between">
                  <span>Total Pagado:</span>
                  <span className="text-[#e60067]">{formatPrice(completedOrder.total)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setCompletedOrder(null);
                }}
                className="bg-[#e60067] text-white font-bold px-6 py-2.5 rounded-full text-xs hover:bg-[#c40057] shadow-md"
              >
                Volver a la tienda
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitOrder} className="space-y-4">
              {/* Customer Info */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#e60067]" />
                  <span>1. Datos de Entrega y Envío</span>
                </h3>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block">Tu Nombre *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Laura Gómez"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-pink-200 focus:ring-2 focus:ring-[#e60067] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block">Teléfono / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej: 3001234567"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-pink-200 focus:ring-2 focus:ring-[#e60067] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    placeholder="ejemplo@correo.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-pink-200 focus:ring-2 focus:ring-[#e60067] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="text-[11px] font-semibold text-slate-700 block">Dirección de Entrega *</label>
                    <input
                      type="text"
                      required
                      placeholder="Calle 123 # 45 - 67 Apt 201"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-pink-200 focus:ring-2 focus:ring-[#e60067] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block">Ciudad *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-pink-200 focus:ring-2 focus:ring-[#e60067] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Recipient Details & Card */}
              <div className="space-y-2 pt-2 border-t border-pink-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1">
                  <Gift className="w-3.5 h-3.5 text-[#e60067]" />
                  <span>2. Detalle del Regalo & Destinatario</span>
                </h3>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block">Nombre Destinatario</label>
                    <input
                      type="text"
                      placeholder="Nombre de quien recibe"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-pink-200 focus:ring-2 focus:ring-[#e60067] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block">Fecha Preferida</label>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-pink-200 focus:ring-2 focus:ring-[#e60067] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block">Mensaje de la Tarjeta</label>
                  <textarea
                    rows={2}
                    placeholder="Escribe aquí el texto para la tarjeta de dedicatoria..."
                    value={cardMessage}
                    onChange={(e) => setCardMessage(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-pink-200 focus:ring-2 focus:ring-[#e60067] focus:outline-none"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-2 pt-2 border-t border-pink-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-[#e60067]" />
                  <span>3. Método de Pago</span>
                </h3>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    "Nequi / Daviplata",
                    "PSE / Tarjeta",
                    "Contra Entrega",
                  ].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`p-2.5 rounded-2xl text-xs font-semibold text-center border transition-all ${
                        paymentMethod === method
                          ? "bg-[#e60067] text-white border-[#e60067] shadow-xs"
                          : "bg-white text-slate-700 border-pink-200 hover:border-[#e60067]"
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#e60067] hover:bg-[#c40057] text-white font-bold py-3.5 px-4 rounded-full text-xs shadow-lg shadow-pink-500/20 flex items-center justify-center space-x-2 transition-all active:scale-95"
              >
                {isSubmitting ? (
                  <span>Procesando tu pedido...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Confirmar Pedido por {formatPrice(cartTotal)}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
