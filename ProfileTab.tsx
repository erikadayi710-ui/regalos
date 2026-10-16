"use client";

import React, { useState, useEffect } from "react";
import { Order } from "@/lib/types";
import { formatPrice, formatDate } from "@/lib/formatters";
import { useApp } from "@/context/AppContext";
import {
  User,
  Package,
  Sparkles,
  MessageCircle,
  Truck,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  Heart,
  Gift,
} from "lucide-react";

export function ProfileTab() {
  const { showToast } = useApp();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [openOrder, setOpenOrder] = useState<number | null>(null);

  // Custom request state
  const [reqName, setReqName] = useState("");
  const [reqPhone, setReqPhone] = useState("");
  const [reqType, setReqType] = useState("Ramo Flores Eternas");
  const [reqDesc, setReqDesc] = useState("");
  const [submittingReq, setSubmittingReq] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleSubmitCustomRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqName || !reqPhone || !reqDesc) return;

    setSubmittingReq(true);
    try {
      const res = await fetch("/api/custom-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: reqName,
          customerPhone: reqPhone,
          requestType: reqType,
          description: reqDesc,
        }),
      });

      const data = await res.json();
      if (data.success) {
        showToast("¡Solicitud enviada con éxito! Un asesor Auly te contactará.");
        setReqName("");
        setReqPhone("");
        setReqDesc("");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmittingReq(false);
    }
  };

  return (
    <div className="px-4 py-4 space-y-5">
      {/* User Profile VIP Card */}
      <div className="bg-gradient-to-r from-slate-900 via-pink-950 to-slate-900 text-white p-5 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="flex items-center space-x-3 relative z-10">
          <div className="w-12 h-12 rounded-full bg-[#e60067] flex items-center justify-center font-bold text-lg border-2 border-white shadow-md">
            A
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h2 className="text-base font-bold">Cliente VIP Auly</h2>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <p className="text-xs text-pink-200">auly.cliente@regalos.com</p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-xs text-pink-100">
          <div>
            <span className="text-[10px] text-pink-300 block uppercase font-semibold">Puntos de Regalo</span>
            <span className="text-sm font-extrabold text-amber-300">250 Puntos</span>
          </div>
          <div>
            <span className="text-[10px] text-pink-300 block uppercase font-semibold">Nivel</span>
            <span className="text-xs font-bold bg-pink-500/30 px-2.5 py-0.5 rounded-full border border-pink-400/30">
              Gold Member
            </span>
          </div>
        </div>
      </div>

      {/* Order History */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-1.5">
            <Package className="w-4 h-4 text-[#e60067]" />
            <span>Mis Pedidos & Rastreo</span>
          </h2>
          <button
            onClick={fetchOrders}
            className="text-xs font-bold text-[#e60067] hover:underline"
          >
            Actualizar
          </button>
        </div>

        {loadingOrders ? (
          <p className="text-xs text-slate-400">Cargando tus pedidos...</p>
        ) : orders.length === 0 ? (
          <div className="bg-pink-50/50 p-4 rounded-2xl border border-pink-100 text-center space-y-1">
            <p className="text-xs text-slate-600 font-semibold">Aún no has realizado pedidos registrados.</p>
            <p className="text-[11px] text-slate-400">Tus compras con dirección aparecerán aquí con su estado de entrega en tiempo real.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {orders.map((ord) => {
              const isOpen = openOrder === ord.id;
              return (
                <div
                  key={ord.id}
                  className="bg-white rounded-2xl border border-pink-100 shadow-2xs overflow-hidden"
                >
                  <div
                    onClick={() => setOpenOrder(isOpen ? null : ord.id)}
                    className="p-3 cursor-pointer flex items-center justify-between hover:bg-pink-50/40 transition-colors"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-[#e60067]">
                          {ord.orderNumber}
                        </span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {ord.status}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        {formatDate(ord.createdAt)} • {ord.items.length} ítems
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-extrabold text-slate-900">
                        {formatPrice(ord.total)}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Order Details Accordion */}
                  {isOpen && (
                    <div className="p-3 bg-pink-50/30 border-t border-pink-100 text-xs space-y-2">
                      <div className="space-y-1">
                        <span className="font-bold text-slate-800 block">Ítems del Pedido:</span>
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between text-slate-600">
                            <span>{it.name} (x{it.quantity})</span>
                            <span>{formatPrice(it.price * it.quantity)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-pink-100 text-[11px] text-slate-600 space-y-0.5">
                        <div><strong>Dirección de entrega:</strong> {ord.deliveryAddress}, {ord.city}</div>
                        <div><strong>Destinatario:</strong> {ord.recipientName || ord.customerName}</div>
                        {ord.cardMessage && (
                          <div><strong>Tarjeta:</strong> "{ord.cardMessage}"</div>
                        )}
                        <div><strong>Método de pago:</strong> {ord.paymentMethod}</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Custom Order Request Form */}
      <div className="bg-gradient-to-br from-pink-50 to-pink-100/60 p-4 rounded-3xl border border-pink-200 space-y-3">
        <div className="flex items-center space-x-2">
          <Gift className="w-5 h-5 text-[#e60067]" />
          <div>
            <h2 className="text-sm font-bold text-slate-900">Solicitud de Diseño Especial</h2>
            <p className="text-[11px] text-slate-500">¿Buscas una caja corporativa o diseño único?</p>
          </div>
        </div>

        <form onSubmit={handleSubmitCustomRequest} className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Tu Nombre"
              value={reqName}
              onChange={(e) => setReqName(e.target.value)}
              className="text-xs p-2.5 rounded-xl bg-white border border-pink-200 focus:ring-1 focus:ring-[#e60067]"
              required
            />
            <input
              type="tel"
              placeholder="Teléfono / WhatsApp"
              value={reqPhone}
              onChange={(e) => setReqPhone(e.target.value)}
              className="text-xs p-2.5 rounded-xl bg-white border border-pink-200 focus:ring-1 focus:ring-[#e60067]"
              required
            />
          </div>

          <select
            value={reqType}
            onChange={(e) => setReqType(e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl bg-white border border-pink-200"
          >
            <option value="Ramo Flores Eternas">Arreglo Especial de Flores Eternas</option>
            <option value="Bolso Personalizado">Bolso Tote con Grabado Personalizado</option>
            <option value="Combo Corporativo">Combo Corporativo de Regalo</option>
            <option value="Propuesta / Aniversario">Arreglo para Propuesta / Aniversario</option>
          </select>

          <textarea
            rows={2}
            placeholder="Describe los colores, flores o accesorios que te gustaría incluir..."
            value={reqDesc}
            onChange={(e) => setReqDesc(e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl bg-white border border-pink-200 focus:ring-1 focus:ring-[#e60067]"
            required
          />

          <button
            type="submit"
            disabled={submittingReq}
            className="w-full bg-[#e60067] hover:bg-[#c40057] text-white font-bold py-2.5 rounded-xl text-xs shadow-md"
          >
            {submittingReq ? "Enviando..." : "Enviar Solicitud a Auly"}
          </button>
        </form>
      </div>

      {/* Support Banner */}
      <div className="bg-slate-900 text-white p-4 rounded-3xl flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xs font-bold">¿Necesitas ayuda con tu pedido?</h3>
          <p className="text-[11px] text-slate-300">Te atendemos por WhatsApp en minutos.</p>
        </div>
        <a
          href="https://wa.me/573000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-full text-xs font-bold flex items-center space-x-1 shrink-0"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-white" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
