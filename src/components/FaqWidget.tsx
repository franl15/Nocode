"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, ArrowRight } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/config";

type FaqKey = "servicios" | "proceso" | "precio" | "tiempo";

const FAQ_ANSWERS: Record<FaqKey, { q: string; a: string }> = {
  servicios: {
    q: "¿Qué servicios ofrecen?",
    a: "Construimos páginas web enfocadas en conversión, automatizaciones con IA (WhatsApp 24/7, CRM, cotizaciones) y software a medida como dashboards y sistemas internos.",
  },
  proceso: {
    q: "¿Cómo es el proceso?",
    a: "1) Conversamos 20 min sobre tu negocio, 2) te envío propuesta con precio cerrado, 3) construimos mostrándote avances reales y 4) lanzamos todo conectado y medido.",
  },
  precio: {
    q: "¿Cuánto cuesta un proyecto?",
    a: "Cada proyecto se cotiza a medida según el alcance (una landing page rápida no cuesta igual que un software completo con agentes IA). Escríbeme tu idea y te doy un rango claro hoy mismo.",
  },
  tiempo: {
    q: "¿En cuánto tiempo entregan?",
    a: "Una landing page o automatización puntual suele estar lista entre 7 y 14 días. Sistemas a medida completos entre 3 y 6 semanas, con entregas parciales cada semana.",
  },
};

export function FaqWidget() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<FaqKey | null>(null);
  const msgEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected && msgEndRef.current) {
      msgEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [selected]);

  const waHref = buildWhatsAppUrl(
    "Hola NoCode, tengo una pregunta sobre sus servicios y precios."
  );

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {/* Chat Panel */}
      {open && (
        <div className="w-[320px] sm:w-[350px] rounded-3xl bg-[#F2F0EB] text-[#060D21] border border-[#060D21]/15 shadow-2xl overflow-hidden">
          <div className="bg-[#060D21] text-[#F2F0EB] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-black border border-white/25 text-white font-display font-black text-sm flex items-center justify-center">
                N
              </span>
              <div>
                <div className="font-display font-bold text-sm leading-tight">
                  Asistente NoCode
                </div>
                <div className="text-[11px] text-white/70">
                  Respuestas rápidas · Sin bots eternos
                </div>
              </div>
            </div>
            <button
              type="button"
              aria-label="Cerrar preguntas frecuentes"
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3 max-h-[240px] overflow-y-auto">
            <div className="bg-white p-3.5 text-xs sm:text-sm text-[#060D21] shadow-sm border border-[#060D21]/10">
              Hola. ¿Qué te gustaría saber antes de iniciar tu proyecto?
            </div>

            {selected && (
              <>
                <div className="ml-auto max-w-[85%] bg-black text-white px-3.5 py-2 text-xs font-medium">
                  {FAQ_ANSWERS[selected].q}
                </div>
                <div className="bg-white p-3.5 text-xs sm:text-sm text-[#060D21] shadow-sm border border-[#060D21]/10 leading-relaxed">
                  {FAQ_ANSWERS[selected].a}
                </div>
              </>
            )}
            <div ref={msgEndRef} />
          </div>

          {/* Always-visible Quick Replies + Direct Conversion Footer */}
          <div className="px-4 pb-4 pt-2 border-t border-[#060D21]/10 space-y-3 bg-[#EAE7DF]">
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(FAQ_ANSWERS) as FaqKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelected(key)}
                  className={`px-2.5 py-1 text-[11px] font-semibold border transition-all cursor-pointer ${
                    selected === key
                      ? "bg-black text-white border-black"
                      : "bg-white text-[#060D21] border-[#060D21]/15 hover:border-black"
                  }`}
                >
                  {FAQ_ANSWERS[key].q}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 bg-black hover:bg-[#060D21] text-white px-4 py-2.5 text-xs font-bold transition-colors"
              >
                <span>Hablar por WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="border border-[#060D21]/25 bg-white hover:bg-black hover:text-white px-3.5 py-2.5 text-xs font-semibold transition-colors"
              >
                Cotizar
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        aria-label="Abrir preguntas frecuentes"
        onClick={() => setOpen((v) => !v)}
        className="w-14 h-14 rounded-full bg-black hover:bg-[#141923] text-white border border-white/25 shadow-[0_12px_30px_-6px_rgba(0,0,0,0.65)] flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}
