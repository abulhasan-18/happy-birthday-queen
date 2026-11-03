"use client";

import React, { useState, useRef, useEffect } from "react";
import { soundFX } from "@/lib/sound";
import { Sparkles, Crown } from "@/components/Icons";

interface Act1Props {
  onComplete: () => void;
}

export default function Act1Telescope({ onComplete }: Act1Props) {
  const [calibration, setCalibration] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [lensPos, setLensPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setCalibration(val);
    if (val % 20 === 0) {
      soundFX.playStarlightNote(Math.floor(val / 15));
    }
    if (val >= 100 && !isLocked) {
      triggerLensLock();
    }
  };

  const triggerLensLock = () => {
    setIsLocked(true);
    setCalibration(100);
    soundFX.playTelescopeFocus();
    setTimeout(() => {
      onComplete();
    }, 2200);
  };

  // Touch & drag to focus lens
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
    if (isLocked || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let clientX: number, clientY: number;

    if ("touches" in e) {
      if (e.touches.length === 0) return;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = Math.max(15, Math.min(85, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(15, Math.min(85, ((clientY - rect.top) / rect.height) * 100));
    setLensPos({ x, y });

    // Distance to center (50, 50)
    const dist = Math.hypot(x - 50, y - 50);
    const newCalib = Math.max(0, Math.min(100, Math.round(100 - dist * 2.8)));
    setCalibration(newCalib);

    if (newCalib >= 96 && !isLocked) {
      triggerLensLock();
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleTouchMove}
      onTouchMove={handleTouchMove}
      className="relative w-full h-full min-h-[460px] sm:min-h-[520px] md:min-h-[580px] bg-gradient-to-b from-[#030712] via-[#0b0f1f] to-[#050814] select-none touch-manipulation overflow-hidden flex flex-col justify-between p-4 sm:p-6"
    >
      {/* Background drifting stardust */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${(i * 17) % 95}%`,
              top: `${(i * 23) % 90}%`,
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              animationDelay: `${(i * 0.3) % 3}s`,
              animationDuration: `${2 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      {/* TOP HEADER: Act 1 Brief */}
      <div className="z-10 text-center space-y-1 pt-1 animate-fadeIn">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 backdrop-blur-md shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          <span className="text-[11px] sm:text-xs font-serif uppercase tracking-widest text-indigo-200">
            Act I • Royal Astrolabe
          </span>
          <span className="text-xs">🌌</span>
        </div>
        <h2 className="text-lg sm:text-2xl font-serif font-bold text-white tracking-wide">
          Locate Her Majesty’s Galaxy
        </h2>
        <p className="text-xs sm:text-sm font-light text-indigo-200/80 max-w-sm mx-auto">
          {isLocked
            ? "✨ Star coordinates locked! Entering galaxy..."
            : "Drag the celestial crosshair or slider to calibrate your telescope lens"}
        </p>
      </div>

      {/* CENTER: THE BRASS CELESTIAL TELESCOPE LENS */}
      <div className="relative z-10 flex-1 flex items-center justify-center my-2">
        <div
          className={`relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full border-4 ${
            isLocked
              ? "border-amber-400 shadow-[0_0_60px_rgba(251,191,36,0.6)]"
              : "border-indigo-500/40 shadow-[0_0_35px_rgba(99,102,241,0.25)]"
          } bg-slate-950/80 backdrop-blur-lg overflow-hidden flex items-center justify-center transition-all duration-700`}
        >
          {/* Outer Lens Astrolabe Markings */}
          <div className="absolute inset-2 rounded-full border border-indigo-400/20 border-dashed pointer-events-none animate-spin-slow"></div>
          <div className="absolute inset-6 rounded-full border border-amber-400/20 pointer-events-none"></div>

          {/* Deep Space View inside Telescope */}
          <div
            className="absolute inset-0 transition-all duration-700 flex items-center justify-center"
            style={{
              filter: `blur(${Math.max(0, (100 - calibration) * 0.12)}px)`,
              opacity: 0.3 + (calibration / 100) * 0.7,
            }}
          >
            {/* The Hidden Queen Constellation Core revealed inside lens */}
            <div className="relative flex flex-col items-center justify-center">
              <div
                className={`transition-all duration-700 ${
                  calibration > 75 ? "scale-100 opacity-100" : "scale-75 opacity-40"
                }`}
              >
                <div className="relative p-4 rounded-full bg-amber-400/10 border border-amber-400/40 shadow-[0_0_40px_rgba(251,191,36,0.4)]">
                  <Crown className="w-12 h-12 sm:w-16 sm:h-16 text-amber-300 drop-shadow-[0_0_20px_rgba(251,191,36,0.9)] animate-pulse" />
                </div>
              </div>

              {/* Signature Queen Emojis orbiting inside lens */}
              <div className="absolute -top-4 -left-6 text-xl animate-bounce">🙄</div>
              <div className="absolute -bottom-4 -right-6 text-xl animate-bounce" style={{ animationDelay: "0.5s" }}>
                🥴
              </div>
            </div>
          </div>

          {/* Crosshair Cursor */}
          <div
            className="absolute pointer-events-none transition-transform duration-100"
            style={{
              left: `${lensPos.x}%`,
              top: `${lensPos.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Crosshair Lines */}
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
              <div className="absolute inset-x-0 top-1/2 h-[1px] bg-rose-400/80 shadow-[0_0_8px_rgba(251,113,133,0.8)]"></div>
              <div className="absolute inset-y-0 left-1/2 w-[1px] bg-rose-400/80 shadow-[0_0_8px_rgba(251,113,133,0.8)]"></div>
              <div className="w-6 h-6 rounded-full border border-rose-400 shadow-[0_0_10px_rgba(251,113,133,0.6)]"></div>
            </div>
          </div>

          {/* Success Flash Wave */}
          {isLocked && (
            <div className="absolute inset-0 bg-amber-200/20 rounded-full animate-ping pointer-events-none"></div>
          )}
        </div>
      </div>

      {/* BOTTOM CONTROLS: Slider Calibration & Tap to Center */}
      <div className="z-10 flex flex-col items-center justify-center gap-3 pb-2 max-w-md mx-auto w-full">
        {/* Calibration Progress Bar */}
        <div className="w-full flex items-center justify-between px-2 text-xs font-mono text-indigo-300">
          <span>Alignment</span>
          <span className="font-bold text-amber-400">{calibration}%</span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={calibration}
          onChange={handleSliderChange}
          disabled={isLocked}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 shadow-inner"
        />

        {/* Quick Align Button */}
        {!isLocked ? (
          <button
            onClick={triggerLensLock}
            className="px-4 py-1.5 rounded-full bg-indigo-900/60 hover:bg-indigo-800/80 border border-indigo-400/40 text-indigo-200 text-xs font-semibold tracking-wide transition-all transform active:scale-95 cursor-pointer"
          >
            Auto-Calibrate Telescope ✨
          </button>
        ) : (
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-[0_0_25px_rgba(251,191,36,0.6)] animate-pulse">
            <span>Coordinates Aligned! Entering Constellation</span>
            <Crown className="w-4 h-4 text-slate-950" />
          </div>
        )}
      </div>
    </div>
  );
}
