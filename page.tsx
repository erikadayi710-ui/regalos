"use client";

import React, { useState, useEffect } from "react";
import { AppProvider, useApp } from "@/context/AppContext";
import { Product, Category } from "@/lib/types";
import { TopDeviceSwitcher } from "@/components/TopDeviceSwitcher";
import { PhoneShell } from "@/components/PhoneShell";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { HeroBanner } from "@/components/HeroBanner";
import { CategoryCards } from "@/components/CategoryCards";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { CategoriesTab } from "@/components/tabs/CategoriesTab";
import { FavoritesTab } from "@/components/tabs/FavoritesTab";
import { ProfileTab } from "@/components/tabs/ProfileTab";
import { AdminTab } from "@/components/tabs/AdminTab";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { CustomizerModal } from "@/components/CustomizerModal";
import { DrawerMenu } from "@/components/DrawerMenu";
import { Toast } from "@/components/Toast";
import { Sparkles, Gift, Heart, ArrowRight, Star, ShieldCheck, Truck } from "lucide-react";

function MainAppContent() {
  const { activeTab, viewMode, setIsCustomizerOpen, setActiveTab } = useApp();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/categories"),
      ]);

      const prodData = await prodRes.json();
      const catData = await catRes.json();

      if (prodData.success) setProducts(prodData.products || []);
      if (catData.success) setCategories(catData.categories || []);
    } catch (e) {
      console.error("Error fetching data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-pink-200">
      <TopDeviceSwitcher />

      <PhoneShell isPhoneFrame={viewMode === "phone"}>
        <div className="flex flex-col flex-1 bg-white">
          <Header />

          {/* Main Body Views */}
          <main className="flex-1 pb-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-3">
                <div className="w-10 h-10 border-4 border-[#e60067] border-t-transparent rounded-full animate-spin" />
                <p className="text-xs font-bold text-[#e60067] animate-pulse">
                  Cargando productos de Auly...
                </p>
              </div>
            ) : (
              <>
                {/* INICIO TAB (Matching screenshot structure) */}
                {activeTab === "inicio" && (
                  <div className="animate-in fade-in duration-300">
                    <HeroBanner />
                    <CategoryCards />
                    <FeaturedProducts products={products} />

                    {/* Custom Gift Builder Callout Banner */}
                    <div className="mx-4 my-6 p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-pink-950 to-slate-900 text-white relative overflow-hidden shadow-lg">
                      <div className="relative z-10 space-y-2">
                        <span className="inline-flex items-center space-x-1 bg-[#e60067] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                          <Sparkles className="w-3 h-3" />
                          <span>Especial Auly</span>
                        </span>
                        <h3 className="text-base font-serif font-extrabold text-white">
                          ¿Quieres diseñar un regalo a tu medida?
                        </h3>
                        <p className="text-xs text-pink-200/90 leading-relaxed">
                          Combina rosas eternas, lazo satinado, chocolates y dedicatoria personalizada.
                        </p>
                        <button
                          onClick={() => setIsCustomizerOpen(true)}
                          className="mt-2 inline-flex items-center space-x-2 bg-white text-[#e60067] hover:bg-pink-50 px-4 py-2 rounded-full text-xs font-bold shadow-md transition-all active:scale-95"
                        >
                          <span>Diseñar mi paquete</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Trust badges */}
                    <div className="mx-4 mb-4 grid grid-cols-3 gap-2 text-center text-[10px] text-slate-600 bg-pink-50/60 p-3 rounded-2xl border border-pink-100">
                      <div>
                        <Truck className="w-4 h-4 text-[#e60067] mx-auto mb-1" />
                        <span className="font-bold">Envío Seguro</span>
                      </div>
                      <div>
                        <Gift className="w-4 h-4 text-[#e60067] mx-auto mb-1" />
                        <span className="font-bold">Empaque Lujo</span>
                      </div>
                      <div>
                        <ShieldCheck className="w-4 h-4 text-[#e60067] mx-auto mb-1" />
                        <span className="font-bold">Garantía Auly</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* CATEGORÍAS TAB */}
                {activeTab === "categorias" && (
                  <CategoriesTab products={products} categories={categories} />
                )}

                {/* FAVORITOS TAB */}
                {activeTab === "favoritos" && (
                  <FavoritesTab products={products} />
                )}

                {/* PERFIL TAB */}
                {activeTab === "perfil" && <ProfileTab />}

                {/* ADMIN TAB */}
                {activeTab === "admin" && (
                  <AdminTab products={products} onRefresh={fetchData} />
                )}
              </>
            )}
          </main>

          <BottomNav />
        </div>
      </PhoneShell>

      {/* Global Modals */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <CustomizerModal />
      <DrawerMenu />
      <Toast />
    </div>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
