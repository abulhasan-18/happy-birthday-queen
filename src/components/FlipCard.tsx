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

  const isThreeDigits = String(currentVal).length >= 3;

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
      {/* 3D Flip Card Container Styled to Match the Letter Envelope */}
      <div
        className={`relative ${
          isThreeDigits
            ? "w-[4.2rem] min-[380px]:w-[4.8rem] sm:w-28 md:w-32 px-1"
            : "w-[3.5rem] min-[380px]:w-[3.9rem] sm:w-22 md:w-26"
        } h-[4.5rem] min-[380px]:h-[5rem] sm:h-26 md:h-30 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#FFFDF9] via-[#F4EBD9] to-[#EAE0CD] border-2 border-[#D7C9B1] shadow-[0_8px_25px_rgba(180,160,130,0.35),_0_2px_8px_rgba(244,63,94,0.12)] flex items-center justify-center select-none overflow-hidden perspective-500 transition-all duration-300`}
      >
        {/* Subtle Horizontal Divider line across middle (envelope crease style) */}
        <div className="absolute inset-x-0 top-1/2 h-[1.5px] bg-[#C8B8A0]/70 z-20 shadow-2xs"></div>

        {/* Subtle Corner Wax Dots (matching the pink wax seal) */}
        <div className="absolute top-1.5 left-2 w-1 h-1 rounded-full bg-rose-400/70"></div>
        <div className="absolute top-1.5 right-2 w-1 h-1 rounded-full bg-rose-400/70"></div>

        {/* Current Digit (Rich Wax Seal Rose / Ruby Red) */}
        <span
          key={currentVal}
          className={`font-mono ${
            isThreeDigits
              ? "text-xl min-[380px]:text-2xl sm:text-3xl md:text-4xl tracking-tight sm:tracking-normal"
              : "text-2xl min-[380px]:text-3xl sm:text-4xl md:text-5xl tracking-wider"
          } font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-[#BE123C] via-[#E11D48] to-[#9F1239] drop-shadow-[0_1px_4px_rgba(190,18,60,0.3)] ${
            isFlipping ? "animate-flipDown" : ""
          }`}
        >
          {currentVal}
        </span>
      </div>

      {/* Label (Days, Hours, Mins, Secs) in Warm Stone Typography */}
      <span className="mt-1.5 text-[10px] min-[380px]:text-[11px] sm:text-xs font-serif uppercase tracking-wider sm:tracking-widest text-stone-600 font-semibold">
        {label}
      </span>
    </div>
  );
}
