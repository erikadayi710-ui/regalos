"use client";

import React from "react";

export function AulyLogo({ className = "h-9" }: { className?: string }) {
  return (
    <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
      {/* Rose icon emblem */}
      <div className="flex items-center space-x-1">
        <svg
          className="w-5 h-5 text-[#e60067] animate-pulse-subtle"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2C9.5 2 7.5 4 7.5 6.5C7.5 7.8 8.1 8.9 9 9.7C6.6 10.3 4.8 12.5 4.8 15.1C4.8 18.4 7.5 21 10.8 21C11.2 21 11.6 20.9 12 20.8C12.4 20.9 12.8 21 13.2 21C16.5 21 19.2 18.4 19.2 15.1C19.2 12.5 17.4 10.3 15 9.7C15.9 8.9 16.5 7.8 16.5 6.5C16.5 4 14.5 2 12 2ZM12 4C13.4 4 14.5 5.1 14.5 6.5C14.5 7.9 13.4 9 12 9C10.6 9 9.5 7.9 9.5 6.5C9.5 5.1 10.6 4 12 4ZM10.8 19C8.6 19 6.8 17.3 6.8 15.1C6.8 13.2 8.1 11.6 9.9 11.2C10.6 11.9 11.3 12.3 12 12.3C12.7 12.3 13.4 11.9 14.1 11.2C15.9 11.6 17.2 13.2 17.2 15.1C17.2 17.3 15.4 19 13.2 19C12.8 19 12.4 18.9 12 18.8C11.6 18.9 11.2 19 10.8 19Z" />
        </svg>
      </div>
      {/* Script Typography */}
      <span className="font-serif tracking-tight text-2xl font-bold bg-gradient-to-r from-[#e60067] via-[#ec4899] to-[#be185d] bg-clip-text text-transparent italic drop-shadow-sm">
        Auly
      </span>
      <span className="text-[9px] tracking-[0.25em] text-[#be185d] uppercase font-semibold -mt-1 opacity-90">
        Regalos & Bolsos
      </span>
    </div>
  );
}
