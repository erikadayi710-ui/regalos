"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { Sparkles } from "lucide-react";

export function Toast() {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-xl backdrop-blur-md border border-slate-700/80 flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
      <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
      <span>{toastMessage}</span>
    </div>
  );
}
