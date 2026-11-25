"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "Pasamos de responder cotizaciones manualmente a las 10 de la noche a tener un agente en WhatsApp que filtra clientes y agenda reuniones solo. La web nueva duplicó las consultas en el primer mes.",
    author: "Andrés Villamizar",
    role: "Director Comercial · Grupo Arquitectónico",
    metric: "+140% leads calificados",
  },
  {
    quote:
      "Teníamos seis hojas de cálculo desconectadas. NoCode nos construyó un panel interno limpio y rápido que redujo el tiempo de cotización de 40 minutos a menos de un minuto.",
    author: "Valeria Restrepo",
    role: "Co-fundadora · Operadora Logística",
    metric: "-38h operativas / mes",
  },
  {
    quote:
      "Lo que más valoro es la claridad: sin jerga técnica innecesaria, entregas puntuales cada semana y una página que por fin refleja el nivel de nuestros servicios.",
    author: "Mateo Cárdenas",
    role: "Socio · Firma de Consultoría Legal",
    metric: "Carga web en 0.6s",
  },
];

const FAQS = [
  {
    q: "¿Cuánto tiempo toma desarrollar una página web o automatización?",
    a: "Una landing page de alto impacto o un flujo puntual de WhatsApp IA se entrega entre 7 y 14 días calendario. Proyectos de software a medida o ecosistemas completos toman entre 3 y 6 semanas, con avances funcionales cada semana.",
  },
  {
    q: "¿Cómo se definen los precios de cada proyecto?",
    a: "Trabajamos con alcance definido y precio cerrado antes de escribir la primera línea de código. Tras una breve conversación de 20 minutos te entregamos una propuesta transparente con tiempos, entregables e inversión exacta.",
  },
  {
    q: "¿El código, el dominio y las automatizaciones quedan a mi nombre?",
    a: "Sí, 100%. Nunca secuestramos cuentas ni te atamos a licencias ocultas. Tu dominio, repositorio, flujos de automatización y bases de datos son de tu propiedad total.",
  },
  {
    q: "¿Pueden conectar la web y los agentes IA con herramientas que ya usamos?",
    a: "Sí. Integramos directamente con WhatsApp Business, Google Calendar, HubSpot, Notion, Sheets, pasarelas de pago y APIs internas de tu empresa.",
  },
  {
    q: "¿Ofrecen soporte y evolución después del lanzamiento?",
    a: "Todos los proyectos incluyen garantía técnica post-lanzamiento y documentación clara. Si deseas seguir iterando nuevas automatizaciones o mejoras, ofrecemos planes flexibles de acompañamiento.",
  },
];

export function TestimonialsFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <>
      {/* SECTION 6: EDITORIAL TESTIMONIALS */}
      <section className="bg-[#060D21] text-[#F2F0EB] py-24 sm:py-32 px-5 sm:px-8 border-b border-[#F2F0EB]/12">
        <div className="max-w-[1400px] mx-auto space-y-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-7 space-y-3">
              <span className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[#7EA2DB] block">
                04 // TESTIMONIOS
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-[-0.03em] leading-[1.04]">
                Resultados verificados en operación real.
              </h2>
            </div>
            <div className="lg:col-span-5 font-mono-tech text-xs uppercase tracking-[0.16em] text-[#F2F0EB]/55 lg:text-right">
              CLIENTES B2B · SERVICIOS · OPERACIONES
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-l border-[#F2F0EB]/15">
            {TESTIMONIALS.map((item, idx) => (
              <article
                key={item.author}
                className="border-r border-b border-[#F2F0EB]/15 p-8 sm:p-10 flex flex-col justify-between gap-10 bg-[#030712]/50"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between font-mono-tech text-[11px] uppercase tracking-[0.18em]">
                    <span className="text-[#F2F0EB]/45">0{idx + 1}</span>
                    <span className="px-2.5 py-1 bg-black border border-[#F2F0EB]/20 text-[#7EA2DB]">
                      {item.metric}
                    </span>
                  </div>
                  <blockquote className="text-base sm:text-lg leading-relaxed text-[#F2F0EB]/90">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="pt-6 border-t border-[#F2F0EB]/12">
                  <div className="font-display font-bold text-base text-white">
                    {item.author}
                  </div>
                  <div className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#F2F0EB]/55 mt-1">
                    {item.role}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: MINIMALIST EDITORIAL FAQ ACCORDION */}
      <section
        id="faq"
        className="bg-[#F2F0EB] text-[#060D21] py-24 sm:py-32 px-5 sm:px-8 border-b border-[#060D21]/15"
      >
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-4">
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[#475575] block">
              05 // PREGUNTAS FRECUENTES
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-[-0.03em] leading-[1.04]">
              Claridad antes de empezar.
            </h2>
            <p className="text-sm sm:text-base text-[#475575] leading-relaxed">
              Respuestas directas sobre tiempos, propiedad del código e
              integraciones.
            </p>
          </div>

          <div className="lg:col-span-8 border-t border-[#060D21]/20">
            {FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={faq.q}
                  className="border-b border-[#060D21]/15"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full py-6 sm:py-7 flex items-center justify-between gap-6 text-left group cursor-pointer"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono-tech text-xs text-[#475575]">
                        0{idx + 1}
                      </span>
                      <span className="font-display font-bold text-lg sm:text-xl tracking-tight group-hover:text-black transition-colors">
                        {faq.q}
                      </span>
                    </div>
                    <span className="w-8 h-8 border border-[#060D21]/20 flex items-center justify-center shrink-0 transition-colors group-hover:bg-black group-hover:text-white group-hover:border-black">
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
                    <div className="overflow-hidden pl-8 sm:pl-9 pr-4 text-sm sm:text-base text-[#475575] leading-relaxed max-w-2xl">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
