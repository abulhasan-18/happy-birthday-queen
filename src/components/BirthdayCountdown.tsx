"use client";

import React, { useState, useEffect } from "react";
import FlipCard from "./FlipCard";
import { Crown, Heart, Sparkles, ArrowRight } from "./Icons";
import Link from "next/link";

interface TimeRemaining {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isUnlocked: boolean;
}

export function getNov2ISTTarget(): number {
  const now = new Date();
  const currentYear = now.getFullYear();
  // Target: Nov 2, 00:00:00 IST (+05:30)
  let target = new Date(`${currentYear}-11-02T00:00:00+05:30`).getTime();

  // If Nov 2 has already ended this year (more than 24h past Nov 2 00:00 IST), target next year
  if (now.getTime() > target + 24 * 60 * 60 * 1000) {
    target = new Date(`${currentYear + 1}-11-02T00:00:00+05:30`).getTime();
  }
  return target;
}

function calculateTimeRemaining(targetTime: number): TimeRemaining {
  const now = new Date().getTime();
  const diff = targetTime - now;

  if (diff <= 0) {
    return {
      totalMs: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isUnlocked: true,
    };
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return {
    totalMs: diff,
    days,
    hours,
    minutes,
    seconds,
    isUnlocked: false,
  };
}

interface BirthdayCountdownProps {
  onUnlock?: () => void;
}

export default function BirthdayCountdown({ onUnlock }: BirthdayCountdownProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    totalMs: 1,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isUnlocked: false,
  });

  useEffect(() => {
    setMounted(true);
    const target = getNov2ISTTarget();

    const updateTimer = () => {
      const remaining = calculateTimeRemaining(target);
      setTimeLeft(remaining);
      if (remaining.isUnlocked && onUnlock) {
        onUnlock();
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [onUnlock]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-4 sm:p-8 text-center select-none animate-fadeIn">
      {/* Royal Header Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-rose-500/30 shadow-[0_0_20px_rgba(255,77,109,0.2)] backdrop-blur-md mb-6 sm:mb-8">
        <Crown className="w-4 h-4 text-amber-400 animate-bounce" />
        <span className="font-serif font-bold text-xs sm:text-sm text-amber-300 tracking-wide">
          Queen uhhh’s Birthday Countdown
        </span>
        <span className="text-sm">🙄🥴</span>
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
      </div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-serif text-white tracking-tight leading-tight">
        <span>Counting Down to </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300">
          November 2nd
        </span>
      </h1>

      {/* Tender Note */}
      <p className="mt-3 sm:mt-4 text-sm sm:text-base font-serif italic text-rose-200/90 max-w-md">
        &ldquo;The royal doors unlock when Her Majesty’s special day arrives in India Standard Time (IST)...&rdquo;
      </p>

      {/* FLIP CLOCK CONTAINER */}
      <div className="mt-8 sm:mt-12 flex items-center justify-center gap-2 sm:gap-4 md:gap-6 flex-wrap">
        {/* DAYS FLIP CARD: Only shown when days > 0 (Never shows 0 days!) */}
        {timeLeft.days > 0 && (
          <>
            <FlipCard value={timeLeft.days} label={timeLeft.days === 1 ? "Day" : "Days"} />
            <span className="text-2xl sm:text-4xl text-rose-400/80 font-bold mb-6">:</span>
          </>
        )}

        {/* HOURS FLIP CARD: Only shown when days > 0 or hours > 0 (Never shows 0 hours when 0 days!) */}
        {(timeLeft.days > 0 || timeLeft.hours > 0) && (
          <>
            <FlipCard value={timeLeft.hours} label="Hours" />
            <span className="text-2xl sm:text-4xl text-rose-400/80 font-bold mb-6">:</span>
          </>
        )}

        {/* MINUTES FLIP CARD */}
        <FlipCard value={timeLeft.minutes} label="Minutes" />
        <span className="text-2xl sm:text-4xl text-rose-400/80 font-bold mb-6">:</span>

        {/* SECONDS FLIP CARD (Flips every second!) */}
        <FlipCard value={timeLeft.seconds} label="Seconds" />
      </div>

      {/* Timezone Info Tag */}
      <div className="mt-8 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Target: Nov 2, 00:00:00 IST (India Standard Time)</span>
      </div>

      {/* Bottom Dedication & Demo Link */}
      <div className="mt-8 sm:mt-10 flex flex-col items-center gap-3">
        <p className="text-sm italic font-serif text-rose-300 flex items-center gap-1.5">
          <span>With Love, Smokiee • Always &amp; Forever Love</span>
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500 inline animate-pulse" />
        </p>

        {/* Demo Link (Test 10s Flip Countdown) */}
        <Link
          href="/demo"
          className="mt-2 group inline-flex items-center gap-1.5 text-xs text-rose-400/80 hover:text-rose-300 underline underline-offset-4 transition-colors"
        >
          <span>Try 10-Second Flip Demo Mode</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
