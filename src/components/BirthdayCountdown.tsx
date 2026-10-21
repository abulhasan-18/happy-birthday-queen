"use client";

import React, { useState, useEffect } from "react";
import FlipCard from "./FlipCard";
import { Heart } from "./Icons";

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
      {/* Royal Sentence */}
      <p className="text-base sm:text-xl font-serif italic text-rose-200/90 max-w-lg mb-8 sm:mb-12 drop-shadow-sm">
        &ldquo;The royal doors unlock when Her Majesty’s special day arrives...&rdquo;
      </p>

      {/* FLIP CLOCK CONTAINER */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 flex-wrap">
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

      {/* Bottom Dedication: With Love, Smokiee • Always & Forever Love */}
      <div className="mt-12 sm:mt-16 flex flex-col items-center">
        <p className="text-sm sm:text-base italic font-serif text-rose-300 flex items-center gap-1.5">
          <span>With Love, Smokiee • Always &amp; Forever Love</span>
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500 inline animate-pulse" />
        </p>
      </div>
    </div>
  );
}
