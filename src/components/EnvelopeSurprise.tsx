"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { soundFX } from "@/lib/sound";
import { Crown, Heart, Sparkles, RotateCcw } from "@/components/Icons";

export default function EnvelopeSurprise() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"card" | "memories" | "memes" | "cake" | "letter">("card");
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Play romantic music when envelope opens
  const handleOpenEnvelope = () => {
    if (isOpen) return;
    soundFX.playRelease();
    soundFX.playHit();
    setIsOpen(true);
    setIsPlayingMusic(true);
    soundFX.startMusic();

    try {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#ff4d6d", "#ff758f", "#ffd166", "#ffffff"],
      });
    } catch {}
  };

  const blowCandles = () => {
    if (candlesBlown) return;
    setCandlesBlown(true);
    soundFX.playHit();

    try {
      confetti({
        particleCount: 90,
        spread: 110,
        origin: { y: 0.5 },
        colors: ["#ff4d6d", "#ffd166", "#a855f7", "#ec4899", "#ffffff"],
        scalar: 1.2,
      });
    } catch {}
  };

  const toggleMusic = () => {
    if (isPlayingMusic) {
      soundFX.stopMusic();
      setIsPlayingMusic(false);
    } else {
      soundFX.startMusic();
      setIsPlayingMusic(true);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto min-h-[580px] sm:min-h-[640px] bg-[#FAF6EE] text-stone-800 rounded-3xl shadow-[0_15px_50px_rgba(0,0,0,0.12)] border border-[#EBE3D5] p-5 sm:p-8 select-none touch-manipulation overflow-hidden flex flex-col justify-between transition-all duration-700">
      
      {/* Subtle Dot Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(#d3c7b5 1.2px, transparent 1.2px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* TOP HEADER: Clean Pinterest/Canva Aesthetic */}
      <div className="relative z-10 text-center space-y-1.5 pt-1 animate-fadeIn">
        {/* Badge: • A BIRTHDAY SURPRISE */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-stone-200/90 shadow-xs backdrop-blur-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
          <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.2em] text-stone-600 font-semibold">
            A Birthday Surprise
          </span>
          <Crown className="w-3.5 h-3.5 text-amber-500" />
        </div>

        {/* Heading: a little something for you */}
        <h1 className="text-2xl sm:text-4xl font-serif text-stone-800 tracking-tight font-medium">
          a little something for you
        </h1>

        {/* Subheading: happy birthday ♡ */}
        <p className="font-cursive text-xl sm:text-2xl text-rose-500 drop-shadow-xs">
          happy birthday ♡
        </p>
      </div>

      {/* CENTER VIEWPORT: THE ENVELOPE OR THE UNFOLDED STORYBOOK */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-4 w-full">
        {!isOpen ? (
          /* ======================================================== */
          /* STAGE 1: CLOSED ENVELOPE WITH CUTE SLEEPING CAT & WAX SEAL */
          /* ======================================================== */
          <div
            onClick={handleOpenEnvelope}
            className="group flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-[1.02] active:scale-95"
            title="Tap to open the envelope!"
          >
            {/* Cute Illustrated Sleeping Cat with Floating Heart */}
            <div className="relative mb-2 flex flex-col items-center">
              {/* Floating pulsing heart above cat */}
              <div className="text-rose-500 text-lg sm:text-xl animate-bounce mb-1">
                ❤️
              </div>

              {/* Sleeping Cat SVG */}
              <svg
                width="110"
                height="65"
                viewBox="0 0 120 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-xs"
              >
                {/* Cat Body */}
                <ellipse cx="60" cy="48" rx="36" ry="18" fill="#8E9299" />
                {/* Cat Belly highlight */}
                <ellipse cx="60" cy="50" rx="26" ry="12" fill="#B2B6BD" />
                {/* Cat Head */}
                <circle cx="88" cy="40" r="16" fill="#8E9299" />
                {/* Left Ear */}
                <polygon points="80,30 84,18 90,26" fill="#8E9299" />
                <polygon points="82,28 85,21 88,26" fill="#FFA5BA" />
                {/* Right Ear */}
                <polygon points="92,26 98,18 102,30" fill="#8E9299" />
                <polygon points="94,26 97,21 100,28" fill="#FFA5BA" />
                {/* Sleeping Closed Eyes */}
                <path d="M83 40 Q86 43 89 40" stroke="#333" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M92 40 Q95 43 98 40" stroke="#333" strokeWidth="2" strokeLinecap="round" fill="none" />
                {/* Pink Nose */}
                <polygon points="90,43 92,43 91,45" fill="#FFA5BA" />
                {/* Curved Tail */}
                <path d="M25 48 C15 45 10 32 18 25 C22 21 28 26 25 32" stroke="#8E9299" strokeWidth="6" strokeLinecap="round" fill="none" />
                {/* Cute Tiny Crown atop Head */}
                <polygon points="87,24 89,18 91,23 93,18 95,24" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
              </svg>
            </div>

            {/* THE ENVELOPE */}
            <div className="relative w-64 sm:w-80 h-40 sm:h-48 rounded-xl bg-[#F4EBD9] border-2 border-[#D7C9B1] shadow-[0_12px_30px_rgba(180,160,130,0.35)] flex items-center justify-center overflow-hidden transition-shadow group-hover:shadow-[0_16px_38px_rgba(180,160,130,0.45)]">
              {/* Envelope Fold Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 65" preserveAspectRatio="none">
                <path d="M0 0 L50 38 L100 0" stroke="#D7C9B1" strokeWidth="1.5" fill="#EFE5D1" opacity="0.9" />
                <path d="M0 65 L42 32" stroke="#D7C9B1" strokeWidth="1.2" opacity="0.6" />
                <path d="M100 65 L58 32" stroke="#D7C9B1" strokeWidth="1.2" opacity="0.6" />
              </svg>

              {/* Pink Wax Seal with Heart in Center */}
              <div className="relative z-10 p-3 sm:p-4 rounded-full bg-gradient-to-br from-rose-400 via-rose-500 to-rose-600 shadow-[0_4px_15px_rgba(244,63,94,0.5)] border-2 border-white/80 group-hover:scale-110 active:scale-90 transition-transform">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" />
              </div>

              {/* Tap prompt */}
              <div className="absolute bottom-2 text-[10px] text-stone-500 font-serif italic tracking-wide">
                tap to open
              </div>
            </div>

            <p className="mt-4 text-xs font-serif italic text-stone-500 flex items-center gap-1.5">
              <span>Touch the wax seal to unveil your gift</span>
              <span className="text-rose-500">✨</span>
            </p>
          </div>
        ) : (
          /* ======================================================== */
          /* STAGE 2: THE UNFOLDED INTERACTIVE STORYBOOK             */
          /* ======================================================== */
          <div className="w-full flex flex-col items-center animate-fadeIn space-y-4">
            
            {/* Story Tabs Bar */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-full">
              {[
                { id: "card", label: "Greeting", icon: "💌" },
                { id: "memories", label: "Polaroids", icon: "📸" },
                { id: "memes", label: "Queen Moods", icon: "🙄🥴" },
                { id: "cake", label: "Wish Cake", icon: "🎂" },
                { id: "letter", label: "Letter", icon: "📜" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-medium font-serif transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
                    activeTab === tab.id
                      ? "bg-rose-500 text-white font-bold shadow-md scale-105"
                      : "bg-white/80 hover:bg-white text-stone-700 border border-stone-200"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* TAB CONTENT CAROUSEL */}
            <div className="w-full min-h-[330px] sm:min-h-[380px] bg-white/90 backdrop-blur-sm rounded-2xl border border-stone-200/90 shadow-sm p-4 sm:p-6 flex flex-col justify-between">
              
              {/* TAB 1: GREETING & CASSETTE MUSIC */}
              {activeTab === "card" && (
                <div className="flex flex-col items-center justify-center text-center space-y-4 my-auto animate-fadeIn">
                  <div className="p-3 rounded-full bg-rose-50 border border-rose-200 shadow-inner">
                    <Crown className="w-10 h-10 text-amber-500 animate-bounce" />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-800">
                      Happy Birthday Queen uhhh!
                    </h2>
                    <p className="font-cursive text-xl sm:text-2xl text-rose-500">
                      Always &amp; Forever Love ❤️
                    </p>
                  </div>

                  {/* Retro Mini Cassette Player */}
                  <div className="w-full max-w-sm bg-[#FAF6EE] border border-[#D7C9B1] rounded-xl p-3 flex items-center justify-between gap-3 shadow-2xs">
                    <div className="w-10 h-10 rounded-lg bg-stone-900 text-amber-400 flex items-center justify-center font-bold text-sm shrink-0 animate-pulse">
                      🎵
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-xs font-bold text-stone-800 truncate">
                        Ulagap Pookalin Vaasam 🌸
                      </p>
                      <p className="text-[10px] text-rose-600 font-medium italic truncate">
                        Yenendraal Un Pirandhanaal
                      </p>
                    </div>
                    <button
                      onClick={toggleMusic}
                      className="px-3 py-1 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-[11px] font-bold shadow-xs active:scale-95 cursor-pointer shrink-0 transition-colors"
                    >
                      {isPlayingMusic ? "Pause" : "Play"}
                    </button>
                  </div>

                  <p className="text-xs text-stone-500 italic">
                    Tap the tabs above to explore your polaroids, moods, cake, and letter ✨
                  </p>
                </div>
              )}

              {/* TAB 2: POLAROID MEMORIES */}
              {activeTab === "memories" && (
                <div className="flex flex-col items-center space-y-3 animate-fadeIn my-auto">
                  <p className="text-xs uppercase font-serif tracking-widest text-stone-500 font-bold">
                    Polaroids &amp; Milestones
                  </p>

                  <div className="grid grid-cols-2 gap-3 sm:gap-5 w-full max-w-md px-1">
                    {/* Polaroid 1: Queen uhhh */}
                    <div className="bg-white p-2 sm:p-2.5 pb-3 rounded-xl border border-[#D7C9B1] shadow-md rotate-[-2.5deg] hover:rotate-0 hover:scale-105 transition-all duration-300">
                      <div className="relative w-full aspect-[4/5] sm:aspect-square rounded-lg overflow-hidden bg-stone-100 shadow-inner">
                        {/* Washi Tape Strip */}
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-3.5 bg-rose-300/80 backdrop-blur-2xs rotate-[-3deg] z-10 shadow-2xs"></div>
                        <img
                          src="/images/queen.jpg"
                          alt="Queen uhhh"
                          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <p className="mt-2 text-center text-[10px] sm:text-xs font-serif italic text-stone-700 font-medium">
                        Her Majesty Queen uhhh 👑
                      </p>
                    </div>

                    {/* Polaroid 2: Smokiee & Queen */}
                    <div className="bg-white p-2 sm:p-2.5 pb-3 rounded-xl border border-[#D7C9B1] shadow-md rotate-[2.5deg] hover:rotate-0 hover:scale-105 transition-all duration-300">
                      <div className="relative w-full aspect-[4/5] sm:aspect-square rounded-lg overflow-hidden bg-stone-100 shadow-inner">
                        {/* Washi Tape Strip */}
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-3.5 bg-amber-300/80 backdrop-blur-2xs rotate-[2deg] z-10 shadow-2xs"></div>
                        <img
                          src="/images/smokiee-queen.jpg"
                          alt="Smokiee & Queen"
                          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <p className="mt-2 text-center text-[10px] sm:text-xs font-serif italic text-stone-700 font-medium">
                        Smokiee &amp; Queen • Forever ❤️
                      </p>
                    </div>
                  </div>

                  <p className="text-[11px] text-stone-500 italic font-serif pt-1">
                    Rule #1: Queen is always right • Always &amp; Forever ✨
                  </p>
                </div>
              )}

              {/* TAB 3: QUEEN MOODS & MEMES */}
              {activeTab === "memes" && (
                <div className="flex flex-col items-center space-y-3 animate-fadeIn my-auto">
                  <p className="text-xs uppercase font-serif tracking-widest text-stone-500 font-bold">
                    Her Majesty’s Mood Board
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 shadow-2xs flex items-center gap-3">
                      <span className="text-3xl">🙄</span>
                      <div>
                        <h4 className="text-xs font-bold text-stone-800">The Eye-Roll</h4>
                        <p className="text-[11px] text-stone-600">
                          Whenever Smokiee tries to act too smart.
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 shadow-2xs flex items-center gap-3">
                      <span className="text-3xl">🥴</span>
                      <div>
                        <h4 className="text-xs font-bold text-stone-800">The Cute Laugh</h4>
                        <p className="text-[11px] text-stone-600">
                          When laughter takes over and the cute face appears.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: INTERACTIVE BIRTHDAY CAKE */}
              {activeTab === "cake" && (
                <div className="flex flex-col items-center justify-center text-center space-y-3 my-auto animate-fadeIn">
                  <div
                    onClick={blowCandles}
                    className="group cursor-pointer p-4 rounded-full bg-amber-50/80 border border-amber-200/80 transition-transform active:scale-95"
                    title="Tap to blow out the candle!"
                  >
                    {/* Birthday Cake SVG */}
                    <div className="relative">
                      {/* Candle Flame */}
                      {!candlesBlown ? (
                        <div className="w-3 h-5 mx-auto bg-gradient-to-t from-amber-400 to-rose-400 rounded-full animate-pulse shadow-[0_0_15px_#f59e0b]"></div>
                      ) : (
                        <div className="w-1.5 h-3 mx-auto text-stone-400 text-xs animate-bounce">
                          💨
                        </div>
                      )}
                      {/* Candle Stick */}
                      <div className="w-1.5 h-6 mx-auto bg-rose-400 rounded-t"></div>
                      {/* Cake Layers */}
                      <div className="w-24 h-10 bg-gradient-to-b from-rose-200 to-rose-300 rounded-t-lg border border-rose-400 flex items-center justify-center text-sm font-bold text-rose-800 shadow-xs">
                        👑 Queen
                      </div>
                      <div className="w-32 h-10 bg-gradient-to-b from-amber-100 to-amber-200 rounded-b-lg border border-amber-300 flex items-center justify-center text-xs font-bold text-stone-700 shadow-xs">
                        Happy Birthday
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-stone-800">
                      {candlesBlown ? "✨ Your Wish is Locked in the Stars! ✨" : "Make a Wish & Blow the Candle!"}
                    </h3>
                    <p className="text-xs text-stone-500 font-serif italic">
                      {candlesBlown
                        ? "May every single dream of yours come true this year!"
                        : "Tap the cake to blow out the flame"}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 5: HEARTFELT LOVE LETTER */}
              {activeTab === "letter" && (
                <div className="flex flex-col space-y-2.5 text-left my-auto animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <span className="font-serif italic font-bold text-stone-800 text-sm">
                      To My Queen uhhh,
                    </span>
                    <span className="text-sm">👑</span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-serif">
                    Another year older, another year wiser, and forever the most extraordinary person in my life.
                    Thank you for every smile, every sassy eye-roll <span className="text-sm">🙄</span>, and every goofy giggle <span className="text-sm">🥴</span>. 
                    You make the world feel warm, bright, and so full of life.
                  </p>

                  <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs text-rose-600 font-semibold font-serif">
                    <span>With Love, Smokiee • Always &amp; Forever Love ❤️</span>
                    <span>✨</span>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>

      {/* BOTTOM FOOTER */}
      <div className="relative z-10 pt-2 flex items-center justify-between border-t border-stone-200/80 text-[11px] sm:text-xs text-stone-500">
        <span className="font-serif italic flex items-center gap-1 text-stone-600">
          <span>With Love, Smokiee</span>
          <Heart className="w-3 h-3 fill-rose-500 text-rose-500 inline animate-pulse" />
        </span>

        {isOpen && (
          <button
            onClick={() => {
              setIsOpen(false);
              setCandlesBlown(false);
            }}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-stone-300 text-stone-700 hover:text-stone-900 transition-all font-medium text-[11px] shadow-2xs active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3 text-rose-500" />
            <span>Close Envelope</span>
          </button>
        )}
      </div>

    </div>
  );
}
