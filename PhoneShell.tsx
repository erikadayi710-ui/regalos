"use client";

import React from "react";
import { Wifi, Battery, Signal } from "lucide-react";

export function PhoneShell({
  children,
  isPhoneFrame,
}: {
  children: React.ReactNode;
  isPhoneFrame: boolean;
}) {
  if (!isPhoneFrame) {
    return <div className="min-h-screen bg-slate-50 text-slate-900">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-pink-100/50 py-4 sm:py-8 px-2 flex items-center justify-center font-sans">
      {/* Smartphone Enclosure */}
      <div className="relative w-full max-w-[410px] bg-white rounded-[44px] shadow-2xl phone-shadow border-[8px] border-slate-900 overflow-hidden flex flex-col min-h-[840px] max-h-[92vh]">
        {/* Top iOS Status Bar (Matching prompt picture: 9:41 status bar) */}
        <div className="bg-white/90 backdrop-blur-md px-6 pt-3 pb-1 flex items-center justify-between text-xs font-bold text-slate-900 select-none z-40 border-b border-pink-50">
          {/* Time */}
          <span>9:41</span>

          {/* Camera Notch Pill */}
          <div className="w-20 h-4 bg-slate-900 rounded-full flex items-center justify-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-slate-800" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#e60067] opacity-60" />
          </div>

          {/* Status Icons */}
          <div className="flex items-center space-x-1.5 text-slate-800">
            <Signal className="w-3.5 h-3.5 stroke-[2.5]" />
            <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
            <Battery className="w-4 h-4 stroke-[2]" />
          </div>
        </div>

        {/* Scrollable Phone Screen App Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col bg-white">
          {children}
        </div>

        {/* Home Indicator Bar at bottom of iPhone */}
        <div className="bg-white py-1 flex justify-center z-40">
          <div className="w-32 h-1 bg-slate-300 rounded-full" />
        </div>
      </div>
    </div>
  );
}
