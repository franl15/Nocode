"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MascotN013D } from "@/components/MascotN013D";

const STEPS = [
  {
    num: 1,
    title: "Escucho tu operación",
    desc: "Diagnóstico de 20 minutos para detectar dónde pierdes ventas o tiempo.",
    n01Line: "Te escucho sin jerga técnica.",
  },
  {
    num: 2,
    title: "Propongo la ruta exacta",
    desc: "Alcance claro, precio cerrado y tiempos reales antes de empezar.",
    n01Line: "Trazamos el plan exacto.",
  },
  {
    num: 3,
    title: "Construyo con avances en vivo",
    desc: "Ves tu web, bot o sistema funcionando desde la primera semana.",
    n01Line: "Construyendo en tiempo real.",
  },
  {
    num: 4,
    title: "Lanzo y optimizo",
    desc: "Publicamos conectado a tus herramientas y listo para escalar.",
    n01Line: "Todo listo para escalar.",
  },
];

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(1);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-step"));
            if (idx) setActiveStep(idx);
          }
        });
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: 0.1 }
    );

    refs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const current = STEPS[activeStep - 1] ?? STEPS[0];

  return (
    <section
      id="proceso"
      className="relative bg-[#000000] text-[#F2F0EB] py-24 sm:py-28 px-5 sm:px-8 border-b border-[#F2F0EB]/12"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Sticky Left Column: Numeral + N-01 mini companion */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="space-y-3">
            <span className="type-mono uppercase text-[#9AA8BF] block">
              04 // PROCESO
            </span>
            <h2 className="type-h2 text-[#F2F0EB]">
              Simple, rápido y claro.
            </h2>
          </div>

          <div className="relative rounded-[16px] bg-[#0A0A0D] border border-[#F2F0EB]/12 p-8 space-y-8 mt-8 lg:mt-28">
            {/* 3D N-01 sentado en el borde superior derecho de la tarjeta (solo escritorio) */}
            <div className="hidden lg:block absolute -top-[90px] right-4 z-20 pointer-events-none">
              <MascotN013D
                pose="sitting"
                size={140}
                label="N-01 en 3D sentado acompañando el proceso"
              />
            </div>

            <div className="flex items-baseline gap-4">
              <span
                key={activeStep}
                className="font-display font-medium text-[clamp(4.5rem,3.5rem+5vw,8rem)] leading-none text-[#F2F0EB] tracking-[-0.045em] tabular-nums transition-all duration-300"
              >
                0{activeStep}
              </span>
              <span className="font-display font-medium text-xl sm:text-2xl text-[#7EA2DB] tabular-nums">
                / 04
              </span>
            </div>

            {/* Charming small N-01 status companion */}
            <div className="flex items-center gap-3.5 p-3 rounded-[12px] bg-[#14141A] border border-[#F2F0EB]/10">
              <div className="lg:hidden relative w-11 h-11 rounded-[10px] overflow-hidden border border-[#7EA2DB]/45 shrink-0 bg-[#000000]">
                <Image
                  src="/images/nocode-mascot.jpg"
                  alt="Mascota N-01 de NoCode"
                  width={44}
                  height={44}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="type-mono uppercase text-[#7EA2DB] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7EA2DB]" />
                  N-01 · PASO 0{activeStep}
                </div>
                <p className="text-sm text-[#F2F0EB] truncate mt-0.5">
                  {current.n01Line}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {STEPS.map((s) => (
                <span
                  key={s.num}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeStep === s.num
                      ? "w-10 bg-[#7EA2DB]"
                      : "w-3 bg-[#F2F0EB]/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Right Column: Concise Step Cards */}
        <div className="lg:col-span-7 space-y-4">
          {STEPS.map((step, i) => {
            const isActive = activeStep === step.num;
            return (
              <div
                key={step.num}
                data-step={step.num}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className={`rounded-[16px] p-7 sm:p-9 border transition-colors duration-300 space-y-3 ${
                  isActive
                    ? "bg-[#0A0A0D] border-[#7EA2DB]/40"
                    : "bg-[#0A0A0D]/70 border-[#F2F0EB]/10"
                }`}
              >
                <div className="type-mono font-semibold uppercase text-[#7EA2DB]">
                  Paso 0{step.num}
                </div>
                <h3 className="type-h3 text-[#F2F0EB]">{step.title}</h3>
                <p className="type-body text-[#CBD4E3]">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
