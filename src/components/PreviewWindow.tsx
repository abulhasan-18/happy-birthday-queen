"use client";

import React from "react";
import Scene1Slingshot from "./scenes/Scene1Slingshot";
import Scene2Reveal from "./scenes/Scene2Reveal";
import Scene3HeartTree from "./scenes/Scene3HeartTree";

interface PreviewWindowProps {
  currentScene: number;
  setCurrentScene: (scene: number) => void;
  onReplay: () => void;
}

export default function PreviewWindow({
  currentScene,
  setCurrentScene,
  onReplay,
}: PreviewWindowProps) {
  const handleScene1Complete = () => {
    setCurrentScene(2);
  };

  const handleScene2Complete = () => {
    setCurrentScene(3);
  };

  return (
    <div className="w-full transition-all duration-500">
      {/* IMMERSIVE LUXURY GIFT CONTAINER */}
      <div className="w-full rounded-2xl sm:rounded-3xl border border-rose-500/30 shadow-[0_0_50px_rgba(255,77,109,0.18)] overflow-hidden bg-slate-900 flex flex-col">
        {/* ACTIVE SCENE VIEWPORT */}
        <div className="relative w-full overflow-hidden bg-slate-950 flex-1 min-h-[460px] sm:min-h-[520px] md:min-h-[580px]">
          {currentScene === 1 && (
            <Scene1Slingshot
              key="scene-1"
              onComplete={handleScene1Complete}
              autoShoot={true}
            />
          )}

          {currentScene === 2 && (
            <Scene2Reveal
              key="scene-2"
              onComplete={handleScene2Complete}
              autoProceed={true}
            />
          )}

          {currentScene === 3 && (
            <Scene3HeartTree
              key="scene-3"
              onReplay={onReplay}
            />
          )}
        </div>
      </div>
    </div>
  );
}
