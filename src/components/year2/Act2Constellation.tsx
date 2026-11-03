"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { soundFX } from "@/lib/sound";
import { Crown, Sparkles } from "@/components/Icons";
import confetti from "canvas-confetti";

interface Act2Props {
  onComplete: () => void;
}

interface StarNode {
  id: number;
  x: number; // percentage
  y: number; // percentage
  label: string;
}

export default function Act2Constellation({ onComplete }: Act2Props) {
  // 8 Crown Stars forming a regal crown silhouette
  const stars: StarNode[] = [
    { id: 0, x: 22, y: 72, label: "Star 1" },
    { id: 1, x: 22, y: 40, label: "Star 2" },
    { id: 2, x: 36, y: 55, label: "Star 3" },
    { id: 3, x: 50, y: 28, label: "Crown Jewel" },
    { id: 4, x: 64, y: 55, label: "Star 5" },
    { id: 5, x: 78, y: 40, label: "Star 6" },
    { id: 6, x: 78, y: 72, label: "Star 7" },
    { id: 7, x: 50, y: 76, label: "Crown Base" },
  ];

  // Companion stars for signature emojis
  const companionStars = [
    { id: 8, x: 12, y: 25, emoji: "🙄", name: "The Sassy Cluster" },
    { id: 9, x: 88, y: 25, emoji: "🥴", name: "The Cute Smirk Nebula" },
  ];

  // Connected star indices in sequence
  const [connectedIds, setConnectedIds] = useState<number[]>([0]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextRequiredStar = connectedIds.length < stars.length ? connectedIds.length : null;

  // Handle star click / tap
  const handleStarSelect = useCallback(
    (index: number) => {
      if (isCompleted) return;

      if (!connectedIds.includes(index)) {
        const nextList = [...connectedIds, index];
        setConnectedIds(nextList);
        soundFX.playStarlightNote(nextList.length);

        if (nextList.length === stars.length) {
          triggerCompletion();
        }
      }
    },
    [connectedIds, isCompleted, stars.length]
  );

  const triggerCompletion = () => {
    setIsCompleted(true);
    soundFX.playSupernova();

    try {
      confetti({
        particleCount: 65,
        spread: 100,
        origin: { y: 0.5 },
        colors: ["#ffd166", "#f59e0b", "#ffffff", "#818cf8"],
      });
    } catch {}

    setTimeout(() => {
      onComplete();
    }, 2500);
  };

  // Auto connect button if user prefers instant drawing
  const autoConnectAll = () => {
    if (isCompleted) return;
    setConnectedIds(stars.map((_, i) => i));
    triggerCompletion();
  };

  // Touch drag to connect stars smoothly
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isCompleted || !containerRef.current) return;
    if (e.touches.length === 0) return;

    const rect = containerRef.current.getBoundingClientRect();
    const touchX = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    const touchY = ((e.touches[0].clientY - rect.top) / rect.height) * 100;

    // Check if close to next required star
    if (nextRequiredStar !== null) {
      const targetStar = stars[nextRequiredStar];
      const dist = Math.hypot(touchX - targetStar.x, touchY - targetStar.y);
      if (dist < 10) {
        handleStarSelect(nextRequiredStar);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onTouchMove={handleTouchMove}
      className="relative w-full h-full min-h-[460px] sm:min-h-[520px] md:min-h-[580px] bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#050814] select-none touch-manipulation overflow-hidden flex flex-col justify-between p-4 sm:p-6"
    >
      {/* Background starlight ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-0"></div>

      {/* TOP HEADER */}
      <div className="z-10 text-center space-y-1 pt-1 animate-fadeIn">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 backdrop-blur-md shadow-sm">
          <Crown className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
          <span className="text-[11px] sm:text-xs font-serif uppercase tracking-widest text-indigo-200">
            Act II • Constellation Linker
          </span>
          <span className="text-xs">✨</span>
        </div>
        <h2 className="text-lg sm:text-2xl font-serif font-bold text-white tracking-wide">
          Draw The Queen’s Crown
        </h2>
        <p className="text-xs sm:text-sm font-light text-indigo-200/80 max-w-sm mx-auto">
          {isCompleted
            ? "👑 Constellation ignited! Supernova awakening..."
            : "Tap each glowing star in sequence or slide your finger across them"}
        </p>
      </div>

      {/* CENTER: CONSTELLATION SVG CANVAS */}
      <div className="relative z-10 flex-1 w-full max-w-2xl mx-auto flex items-center justify-center my-2">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full max-h-[380px] sm:max-h-[440px] drop-shadow-[0_0_25px_rgba(251,191,36,0.3)]"
        >
          <defs>
            <linearGradient id="starlightBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>

            <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Draw connected starlight lines */}
          {connectedIds.map((starIndex, i) => {
            if (i === 0) return null;
            const prevStar = stars[connectedIds[i - 1]];
            const curStar = stars[starIndex];
            return (
              <line
                key={`line-${i}`}
                x1={prevStar.x}
                y1={prevStar.y}
                x2={curStar.x}
                y2={curStar.y}
                stroke="url(#starlightBeam)"
                strokeWidth={isCompleted ? "2" : "1.6"}
                strokeLinecap="round"
                className="animate-fadeIn"
                filter="url(#starGlow)"
              />
            );
          })}

          {/* Close the crown shape when completed */}
          {isCompleted && (
            <line
              x1={stars[7].x}
              y1={stars[7].y}
              x2={stars[0].x}
              y2={stars[0].y}
              stroke="url(#starlightBeam)"
              strokeWidth="2"
              strokeLinecap="round"
              filter="url(#starGlow)"
            />
          )}

          {/* Companion Star 1: 🙄 */}
          <g transform={`translate(${companionStars[0].x}, ${companionStars[0].y})`} className="animate-pulse">
            <circle cx="0" cy="0" r="4.5" fill="#6366f1" opacity="0.3" filter="url(#starGlow)" />
            <text x="0" y="2" fontSize="5" textAnchor="middle" className="select-none">
              🙄
            </text>
          </g>

          {/* Companion Star 2: 🥴 */}
          <g transform={`translate(${companionStars[1].x}, ${companionStars[1].y})`} className="animate-pulse">
            <circle cx="0" cy="0" r="4.5" fill="#f43f5e" opacity="0.3" filter="url(#starGlow)" />
            <text x="0" y="2" fontSize="5" textAnchor="middle" className="select-none">
              🥴
            </text>
          </g>

          {/* Crown Stars */}
          {stars.map((star, idx) => {
            const isConnected = connectedIds.includes(idx);
            const isNext = nextRequiredStar === idx;

            return (
              <g
                key={star.id}
                transform={`translate(${star.x}, ${star.y})`}
                onClick={() => handleStarSelect(idx)}
                className="cursor-pointer"
              >
                {/* Outer magnetic touch circle */}
                <circle cx="0" cy="0" r="8" fill="transparent" />

                {/* Aura pulse for next star */}
                {isNext && (
                  <circle
                    cx="0"
                    cy="0"
                    r="5"
                    fill="#fbbf24"
                    opacity="0.5"
                    className="animate-ping"
                  />
                )}

                {/* Star glowing disc */}
                <circle
                  cx="0"
                  cy="0"
                  r={isConnected ? "3" : "2.2"}
                  fill={isConnected ? "#fef08a" : "#94a3b8"}
                  filter={isConnected ? "url(#starGlow)" : undefined}
                  className="transition-all duration-300"
                />

                {/* Star center diamond sparkle */}
                <polygon
                  points="0,-3 1,0 0,3 -1,0"
                  fill="#ffffff"
                  opacity={isConnected ? 1 : 0.6}
                />

                {/* Star Step Number Pill */}
                <text
                  x="0"
                  y="-4"
                  fontSize="2.4"
                  fill={isConnected ? "#fbbf24" : "#94a3b8"}
                  textAnchor="middle"
                  className="font-mono font-bold"
                >
                  {idx + 1}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* BOTTOM CONTROLS: Progress & Helper */}
      <div className="z-10 flex flex-col items-center justify-center gap-2 pb-2">
        <div className="flex items-center gap-1.5 text-xs text-indigo-300 font-mono">
          <span>Connected:</span>
          <span className="text-amber-400 font-bold">
            {connectedIds.length} / {stars.length} Stars
          </span>
        </div>

        {!isCompleted ? (
          <button
            onClick={autoConnectAll}
            className="px-4 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-amber-400/40 text-amber-200 text-xs font-medium tracking-wide transition-all transform active:scale-95 cursor-pointer shadow-sm"
          >
            Light Full Crown Constellation ✨
          </button>
        ) : (
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 via-rose-400 to-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-[0_0_30px_rgba(251,191,36,0.6)] animate-pulse">
            <span>✨ Royal Crown Constellation Ignited! ✨</span>
          </div>
        )}
      </div>
    </div>
  );
}
