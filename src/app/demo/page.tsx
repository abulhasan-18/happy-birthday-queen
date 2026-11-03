"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnvelopeSurprise from "@/components/EnvelopeSurprise";
import { Crown, RotateCcw } from "@/components/Icons";

export default function DemoPage() {
  const [replayKey, setReplayKey] = useState<number>(0);

  const handleReplay = () => {
    setReplayKey((prev) => prev + 1);
  };

  return (
    <main className="relative min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col items-center justify-start overflow-x-hidden">
      {/* Ambient background lighting */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse"></div>
      <div
        className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Main Header */}
      <Header onReplay={handleReplay} />

      {/* Demo Pill Notice */}
      <div className="w-full max-w-4xl px-4 pt-3 flex items-center justify-between text-xs text-slate-400">
        <span className="inline-flex items-center gap-1.5 text-rose-300 font-medium">
          <Crown className="w-3.5 h-3.5 text-amber-400" />
          <span>Demo Mode • Birthday Surprise Preview</span>
          <span className="text-xs">🙄🥴</span>
        </span>
        <button
          onClick={handleReplay}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors text-xs font-medium cursor-pointer active:scale-95"
        >
          <RotateCcw className="w-3 h-3 text-amber-400" />
          <span>Reset Surprise</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="w-full flex-1 max-w-4xl px-3 sm:px-6 flex flex-col items-center justify-center my-3 sm:my-6">
        <div className="w-full flex flex-col items-center animate-fadeIn">
          <EnvelopeSurprise key={replayKey} />
          <Footer />
        </div>
      </div>
    </main>
  );
}
