"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/config";
import { MagneticButton } from "@/components/MagneticButton";
import { NetworkFallbackVisual } from "@/components/NetworkFallbackVisual";
import { WebGLErrorBoundary } from "@/components/WebGLErrorBoundary";

// Chunk diferido de Three.js: solo se monta en escritorio (>=1024px) visible y sin reduced-motion
const AutomationNetwork3D = dynamic(
  () => import("@/components/AutomationNetwork3D"),
  {
    ssr: false,
    loading: () => null,
  }
);

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [mount3D, setMount3D] = useState(false);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isDesktop || reduced) return;

    const el = heroRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setMount3D(true);
          io.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const waHref = buildWhatsAppUrl(
    "Hola NoCode, quiero cotizar una web, software a medida o automatización con IA."
  );

  return (
    <section
      ref={heroRef}
      id="inicio"
      className="relative min-h-screen bg-[#000000] text-[#F2F0EB] pt-24 sm:pt-28 flex flex-col justify-between overflow-hidden border-b border-[#F2F0EB]/12"
    >
      {/* 1) Off-axis bottom-horizon radial glow in #7EA2DB illuminating the 3D neural dome */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(65% 55% at 50% 96%, rgba(126,162,219,0.34) 0%, rgba(17,23,42,0.45) 45%, rgba(0,0,0,0.98) 100%)",
        }}
      />

      {/* 2) Full-bleed WebGL 3D Neural Network Hemisphere (0 KB in mobile) */}
      {mount3D && (
        <div className="hidden lg:block absolute inset-0 z-0">
          <WebGLErrorBoundary fallback={null}>
            <AutomationNetwork3D />
          </WebGLErrorBoundary>
        </div>
      )}

      {/* 3) Subtle top vignette so centered title stays razor-sharp above the glowing 3D dome */}
      <div
        aria-hidden="true"
        className="pointer-events-none hidden lg:block absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.52) 38%, rgba(0,0,0,0.0) 64%, rgba(0,0,0,0.15) 100%)",
        }}
      />

      {/* AUROS-INSPIRED MINIMAL CENTERED HERO: Clean title, subtitle, 1 soft-rounded CTA, unobstructed 3D dome below */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-5 sm:px-8 pt-10 sm:pt-14 lg:pt-16 pb-10 flex-1 flex flex-col items-center justify-start text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center space-y-6">
          <span className="type-mono uppercase tracking-[0.26em] text-[#9AA8BF]">
            NOCODE
          </span>

          <h1 className="type-hero text-[#F2F0EB]">
            <span className="block">Sistemas digitales</span>
            <span className="block">que venden y operan</span>
          </h1>

          <p className="type-body text-[#CBD4E3] max-w-[52ch] mx-auto">
            Arquitectura web, agentes de WhatsApp con IA y software a medida
            construido para escalar tu operación.
          </p>

          {/* Single Soft-Rounded Signature CTA (no button clutter) */}
          <div className="pt-2">
            <MagneticButton
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#F2F0EB] hover:bg-[#7EA2DB] text-[#000000] rounded-[8px] px-7 py-3.5 type-mono font-semibold uppercase transition-colors duration-300"
            >
              <span>Cotizar por WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </div>

        {/* Mobile Static Fallback (< lg) */}
        <div className="lg:hidden w-full max-w-md mt-10 border border-[#F2F0EB]/15 rounded-[12px] bg-[#0A0A0D] overflow-hidden">
          <NetworkFallbackVisual />
        </div>
      </div>
    </section>
  );
}
