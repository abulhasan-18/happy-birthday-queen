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

/**
 * Checks whether the current moment falls strictly on November 2 in Indian Standard Time (IST, UTC+5:30).
 * Nov 2 (00:00:00 IST to 23:59:59 IST) is Her Birthday!
 */
export function checkIsNov2InIST(nowMs: number = Date.now()): boolean {
  // IST is strictly UTC + 5:30 (5.5 hours = 19,800,000 ms)
  const ist = new Date(nowMs + 5.5 * 3600 * 1000);
  const month = ist.getUTCMonth(); // 0-indexed: 10 is November
  const day = ist.getUTCDate();
  return month === 10 && day === 2;
}

/**
 * Calculates the next upcoming November 2 00:00:00 IST timestamp.
 * If Nov 2 of the current year has already ended (Nov 3 onwards),
 * it targets November 2 of the next year.
 */
export function getNextNov2ISTTarget(nowMs: number = Date.now()): number {
  const ist = new Date(nowMs + 5.5 * 3600 * 1000);
  const year = ist.getUTCFullYear();
  const month = ist.getUTCMonth(); // 10 is November
  const day = ist.getUTCDate();

  let targetYear = year;
  // If we are past Nov 2 in the current year (Nov 3 onwards or month > Nov):
  if (month > 10 || (month === 10 && day > 2)) {
    targetYear = year + 1;
  }
  return new Date(`${targetYear}-11-02T00:00:00+05:30`).getTime();
}

// Backwards compatibility alias
export const getNov2ISTTarget = getNextNov2ISTTarget;

function calculateTimeRemaining(nowMs: number): TimeRemaining {
  // If today is November 2 in IST: UNLOCKED!
  if (checkIsNov2InIST(nowMs)) {
    return {
      totalMs: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isUnlocked: true,
    };
  }

  // Otherwise, locked and counting down to the next upcoming Nov 2 IST
  const target = getNextNov2ISTTarget(nowMs);
  const diff = target - nowMs;

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

    const updateTimer = () => {
      const now = Date.now();
      const remaining = calculateTimeRemaining(now);
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
      <div className="flex items-center justify-center gap-1 min-[380px]:gap-2 sm:gap-4 md:gap-6 flex-nowrap max-w-full px-1">
        {/* DAYS FLIP CARD: Only shown when days > 0 (Never shows 0 days!) */}
        {timeLeft.days > 0 && (
          <>
            <FlipCard value={timeLeft.days} label={timeLeft.days === 1 ? "Day" : "Days"} />
            <span className="text-lg sm:text-3xl text-rose-400/80 font-bold mb-3 sm:mb-6 select-none">:</span>
          </>
        )}

        {/* HOURS FLIP CARD: Only shown when days > 0 or hours > 0 (Never shows 0 hours when 0 days!) */}
        {(timeLeft.days > 0 || timeLeft.hours > 0) && (
          <>
            <FlipCard value={timeLeft.hours} label="Hours" />
            <span className="text-lg sm:text-3xl text-rose-400/80 font-bold mb-3 sm:mb-6 select-none">:</span>
          </>
        )}

        {/* MINUTES FLIP CARD */}
        <FlipCard value={timeLeft.minutes} label="Mins" />
        <span className="text-lg sm:text-3xl text-rose-400/80 font-bold mb-3 sm:mb-6 select-none">:</span>

        {/* SECONDS FLIP CARD (Flips every second!) */}
        <FlipCard value={timeLeft.seconds} label="Secs" />
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
