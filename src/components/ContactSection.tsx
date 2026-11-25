"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Instagram, Mail } from "lucide-react";
import { buildWhatsAppUrl, SITE_CONFIG } from "@/lib/config";

const SERVICE_OPTIONS = [
  "Página Web de Alto Impacto",
  "Automatización + Agente IA WhatsApp",
  "Software a Medida / Dashboard",
  "Todo junto (Web + Automatización)",
];

export function ContactSection() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [service, setService] = useState(SERVICE_OPTIONS[0]);
  const [details, setDetails] = useState("");

  const directWa = buildWhatsAppUrl(
    "Hola NoCode, quiero contarte sobre mi negocio y cotizar un proyecto."
  );

  const summaryMessage = `Hola NoCode! Soy ${name || "un cliente potencial"} (WhatsApp: ${
    whatsapp || "por confirmar"
  }).\nMe interesa: ${service}.\nDetalles: ${
    details || "Quiero conversar sobre cómo mejorar mi negocio."
  }`;

  const canNextStep1 = name.trim().length >= 2 && whatsapp.trim().length >= 6;

  return (
    <footer
      id="contacto"
      className="bg-[#060D21] text-[#F2F0EB] pt-24 pb-12 px-5 sm:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Top 2-Column Conversion Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-20">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-black border border-white/25 text-white font-display font-black text-2xl flex items-center justify-center shadow-lg">
              N
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight leading-[1.06]">
              Cuéntame de{" "}
              <span className="inline-block bg-black text-white border border-[#7EA2DB]/45 px-3 py-0.5 mt-1">
                tu proyecto
              </span>
            </h2>
            <p className="text-base text-[#F2F0EB]/75 leading-relaxed">
              Sin compromisos ni llamadas eternas. Me cuentas qué necesitas y en
              menos de 24 horas te respondo con ideas concretas, tiempos y
              presupuesto estimado.
            </p>
            <div className="pt-2">
              <a
                href={directWa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#F2F0EB] hover:bg-black text-black hover:text-white border border-[#F2F0EB] px-6 py-3.5 text-xs sm:text-sm font-mono-tech font-semibold uppercase tracking-[0.12em] transition-all shadow-lg"
              >
                <span>Escríbeme directo por WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: 4-Step Guided Intake Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-black/45 border border-white/15 p-6 sm:p-8 backdrop-blur-sm space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-[#F2F0EB]/70">
                  <span>Paso {step} de 4</span>
                  <span className="text-white">{step * 25}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-300"
                    style={{ width: `${step * 25}%` }}
                  />
                </div>
              </div>

              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-xl sm:text-2xl">
                    Empecemos por ti
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-[#F2F0EB]/75 mb-1.5">
                        ¿Cómo te llamas?
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej. Carlos Mendoza"
                        className="w-full rounded-xl bg-[#030712] border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#F2F0EB]/75 mb-1.5">
                        Tu número de WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="Ej. +57 300 123 4567"
                        className="w-full rounded-xl bg-[#030712] border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      disabled={!canNextStep1}
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 rounded-full bg-black hover:bg-[#141923] border border-white/25 disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-2.5 text-sm font-semibold transition-all cursor-pointer"
                    >
                      <span>Siguiente</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-xl sm:text-2xl">
                    ¿Qué te gustaría construir?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SERVICE_OPTIONS.map((opt) => {
                      const active = service === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setService(opt)}
                          className={`text-left rounded-2xl p-4 border text-sm font-semibold transition-all cursor-pointer ${
                            active
                              ? "bg-white border-white text-black shadow-md"
                              : "bg-[#030712]/80 border-white/15 text-[#F2F0EB]/85 hover:border-white/40"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-white cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Atrás
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-2 rounded-full bg-black hover:bg-[#141923] border border-white/25 text-white px-6 py-2.5 text-sm font-semibold transition-all cursor-pointer"
                    >
                      <span>Siguiente</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-xl sm:text-2xl">
                    Cuéntame brevemente tu objetivo
                  </h3>
                  <textarea
                    rows={4}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Ej. Quiero una web moderna para captar clientes desde Instagram y un bot de WhatsApp que responda precios y agende citas..."
                    className="w-full rounded-xl bg-[#030712] border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-white resize-none"
                  />
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-white cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Atrás
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="inline-flex items-center gap-2 rounded-full bg-black hover:bg-[#141923] border border-white/25 text-white px-6 py-2.5 text-sm font-semibold transition-all cursor-pointer"
                    >
                      <span>Ver resumen</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2.5 text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                    <h3 className="font-display font-bold text-xl text-white">
                      ¡Todo listo, {name}!
                    </h3>
                  </div>
                  <div className="rounded-2xl bg-[#030712] border border-white/12 p-4 space-y-2 text-xs sm:text-sm text-white/80">
                    <div>
                      <span className="text-white/50">Servicio:</span>{" "}
                      <strong className="text-white">{service}</strong>
                    </div>
                    <div>
                      <span className="text-white/50">WhatsApp:</span>{" "}
                      <strong className="text-white">{whatsapp}</strong>
                    </div>
                    {details && (
                      <div>
                        <span className="text-white/50">Objetivo:</span>{" "}
                        <span>{details}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-white cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Editar
                    </button>
                    <a
                      href={buildWhatsAppUrl(summaryMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-[#F2F0EB] text-black px-6 py-3 text-sm font-bold shadow-lg transition-all"
                    >
                      <span>Enviar ahora por WhatsApp</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Minimalist Footer Bar */}
        <div className="pt-8 pr-0 sm:pr-20 border-t border-white/12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F2F0EB]/70">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-black border border-white/25 text-white font-display font-black text-xs flex items-center justify-center">
              N
            </span>
            <span className="font-display font-bold text-sm text-[#F2F0EB]">
              {SITE_CONFIG.brandName}
            </span>
            <span className="hidden md:inline">· {SITE_CONFIG.tagline}</span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={SITE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>{SITE_CONFIG.instagramHandle}</span>
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{SITE_CONFIG.email}</span>
            </a>
          </div>

          <div>© {new Date().getFullYear()} {SITE_CONFIG.brandName}</div>
        </div>
      </div>
    </footer>
  );
}
