"use client";

import React, { useState, useEffect } from "react";
import { Product, Review } from "@/lib/types";
import { formatPrice } from "@/lib/formatters";
import { useApp } from "@/context/AppContext";
import { X, Heart, Star, ShoppingBag, Gift, Truck, ShieldCheck, Sparkles, Send } from "lucide-react";

export function ProductDetailModal() {
  const {
    selectedProductModal,
    setSelectedProductModal,
    addToCart,
    isFavorite,
    toggleFavorite,
    showToast,
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Selected Customization Options
  const [selectedRibbon, setSelectedRibbon] = useState<string>("");
  const [selectedRoseColor, setSelectedRoseColor] = useState<string>("");
  const [selectedBagColor, setSelectedBagColor] = useState<string>("");
  const [cardNote, setCardNote] = useState<string>("");

  // Reviews State
  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    if (selectedProductModal) {
      setActiveImageIndex(0);
      setQuantity(1);

      // Default option choices
      const opts = selectedProductModal.customOptions;
      if (opts?.ribbonColors && opts.ribbonColors.length > 0) {
        setSelectedRibbon(opts.ribbonColors[0]);
      } else {
        setSelectedRibbon("");
      }

      if (opts?.roseColors && opts.roseColors.length > 0) {
        setSelectedRoseColor(opts.roseColors[0]);
      } else {
        setSelectedRoseColor("");
      }

      if (opts?.bagColors && opts.bagColors.length > 0) {
        setSelectedBagColor(opts.bagColors[0]);
      } else {
        setSelectedBagColor("");
      }

      setCardNote("");

      // Fetch product reviews
      fetchReviews(selectedProductModal.id);
    }
  }, [selectedProductModal]);

  const fetchReviews = async (productId: number) => {
    setLoadingReviews(true);
    try {
      const res = await fetch(`/api/products/${productId}`);
      const data = await res.json();
      if (data.success) {
        setReviewsList(data.reviews || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductModal || !newReviewName || !newReviewComment) return;

    setSubmittingReview(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedProductModal.id,
          userName: newReviewName,
          rating: newReviewRating,
          comment: newReviewComment,
        }),
      });

      const data = await res.json();
      if (data.success) {
        showToast("¡Gracias por tu opinión!");
        setNewReviewComment("");
        setNewReviewName("");
        fetchReviews(selectedProductModal.id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmittingReview(false);
    }
  };

  if (!selectedProductModal) return null;

  const product = selectedProductModal;
  const favorite = isFavorite(product.id);
  const opts = product.customOptions;

  const handleAddToCart = () => {
    addToCart(product, {
      ribbon: selectedRibbon,
      roseColor: selectedRoseColor,
      bagColor: selectedBagColor,
      note: cardNote,
      quantity,
    });
    setSelectedProductModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg max-h-[90vh] rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-pink-100 bg-pink-50/50 sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <span className="bg-[#e60067] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              {product.categoryName || "Auly"}
            </span>
            <span className="text-xs font-semibold text-slate-700 truncate max-w-[200px]">
              {product.name}
            </span>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => toggleFavorite(product.id)}
              className="p-2 rounded-full text-slate-600 hover:text-[#e60067] hover:bg-pink-100/60"
            >
              <Heart
                className={`w-5 h-5 ${
                  favorite ? "fill-[#e60067] text-[#e60067]" : ""
                }`}
              />
            </button>
            <button
              onClick={() => setSelectedProductModal(null)}
              className="p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-pink-100/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 space-y-5 no-scrollbar">
          {/* Main Image Gallery */}
          <div className="space-y-2">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-pink-50/50 border border-pink-100">
              <img
                src={
                  product.images[activeImageIndex] ||
                  "/images/hero-banner.jpg"
                }
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-1 no-scrollbar">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx
                        ? "border-[#e60067] scale-95"
                        : "border-pink-100 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Vista ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title, Rating & Price */}
          <div>
            <div className="flex items-center space-x-1 mb-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-slate-800">
                {product.rating}
              </span>
              <span className="text-xs text-slate-500">
                ({product.reviewCount} opiniones)
              </span>
            </div>

            <h2 className="text-lg font-extrabold text-slate-900 font-serif">
              {product.name}
            </h2>

            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-xl font-black text-[#e60067]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Customization Options */}
          {product.customizable && (
            <div className="bg-pink-50/60 p-3.5 rounded-2xl border border-pink-100 space-y-3">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-[#e60067]">
                <Sparkles className="w-4 h-4" />
                <span>Opciones de Personalización Auly</span>
              </div>

              {/* Ribbon Colors */}
              {opts?.ribbonColors && opts.ribbonColors.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-700 block">
                    Color del Lazo Satinado:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {opts.ribbonColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedRibbon(color)}
                        className={`text-xs px-3 py-1 rounded-full font-medium transition-all ${
                          selectedRibbon === color
                            ? "bg-[#e60067] text-white shadow-xs"
                            : "bg-white text-slate-700 border border-pink-200 hover:border-[#e60067]"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Rose Colors */}
              {opts?.roseColors && opts.roseColors.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-700 block">
                    Tono de las Rosas Eternas:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {opts.roseColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedRoseColor(color)}
                        className={`text-xs px-3 py-1 rounded-full font-medium transition-all ${
                          selectedRoseColor === color
                            ? "bg-[#e60067] text-white shadow-xs"
                            : "bg-white text-slate-700 border border-pink-200 hover:border-[#e60067]"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Bag Colors */}
              {opts?.bagColors && opts.bagColors.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-700 block">
                    Variante de Color del Bolso:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {opts.bagColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedBagColor(color)}
                        className={`text-xs px-3 py-1 rounded-full font-medium transition-all ${
                          selectedBagColor === color
                            ? "bg-[#e60067] text-white shadow-xs"
                            : "bg-white text-slate-700 border border-pink-200 hover:border-[#e60067]"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Dedication Card Note Input */}
              {opts?.allowCardNote !== false && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-700 flex items-center justify-between">
                    <span>Mensaje para la Tarjeta de Dedicatoria:</span>
                    <span className="text-[10px] text-pink-600 font-normal">Gratis</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Escribe tu dedicatoria especial aquí (ej: 'Con todo mi amor, feliz aniversario...')"
                    value={cardNote}
                    onChange={(e) => setCardNote(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-pink-200 bg-white focus:ring-2 focus:ring-[#e60067] focus:outline-none placeholder-slate-400"
                  />
                </div>
              )}
            </div>
          )}

          {/* Delivery perk tags */}
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <div className="flex items-center space-x-1.5">
              <Gift className="w-4 h-4 text-[#e60067]" />
              <span>Empaque de regalo premium</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Truck className="w-4 h-4 text-[#e60067]" />
              <span>Envíos locales el mismo día</span>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="pt-2 border-t border-pink-100 space-y-3">
            <h3 className="text-sm font-bold text-slate-900">
              Opiniones de Clientes
            </h3>

            {loadingReviews ? (
              <p className="text-xs text-slate-400">Cargando comentarios...</p>
            ) : reviewsList.length === 0 ? (
              <p className="text-xs text-slate-500 italic">
                Sé el primero en dejar una opinión sobre este producto.
              </p>
            ) : (
              <div className="space-y-2">
                {reviewsList.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-pink-50/40 p-2.5 rounded-xl text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">
                        {rev.userName}
                      </span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < rev.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600">{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Add Review Form */}
            <form onSubmit={handleAddReview} className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 space-y-2">
              <span className="text-xs font-bold text-slate-800 block">
                Escribir una opinión
              </span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={newReviewName}
                  onChange={(e) => setNewReviewName(e.target.value)}
                  className="text-xs p-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#e60067]"
                  required
                />
                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(Number(e.target.value))}
                  className="text-xs p-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#e60067]"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                  <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                  <option value={3}>⭐⭐⭐ (3/5)</option>
                </select>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Escribe tu comentario sobre el regalo o bolso..."
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  className="flex-1 text-xs p-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#e60067]"
                  required
                />
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="bg-[#e60067] hover:bg-[#c40057] text-white px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Modal Bottom Fixed Action Bar */}
        <div className="p-4 border-t border-pink-100 bg-white sticky bottom-0 z-10 flex items-center space-x-3">
          {/* Quantity selector */}
          <div className="flex items-center border border-pink-200 rounded-full bg-pink-50/50 p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-7 h-7 rounded-full bg-white text-slate-700 font-bold hover:bg-pink-100 text-sm flex items-center justify-center shadow-xs"
            >
              -
            </button>
            <span className="px-3 text-xs font-extrabold text-slate-800">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-7 h-7 rounded-full bg-white text-slate-700 font-bold hover:bg-pink-100 text-sm flex items-center justify-center shadow-xs"
            >
              +
            </button>
          </div>

          {/* Add to Cart button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-gradient-to-r from-[#e60067] to-[#ec4899] hover:from-[#c40057] hover:to-[#db2777] text-white font-bold py-3 px-4 rounded-full text-xs shadow-lg shadow-pink-500/20 flex items-center justify-center space-x-2 active:scale-95 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>
              Añadir al Carrito • {formatPrice(parseFloat(product.price) * quantity)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
