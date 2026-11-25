"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    num: 1,
    title: "Escucho tu operación",
    subtitle: "Diagnóstico en 20 minutos, sin tecnicismos.",
    desc: "Revisamos cómo entran hoy tus clientes, dónde se pierden mensajes o tiempo y qué objetivo comercial quieres desbloquear primero.",
  },
  {
    num: 2,
    title: "Propongo la ruta exacta",
    subtitle: "Alcance claro, precio cerrado y tiempos reales.",
    desc: "Recibes una propuesta visual y técnica con lo que sí mueve la aguja: diseño web, flujo de automatización o software a medida, sin extras innecesarios.",
  },
  {
    num: 3,
    title: "Construyo y te muestro avances",
    subtitle: "Entregas rápidas y visibles desde la primera semana.",
    desc: "Ves tu web, bot de WhatsApp o sistema funcionando en vivo mientras lo construimos, para afinar cada detalle antes de salir a producción.",
  },
  {
    num: 4,
    title: "Lanzo y optimizo",
    subtitle: "Todo queda medido, conectado y listo para escalar.",
    desc: "Publicamos, probamos cada flujo real contigo y dejamos métricas claras para que tu sistema siga generando resultados mes tras mes.",
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

  return (
    <section id="proceso" className="relative grid grid-cols-1 lg:grid-cols-2">
      {/* Sticky Left Column: Deep Midnight Blue + Crisp White/Black Numeral */}
      <div className="bg-[#060D21] text-[#F2F0EB] px-6 sm:px-12 py-16 lg:py-24 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-between">
        <div className="space-y-3 max-w-md">
          <span className="inline-block font-mono-tech bg-black border border-white/20 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[#7EA2DB]">
            02 // PROCESO
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-[-0.03em] leading-[1.06]">
            Proceso simple, rápido y claro.
          </h2>
        </div>

        {/* Giant Dynamic Numeral */}
        <div className="my-10 lg:my-0 flex items-baseline gap-4">
          <span
            key={activeStep}
            className="font-display font-black text-[7.5rem] sm:text-[11rem] lg:text-[14rem] leading-none text-white tracking-tighter transition-all duration-300"
          >
            0{activeStep}
          </span>
          <span className="font-display font-bold text-xl sm:text-2xl text-[#7EA2DB]/80">
            / 04
          </span>
        </div>

        {/* Step Indicator Dots */}
        <div className="flex items-center gap-2">
          {STEPS.map((s) => (
            <span
              key={s.num}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeStep === s.num
                  ? "w-10 bg-white"
                  : "w-3 bg-white/35"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scrollable Right Column: Pearl White */}
      <div className="bg-[#F2F0EB] text-[#060D21] px-6 sm:px-12 lg:px-16 py-12 lg:py-24 divide-y divide-[#060D21]/12">
        {STEPS.map((step, i) => (
          <div
            key={step.num}
            data-step={step.num}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="py-12 lg:py-24 first:pt-4 last:pb-8 space-y-4"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black">
              <span>Paso 0{step.num}</span>
              <span className="w-6 h-px bg-black/40" />
            </div>
            <h3 className="font-display font-extrabold text-2xl sm:text-4xl tracking-tight">
              {step.title}
            </h3>
            <p className="text-base sm:text-lg font-semibold text-[#060D21]/85">
              {step.subtitle}
            </p>
            <p className="text-sm sm:text-base text-[#475575] leading-relaxed max-w-lg">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
