"use client";

import React, { useEffect, useState } from "react";

interface FlipCardProps {
  value: number | string;
  label: string;
}

export default function FlipCard({ value, label }: FlipCardProps) {
  const formattedValue = typeof value === "number" ? String(value).padStart(2, "0") : value;
  const [currentVal, setCurrentVal] = useState(formattedValue);
  const [prevVal, setPrevVal] = useState(formattedValue);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (formattedValue !== currentVal) {
      setPrevVal(currentVal);
      setCurrentVal(formattedValue);
      setIsFlipping(true);

      const timer = setTimeout(() => {
        setIsFlipping(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [formattedValue, currentVal]);

  return (
    <div className="flex flex-col items-center">
      {/* 3D Flip Card Container */}
      <div className="relative w-16 h-20 sm:w-24 sm:h-28 md:w-28 md:h-32 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-rose-500/30 shadow-[0_8px_30px_rgba(255,77,109,0.25)] flex items-center justify-center select-none overflow-hidden perspective-500">
        {/* Subtle Horizontal Divider line across middle */}
        <div className="absolute inset-x-0 top-1/2 h-[1.5px] bg-slate-950/80 z-20 shadow-xs"></div>

        {/* Subtle Corner Highlights */}
        <div className="absolute top-1 left-2 w-1.5 h-1.5 rounded-full bg-rose-400/40"></div>
        <div className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-rose-400/40"></div>

        {/* Current Digit */}
        <span
          key={currentVal}
          className={`font-mono text-3xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-rose-100 to-rose-300 drop-shadow-[0_2px_12px_rgba(255,77,109,0.5)] tracking-wider ${
            isFlipping ? "animate-flipDown" : ""
          }`}
        >
          {currentVal}
        </span>
      </div>

      {/* Label (Hours, Mins, Secs) */}
      <span className="mt-2 text-[11px] sm:text-xs md:text-sm font-serif uppercase tracking-widest text-rose-200/80 font-semibold">
        {label}
      </span>
    </div>
  );
}
