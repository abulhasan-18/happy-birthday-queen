"use client";

import React, { useState } from "react";
import Act1Telescope from "./Act1Telescope";
import Act2Constellation from "./Act2Constellation";
import Act3Supernova from "./Act3Supernova";
import Act4CelestialLanterns from "./Act4CelestialLanterns";

interface Year2WindowProps {
  onReplay?: () => void;
}

export default function Year2Window({ onReplay }: Year2WindowProps) {
  const [currentAct, setCurrentAct] = useState<number>(1);

  const handleAct1Complete = () => setCurrentAct(2);
  const handleAct2Complete = () => setCurrentAct(3);
  const handleAct3Complete = () => setCurrentAct(4);

  const handleInternalReplay = () => {
    setCurrentAct(1);
    if (onReplay) onReplay();
  };

  const actsMeta = [
    { num: 1, title: "Telescope", icon: "🌌" },
    { num: 2, title: "Constellation", icon: "✨" },
    { num: 3, title: "Supernova", icon: "🪐" },
    { num: 4, title: "Galaxy Tribute", icon: "🏮" },
  ];

  return (
    <div className="w-full transition-all duration-500">
      {/* Act Progression Breadcrumbs */}
      <div className="w-full flex items-center justify-between max-w-xl mx-auto mb-3 px-2">
        {actsMeta.map((act) => {
          const isActive = currentAct === act.num;
          const isPast = currentAct > act.num;

          return (
            <button
              key={act.num}
              onClick={() => setCurrentAct(act.num)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-serif transition-all cursor-pointer ${
                isActive
                  ? "bg-amber-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(251,191,36,0.6)]"
                  : isPast
                  ? "bg-indigo-950/80 text-amber-200/90 border border-amber-400/30"
                  : "bg-slate-900/60 text-slate-500 border border-slate-800"
              }`}
            >
              <span>{act.icon}</span>
              <span className="hidden sm:inline">Act {act.num}: {act.title}</span>
              <span className="sm:hidden">Act {act.num}</span>
            </button>
          );
        })}
      </div>

      {/* LUXURY COSMIC EXPERIENCE CONTAINER */}
      <div className="w-full rounded-2xl sm:rounded-3xl border border-indigo-500/30 shadow-[0_0_50px_rgba(99,102,241,0.2)] overflow-hidden bg-slate-950 flex flex-col">
        <div className="relative w-full overflow-hidden bg-slate-950 flex-1 min-h-[460px] sm:min-h-[520px] md:min-h-[580px]">
          {currentAct === 1 && (
            <Act1Telescope key="act-1" onComplete={handleAct1Complete} />
          )}

          {currentAct === 2 && (
            <Act2Constellation key="act-2" onComplete={handleAct2Complete} />
          )}

          {currentAct === 3 && (
            <Act3Supernova key="act-3" onComplete={handleAct3Complete} />
          )}

          {currentAct === 4 && (
            <Act4CelestialLanterns
              key="act-4"
              onReplay={handleInternalReplay}
            />
          )}
        </div>
      </div>
    </div>
  );
}
