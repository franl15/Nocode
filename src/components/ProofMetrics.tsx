"use client";

import { useEffect, useRef } from "react";

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

const MANIFESTO_WORDS =
  "Diseñamos infraestructura comercial que responde en segundos, organiza tus datos y proyecta el nivel real de tu empresa.".split(
    " "
  );

export function ProofMetrics() {
  const containerRef = useRef<HTMLElement>(null);
  const manifestoRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const root = containerRef.current;
    if (!root) return;

    const counters = Array.from(root.querySelectorAll<HTMLElement>(".metric-counter"));
    const rafIds: number[] = [];

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          io.unobserve(el);

          const target = Number(el.dataset.target || "0");
          const decimals = Number(el.dataset.decimals || "0");
          const duration = 1400;
          const start = performance.now();

          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            // Curva expo.out equivalente a GSAP sin cargar librería en el bundle inicial
            const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
            el.textContent = (target * eased).toFixed(decimals);
            if (p < 1) {
              rafIds.push(requestAnimationFrame(tick));
            }
          };

          rafIds.push(requestAnimationFrame(tick));
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    counters.forEach((el) => io.observe(el));

    // Revelado progresivo de opacidad por palabra al hacer scroll (solo escritorio >= 1024px)
    let cancelled = false;
    let revertReveal: (() => void) | undefined;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const manifestoEl = manifestoRef.current;

    if (isDesktop && manifestoEl) {
      const revealIo = new IntersectionObserver(
        (entries) => {
          if (!entries[0]?.isIntersecting) return;
          revealIo.disconnect();

          void Promise.all([
            import("gsap"),
            import("gsap/ScrollTrigger"),
          ]).then(([{ default: gsap }, { ScrollTrigger }]) => {
            if (cancelled || !manifestoRef.current) return;
            gsap.registerPlugin(ScrollTrigger);

            const words = manifestoRef.current.querySelectorAll(".reveal-word");
            const ctx = gsap.context(() => {
              gsap.fromTo(
                words,
                { opacity: 0.24 },
                {
                  opacity: 1,
                  stagger: 0.08,
                  ease: "none",
                  scrollTrigger: {
                    trigger: manifestoRef.current,
                    start: "top 85%",
                    end: "bottom 52%",
                    scrub: 0.4,
                  },
                }
              );
            }, manifestoRef);

            revertReveal = () => ctx.revert();
          });
        },
        { rootMargin: "200px 0px 200px 0px" }
      );
      revealIo.observe(manifestoEl);

      return () => {
        cancelled = true;
        io.disconnect();
        revealIo.disconnect();
        revertReveal?.();
        rafIds.forEach((id) => cancelAnimationFrame(id));
      };
    }

    return () => {
      cancelled = true;
      io.disconnect();
      rafIds.forEach((id) => cancelAnimationFrame(id));
    };
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Cifras e impacto"
      className="relative overflow-x-clip bg-[#000000] text-[#F2F0EB] border-b border-[#F2F0EB]/12"
    >
      {/* Subtle radial glow connecting visually with Hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 0%, rgba(126,162,219,0.09) 0%, rgba(0,0,0,0) 75%)",
        }}
      />

      {/* Editorial Statement Band — Clean Auros stillness + word-by-word scroll reveal */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 pt-24 sm:pt-32 pb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-3 type-mono uppercase text-[#9AA8BF] pt-2">
          01 // EVIDENCIA OPERATIVA
        </div>
        <div className="lg:col-span-9 space-y-5">
          <h2 className="type-h2 text-[#F2F0EB]">
            No vendemos páginas decorativas.
          </h2>
          <p ref={manifestoRef} className="type-body text-[#CBD4E3]">
            {MANIFESTO_WORDS.map((word, idx) => (
              <span key={idx} className="reveal-word inline-block mr-[0.28em]">
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* 4 Airy Rounded-[16px] Metric Cards (Auros / Linear style) */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {METRICS.map((m, idx) => (
            <div
              key={m.label}
              className={`rounded-[16px] border p-8 flex flex-col justify-between min-h-[205px] transition-colors duration-300 ${
                idx === 0
                  ? "bg-[#0A0A0D] border-[#7EA2DB]/35 hover:border-[#7EA2DB]/65"
                  : "bg-[#0A0A0D] border-[#F2F0EB]/12 hover:bg-[#14141A] hover:border-[#F2F0EB]/22"
              }`}
            >
              <div className="type-metric text-[#7EA2DB]">
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
              <p className="text-[16px] text-[#CBD4E3] leading-[1.6] mt-8">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sectors Strip */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 py-12 flex flex-wrap items-center justify-between gap-4 type-mono uppercase text-[#9AA8BF]">
        <span className="text-[#F2F0EB] font-semibold">SECTORES ATENDIDOS:</span>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {SECTORS.map((sector) => (
            <span key={sector}>{sector}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
