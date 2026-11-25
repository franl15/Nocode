"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const METRICS = [
  { value: 42, prefix: "+", suffix: "h", label: "Horas operativas ahorradas al mes por cliente" },
  { value: 99.4, decimals: 1, prefix: "", suffix: "%", label: "Disponibilidad continua en flujos y bots 24/7" },
  { value: 0.7, decimals: 1, prefix: "", suffix: "s", label: "Tiempo medio de carga en arquitecturas Next.js" },
  { value: 3.2, decimals: 1, prefix: "", suffix: "x", label: "Incremento promedio en solicitudes calificadas" },
];

const SECTORS = [
  "CLÍNICAS & SALUD",
  "INMOBILIARIAS",
  "ESTUDIOS B2B",
  "E-COMMERCE",
  "SERVICIOS LEGALES",
  "EDUCACIÓN & ACADEMIAS",
];

export function ProofMetrics() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const counters = gsap.utils.toArray<HTMLElement>(".metric-counter");
      counters.forEach((el) => {
        const target = Number(el.dataset.target || "0");
        const decimals = Number(el.dataset.decimals || "0");
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = obj.val.toFixed(decimals);
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Cifras e impacto"
      className="bg-[#F2F0EB] text-[#060D21] border-b border-[#060D21]/15"
    >
      {/* Editorial Statement Band */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-20 sm:pt-28 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-3 font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#475575] pt-2">
          00 // EVIDENCIA OPERATIVA
        </div>
        <div className="lg:col-span-9">
          <p className="font-display font-bold text-2xl sm:text-4xl lg:text-[3rem] leading-[1.1] tracking-[-0.02em]">
            No vendemos páginas decorativas.{" "}
            <span className="text-[#475575]">
              Diseñamos infraestructura comercial que responde en segundos,
              organiza tus datos y proyecta el nivel real de tu empresa.
            </span>
          </p>
        </div>
      </div>

      {/* 4-Column Hairline Metrics Grid */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#060D21]/15">
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="border-r border-b border-[#060D21]/15 p-7 sm:p-8 flex flex-col justify-between min-h-[180px]"
            >
              <div className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-black tabular-nums">
                {m.prefix}
                <span
                  className="metric-counter"
                  data-target={m.value}
                  data-decimals={m.decimals ?? 0}
                >
                  {m.decimals ? m.value.toFixed(m.decimals) : m.value}
                </span>
                <span>{m.suffix}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#475575] leading-snug mt-6">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sectors Strip */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-8 flex flex-wrap items-center justify-between gap-4 font-mono-tech text-[11px] uppercase tracking-[0.18em] text-[#475575]">
        <span className="text-black font-semibold">SECTORES ATENDIDOS:</span>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {SECTORS.map((sector) => (
            <span key={sector}>{sector}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
