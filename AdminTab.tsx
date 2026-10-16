"use client";

import React, { useState, useEffect } from "react";
import { Product, Order } from "@/lib/types";
import { formatPrice } from "@/lib/formatters";
import { useApp } from "@/context/AppContext";
import {
  ShieldCheck,
  Plus,
  Package,
  ShoppingBag,
  TrendingUp,
  DollarSign,
  Star,
  Check,
  Sparkles,
  RefreshCw,
  X,
} from "lucide-react";

export function AdminTab({
  products: initialProducts,
  onRefresh,
}: {
  products: Product[];
  onRefresh: () => void;
}) {
  const { showToast } = useApp();
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // New product form modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newOriginalPrice, setNewPriceOriginal] = useState("");
  const [newCategory, setNewCategory] = useState("1"); // Flores Eternas or Regalos
  const [newDesc, setNewDesc] = useState("");
  const [newImage, setNewImage] = useState("/images/hero-banner.jpg");
  const [newIsFeatured, setNewIsFeatured] = useState(true);
  const [submittingProduct, setSubmittingProduct] = useState(false);

  useEffect(() => {
    setProductList(initialProducts);
    fetchAdminOrders();
  }, [initialProducts]);

  const fetchAdminOrders = async () => {
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

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPrice || !newDesc) return;

    setSubmittingProduct(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          categoryId: parseInt(newCategory),
          price: parseFloat(newPrice),
          originalPrice: newOriginalPrice ? parseFloat(newOriginalPrice) : null,
          description: newDesc,
          images: [newImage],
          isFeatured: newIsFeatured,
          isBestseller: false,
          customizable: true,
          customOptions: {
            ribbonColors: ["Rosa Fucsia", "Rojo", "Dorado"],
            allowCardNote: true,
          },
        }),
      });

      const data = await res.json();
      if (data.success) {
        showToast("¡Nuevo producto creado exitosamente!");
        setIsAddModalOpen(false);
        setNewName("");
        setNewPrice("");
        setNewDesc("");
        onRefresh();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmittingProduct(false);
    }
  };

  const totalSalesRevenue = orders.reduce(
    (sum, o) => sum + parseFloat(o.total || "0"),
    0
  );

  return (
    <div className="px-4 py-4 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-full bg-slate-900 text-pink-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold font-serif text-slate-900">
              Panel de Control Auly
            </h1>
            <p className="text-xs text-slate-500">
              Gestión de catálogo, inventario y pedidos de clientes
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#e60067] hover:bg-[#c40057] text-white text-xs font-bold px-3 py-2 rounded-full flex items-center space-x-1 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Añadir Producto</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-pink-50/80 p-3 rounded-2xl border border-pink-100">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Productos</div>
          <div className="text-lg font-black text-slate-900">{productList.length}</div>
        </div>
        <div className="bg-emerald-50/80 p-3 rounded-2xl border border-emerald-100">
          <div className="text-[10px] text-emerald-700 uppercase font-semibold">Pedidos</div>
          <div className="text-lg font-black text-emerald-900">{orders.length}</div>
        </div>
        <div className="bg-slate-900 text-white p-3 rounded-2xl">
          <div className="text-[10px] text-pink-300 uppercase font-semibold">Ventas Totales</div>
          <div className="text-xs font-bold text-pink-200 mt-1">{formatPrice(totalSalesRevenue)}</div>
        </div>
      </div>

      {/* Inventory Product List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">Inventario de Productos</h2>
          <button onClick={onRefresh} className="text-xs text-[#e60067] font-bold flex items-center space-x-1">
            <RefreshCw className="w-3 h-3" />
            <span>Recargar</span>
          </button>
        </div>

        <div className="space-y-2">
          {productList.map((prod) => (
            <div
              key={prod.id}
              className="bg-white p-3 rounded-2xl border border-pink-100 flex items-center justify-between shadow-2xs"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={prod.images[0] || "/images/hero-banner.jpg"}
                  alt={prod.name}
                  className="w-12 h-12 rounded-xl object-cover border border-pink-100"
                />
                <div>
                  <h3 className="text-xs font-bold text-slate-800 line-clamp-1">{prod.name}</h3>
                  <div className="flex items-center space-x-2 text-[11px] mt-0.5">
                    <span className="font-extrabold text-[#e60067]">{formatPrice(prod.price)}</span>
                    <span className="text-slate-400">• Stock: {prod.stock}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                {prod.isFeatured && (
                  <span className="text-[9px] bg-pink-100 text-pink-800 font-bold px-2 py-0.5 rounded-full">
                    Destacado
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-pink-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Añadir Nuevo Producto a Auly</h3>
              <button onClick={() => setIsAddModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block">Nombre del Producto *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Ramo de 24 Rosas Eternas Blancas"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-pink-200 mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block">Precio ($ COP) *</label>
                  <input
                    type="number"
                    required
                    placeholder="65000"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-pink-200 mt-1"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block">Categoría *</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-pink-200 mt-1"
                  >
                    <option value="1">Regalos</option>
                    <option value="2">Flores Eternas</option>
                    <option value="3">Bolsos y Accesorios</option>
                    <option value="4">Personalizados</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block">URL Imagen *</label>
                <input
                  type="text"
                  required
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-pink-200 mt-1"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block">Descripción *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Descripción detallada del regalo o bolso..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-pink-200 mt-1"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={newIsFeatured}
                  onChange={(e) => setNewIsFeatured(e.target.checked)}
                  className="rounded text-[#e60067]"
                />
                <label htmlFor="featured" className="font-semibold text-slate-700">
                  Marcar como Producto Destacado en Inicio
                </label>
              </div>

              <button
                type="submit"
                disabled={submittingProduct}
                className="w-full bg-[#e60067] hover:bg-[#c40057] text-white font-bold py-3 rounded-xl shadow-md"
              >
                {submittingProduct ? "Guardando..." : "Guardar Producto"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
