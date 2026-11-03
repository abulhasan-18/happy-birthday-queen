"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Year2Window from "@/components/year2/Year2Window";
import { Crown, Sparkles } from "@/components/Icons";

export default function Year2Page() {
  const [replayKey, setReplayKey] = useState<number>(0);

  const handleReplay = () => {
    setReplayKey((prev) => prev + 1);
  };

  return (
    <main className="relative min-h-screen w-full bg-[#02050f] text-slate-100 flex flex-col items-center justify-start overflow-x-hidden">
      {/* Ambient Cosmic Lighting */}
      <div className="fixed top-0 left-1/4 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
      <div
        className="fixed bottom-1/4 right-1/4 w-[450px] h-[450px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse"
        style={{ animationDelay: "2.5s" }}
      ></div>

      {/* Main Header */}
      <Header onReplay={handleReplay} />

      {/* Year 2 Preview Badge */}
      <div className="w-full max-w-6xl px-4 pt-3 flex items-center justify-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950/80 border border-amber-400/40 text-amber-200 text-xs shadow-[0_0_20px_rgba(251,191,36,0.2)]">
          <Crown className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
          <span className="font-serif font-bold tracking-wide">
            Chapter II Preview: The Royal Constellation &amp; Starlight Map
          </span>
          <span className="text-sm">🌌✨</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="w-full flex-1 max-w-6xl px-3 sm:px-6 flex flex-col items-center justify-center my-3 sm:my-6">
        <Year2Window key={replayKey} onReplay={handleReplay} />
        <Footer />
      </div>
    </main>
  );
}
