"use client";

import React from "react";
import { Heart, Crown } from "@/components/Icons";

export default function Footer() {
  return (
    <footer className="w-full max-w-6xl mx-auto py-8 sm:py-10 flex flex-col items-center justify-center gap-2 text-center select-none border-t border-[#E8DEC8] mt-4">
      <div className="flex items-center justify-center gap-2">
        <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
        <p className="text-stone-700 text-lg sm:text-xl tracking-wide flex items-center gap-2">
          <span className="italic font-serif text-stone-600">With Love,</span>
          <span className="italic font-serif font-bold text-rose-600 drop-shadow-2xs">
            Smokiee
          </span>
          <Crown className="w-4 h-4 text-amber-500" />
        </p>
        <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
      </div>

      <p className="text-xs sm:text-sm text-stone-500 font-serif italic tracking-wider flex items-center justify-center gap-1.5">
        <span>Always &amp; Forever Love</span>
        <span className="text-rose-500 not-italic">💖✨</span>
      </p>
    </footer>
  );
}
