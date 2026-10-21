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
      <div className="relative w-[3.5rem] h-[4.5rem] min-[380px]:w-[3.9rem] min-[380px]:h-[5rem] sm:w-22 sm:h-26 md:w-26 md:h-30 rounded-xl sm:rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-rose-500/30 shadow-[0_6px_25px_rgba(255,77,109,0.25)] flex items-center justify-center select-none overflow-hidden perspective-500">
        {/* Subtle Horizontal Divider line across middle */}
        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-slate-950/80 z-20 shadow-xs"></div>

        {/* Subtle Corner Highlights */}
        <div className="absolute top-1 left-1.5 w-1 h-1 rounded-full bg-rose-400/40"></div>
        <div className="absolute top-1 right-1.5 w-1 h-1 rounded-full bg-rose-400/40"></div>

        {/* Current Digit */}
        <span
          key={currentVal}
          className={`font-mono text-2xl min-[380px]:text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-rose-100 to-rose-300 drop-shadow-[0_2px_12px_rgba(255,77,109,0.5)] tracking-wider ${
            isFlipping ? "animate-flipDown" : ""
          }`}
        >
          {currentVal}
        </span>
      </div>

      {/* Label (Days, Hours, Mins, Secs) */}
      <span className="mt-1.5 text-[10px] min-[380px]:text-[11px] sm:text-xs font-serif uppercase tracking-wider sm:tracking-widest text-rose-200/80 font-semibold">
        {label}
      </span>
    </div>
  );
}
