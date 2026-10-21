"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import PreviewWindow from "@/components/PreviewWindow";
import Footer from "@/components/Footer";
import FlipCard from "@/components/FlipCard";
import { Crown, Heart, Sparkles, RotateCcw } from "@/components/Icons";
import confetti from "canvas-confetti";

export default function DemoPage() {
  const [secondsLeft, setSecondsLeft] = useState<number>(10);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [currentScene, setCurrentScene] = useState<number>(1);

  // 10-second countdown: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0
  useEffect(() => {
    if (isUnlocked) return;

    if (secondsLeft <= 0) {
      setIsUnlocked(true);
      try {
        confetti({
          particleCount: 70,
          spread: 90,
          origin: { y: 0.6 },
          colors: ["#ff4d6d", "#ffd166", "#ffffff", "#ff758f"],
        });
      } catch {}
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft, isUnlocked]);

  const restartDemo = () => {
    setIsUnlocked(false);
    setSecondsLeft(10);
    setCurrentScene(1);
  };

  const handleReplay = () => {
    setCurrentScene(1);
  };

  return (
    <main className="relative min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col items-center justify-start overflow-x-hidden">
      {/* Ambient background lighting */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse"></div>
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" style={{ animationDelay: "2s" }}></div>

      {/* Main Header */}
      <Header onReplay={isUnlocked ? handleReplay : restartDemo} />

      {/* CONTENT AREA */}
      <div className="w-full flex-1 max-w-6xl px-3 sm:px-6 flex flex-col items-center justify-center my-4 sm:my-8">
        {!isUnlocked ? (
          /* 10-SECOND FLIP COUNTDOWN SCREEN */
          <div className="flex flex-col items-center justify-center p-6 sm:p-12 text-center max-w-2xl select-none animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-rose-500/30 shadow-[0_0_20px_rgba(255,77,109,0.2)] backdrop-blur-md mb-6">
              <Crown className="w-4 h-4 text-amber-400 animate-bounce" />
              <span className="font-serif font-bold text-xs sm:text-sm text-amber-300 tracking-wide">
                Demo Mode • 10-Second Flip Preview
              </span>
              <span className="text-sm">🙄🥴</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight leading-tight">
              <span>Opening Queen uhhh’s Gift in</span>
            </h1>

            {/* Big 10s Flip Counter */}
            <div className="mt-8 flex items-center justify-center">
              <FlipCard value={secondsLeft} label="Seconds" />
            </div>

            <p className="mt-6 text-sm italic font-serif text-rose-300/90 flex items-center justify-center gap-1.5">
              <span>With Love, Smokiee • Always &amp; Forever Love</span>
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500 inline animate-pulse" />
            </p>

            {/* Skip Button for Instant Opening */}
            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={() => {
                  setSecondsLeft(0);
                  setIsUnlocked(true);
                }}
                className="px-5 py-2 rounded-full bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/50 text-rose-200 text-xs sm:text-sm font-semibold transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                Open Gift Now ✨
              </button>
            </div>
          </div>
        ) : (
          /* UNLOCKED GIFT EXPERIENCE */
          <div className="w-full animate-fadeIn flex flex-col items-center">
            {/* Demo bar alert */}
            <div className="w-full flex items-center justify-between pb-3 text-xs text-slate-400">
              <span className="text-rose-400 font-semibold flex items-center gap-1">
                <span>🎉 Demo Unlocked!</span>
              </span>
              <button
                onClick={restartDemo}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors text-xs font-medium"
              >
                <RotateCcw className="w-3 h-3 text-amber-400" />
                <span>Restart 10s Demo</span>
              </button>
            </div>

            <PreviewWindow
              currentScene={currentScene}
              setCurrentScene={setCurrentScene}
              onReplay={handleReplay}
            />

            <Footer />
          </div>
        )}
      </div>
    </main>
  );
}
