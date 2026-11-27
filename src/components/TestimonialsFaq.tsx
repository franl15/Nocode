"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "¿Cuánto tiempo toma desarrollar una web o automatización?",
    a: "Landings o flujos de WhatsApp IA: 7 a 14 días. Software a medida: 3 a 6 semanas con entregas semanales.",
  },
  {
    q: "¿Cómo se definen los precios?",
    a: "Alcance claro y precio cerrado tras una llamada de 20 minutos, sin costos ocultos.",
  },
  {
    q: "¿El código y el dominio quedan a mi nombre?",
    a: "Sí, 100%. Dominio, repositorio, flujos y bases de datos son siempre de tu propiedad.",
  },
  {
    q: "¿Pueden integrarse con nuestras herramientas actuales?",
    a: "Sí: WhatsApp Business, Google Calendar, HubSpot, Notion, Sheets, pagos y APIs internas.",
  },
  {
    q: "¿Ofrecen soporte después del lanzamiento?",
    a: "Incluimos garantía técnica post-lanzamiento y planes flexibles si quieres seguir escalando.",
  },
];

export function TestimonialsFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative bg-[#000000] text-[#F2F0EB] py-24 sm:py-32 px-5 sm:px-8 border-b border-[#F2F0EB]/12"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-4">
          <span className="type-mono uppercase text-[#9AA8BF] block">
            06 // PREGUNTAS FRECUENTES
          </span>
          <h2 className="type-h2 text-[#F2F0EB]">
            Claridad antes de empezar.
          </h2>
          <p className="type-body text-[#CBD4E3]">
            Respuestas directas sobre tiempos, propiedad del código e
            integraciones.
          </p>
        </div>

        <div className="lg:col-span-8 space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className={`rounded-[16px] border px-6 sm:px-7 transition-colors duration-300 ${
                  isOpen
                    ? "bg-[#0A0A0D] border-[#7EA2DB]/35"
                    : "bg-[#0A0A0D]/70 border-[#F2F0EB]/10 hover:border-[#F2F0EB]/22"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full py-6 flex items-center justify-between gap-6 text-left group cursor-pointer"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="type-mono text-[#7EA2DB] shrink-0">
                      /0{idx + 1}
                    </span>
                    <span className="font-sans font-medium text-lg sm:text-xl leading-[1.35] tracking-tight text-[#F2F0EB] group-hover:text-white transition-colors">
                      {faq.q}
                    </span>
                  </div>
                  <span className="w-9 h-9 border border-[#F2F0EB]/18 rounded-[8px] flex items-center justify-center shrink-0 transition-colors group-hover:bg-[#7EA2DB] group-hover:text-[#000000] group-hover:border-[#7EA2DB]">
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 pb-6"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden pl-9 sm:pl-11 pr-4 type-body text-[#CBD4E3]">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
