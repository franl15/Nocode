"use client";

import { useEffect, useState } from "react";

const BRAND_LETTERS = ["N", "O", "C", "O", "D", "E"];

export function IntroLoader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"idle" | "loading" | "lifting" | "done">("idle");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("nocode_intro_seen") === "1";

    if (reduced || seen) {
      setPhase("done");
      return;
    }

    sessionStorage.setItem("nocode_intro_seen", "1");
    setPhase("loading");
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const duration = 680; // Fast, crisp ~1s total experience so LCP stays snappy
    let frameId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const ratio = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - ratio, 3);
      setProgress(Math.round(eased * 100));

      if (ratio < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setPhase("lifting");
          document.body.style.overflow = "";
        }, 60);
        setTimeout(() => {
          setPhase("done");
        }, 560);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "idle" || phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] bg-[#030712] text-[#F2F0EB] flex flex-col justify-between p-6 sm:p-10 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        phase === "lifting" ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono-tech tracking-widest uppercase text-white/55">
        <span>NOCODE // STUDIO</span>
        <span>EST. 2026</span>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-4">
        <div className="w-11 h-11 bg-black border border-white/25 flex items-center justify-center font-display font-black text-lg text-white">
          N
        </div>
        <div className="overflow-hidden flex items-center gap-1 sm:gap-2">
          {BRAND_LETTERS.map((char, idx) => (
            <span
              key={idx}
              className="inline-block font-display font-black text-4xl sm:text-7xl tracking-tight text-white opacity-0 animate-letter-reveal"
              style={{ animationDelay: `${idx * 45}ms` }}
            >
              {char}
            </span>
          ))}
        </div>
        <div className="text-[11px] font-mono-tech uppercase tracking-[0.26em] text-[#7EA2DB]">
          Software · Automatizaciones IA · Web
        </div>
      </div>

      <div className="relative z-10 max-w-md w-full mx-auto space-y-2">
        <div className="flex items-center justify-between text-xs font-mono-tech text-white/60">
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
