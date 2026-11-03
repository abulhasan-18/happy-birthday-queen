"use client";

import React, { useState, useEffect } from "react";
import { soundFX } from "@/lib/sound";
import { Crown, Sparkles, Heart, ArrowRight } from "@/components/Icons";

interface Act3Props {
  onComplete: () => void;
}

interface CelestialMoon {
  id: string;
  emoji: string;
  title: string;
  quote: string;
  color: string;
  angle: number; // degrees
  radius: number; // orbital radius
}

export default function Act3Supernova({ onComplete }: Act3Props) {
  const [selectedMoon, setSelectedMoon] = useState<CelestialMoon | null>(null);
  const [supernovaFlash, setSupernovaFlash] = useState<boolean>(true);
  const [autoAdvanceCountdown, setAutoAdvanceCountdown] = useState<number | null>(null);

  const moons: CelestialMoon[] = [
    {
      id: "decree",
      emoji: "👑",
      title: "Royal Decree",
      quote: "Her Majesty Queen uhhh holds lifetime royal immunity, unlimited pampering, and infinite adoration.",
      color: "#fbbf24",
      angle: 45,
      radius: 38,
    },
    {
      id: "eyeroll",
      emoji: "🙄",
      title: "The Iconic Eye-Roll",
      quote: "World’s cutest reaction to Smokiee’s teasing. A royal trademark registered in the stars.",
      color: "#f43f5e",
      angle: 135,
      radius: 40,
    },
    {
      id: "laugh",
      emoji: "🥴",
      title: "The Sweet Smirk",
      quote: "The legendary smile and laugh that completely melts Smokiee’s heart every single time.",
      color: "#fb923c",
      angle: 225,
      radius: 38,
    },
    {
      id: "promise",
      emoji: "💖",
      title: "Always & Forever Love",
      quote: "From Smokiee to Queen uhhh: Across every galaxy, timeline, and universe, you will always be my Queen.",
      color: "#ec4899",
      angle: 315,
      radius: 40,
    },
  ];

  useEffect(() => {
    soundFX.playSupernova();
    const flashTimer = setTimeout(() => {
      setSupernovaFlash(false);
    }, 800);

    return () => clearTimeout(flashTimer);
  }, []);

  const handleMoonTap = (moon: CelestialMoon) => {
    setSelectedMoon(moon);
    soundFX.playStarlightNote(4);
  };

  return (
    <div className="relative w-full h-full min-h-[460px] sm:min-h-[520px] md:min-h-[580px] bg-gradient-to-b from-[#030712] via-[#090d16] to-[#04060d] select-none touch-manipulation overflow-hidden flex flex-col justify-between p-4 sm:p-6 animate-fadeIn">
      {/* Supernova initial flash aura */}
      {supernovaFlash && (
        <div className="absolute inset-0 bg-amber-100/30 backdrop-blur-md pointer-events-none z-30 animate-ping"></div>
      )}

      {/* TOP HEADER */}
      <div className="z-10 text-center space-y-1 pt-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 backdrop-blur-md shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          <span className="text-[11px] sm:text-xs font-serif uppercase tracking-widest text-indigo-200">
            Act III • The Royal Orbit
          </span>
          <span className="text-xs">🪐</span>
        </div>
        <h2 className="text-lg sm:text-2xl font-serif font-bold text-white tracking-wide">
          Her Majesty’s Orbiting Universe
        </h2>
        <p className="text-xs sm:text-sm font-light text-indigo-200/80 max-w-sm mx-auto">
          Tap any planetary moon in orbit to reveal Queen uhhh’s celestial tributes
        </p>
      </div>

      {/* CENTER: ORBITAL SYSTEM WITH CORE & 4 PLANETARY MOONS */}
      <div className="relative z-10 flex-1 w-full max-w-lg mx-auto flex items-center justify-center my-3">
        {/* Orbital Track Rings */}
        <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-indigo-500/20 pointer-events-none animate-spin-slow"></div>
        <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-amber-400/20 border-dashed pointer-events-none"></div>

        {/* GLOWING CENTER CORE: "Happy Birthday Queen uhhh" */}
        <div className="relative flex flex-col items-center justify-center text-center p-5 rounded-full bg-slate-950/80 border border-amber-400/40 shadow-[0_0_50px_rgba(251,191,36,0.3)] z-10">
          <Crown className="w-7 h-7 sm:w-9 sm:h-9 text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.8)] animate-bounce mb-1" />
          <h1 className="font-serif text-lg sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-rose-200 tracking-wide drop-shadow-sm leading-tight">
            Happy Birthday
          </h1>
          <p className="font-serif text-base sm:text-xl font-bold text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]">
            Queen uhhh
          </p>
          <p className="text-[10px] sm:text-xs text-rose-300/90 font-serif italic mt-0.5">
            Always &amp; Forever Love ❤️
          </p>
        </div>

        {/* 4 ORBITING PLANETARY MOONS */}
        {moons.map((moon) => {
          // Calculate orbital positions based on angle
          const rad = (moon.angle * Math.PI) / 180;
          const leftPercent = 50 + moon.radius * Math.cos(rad);
          const topPercent = 50 + moon.radius * Math.sin(rad);

          return (
            <button
              key={moon.id}
              onClick={() => handleMoonTap(moon)}
              style={{
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20 active:scale-90 transition-transform"
              title={moon.title}
            >
              {/* Moon Glowing Disc */}
              <div
                className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-950 border-2 flex items-center justify-center shadow-lg transition-all group-hover:scale-115 group-active:scale-95"
                style={{
                  borderColor: moon.color,
                  boxShadow: `0 0 20px ${moon.color}60`,
                }}
              >
                <span className="text-lg sm:text-xl select-none group-hover:rotate-12 transition-transform">
                  {moon.emoji}
                </span>
              </div>

              {/* Mini Label Pill */}
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] sm:text-[10px] font-medium text-slate-300 whitespace-nowrap bg-slate-900/90 px-2 py-0.5 rounded-full border border-slate-700/80 shadow-xs pointer-events-none">
                {moon.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* SELECTED MOON POPUP CARD */}
      {selectedMoon && (
        <div className="z-20 w-full max-w-md mx-auto mb-2 p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-amber-400/40 shadow-[0_4px_25px_rgba(251,191,36,0.25)] animate-fadeIn text-center">
          <div className="flex items-center justify-center gap-1.5 text-sm sm:text-base font-bold text-amber-300">
            <span>{selectedMoon.emoji}</span>
            <span>{selectedMoon.title}</span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-200 font-serif italic leading-relaxed">
            &ldquo;{selectedMoon.quote}&rdquo;
          </p>
        </div>
      )}

      {/* BOTTOM CONTROLS: Proceed to Act 4 */}
      <div className="z-10 flex flex-col items-center justify-center gap-2 pb-2">
        <button
          onClick={onComplete}
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-rose-400 to-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-[0_0_25px_rgba(251,191,36,0.5)] hover:shadow-amber-400/70 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>Ascend to the Galaxy Balcony</span>
          <span className="text-sm">🏮</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
