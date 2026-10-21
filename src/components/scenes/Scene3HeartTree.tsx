"use client";

import React, { useState, useEffect, useMemo } from "react";
import confetti from "canvas-confetti";
import { soundFX } from "@/lib/sound";
import { Crown, Sparkles, Heart, RotateCcw } from "@/components/Icons";

interface Scene3Props {
  onReplay: () => void;
}

interface TreeLeaf {
  id: number;
  x: number; // percentage of tree box
  y: number; // percentage of tree box
  size: number;
  color: string;
  delay: number;
  rotation: number;
  scale: number;
  emoji?: "🙄" | "🥴" | null;
}

export default function Scene3HeartTree({ onReplay }: Scene3Props) {
  const [trunkGrown, setTrunkGrown] = useState(false);
  const [treeStage, setTreeStage] = useState(0); // 0: bare growing, 1: blooming, 2: fully bloomed
  // User tap spawned leaves that STAY and GROW on the tree
  const [grownLeaves, setGrownLeaves] = useState<TreeLeaf[]>([]);

  // Generate 100+ heart leaves arranged mathematically in a heart shape,
  // including Her Majesty's signature 🙄 and 🥴 emojis on the tree!
  const treeLeaves: TreeLeaf[] = useMemo(() => {
    const list: TreeLeaf[] = [];
    const colors = [
      "#ff0054",
      "#ff5400",
      "#ff4d6d",
      "#ff758f",
      "#c9184a",
      "#a4133c",
      "#590d22",
      "#ff8fa3",
      "#ffb3c1",
      "#ffd166",
    ];

    let id = 0;

    // 1. Perimeter heart points (42 points)
    for (let i = 0; i < 42; i++) {
      const t = (Math.PI * 2 * i) / 42;
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

      const x = 50 + hx * 1.6 + (Math.random() - 0.5) * 3;
      const y = 35 + hy * 1.6 + (Math.random() - 0.5) * 3;

      // Strategically place 🙄 and 🥴 on outer branches
      let leafEmoji: "🙄" | "🥴" | null = null;
      if (i === 6 || i === 20 || i === 34) {
        leafEmoji = "🙄";
      } else if (i === 12 || i === 26 || i === 40) {
        leafEmoji = "🥴";
      }

      list.push({
        id: id++,
        x,
        y,
        size: leafEmoji ? 20 : 13 + Math.random() * 7,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: 0.8 + Math.random() * 1.8,
        rotation: (Math.random() - 0.5) * 35,
        scale: leafEmoji ? 1.2 : 0.9 + Math.random() * 0.3,
        emoji: leafEmoji,
      });
    }

    // 2. Interior filling hearts (68 points)
    for (let i = 0; i < 68; i++) {
      const t = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * 0.85;
      const hx = 16 * Math.pow(Math.sin(t), 3) * r;
      const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * r;

      const x = 50 + hx * 1.6 + (Math.random() - 0.5) * 4;
      const y = 35 + hy * 1.6 + (Math.random() - 0.5) * 4;

      // Interior 🙄 and 🥴 emojis scattered naturally inside the heart canopy
      let leafEmoji: "🙄" | "🥴" | null = null;
      if (i === 8 || i === 24 || i === 48) {
        leafEmoji = "🙄";
      } else if (i === 16 || i === 36 || i === 58) {
        leafEmoji = "🥴";
      }

      list.push({
        id: id++,
        x,
        y,
        size: leafEmoji ? 22 : 11 + Math.random() * 9,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: 0.4 + Math.random() * 1.5,
        rotation: (Math.random() - 0.5) * 45,
        scale: leafEmoji ? 1.15 : 0.85 + Math.random() * 0.35,
        emoji: leafEmoji,
      });
    }

    return list;
  }, []);

  // Growth sequence: Trunk grows -> Leaves & Emojis bloom -> Continuous Romantic Melody
  useEffect(() => {
    // Start continuous romantic music immediately and forever
    soundFX.startMusic();

    const t1 = setTimeout(() => {
      setTrunkGrown(true);
      setTreeStage(1);
    }, 400);

    const t2 = setTimeout(() => {
      setTreeStage(2);
      for (let i = 0; i < 8; i++) {
        setTimeout(() => soundFX.playBloom(), i * 220);
      }
    }, 1200);

    const t3 = setTimeout(() => {
      triggerHeartConfetti();
    }, 2800);

    // Continuous automatic celebratory confetti hearts every 3 seconds
    const confettiInterval = setInterval(() => {
      triggerHeartConfetti();
    }, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(confettiInterval);
    };
  }, []);

  const triggerHeartConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#ff4d6d", "#ff758f", "#ffb3c1", "#ffd166", "#ffffff"],
        shapes: ["circle"],
        scalar: 1.1,
      });
    } catch {}
  };

  // TAPPING THE TREE: Grows MORE hearts and 🙄 🥴 emojis permanently on the tree!
  // Works with both touch and click
  const handleAddTreeItem = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    let clientX: number;
    let clientY: number;

    if ("touches" in e) {
      if (e.touches.length === 0) return;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((clientX - rect.left) / rect.width) * 100;
    const clickY = ((clientY - rect.top) / rect.height) * 100;

    const count = 3;
    const newBlooms: TreeLeaf[] = [];
    const colors = [
      "#ff0054",
      "#ff4d6d",
      "#ff758f",
      "#c9184a",
      "#ffd166",
      "#ff8fa3",
      "#ff5400",
      "#d90429",
    ];
    const emojiChoices: ("🙄" | "🥴" | null)[] = ["🙄", "🥴", "🙄", "🥴", null, null];

    for (let i = 0; i < count; i++) {
      const offsetX = (Math.random() - 0.5) * 12;
      const offsetY = (Math.random() - 0.5) * 12;
      const chosenEmoji = emojiChoices[Math.floor(Math.random() * emojiChoices.length)];

      newBlooms.push({
        id: Date.now() + i + Math.random(),
        x: Math.max(10, Math.min(90, clickX + offsetX)),
        y: Math.max(8, Math.min(82, clickY + offsetY)),
        size: chosenEmoji ? 22 + Math.random() * 8 : 14 + Math.random() * 9,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: 0,
        rotation: (Math.random() - 0.5) * 45,
        scale: chosenEmoji ? 1.2 : 1.05,
        emoji: chosenEmoji,
      });
    }

    setGrownLeaves((prev) => [...prev, ...newBlooms]);
    soundFX.playBloom();
  };

  // Queen Mood Burst: sprouts 10 permanent 🙄 and 🥴 emojis on the tree!
  const triggerMoodBurst = () => {
    soundFX.playHit();
    const burstLeaves: TreeLeaf[] = [];
    for (let i = 0; i < 10; i++) {
      const emoji = i % 2 === 0 ? "🙄" : "🥴";
      burstLeaves.push({
        id: Date.now() + i + Math.random(),
        x: 30 + Math.random() * 40,
        y: 15 + Math.random() * 45,
        size: 24 + Math.random() * 6,
        color: "#ffd166",
        delay: 0,
        rotation: (Math.random() - 0.5) * 35,
        scale: 1.15,
        emoji,
      });
    }
    setGrownLeaves((prev) => [...prev, ...burstLeaves]);
  };

  return (
    <div className="relative w-full h-full min-h-[460px] sm:min-h-[500px] md:min-h-[540px] bg-gradient-to-b from-[#fdfcf7] via-[#f7f2e8] to-[#f2e7d8] select-none touch-manipulation overflow-hidden flex flex-col justify-between p-3 sm:p-6 md:p-8">
      {/* Background drifting heart petals & Queen's signature emojis: 🙄 and 🥴 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { icon: "🌸", left: "8%", dur: 4.5, delay: 0 },
          { icon: "🙄", left: "18%", dur: 5.2, delay: 1.2 },
          { icon: "💖", left: "32%", dur: 4.0, delay: 0.5 },
          { icon: "🥴", left: "48%", dur: 4.8, delay: 2.0 },
          { icon: "🌸", left: "62%", dur: 5.5, delay: 1.8 },
          { icon: "🙄", left: "75%", dur: 4.2, delay: 0.8 },
          { icon: "🥴", left: "88%", dur: 5.0, delay: 2.5 },
        ].map((item, i) => (
          <div
            key={i}
            className="absolute text-base sm:text-xl opacity-60 animate-floating-heart select-none"
            style={{
              left: item.left,
              bottom: "-30px",
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.dur}s`,
            }}
          >
            {item.icon}
          </div>
        ))}
      </div>

      {/* Main Container: Two-column layout on medium+ screens, stacked on mobile */}
      <div className="relative z-10 w-full flex-1 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* LEFT COLUMN: Cursive Birthday Typography & Royal Greeting */}
        <div className="md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left space-y-2 sm:space-y-4 pt-1 md:pt-0 md:pl-4 animate-fadeIn">
          {/* Cursive Text: "Happy Birthday" */}
          <div className="space-y-0.5 sm:space-y-1">
            <h2 className="font-cursive text-3xl min-[380px]:text-4xl sm:text-5xl md:text-6xl text-[#c9184a] font-bold leading-tight drop-shadow-[0_2px_8px_rgba(201,24,74,0.25)]">
              Happy Birthday
            </h2>
            <h1 className="font-serif text-xl min-[380px]:text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-wide flex items-center justify-center md:justify-start gap-1.5 sm:gap-2">
              <span>Queen uhhh</span>
              <span className="text-amber-500 text-lg sm:text-2xl animate-bounce">✨</span>
            </h1>
          </div>

          {/* Royal Letter / Heartfelt Card */}
          <div className="bg-white/85 backdrop-blur-sm border border-stone-200/90 rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-sm max-w-md text-stone-700 text-xs sm:text-sm leading-relaxed space-y-1.5 sm:space-y-2">
            <p className="italic text-stone-800 font-medium">
              &ldquo;To the most graceful, witty, and wonderful Queen in the world...&rdquo;
            </p>
            <p className="text-stone-600 text-[11px] min-[380px]:text-xs sm:text-sm">
              May this year shower you with endless happiness, pure magic, and boundless love.
              Even when you roll your eyes at the world{" "}
              <span className="inline-block hover:scale-125 transition-transform text-xs sm:text-sm">
                🙄
              </span>{" "}
              or laugh till you make that cute face{" "}
              <span className="inline-block hover:scale-125 transition-transform text-xs sm:text-sm">
                🥴
              </span>
              , you are truly unforgettable!
            </p>
            <div className="pt-1.5 sm:pt-2 flex items-center justify-between border-t border-stone-200/70 text-xs text-rose-600 font-semibold flex-wrap gap-1">
              <span className="italic font-serif text-rose-600 text-[11px] sm:text-sm">
                With Love, Smokiee • Always &amp; Forever Love ❤️
              </span>
              <span className="text-xs sm:text-sm select-none">🙄🥴</span>
            </div>
          </div>

          {/* Action Button: Bloom Emojis */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-0.5">
            <button
              onClick={triggerMoodBurst}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-amber-100 hover:bg-amber-200/80 active:bg-amber-200 text-amber-950 text-xs font-bold border border-amber-300/80 shadow-sm transition-all transform active:scale-95 cursor-pointer touch-manipulation"
              title="Grow more 🙄 and 🥴 emojis on the tree!"
            >
              <span>Bloom Emojis</span>
              <span className="text-sm">🙄🥴</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: THE GROWING HEART TREE (TAP TO GROW MORE!) */}
        <div
          onClick={handleAddTreeItem}
          onTouchStart={handleAddTreeItem}
          className="md:col-span-6 relative w-full h-[260px] sm:h-[320px] md:h-[410px] flex items-center justify-center cursor-pointer select-none touch-manipulation"
          title="Tap tree to grow more hearts & emojis!"
        >
          {/* Subtle Heart Silhouette guide in background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <Heart className="w-56 h-56 sm:w-64 sm:h-64 text-rose-500 fill-current" />
          </div>

          {/* SVG BARE BROWN TREE TRUNK & ORGANIC BRANCHES */}
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full max-w-[340px] sm:max-w-[390px] drop-shadow-md z-0"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="barkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4a2810" />
                <stop offset="40%" stopColor="#693b19" />
                <stop offset="80%" stopColor="#874e22" />
                <stop offset="100%" stopColor="#4a2810" />
              </linearGradient>
            </defs>

            {/* Tree Base / Roots */}
            <path
              d="M160 380 Q200 375 240 380 Q255 385 270 395 L130 395 Q145 385 160 380 Z"
              fill="#522e15"
            />

            {/* Trunk and Main Branches with smooth growth transition */}
            <g
              className="transition-all duration-1000 ease-out origin-bottom"
              style={{
                transform: trunkGrown ? "scaleY(1)" : "scaleY(0.05)",
                opacity: trunkGrown ? 1 : 0.4,
              }}
            >
              {/* Main Trunk */}
              <path
                d="M185 380 C185 330 190 280 180 230 C175 205 165 185 150 160 C140 145 120 130 100 120
                   M215 380 C215 330 210 280 220 230 C225 205 235 185 250 160 C260 145 280 130 300 120
                   M195 240 C195 200 200 170 200 130 C200 100 200 80 200 65"
                stroke="url(#barkGradient)"
                strokeWidth="14"
                strokeLinecap="round"
              />

              {/* Sub Branches curling outwards into heart shape */}
              <path
                d="M175 210 C145 195 120 180 90 190 C70 195 60 210 50 200
                   M225 210 C255 195 280 180 310 190 C330 195 340 210 350 200
                   M160 165 C130 140 110 105 85 95 C75 90 65 95 60 90
                   M240 165 C270 140 290 105 315 95 C325 90 335 95 340 90
                   M190 140 C170 110 150 85 130 75
                   M210 140 C230 110 250 85 270 75
                   M195 100 C180 75 165 55 155 45
                   M205 100 C220 75 235 55 245 45"
                stroke="url(#barkGradient)"
                strokeWidth="6"
                strokeLinecap="round"
              />

              {/* Delicate Twigs */}
              <path
                d="M95 125 C80 115 70 120 65 110
                   M305 125 C320 115 330 120 335 110
                   M140 80 C130 65 120 70 115 60
                   M260 80 C270 65 280 70 285 60"
                stroke="url(#barkGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </g>
          </svg>

          {/* 100+ BASE BLOOMING HEART LEAVES + 🙄 & 🥴 EMOJIS */}
          <div className="absolute inset-0 pointer-events-none">
            {treeStage >= 1 &&
              treeLeaves.map((leaf) => {
                const isBloomed = treeStage === 2;
                return (
                  <div
                    key={leaf.id}
                    className="absolute transition-all duration-700 ease-out"
                    style={{
                      left: `${leaf.x}%`,
                      top: `${leaf.y}%`,
                      transform: isBloomed
                        ? `translate(-50%, -50%) rotate(${leaf.rotation}deg) scale(${leaf.scale})`
                        : "translate(-50%, -50%) scale(0)",
                      opacity: isBloomed ? 0.95 : 0,
                      transitionDelay: `${leaf.delay}s`,
                    }}
                  >
                    {leaf.emoji ? (
                      /* HER MAJESTY'S SIGNATURE EMOJIS (🙄 and 🥴) */
                      <div
                        className="inline-flex items-center justify-center filter drop-shadow-md select-none transform hover:scale-130 transition-transform duration-200"
                        style={{ fontSize: `${leaf.size}px` }}
                      >
                        <span className={leaf.emoji === "🙄" ? "animate-pulse" : "animate-bounce"}>
                          {leaf.emoji}
                        </span>
                      </div>
                    ) : (
                      /* BLOOMING HEART LEAF */
                      <svg
                        viewBox="0 0 24 24"
                        fill={leaf.color}
                        className="filter drop-shadow-sm transition-transform hover:scale-125"
                        style={{
                          width: `${leaf.size}px`,
                          height: `${leaf.size}px`,
                        }}
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    )}
                  </div>
                );
              })}

            {/* NEW PERMANENTLY GROWN LEAVES & EMOJIS FROM TAPPING THE TREE */}
            {grownLeaves.map((leaf) => (
              <div
                key={leaf.id}
                className="absolute animate-fadeIn transition-transform duration-300"
                style={{
                  left: `${leaf.x}%`,
                  top: `${leaf.y}%`,
                  transform: `translate(-50%, -50%) rotate(${leaf.rotation}deg) scale(${leaf.scale})`,
                  opacity: 0.95,
                }}
              >
                {leaf.emoji ? (
                  <div
                    className="inline-flex items-center justify-center filter drop-shadow-md select-none transform hover:scale-130 transition-transform duration-200"
                    style={{ fontSize: `${leaf.size}px` }}
                  >
                    <span className={leaf.emoji === "🙄" ? "animate-pulse" : "animate-bounce"}>
                      {leaf.emoji}
                    </span>
                  </div>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill={leaf.color}
                    className="filter drop-shadow-sm transition-transform hover:scale-125"
                    style={{
                      width: `${leaf.size}px`,
                      height: `${leaf.size}px`,
                    }}
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                )}
              </div>
            ))}
          </div>

          {/* Interactive touch hint overlay with live growth counter */}
          <div className="absolute bottom-1.5 right-1.5 text-[9px] min-[380px]:text-[10px] text-stone-500 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-stone-200/80 shadow-sm pointer-events-none flex items-center gap-1">
            <span>Tap tree to grow more 💖 🙄 🥴</span>
            {grownLeaves.length > 0 && (
              <span className="font-bold text-rose-600 bg-rose-50 px-1 rounded">
                +{grownLeaves.length}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM BAR: Replay & Queen Info */}
      <div className="relative z-10 pt-2 flex items-center justify-between border-t border-stone-200/70 text-[11px] sm:text-xs text-stone-500">
        <span className="font-serif italic text-stone-600 flex items-center gap-1">
          <span>Queen of Hearts</span>
          <span className="text-rose-500">❤️</span>
          <span>Queen uhhh 👑</span>
        </span>
        <button
          onClick={onReplay}
          className="inline-flex items-center gap-1 sm:gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-stone-900 text-stone-100 hover:bg-stone-800 transition-all font-medium active:scale-95 cursor-pointer shadow-sm touch-manipulation"
        >
          <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
          <span>Replay Gift</span>
        </button>
      </div>
    </div>
  );
}
