"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/config";
import { MagneticButton } from "@/components/MagneticButton";
import { MascotHeroVisual } from "@/components/MascotHeroVisual";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 44,
        opacity: 0,
        duration: 0.95,
        stagger: 0.11,
        ease: "expo.out",
        delay: 1.35,
        clearProps: "transform",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const waHref = buildWhatsAppUrl(
    "Hola NoCode, quiero cotizar una web, software a medida o automatización con IA."
  );

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative min-h-screen bg-[#060D21] text-[#F2F0EB] pt-28 sm:pt-32 pb-12 px-5 sm:px-8 flex flex-col justify-between overflow-hidden border-b border-[#F2F0EB]/12"
    >
      {/* Subtle 12-column architectural hairline background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 max-w-[1400px] mx-auto grid grid-cols-4 sm:grid-cols-12 opacity-[0.055]"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-r border-[#F2F0EB] first:border-l" />
        ))}
      </div>

      {/* Main 12-Column Asymmetric Hero Grid */}
      <div className="relative z-10 max-w-[1400px] w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
        {/* Left 7 Columns: Monumental Editorial Copy */}
        <div className="lg:col-span-7 space-y-7">
          <div className="hero-reveal flex items-center gap-3 font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[#7EA2DB]">
            <span className="w-2 h-2 bg-[#7EA2DB]" />
            <span>ESTUDIO DE SOFTWARE, AUTOMATIZACIÓN IA &amp; WEB</span>
          </div>

          <h1 className="hero-reveal font-display font-extrabold text-[2.05rem] sm:text-5xl xl:text-[3.7rem] leading-[1.06] tracking-[-0.03em] text-[#F2F0EB]">
            Sistemas digitales{" "}
            <span className="inline-block bg-black text-white border border-[#7EA2DB]/45 px-3.5 py-0.5 my-1">
              que venden y operan
            </span>{" "}
            sin fricción.
          </h1>

          <p className="hero-reveal text-base sm:text-xl text-[#F2F0EB]/72 max-w-xl leading-relaxed">
            Reemplazamos sitios lentos y procesos manuales por arquitectura web
            de alto contraste, agentes de WhatsApp con IA y software construido
            exactamente para tu operación.
          </p>

          <div className="hero-reveal flex flex-wrap items-center gap-4 pt-2">
            <MagneticButton
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#F2F0EB] hover:bg-black text-black hover:text-white border border-[#F2F0EB] px-7 py-4 text-xs sm:text-sm font-mono-tech font-semibold uppercase tracking-[0.14em] transition-colors duration-300"
            >
              <span>Cotizar por WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>

            <MagneticButton
              href="#proyectos"
              className="inline-flex items-center gap-2.5 border border-[#F2F0EB]/25 hover:border-[#F2F0EB]/70 px-6 py-4 text-xs sm:text-sm font-mono-tech uppercase tracking-[0.14em] text-[#F2F0EB] transition-colors duration-300"
            >
              <span>Explorar casos</span>
              <ArrowDownRight className="w-4 h-4 text-[#7EA2DB]" />
            </MagneticButton>
          </div>
        </div>

        {/* Right 5 Columns: Interactive 3D Animated Mascot */}
        <div className="lg:col-span-5 hero-reveal">
          <MascotHeroVisual />
        </div>
      </div>

      {/* Bottom Architectural Coordinates Bar */}
      <div className="relative z-10 max-w-[1400px] w-full mx-auto pt-8 mt-6 pr-0 sm:pr-20 border-t border-[#F2F0EB]/12 flex flex-wrap items-center justify-between gap-4 font-mono-tech text-[11px] uppercase tracking-[0.18em] text-[#F2F0EB]/60">
        <span>01 // SOFTWARE A MEDIDA</span>
        <span>02 // AUTOMATIZACIONES IA</span>
        <span>03 // DISEÑO WEB EDITORIAL</span>
        <span className="text-[#F2F0EB]">DISPONIBILIDAD: 2 CUPOS / MES</span>
      </div>
    </section>
  );
}
