"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ArrowRight } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/config";

type FaqKey = "servicios" | "proceso" | "precio" | "tiempo";

const FAQ_ANSWERS: Record<FaqKey, { q: string; a: string }> = {
  servicios: {
    q: "¿Qué hacen?",
    a: "Páginas web rápidas en Next.js, agentes IA en WhatsApp 24/7 y software interno a medida.",
  },
  proceso: {
    q: "¿Cómo trabajan?",
    a: "1) Diagnóstico de 20 min, 2) precio cerrado, 3) avances en vivo cada semana y 4) lanzamiento.",
  },
  precio: {
    q: "¿Cuánto cuesta?",
    a: "Se cotiza a medida según alcance. Escríbeme tu idea y te doy un rango claro hoy mismo.",
  },
  tiempo: {
    q: "¿Tiempos?",
    a: "Web o bot WhatsApp IA: 7–14 días. Software a medida: 3–6 semanas.",
  },
};

export function FaqWidget() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<FaqKey | null>(null);
  const msgEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 320);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (selected && msgEndRef.current) {
      msgEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [selected]);

  const waHref = buildWhatsAppUrl(
    "Hola NoCode, tengo una pregunta sobre sus servicios y precios."
  );

  const isShown = visible || open;

  return (
    <div
      className={`fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-[95] flex flex-col items-end gap-3 transition-all duration-300 ${
        isShown
          ? "visible opacity-100 translate-y-0 pointer-events-auto"
          : "invisible opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      {/* Compact Dark Editorial Chat Panel with N-01 */}
      {open && (
        <div className="w-[310px] sm:w-[340px] rounded-[16px] bg-[#0A0A0D] text-[#F2F0EB] border border-[#F2F0EB]/16 overflow-hidden">
          <div className="bg-[#000000] px-4 py-3.5 flex items-center justify-between border-b border-[#F2F0EB]/12">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-[10px] overflow-hidden border border-[#7EA2DB]/45 shrink-0">
                <Image
                  src="/images/nocode-mascot.jpg"
                  alt="N-01 Asistente NoCode"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-display font-medium text-sm leading-tight">
                  N-01 · NoCode
                </div>
                <div className="type-mono text-[#7EA2DB] uppercase">
                  Respuestas rápidas
                </div>
              </div>
            </div>
            <button
              type="button"
              aria-label="Cerrar preguntas frecuentes"
              onClick={() => setOpen(false)}
              className="p-1.5 border border-[#F2F0EB]/16 hover:bg-[#14141A] transition-colors cursor-pointer rounded-[8px]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3 max-h-[210px] overflow-y-auto">
            <div className="bg-[#14141A] p-3.5 rounded-[12px] text-sm text-[#CBD4E3] border border-[#F2F0EB]/10">
              Hola, soy N-01. ¿Qué quieres saber antes de empezar?
            </div>

            {selected && (
              <>
                <div className="ml-auto max-w-[85%] bg-[#F2F0EB] text-[#000000] px-3.5 py-2 rounded-[10px] text-xs font-semibold">
                  {FAQ_ANSWERS[selected].q}
                </div>
                <div className="bg-[#14141A] p-3.5 rounded-[12px] text-sm text-[#F2F0EB] border border-[#7EA2DB]/30 leading-relaxed">
                  {FAQ_ANSWERS[selected].a}
                </div>
              </>
            )}
            <div ref={msgEndRef} />
          </div>

          <div className="px-4 pb-4 pt-3 border-t border-[#F2F0EB]/12 space-y-3 bg-[#000000]">
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(FAQ_ANSWERS) as FaqKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelected(key)}
                  className={`px-2.5 py-1.5 text-xs font-medium border rounded-[8px] transition-colors cursor-pointer ${
                    selected === key
                      ? "bg-[#7EA2DB] text-[#000000] border-[#7EA2DB] font-semibold"
                      : "bg-[#0A0A0D] text-[#CBD4E3] border-[#F2F0EB]/15 hover:border-[#7EA2DB]"
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
                className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#F2F0EB] hover:bg-[#7EA2DB] text-[#000000] rounded-[8px] px-4 py-2.5 type-mono uppercase font-semibold transition-colors"
              >
                <span>WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="border border-[#F2F0EB]/20 bg-[#0A0A0D] hover:border-[#7EA2DB] text-[#F2F0EB] rounded-[8px] px-3.5 py-2.5 type-mono uppercase font-semibold transition-colors"
              >
                Cotizar
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Charming N-01 Floating Trigger with subtle hover greeting */}
      <button
        type="button"
        aria-label="Abrir asistente N-01"
        aria-hidden={!isShown}
        tabIndex={isShown ? 0 : -1}
        onClick={() => setOpen((v) => !v)}
        className="group relative flex items-center gap-2.5 bg-[#0A0A0D] hover:bg-[#14141A] border border-[#7EA2DB]/45 hover:border-[#7EA2DB] rounded-[14px] p-1.5 pr-3.5 transition-all duration-300 cursor-pointer"
      >
        <div className="relative w-10 h-10 rounded-[10px] overflow-hidden shrink-0 bg-[#000000]">
          {open ? (
            <div className="w-full h-full flex items-center justify-center text-[#F2F0EB]">
              <X className="w-5 h-5" />
            </div>
          ) : (
            <Image
              src="/images/nocode-mascot.jpg"
              alt="N-01"
              width={40}
              height={40}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </div>
        <span className="type-mono uppercase text-[#F2F0EB] hidden sm:inline">
          {open ? "Cerrar" : "¿Dudas?"}
        </span>
        <span
          aria-hidden="true"
          className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#7EA2DB] ring-2 ring-[#000000]"
        />
      </button>
    </div>
  );
}
