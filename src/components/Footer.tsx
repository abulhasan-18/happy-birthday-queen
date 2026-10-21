"use client";

import React from "react";
import { Heart, Crown } from "@/components/Icons";

export default function Footer() {
  return (
    <footer className="w-full max-w-6xl mx-auto py-8 sm:py-10 flex flex-col items-center justify-center gap-2.5 text-center select-none border-t border-slate-900/80 mt-2">
      <div className="flex items-center justify-center gap-2">
        <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
        <p className="text-slate-300 text-lg sm:text-xl tracking-wide flex items-center gap-2">
          <span className="italic font-serif text-slate-300">With Love,</span>
          <span className="italic font-serif font-bold text-rose-400 drop-shadow-[0_0_15px_rgba(251,113,133,0.6)]">
            Smokiee
          </span>
          <Crown className="w-4 h-4 text-amber-400" />
        </p>
        <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
      </div>

      <p className="text-xs sm:text-sm text-amber-200/90 font-serif italic tracking-wider flex items-center justify-center gap-1.5">
        <span>Always &amp; Forever Love</span>
        <span className="text-rose-400 not-italic">💖✨</span>
      </p>
    </footer>
  );
}
