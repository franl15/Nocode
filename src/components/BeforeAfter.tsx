"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, MoveHorizontal, Bot, Zap } from "lucide-react";

export function BeforeAfter() {
  const [slider, setSlider] = useState(55);

  return (
    <section
      id="antes-despues"
      className="bg-[#F2F0EB] text-[#060D21] pt-20 pb-12 sm:pt-24 sm:pb-16 px-5 sm:px-8"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-black">
              Antes vs. Después
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight leading-[1.08]">
              Lo bueno, a la vista.
            </h2>
            <p className="text-base sm:text-lg text-[#475575]">
              Desliza para ver cómo transformamos una operación lenta y una web
              confusa en un sistema claro que convierte solo.
            </p>
          </div>

          {/* Quick Toggle Pills */}
          <div className="inline-flex items-center rounded-full bg-[#060D21]/8 p-1 self-start">
            <button
              type="button"
              onClick={() => setSlider(15)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                slider <= 30
                  ? "bg-[#060D21] text-[#F2F0EB] shadow-sm"
                  : "text-[#060D21]/70 hover:text-[#060D21]"
              }`}
            >
              Ver Antes
            </button>
            <button
              type="button"
              onClick={() => setSlider(50)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                slider > 30 && slider < 70
                  ? "bg-[#060D21] text-[#F2F0EB] shadow-sm"
                  : "text-[#060D21]/70 hover:text-[#060D21]"
              }`}
            >
              Comparar
            </button>
            <button
              type="button"
              onClick={() => setSlider(88)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                slider >= 70
                  ? "bg-black text-white shadow-sm"
                  : "text-[#060D21]/70 hover:text-[#060D21]"
              }`}
            >
              Ver Después
            </button>
          </div>
        </div>

        {/* Interactive Split Browser Frame */}
        <div className="relative rounded-3xl overflow-hidden border border-[#060D21]/14 shadow-2xl bg-white select-none">
          {/* Browser Chrome */}
          <div className="h-11 bg-[#030712] px-4 flex items-center justify-between text-xs text-white/70">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/80" />
            </div>
            <div className="px-3 py-1 rounded-full bg-white/10 text-[11px] font-mono">
              tunegocio.com
            </div>
            <div className="text-[11px] font-semibold text-white">
              {slider >= 50 ? "Con NoCode" : "Sin optimizar"}
            </div>
          </div>

          {/* Comparison Viewport */}
          <div className="relative h-[370px] sm:h-[420px] w-full overflow-hidden">
            {/* BASE LAYER: ANTES */}
            <div className="absolute inset-0 bg-[#E6E5E2] text-slate-600 p-6 sm:p-10 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-slate-300 pb-4">
                <div className="w-24 h-4 rounded bg-slate-400/50" />
                <div className="flex gap-3">
                  <div className="w-12 h-3 rounded bg-slate-300" />
                  <div className="w-12 h-3 rounded bg-slate-300" />
                  <div className="w-12 h-3 rounded bg-slate-300" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center my-auto">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-300/80 px-3 py-1 rounded">
                    <AlertCircle className="w-3.5 h-3.5" /> ANTES
                  </span>
                  <div className="text-xl sm:text-2xl font-bold text-slate-500 leading-snug">
                    &ldquo;Bienvenidos a nuestra empresa líder en soluciones integrales...&rdquo;
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Texto genérico, carga lenta de 6 segundos, formulario roto y
                    mensajes de WhatsApp respondidos 4 horas después.
                  </p>
                  <div className="inline-block px-4 py-2 bg-slate-400/60 text-slate-600 text-xs font-medium">
                    Enviar correo...
                  </div>
                </div>

                <div className="hidden sm:grid grid-cols-2 gap-3 opacity-70">
                  <div className="h-24 rounded bg-slate-300/80 p-3 flex flex-col justify-end text-[11px]">
                    Excel desactualizado
                  </div>
                  <div className="h-24 rounded bg-slate-300/80 p-3 flex flex-col justify-end text-[11px]">
                    14 chats sin leer
                  </div>
                  <div className="col-span-2 h-20 rounded bg-slate-300/80 p-3 flex items-center justify-between text-[11px]">
                    <span>Cotización manual pendiente...</span>
                    <span className="text-slate-700 font-bold">Sin respuesta</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-500">
                Resultado: visitas que cierran la pestaña sin escribirte.
              </div>
            </div>

            {/* TOP CLIPPED LAYER: DESPUÉS (Deep Midnight Blue + Pure Black + White) */}
            <div
              className="absolute inset-0 bg-[#060D21] text-[#F2F0EB] p-6 sm:p-10 flex flex-col justify-between"
              style={{ clipPath: `inset(0 ${100 - slider}% 0 0)` }}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 font-display font-bold text-sm">
                  <span className="w-6 h-6 rounded-full bg-black text-white border border-white/25 flex items-center justify-center text-xs">
                    N
                  </span>
                  <span>Tu Marca Pro</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-black text-white border border-white/25 text-xs font-semibold">
                  WhatsApp →
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center my-auto">
                <div className="space-y-3.5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-black/70 border border-white/20 px-3 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" /> DESPUÉS CON NOCODE
                  </span>
                  <div className="font-display font-extrabold text-2xl sm:text-3xl leading-tight">
                    Se entiende a la primera y{" "}
                    <span className="bg-black text-white border border-white/25 px-2 py-0.5 rounded-lg">
                      vende 24/7
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#F2F0EB]/75">
                    Web ultrarrápida + agente de IA que responde en 5 segundos,
                    califica al cliente y agenda directo en tu calendario.
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white border border-white/25 text-xs font-bold shadow-lg">
                    <Zap className="w-3.5 h-3.5" /> Cotizar en 1 clic
                  </div>
                </div>

                <div className="hidden sm:flex flex-col gap-3">
                  <div className="rounded-2xl bg-black/45 border border-white/15 p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-white">
                        <Bot className="w-4 h-4" /> Agente IA WhatsApp
                      </span>
                      <span className="text-emerald-400 font-semibold">En línea</span>
                    </div>
                    <p className="text-xs text-[#F2F0EB]/80">
                      &ldquo;¡Hola! Ya calculé tu cotización y reservé tu llamada para
                      mañana a las 10:00 AM.&rdquo;
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-black/45 border border-white/15 p-3">
                      <div className="font-display font-extrabold text-xl text-white">
                        0.7s
                      </div>
                      <div className="text-[11px] text-[#F2F0EB]/70">
                        Velocidad de carga
                      </div>
                    </div>
                    <div className="rounded-2xl bg-black/45 border border-white/15 p-3">
                      <div className="font-display font-extrabold text-xl text-emerald-400">
                        +3.1x
                      </div>
                      <div className="text-[11px] text-[#F2F0EB]/70">
                        Leads calificados
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-xs text-[#F2F0EB]/70">
                Resultado: más clientes entrando mientras tu equipo se enfoca en entregar.
              </div>
            </div>

            {/* Vertical Divider Handle */}
            <div
              className="pointer-events-none absolute top-0 bottom-0 w-0.5 bg-black z-20"
              style={{ left: `${slider}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-black text-white shadow-xl flex items-center justify-center border-2 border-white">
                <MoveHorizontal className="w-4 h-4" />
              </div>
            </div>

            <input
              type="range"
              min={5}
              max={95}
              value={slider}
              aria-label="Comparar Antes y Después"
              onChange={(e) => setSlider(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            />
          </div>
        </div>

        {/* 2-Column Captions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="rounded-2xl border border-[#060D21]/10 bg-white/60 p-5">
            <div className="text-xs font-bold uppercase tracking-wider text-[#475575] mb-1">
              Antes
            </div>
            <p className="text-sm sm:text-base font-medium text-[#060D21]/80">
              Hay que adivinar qué haces, la web tarda en cargar y pierdes ventas
              por responder mensajes tarde o llevar todo en hojas sueltas.
            </p>
          </div>
          <div className="rounded-2xl border border-black/25 bg-white p-5 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-black mb-1">
              Después
            </div>
            <p className="text-sm sm:text-base font-semibold text-[#060D21]">
              Tu propuesta se entiende en 3 segundos, el contacto está a un toque
              y tus automatizaciones trabajan sin descanso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
