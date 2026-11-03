"use client";

import React, { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { soundFX } from "@/lib/sound";
import { Crown, Sparkles, Heart, RotateCcw } from "@/components/Icons";

interface Act4Props {
  onReplay: () => void;
}

interface FloatingLantern {
  id: number;
  x: number; // percentage (0 - 100)
  size: number;
  speed: number;
  opacity: number;
  emoji?: "🙄" | "🥴" | null;
}

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
}

export default function Act4CelestialLanterns({ onReplay }: Act4Props) {
  const [lanterns, setLanterns] = useState<FloatingLantern[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [wishesCount, setWishesCount] = useState<number>(0);

  // Initial lanterns & continuous music
  useEffect(() => {
    soundFX.startMusic();

    // Spawn initial floating lanterns
    const initialList: FloatingLantern[] = [];
    for (let i = 0; i < 9; i++) {
      initialList.push({
        id: Date.now() + i,
        x: 10 + i * 9 + (Math.random() - 0.5) * 6,
        size: 26 + Math.random() * 14,
        speed: 8 + Math.random() * 4,
        opacity: 0.8 + Math.random() * 0.2,
        emoji: i % 4 === 1 ? "🙄" : i % 4 === 3 ? "🥴" : null,
      });
    }
    setLanterns(initialList);

    // Initial celebratory confetti
    triggerGoldenStardust();

    // Automatic periodic confetti every 3.5 seconds
    const interval = setInterval(() => {
      triggerGoldenStardust();
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const triggerGoldenStardust = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 85,
        origin: { y: 0.6 },
        colors: ["#ffd166", "#f59e0b", "#fbbf24", "#ffffff", "#f43f5e"],
        shapes: ["circle"],
        scalar: 1.15,
      });
    } catch {}
  };

  // Launch a new sky lantern
  const releaseSkyLantern = useCallback(
    (emojiChoice: "🙄" | "🥴" | null = null) => {
      soundFX.playShootingStar();
      setWishesCount((prev) => prev + 1);

      const newLantern: FloatingLantern = {
        id: Date.now() + Math.random(),
        x: 15 + Math.random() * 70,
        size: emojiChoice ? 32 : 28 + Math.random() * 12,
        speed: 7 + Math.random() * 3,
        opacity: 0.95,
        emoji: emojiChoice,
      };

      setLanterns((prev) => [...prev.slice(-25), newLantern]);
    },
    []
  );

  // Shoot a meteor across the sky
  const shootMeteor = () => {
    soundFX.playShootingStar();
    const newStar: ShootingStar = {
      id: Date.now() + Math.random(),
      startX: 10 + Math.random() * 60,
      startY: 5 + Math.random() * 25,
    };
    setShootingStars((prev) => [...prev, newStar]);

    setTimeout(() => {
      setShootingStars((prev) => prev.filter((s) => s.id !== newStar.id));
    }, 1200);
  };

  // Screen tap releases lantern or star
  const handleScreenTap = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    releaseSkyLantern(Math.random() > 0.65 ? (Math.random() > 0.5 ? "🙄" : "🥴") : null);
  };

  return (
    <div
      onClick={handleScreenTap}
      className="relative w-full h-full min-h-[480px] sm:min-h-[540px] md:min-h-[600px] bg-gradient-to-b from-[#02050e] via-[#080d1e] to-[#04060d] select-none touch-manipulation overflow-hidden flex flex-col justify-between p-4 sm:p-6 md:p-8 cursor-pointer"
    >
      {/* Background drifting celestial stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${(i * 13) % 96}%`,
              top: `${(i * 19) % 92}%`,
              width: `${(i % 3) + 1.2}px`,
              height: `${(i % 3) + 1.2}px`,
              animationDelay: `${(i * 0.25) % 3}s`,
              animationDuration: `${2.5 + (i % 2)}s`,
            }}
          />
        ))}
      </div>

      {/* SHOOTING METEORS */}
      {shootingStars.map((star) => (
        <div
          key={star.id}
          className="absolute w-28 h-[2px] bg-gradient-to-r from-transparent via-amber-200 to-white rotate-[-35deg] pointer-events-none animate-meteor"
          style={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
          }}
        />
      ))}

      {/* FLOATING CELESTIAL SKY LANTERNS RISING TO HEAVENS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {lanterns.map((l) => (
          <div
            key={l.id}
            className="absolute flex flex-col items-center animate-lantern-rise select-none"
            style={{
              left: `${l.x}%`,
              bottom: "-40px",
              animationDuration: `${l.speed}s`,
              opacity: l.opacity,
            }}
          >
            {l.emoji ? (
              /* Signature Emoji Charm inside lantern aura */
              <div className="relative flex items-center justify-center p-2 rounded-full bg-amber-400/20 backdrop-blur-xs border border-amber-300/40 shadow-[0_0_20px_rgba(251,191,36,0.6)]">
                <span className="text-xl sm:text-2xl animate-bounce">{l.emoji}</span>
              </div>
            ) : (
              /* Glowing Gold Paper Sky Lantern */
              <div
                className="relative rounded-t-lg rounded-b-md bg-gradient-to-b from-amber-300 via-amber-400 to-rose-500 shadow-[0_0_25px_rgba(251,191,36,0.8)] border border-amber-200/80 flex items-center justify-center"
                style={{
                  width: `${l.size}px`,
                  height: `${l.size * 1.3}px`,
                }}
              >
                {/* Inner Candle Flame */}
                <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white] animate-ping"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* TOP HEADER: Act IV Brief */}
      <div className="relative z-10 text-center space-y-1 pt-1 animate-fadeIn">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 backdrop-blur-md shadow-sm">
          <Crown className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
          <span className="text-[11px] sm:text-xs font-serif uppercase tracking-widest text-indigo-200">
            Act IV • The Infinite Galaxy Tribute
          </span>
          <span className="text-xs">🏮✨</span>
        </div>
      </div>

      {/* CENTER: THE ROYAL STARLIGHT LETTER & TRIBUTE */}
      <div className="relative z-10 w-full max-w-xl mx-auto my-auto flex flex-col items-center text-center space-y-3.5 sm:space-y-4 animate-fadeIn">
        {/* Crown Avatar */}
        <div className="p-3 rounded-full bg-amber-400/15 border border-amber-400/40 shadow-[0_0_35px_rgba(251,191,36,0.4)] backdrop-blur-md">
          <Crown className="w-8 h-8 sm:w-11 sm:h-11 text-amber-300 drop-shadow-[0_0_15px_rgba(251,191,36,0.9)] animate-pulse" />
        </div>

        {/* Heading: Happy Birthday Queen uhhh */}
        <div className="space-y-0.5">
          <h2 className="font-cursive text-3xl min-[380px]:text-4xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-300 to-amber-100 font-bold leading-tight drop-shadow-[0_2px_12px_rgba(251,191,36,0.4)]">
            Happy Birthday
          </h2>
          <h1 className="font-serif text-xl min-[380px]:text-2xl sm:text-4xl font-extrabold text-white tracking-wide flex items-center justify-center gap-2">
            <span>Queen uhhh</span>
            <span className="text-amber-400 text-lg sm:text-2xl animate-bounce">👑</span>
            <span className="text-sm sm:text-lg select-none">🙄🥴</span>
          </h1>
        </div>

        {/* The Heartfelt Galaxy Letter */}
        <div className="w-full bg-slate-950/75 backdrop-blur-md border border-amber-400/30 rounded-2xl p-4 sm:p-6 shadow-[0_0_40px_rgba(0,0,0,0.5)] text-slate-200 text-xs sm:text-sm leading-relaxed space-y-2 text-left">
          <p className="italic text-amber-200/90 font-serif font-medium">
            &ldquo;To the brightest star in my entire universe...&rdquo;
          </p>
          <p className="text-slate-300 font-light">
            Another year has spun around the sun, and you continue to make life brighter, funnier, and unimaginably special.
            Whether you roll your eyes at me <span className="inline-block hover:scale-125 transition-transform text-sm">🙄</span> or laugh till you make that cute face <span className="inline-block hover:scale-125 transition-transform text-sm">🥴</span>, every single second with you is pure magic.
          </p>
          <div className="pt-2 flex items-center justify-between border-t border-indigo-500/20 text-xs text-rose-300 font-semibold flex-wrap gap-1">
            <span className="italic font-serif text-rose-300 text-xs sm:text-sm">
              With Love, Smokiee • Always &amp; Forever Love ❤️
            </span>
            <span className="text-xs sm:text-sm select-none">✨💖</span>
          </div>
        </div>

        {/* Quick Action Pills: Release Lantern & Shoot Meteor */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-wrap items-center justify-center gap-2 pt-1"
        >
          <button
            onClick={() => releaseSkyLantern(null)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400 text-slate-950 text-xs font-bold shadow-[0_0_15px_rgba(251,191,36,0.5)] hover:bg-amber-300 transition-all transform active:scale-95 cursor-pointer"
          >
            <span>Release Lantern</span>
            <span className="text-sm">🏮</span>
          </button>

          <button
            onClick={shootMeteor}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-900/80 hover:bg-indigo-800 text-indigo-200 text-xs font-bold border border-indigo-400/40 shadow-sm transition-all transform active:scale-95 cursor-pointer"
          >
            <span>Shoot Meteor</span>
            <span className="text-sm">🌠</span>
          </button>

          <button
            onClick={() => releaseSkyLantern(Math.random() > 0.5 ? "🙄" : "🥴")}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-bold border border-rose-400/40 transition-all transform active:scale-95 cursor-pointer"
          >
            <span>Queen Moods</span>
            <span className="text-sm">🙄🥴</span>
          </button>
        </div>

        {/* Tap screen hint */}
        <p className="text-[10px] text-slate-400 font-mono tracking-wider">
          Tap anywhere on screen to release starlight lanterns {wishesCount > 0 && `(+${wishesCount} wishes)`}
        </p>
      </div>

      {/* BOTTOM FOOTER BAR */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 pt-2 flex items-center justify-between border-t border-indigo-500/20 text-xs text-slate-400"
      >
        <span className="font-serif italic text-slate-300 flex items-center gap-1.5">
          <span>Queen of the Galaxy</span>
          <span className="text-amber-400">✨</span>
          <span>Queen uhhh 👑</span>
        </span>
        <button
          onClick={onReplay}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-indigo-200 hover:text-white transition-all text-xs font-medium active:scale-95 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          <span>Replay Starlight Gift</span>
        </button>
      </div>
    </div>
  );
}
