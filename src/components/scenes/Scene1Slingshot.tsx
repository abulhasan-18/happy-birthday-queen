"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { soundFX } from "@/lib/sound";
import { Crown, Sparkles, Heart } from "@/components/Icons";

interface Scene1Props {
  onComplete: () => void;
  autoShoot?: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  opacity: number;
}

export default function Scene1Slingshot({ onComplete, autoShoot = true }: Scene1Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Pull progress (0 = rest, 1 = fully drawn back)
  const [pullProgress, setPullProgress] = useState(0);
  const [isPulling, setIsPulling] = useState(false);

  // Projectile state
  const [projectile, setProjectile] = useState<{
    flying: boolean;
    x: number; // 0 to 1000
    y: number; // 0 to 600
    trail: { x: number; y: number; opacity: number }[];
  }>({
    flying: false,
    x: 240,
    y: 414,
    trail: [],
  });

  const [targetHit, setTargetHit] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [statusMessage, setStatusMessage] = useState("Tap the slingshot");
  const [autoShootCountdown, setAutoShootCountdown] = useState<number | null>(null);

  // 1000 x 600 coordinate reference
  // Slingshot Prongs
  const leftProng = { x: 200, y: 400 };
  const rightProng = { x: 280, y: 400 };
  const forkJunction = { x: 240, y: 460 };
  const handleBottom = { x: 240, y: 560 };

  // Target position (Big Heart)
  const targetPos = { x: 780, y: 220 };

  // Rest pouch position
  const restPouch = { x: 240, y: 405 };
  // Max pull pouch position (drawn backwards and downwards)
  const maxPullPouch = { x: 120, y: 495 };

  // Current calculated pouch position
  const currentPouch = {
    x: restPouch.x - (restPouch.x - maxPullPouch.x) * pullProgress,
    y: restPouch.y + (maxPullPouch.y - restPouch.y) * pullProgress,
  };

  // Launch projectile function
  const fireHeart = useCallback(() => {
    soundFX.playRelease();
    setStatusMessage("Target Locked! ❤️");

    const startX = currentPouch.x;
    const startY = currentPouch.y;
    const endX = targetPos.x;
    const endY = targetPos.y;

    // Control point for smooth arching parabola
    const ctrlX = (startX + endX) / 2 - 40;
    const ctrlY = Math.min(startY, endY) - 150;

    const startTime = performance.now();
    const duration = 600; // ms

    setProjectile({
      flying: true,
      x: startX,
      y: startY,
      trail: [],
    });

    const animateFlight = (time: number) => {
      const elapsed = time - startTime;
      const t = Math.min(1, elapsed / duration);

      // Quadratic bezier curve
      const curX = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * ctrlX + t * t * endX;
      const curY = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * ctrlY + t * t * endY;

      setProjectile((prev) => ({
        flying: t < 1,
        x: curX,
        y: curY,
        trail: [...prev.trail.slice(-8), { x: curX, y: curY, opacity: 0.85 }],
      }));

      if (t < 1) {
        requestAnimationFrame(animateFlight);
      } else {
        // Hit target!
        triggerHit();
      }
    };

    requestAnimationFrame(animateFlight);
  }, [currentPouch.x, currentPouch.y, targetPos.x, targetPos.y]);

  // Target impact & hearts explosion
  const triggerHit = useCallback(() => {
    setTargetHit(true);
    soundFX.playHit();
    setStatusMessage("Direct Hit! Happy Birthday Queen uh! 💖");

    const heartColors = [
      "#ff2a5f",
      "#ff5c8a",
      "#ff758f",
      "#ff8fa3",
      "#ffb3c1",
      "#fff0f3",
      "#ffd166",
      "#d90429",
    ];
    const newParticles: Particle[] = [];

    for (let i = 0; i < 36; i++) {
      const angle = (Math.PI * 2 * i) / 36 + (Math.random() - 0.5) * 0.25;
      const speed = 3.5 + Math.random() * 5.5;
      newParticles.push({
        id: i,
        x: targetPos.x,
        y: targetPos.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 16 + Math.random() * 20,
        color: heartColors[Math.floor(Math.random() * heartColors.length)],
        rotation: Math.random() * 360,
        opacity: 1,
      });
    }

    setParticles(newParticles);

    // Fade and disperse particles
    const particleStart = performance.now();
    const animateParticles = () => {
      const now = performance.now();
      const elapsed = (now - particleStart) / 1000;

      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx * 1.6,
            y: p.y + p.vy * 1.6 + 1.2, // gravity
            rotation: p.rotation + p.vx * 1.5,
            opacity: Math.max(0, 1 - elapsed / 1.3),
          }))
          .filter((p) => p.opacity > 0.05)
      );

      if (elapsed < 1.3) {
        requestAnimationFrame(animateParticles);
      }
    };

    requestAnimationFrame(animateParticles);

    // Transition to Scene 2 after celebratory pause
    setTimeout(() => {
      onComplete();
    }, 1500);
  }, [targetPos.x, targetPos.y, onComplete]);

  // Automatic shooting sequence
  useEffect(() => {
    if (!autoShoot) return;

    let isCancelled = false;

    // 1. Initial count
    setAutoShootCountdown(2);
    const countTimer = setTimeout(() => {
      if (!isCancelled) setAutoShootCountdown(1);
    }, 600);

    // 2. Start pulling back tension
    const pullTimer = setTimeout(() => {
      if (isCancelled) return;
      setIsPulling(true);
      soundFX.playStretch();

      const pullStart = performance.now();
      const pullDur = 850; // ms

      const animatePull = (time: number) => {
        if (isCancelled) return;
        const progress = Math.min(1, (time - pullStart) / pullDur);
        // easeInOutCubic
        const eased =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        setPullProgress(eased);

        if (progress < 1) {
          requestAnimationFrame(animatePull);
        } else {
          // 3. Release & Shoot!
          setTimeout(() => {
            if (!isCancelled) {
              setIsPulling(false);
              setPullProgress(0);
              fireHeart();
            }
          }, 220);
        }
      };

      requestAnimationFrame(animatePull);
    }, 1000);

    return () => {
      isCancelled = true;
      clearTimeout(countTimer);
      clearTimeout(pullTimer);
    };
  }, [autoShoot, fireHeart]);

  // Manual interactive shoot
  const handleManualShoot = () => {
    if (projectile.flying || targetHit) return;
    setPullProgress(1);
    soundFX.playStretch();
    setTimeout(() => {
      setPullProgress(0);
      fireHeart();
    }, 150);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[440px] sm:min-h-[500px] md:min-h-[540px] bg-[#FAF6EE] select-none overflow-hidden flex flex-col justify-between p-4 sm:p-6 transition-all duration-700"
      style={{
        backgroundImage: `radial-gradient(#e5decf 1.2px, transparent 1.2px)`,
        backgroundSize: "28px 28px",
      }}
    >
      {/* Top Titles: "a little something, for you" & "For Queen Niveda" */}
      <div className="z-10 text-center space-y-1 sm:space-y-2 pt-2 animate-fadeIn">
        <p className="font-serif italic text-stone-700 text-lg sm:text-2xl tracking-wide opacity-90">
          &ldquo;a little something, for you&rdquo;
        </p>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/80 backdrop-blur-sm border border-stone-200/90 rounded-full shadow-sm">
          <Crown className="w-4 h-4 text-amber-500 animate-bounce" />
          <span className="text-xs sm:text-sm font-bold tracking-wider text-stone-800 uppercase font-sans">
            To Queen uhhh
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
        </div>
      </div>

      {/* UNIFIED SVG VIEWPORT (1000 x 600) FOR PIXEL-PERFECT ALIGNMENT ON ALL DEVICES */}
      <svg
        className="absolute inset-0 w-full h-full select-none"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Wood Grain Gradient */}
          <linearGradient id="woodForkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8d4b27" />
            <stop offset="35%" stopColor="#b46738" />
            <stop offset="70%" stopColor="#753a1a" />
            <stop offset="100%" stopColor="#53270f" />
          </linearGradient>

          {/* Rubber Band Gradient */}
          <linearGradient id="bandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b3693f" />
            <stop offset="50%" stopColor="#e29b6e" />
            <stop offset="100%" stopColor="#87431e" />
          </linearGradient>

          {/* Big Heart Gradient */}
          <linearGradient id="bigHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4d6d" />
            <stop offset="50%" stopColor="#ff758f" />
            <stop offset="100%" stopColor="#c9184a" />
          </linearGradient>

          {/* Target Glow Filter */}
          <filter id="glowTarget" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="14" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Projectile Glow Filter */}
          <filter id="glowProjectile" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. WOODEN SLINGSHOT Y-FORK */}
        <g id="slingshot-fork">
          {/* Handle Base & Ground Shadow */}
          <ellipse cx="240" cy="565" rx="35" ry="10" fill="#dfd6c6" opacity="0.8" />

          {/* Slingshot Handle */}
          <path
            d="M225 460 L225 550 Q225 560 240 560 Q255 560 255 550 L255 460 Z"
            fill="url(#woodForkGrad)"
            stroke="#45210c"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Left Prongs */}
          <path
            d="M225 460 Q215 435 200 405 Q192 390 205 385 Q218 390 220 410 Q230 435 235 450 Z"
            fill="url(#woodForkGrad)"
            stroke="#45210c"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Right Prongs */}
          <path
            d="M255 460 Q265 435 280 405 Q288 390 275 385 Q262 390 260 410 Q250 435 245 450 Z"
            fill="url(#woodForkGrad)"
            stroke="#45210c"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Wood Details & Grain Lines */}
          <path d="M205 395 Q210 405 215 395" stroke="#d58b5c" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M265 395 Q270 405 275 395" stroke="#d58b5c" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M233 490 Q238 510 233 530" stroke="#d58b5c" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* 2. RUBBER BANDS (Connecting Left Prong & Right Prong to Leather Pouch) */}
        {!projectile.flying && (
          <g id="rubber-bands">
            {/* Left Elastic Band */}
            <line
              x1={leftProng.x}
              y1={leftProng.y}
              x2={currentPouch.x}
              y2={currentPouch.y}
              stroke="url(#bandGrad)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Right Elastic Band */}
            <line
              x1={rightProng.x}
              y1={rightProng.y}
              x2={currentPouch.x}
              y2={currentPouch.y}
              stroke="url(#bandGrad)"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* 3. FLIGHT TRAIL (SPARKLES & PARTICLES) */}
        {projectile.flying &&
          projectile.trail.map((t, idx) => (
            <circle
              key={idx}
              cx={t.x}
              cy={t.y}
              r={7 - idx * 0.6}
              fill="#ff4d6d"
              opacity={t.opacity * (idx / projectile.trail.length)}
            />
          ))}

        {/* 4. LEATHER POUCH + SMALL HEART PROJECTILE */}
        <g
          id="heart-projectile"
          transform={`translate(${
            projectile.flying ? projectile.x : currentPouch.x
          }, ${projectile.flying ? projectile.y : currentPouch.y})`}
          className="cursor-pointer"
          onClick={handleManualShoot}
        >
          {/* Leather pouch backing when in slingshot */}
          {!projectile.flying && (
            <ellipse cx="0" cy="0" rx="18" ry="18" fill="#4d2411" opacity="0.8" />
          )}

          {/* Projectile Heart */}
          <g
            transform={projectile.flying ? "scale(1.2) rotate(25)" : "scale(1.1)"}
            filter="url(#glowProjectile)"
          >
            <path
              d="M0 12 L -2 10.5 C -12 2 -17 -4 -17 -11 C -17 -17 -12 -22 -6 -22 C -2 -22 1 -20 0 -17 C -1 -20 2 -22 6 -22 C 12 -22 17 -17 17 -11 C 17 -4 12 2 2 10.5 Z"
              fill="#ff2a5f"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          </g>
        </g>

        {/* 5. BIG GLOWING PINK HEART TARGET (Right Side) */}
        <g
          id="target-heart"
          transform={`translate(${targetPos.x}, ${targetPos.y}) ${
            targetHit ? "scale(1.35)" : "scale(1)"
          }`}
          className="transition-transform duration-300"
        >
          {/* Ambient Glowing Aura */}
          <circle
            cx="0"
            cy="0"
            r={targetHit ? "90" : "75"}
            fill="#ff758f"
            opacity={targetHit ? "0.6" : "0.3"}
            filter="url(#glowTarget)"
            className={targetHit ? "animate-ping" : "animate-pulse"}
          />

          {/* Orbiting Sparkles */}
          {!targetHit && (
            <>
              <text x="50" y="-45" fontSize="24" fill="#ffd166">
                ✨
              </text>
              <text x="-65" y="45" fontSize="18" fill="#ff758f">
                💖
              </text>
            </>
          )}

          {/* The Big Target Heart Shape */}
          <path
            d="M0 45 L -7 38 C -42 6 -60 -15 -60 -40 C -60 -62 -42 -80 -20 -80 C -8 -80 3 -74 0 -63 C -3 -74 8 -80 20 -80 C 42 -80 60 -62 60 -40 C 60 -15 42 6 7 38 Z"
            fill="url(#bigHeartGrad)"
            filter="url(#glowTarget)"
            stroke="#ffffff"
            strokeWidth="3"
            strokeOpacity="0.8"
          />

          {/* Shimmer Highlight on Big Heart */}
          <path
            d="M-35 -55 C-30 -65 -15 -70 -5 -65"
            stroke="#ffffff"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.85"
          />
        </g>

        {/* 6. EXPLODING POP HEARTS ON HIT */}
        {particles.map((p) => (
          <g
            key={p.id}
            transform={`translate(${p.x}, ${p.y}) rotate(${p.rotation}) scale(${
              p.size / 24
            })`}
            opacity={p.opacity}
          >
            <path
              d="M0 12 L -2 10.5 C -12 2 -17 -4 -17 -11 C -17 -17 -12 -22 -6 -22 C -2 -22 1 -20 0 -17 C -1 -20 2 -22 6 -22 C 12 -22 17 -17 17 -11 C 17 -4 12 2 2 10.5 Z"
              fill={p.color}
            />
          </g>
        ))}
      </svg>

      {/* BOTTOM CONTROLS & STATUS: "Pull & Release" */}
      <div className="z-10 flex flex-col items-center justify-center gap-2 pb-2">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/10 backdrop-blur-md text-stone-700 text-xs sm:text-sm font-medium tracking-wide border border-stone-300/60 shadow-sm">
          <span>{statusMessage}</span>
          {autoShootCountdown !== null && !targetHit && !projectile.flying && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold animate-pulse">
              {autoShootCountdown}s
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
