"use client";

import React, { useState, useEffect } from "react";
import { soundFX } from "@/lib/sound";
import { Crown, Sparkles, ArrowRight, Heart } from "@/components/Icons";

interface Scene2Props {
  onComplete: () => void;
  autoProceed?: boolean;
}

export default function Scene2Reveal({ onComplete, autoProceed = true }: Scene2Props) {
  const line1Text = "Happy Birthday";
  const line2Text = "Queen uhhh";

  const [displayedLine1, setDisplayedLine1] = useState("");
  const [displayedLine2, setDisplayedLine2] = useState("");
  const [crownLanded, setCrownLanded] = useState(false);
  const [canProceed, setCanProceed] = useState(false);

  // Typewriter effect
  useEffect(() => {
    let index1 = 0;
    let index2 = 0;

    const timer1 = setInterval(() => {
      if (index1 < line1Text.length) {
        setDisplayedLine1(line1Text.slice(0, index1 + 1));
        soundFX.playLetter();
        index1++;
      } else {
        clearInterval(timer1);

        // Start typing line 2 after short pause
        setTimeout(() => {
          const timer2 = setInterval(() => {
            if (index2 < line2Text.length) {
              setDisplayedLine2(line2Text.slice(0, index2 + 1));
              soundFX.playLetter();
              index2++;
            } else {
              clearInterval(timer2);
              setCrownLanded(true);
              setCanProceed(true);
              soundFX.playHit();

              // Auto advance to Scene 3
              if (autoProceed) {
                setTimeout(() => {
                  onComplete();
                }, 3200);
              }
            }
          }, 90);
        }, 350);
      }
    }, 110);

    return () => {
      clearInterval(timer1);
    };
  }, [autoProceed, line1Text, line2Text, onComplete]);

  return (
    <div className="relative w-full h-full min-h-[420px] sm:min-h-[480px] md:min-h-[520px] bg-[#ff4d6d] overflow-hidden flex flex-col items-center justify-center p-4 sm:p-10 select-none touch-manipulation animate-slideIn">
      {/* Subtle background ambient floating hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white/50 animate-floating-heart"
            style={{
              left: `${(i * 13) % 94}%`,
              bottom: "-20px",
              fontSize: `${14 + (i % 5) * 8}px`,
              animationDelay: `${(i * 0.45) % 3.5}s`,
              animationDuration: `${3.5 + (i % 3)}s`,
            }}
          >
            ❤
          </div>
        ))}
      </div>

      {/* Main Animated Text Box */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl space-y-2.5 sm:space-y-5 px-2">
        {/* Crown Accent */}
        <div
          className={`transition-all duration-700 transform ${
            crownLanded
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-50 -translate-y-8"
          }`}
        >
          <div className="relative inline-flex items-center justify-center p-2.5 sm:p-3 rounded-full bg-white/20 backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.4)] border border-white/40">
            <Crown className="w-7 h-7 sm:w-10 sm:h-10 text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.9)] animate-pulse" />
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white absolute -top-1 -right-1 animate-spin" />
          </div>
        </div>

        {/* Letter-by-letter: "Happy Birthday" */}
        <h1 className="text-3xl min-[380px]:text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.25)] min-h-[40px] sm:min-h-[72px]">
          {displayedLine1}
          {displayedLine1.length < line1Text.length && (
            <span className="inline-block w-1 h-7 sm:h-14 bg-white/80 ml-1 animate-pulse align-middle" />
          )}
        </h1>

        {/* Cursive Subtitle: "Queen uhhh" */}
        <div className="min-h-[38px] sm:min-h-[64px] flex items-center justify-center">
          <p className="font-cursive text-3xl min-[380px]:text-4xl sm:text-5xl md:text-6xl text-amber-200 drop-shadow-[0_2px_12px_rgba(255,215,0,0.5)] font-bold">
            {displayedLine2}
            {displayedLine1.length >= line1Text.length &&
              displayedLine2.length < line2Text.length && (
                <span className="inline-block w-1 h-6 sm:h-10 bg-amber-200 ml-1 animate-pulse align-middle" />
              )}
          </p>
        </div>

        {/* Sweet Royal Note */}
        {crownLanded && (
          <p className="text-white/90 text-xs sm:text-base font-light tracking-wider max-w-md pt-1 sm:pt-2 animate-fadeIn">
            ✨ To the most extraordinary Queen who lights up every room ✨
          </p>
        )}

        {/* Manual Continue Button */}
        {canProceed && (
          <div className="pt-3 sm:pt-4 animate-fadeIn">
            <button
              onClick={onComplete}
              className="group inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white text-rose-600 font-semibold text-xs sm:text-base shadow-lg hover:shadow-white/30 hover:bg-rose-50 transition-all transform hover:scale-105 active:scale-95 cursor-pointer touch-manipulation"
            >
              <span>Bloom Your Love Tree</span>
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 fill-rose-500 group-hover:scale-110 transition-transform" />
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
