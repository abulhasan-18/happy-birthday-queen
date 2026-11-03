"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import EnvelopeSurprise from "@/components/EnvelopeSurprise";
import Footer from "@/components/Footer";
import BirthdayCountdown, { checkIsNov2InIST } from "@/components/BirthdayCountdown";

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [replayKey, setReplayKey] = useState<number>(0);

  useEffect(() => {
    setMounted(true);
    // Unlocked strictly on November 2 in IST (+05:30) or with ?preview=true
    const now = new Date().getTime();
    const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    const isPreview = params?.get("preview") === "true";

    if (checkIsNov2InIST(now) || isPreview) {
      setIsUnlocked(true);
    }
  }, []);

  const handleReplay = () => {
    setReplayKey((prev) => prev + 1);
  };

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  if (!mounted) {
    return null;
  }

  return (
    <main
      className="relative min-h-screen w-full bg-[#FAF6EE] text-stone-800 flex flex-col items-center justify-start overflow-x-hidden"
      style={{
        backgroundImage: "radial-gradient(#d3c7b5 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Soft warm ambient lighting matching envelope palette */}
      <div className="fixed top-0 left-1/4 w-[420px] h-[420px] bg-amber-200/25 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse"></div>
      <div
        className="fixed bottom-1/4 right-1/4 w-[420px] h-[420px] bg-rose-200/25 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Main Header (Only shown after gift unlocks) */}
      {isUnlocked && <Header onReplay={handleReplay} />}

      {/* Main Content Area */}
      <div className="w-full flex-1 max-w-4xl px-3 sm:px-6 flex flex-col items-center justify-center my-3 sm:my-6">
        {!isUnlocked ? (
          /* BEFORE NOV 2 IST: COUNTDOWN FLIPS EVERY SECOND */
          <div className="w-full flex flex-col items-center justify-center py-6 sm:py-12">
            <BirthdayCountdown onUnlock={handleUnlock} />
          </div>
        ) : (
          /* UNLOCKED ON NOV 2: VIRAL ENVELOPE SURPRISE GIFT */
          <div className="w-full flex flex-col items-center animate-fadeIn">
            <EnvelopeSurprise key={replayKey} />
            <Footer />
          </div>
        )}
      </div>
    </main>
  );
}
