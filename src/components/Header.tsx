"use client";

import React from "react";
import { Crown, RotateCcw, Heart } from "@/components/Icons";

interface HeaderProps {
  onReplay: () => void;
}

export default function Header({ onReplay }: HeaderProps) {
  return (
    <header className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-2.5 sm:py-4 flex flex-row items-center justify-between gap-2 sm:gap-3 border-b border-rose-500/20 bg-slate-950/85 backdrop-blur-md sticky top-0 z-50">
      {/* Top Title: Happy Birthday Queen uh / With Love Smokiee / Always & Forever Love */}
      <div className="flex flex-col items-start justify-center gap-0.5 min-w-0">
        <h1 className="text-base min-[390px]:text-lg sm:text-2xl font-bold tracking-tight text-white flex items-center gap-1.5 sm:gap-2 font-serif truncate">
          <span>Happy Birthday Queen uh</span>
          <Crown className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)] shrink-0" />
          <span className="text-sm min-[390px]:text-base sm:text-lg animate-bounce select-none shrink-0">🙄🥴</span>
        </h1>
        <p className="text-[11px] min-[390px]:text-xs sm:text-sm italic font-serif text-rose-300/95 flex items-center gap-1 sm:gap-1.5 flex-wrap">
          <span>With Love, Smokiee</span>
          <span className="text-rose-400">•</span>
          <span className="text-amber-200/90 font-medium tracking-wide">Always &amp; Forever Love</span>
          <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-rose-500 text-rose-500 inline animate-pulse shrink-0" />
        </p>
      </div>

      {/* Control Tools (Replay Gift) */}
      <div className="flex items-center shrink-0">
        <button
          onClick={onReplay}
          className="px-2.5 min-[390px]:px-3.5 py-1 sm:py-1.5 rounded-full bg-slate-900 border border-rose-500/30 text-rose-200 hover:text-white hover:border-rose-400 text-[11px] sm:text-xs flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer font-medium shadow-sm active:scale-95 touch-manipulation"
          title="Replay gift from start"
        >
          <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
          <span>Replay</span>
        </button>
      </div>
    </header>
  );
}
