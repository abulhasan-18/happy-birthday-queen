"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import PreviewWindow from "@/components/PreviewWindow";
import Footer from "@/components/Footer";
import BirthdayCountdown, { getNov2ISTTarget } from "@/components/BirthdayCountdown";

export default function Home() {
  const [currentScene, setCurrentScene] = useState<number>(1);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    // Check if Nov 2 00:00:00 IST has arrived
    const target = getNov2ISTTarget();
    const now = new Date().getTime();

    // Check if URL has ?preview=true or if target time has already arrived
    const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    const isPreview = params?.get("preview") === "true";

    if (now >= target || isPreview) {
      setIsUnlocked(true);
    }
  }, []);

  const handleReplay = () => {
    setCurrentScene(1);
  };

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  if (!mounted) {
    return null;
  }

  return (
    <main className="relative min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col items-center justify-start overflow-x-hidden">
      {/* Ambient background lighting */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse"></div>
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" style={{ animationDelay: "2s" }}></div>

      {/* Main Header (Only shown after gift unlocks) */}
      {isUnlocked && <Header onReplay={handleReplay} />}

      {/* Main Content Area */}
      <div className="w-full flex-1 max-w-6xl px-3 sm:px-6 flex flex-col items-center justify-center my-3 sm:my-6">
        {!isUnlocked ? (
          /* BEFORE NOV 2 IST: COUNTDOWN FLIPS EVERY SECOND */
          <div className="w-full flex flex-col items-center justify-center py-6 sm:py-12">
            <BirthdayCountdown onUnlock={handleUnlock} />
          </div>
        ) : (
          /* UNLOCKED: FULL INTERACTIVE BIRTHDAY GIFT */
          <div className="w-full flex flex-col items-center animate-fadeIn">
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
