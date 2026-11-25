"use client";

import { useEffect, useState } from "react";

const BRAND_LETTERS = ["N", "O", "C", "O", "D", "E"];

export function IntroLoader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "lifting" | "done">("loading");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const duration = 1150;
    let frameId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const ratio = Math.min(elapsed / duration, 1);
      // Smooth ease-out curve for the numeric counter
      const eased = 1 - Math.pow(1 - ratio, 3);
      setProgress(Math.round(eased * 100));

      if (ratio < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setPhase("lifting");
          document.body.style.overflow = "";
        }, 120);
        setTimeout(() => {
          setPhase("done");
        }, 900);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] bg-[#030712] text-[#F2F0EB] flex flex-col justify-between p-6 sm:p-10 transition-transform duration-[780ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        phase === "lifting" ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Subtle Architectural Grid Backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Deep Blue Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(16,38,94,0.65) 0%, rgba(3,7,18,0) 65%)",
        }}
      />

      {/* Top Metadata Row */}
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-white/50">
        <span>NOCODE // STUDIO</span>
        <span>EST. 2026</span>
      </div>

      {/* Center Kinetic Wordmark */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-5">
        <div className="w-12 h-12 rounded-2xl bg-black border border-white/25 flex items-center justify-center font-display font-black text-xl text-white shadow-[0_0_40px_rgba(255,255,255,0.12)]">
          N
        </div>

        <div className="overflow-hidden flex items-center gap-1 sm:gap-2">
          {BRAND_LETTERS.map((char, idx) => (
            <span
              key={idx}
              className="inline-block font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-white opacity-0 animate-letter-reveal"
              style={{ animationDelay: `${idx * 65}ms` }}
            >
              {char}
            </span>
          ))}
        </div>

        <div className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#8CA8DB]">
          Software · Automatizaciones IA · Web
        </div>
      </div>

      {/* Bottom Precision Progress Bar & Counter */}
      <div className="relative z-10 max-w-md w-full mx-auto space-y-2.5">
        <div className="flex items-center justify-between text-xs font-mono text-white/60">
          <span>INICIANDO SISTEMA</span>
          <span className="text-white font-bold tabular-nums">
            {String(progress).padStart(3, "0")}%
          </span>
        </div>
        <div className="h-[2px] w-full bg-white/15 overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
