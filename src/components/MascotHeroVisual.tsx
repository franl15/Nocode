"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const MASCOT_QUOTES = [
  "Flujos activos · 0 tareas manuales",
  "WhatsApp IA responde en 3 seg",
  "Webs con carga en < 0.7s",
  "Cotizaciones automáticas 24/7",
];

export function MascotHeroVisual() {
  const stageRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);
  const [quoteIdx, setQuoteIdx] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    const mascot = mascotRef.current;
    if (!stage || !mascot) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = stage.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(mascot, {
      rotateY: nx * 16,
      rotateX: -ny * 14,
      x: nx * 18,
      y: ny * 14,
      duration: 0.5,
      ease: "power3.out",
      transformPerspective: 900,
    });
  };

  const handleMouseLeave = () => {
    const mascot = mascotRef.current;
    if (!mascot) return;
    gsap.to(mascot, {
      rotateY: 0,
      rotateX: 0,
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "expo.out",
    });
  };

  const handlePulse = () => {
    setQuoteIdx((prev) => (prev + 1) % MASCOT_QUOTES.length);
    const mascot = mascotRef.current;
    if (!mascot) return;
    gsap.fromTo(
      mascot,
      { scale: 0.96 },
      { scale: 1, duration: 0.55, ease: "expo.out" }
    );
  };

  return (
    <div
      ref={stageRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handlePulse}
      data-cursor="interactive"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handlePulse();
      }}
      aria-label="Interactuar con N-01, la mascota de automatización de NoCode"
      className="relative w-full aspect-square max-w-[460px] mx-auto flex items-center justify-center cursor-pointer select-none group"
    >
      {/* Ambient Radial Aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-6 rounded-full blur-3xl opacity-55 transition-opacity duration-500 group-hover:opacity-80"
        style={{
          background:
            "radial-gradient(circle, rgba(126,162,219,0.28) 0%, rgba(6,13,33,0) 70%)",
        }}
      />

      {/* Precision Orbital Rings */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 rounded-full border border-[#F2F0EB]/10 animate-[spin_28s_linear_infinite]"
      >
        <span className="absolute -top-1 left-1/2 w-2 h-2 bg-[#7EA2DB]" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-12 rounded-full border border-dashed border-[#7EA2DB]/20 animate-[spin_20s_linear_infinite_reverse]"
      />

      {/* Floating 3D Mascot with explicit width/height for optimal LCP */}
      <div
        ref={mascotRef}
        className="relative z-10 w-[80%] h-[80%] animate-float-slow will-change-transform"
      >
        <div className="relative w-full h-full overflow-hidden rounded-full border border-[#F2F0EB]/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)] bg-[#060D21]">
          <Image
            src="/images/nocode-mascot.jpg"
            alt="N-01, mascota 3D de automatización e ingeniería IA de NoCode"
            width={520}
            height={520}
            priority
            sizes="(max-width: 768px) 320px, 460px"
            className="w-full h-full object-cover scale-[1.06] transition-transform duration-700 ease-out group-hover:scale-[1.1]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle, transparent 58%, rgba(6,13,33,0.85) 100%)",
            }}
          />
        </div>
      </div>

      {/* Top-Left Technical Tag */}
      <div className="absolute top-2 left-2 sm:left-4 z-20 bg-black/90 backdrop-blur-md border border-[#F2F0EB]/20 px-3 py-1.5 font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#F2F0EB]">
        <span className="inline-block w-1.5 h-1.5 bg-[#7EA2DB] mr-2 align-middle animate-pulse" />
        N-01 // AGENTE IA
      </div>

      {/* Bottom Interactive Status Bar (non-truncating on 375px) */}
      <div className="absolute bottom-1 sm:bottom-3 inset-x-2 sm:inset-x-6 z-20 bg-black/92 backdrop-blur-md border border-[#F2F0EB]/25 px-3.5 py-2.5 flex items-center justify-between gap-2.5">
        <span className="font-mono-tech text-[10px] sm:text-[11px] leading-snug text-[#F2F0EB]">
          {MASCOT_QUOTES[quoteIdx]}
        </span>
        <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[#7EA2DB] shrink-0">
          CLIC ↻
        </span>
      </div>
    </div>
  );
}
