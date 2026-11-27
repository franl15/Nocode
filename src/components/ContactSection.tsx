"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, CheckCircle2, Instagram, Mail } from "lucide-react";
import { buildWhatsAppUrl, SITE_CONFIG } from "@/lib/config";
import { SpotlightCard } from "@/components/SpotlightCard";
import { MascotN013D } from "@/components/MascotN013D";

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
      className="relative bg-[#000000] text-[#F2F0EB] pt-24 pb-12 px-5 sm:px-8"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Top 2-Column Conversion Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-20">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="type-mono uppercase text-[#9AA8BF] block">
              07 // CONTACTO
            </span>
            <h2 className="type-h2 text-[#F2F0EB]">
              Cuéntame de tu proyecto.
            </h2>
            <p className="type-body text-[#CBD4E3]">
              Sin llamadas eternas. Te respondo en menos de 24 horas con tiempos
              y presupuesto claro.
            </p>

            {/* 3D N-01 saludando (escritorio) + badge compacto (móvil) */}
            <div className="hidden lg:flex items-center gap-4 pt-1">
              <div className="shrink-0 -ml-3">
                <MascotN013D
                  pose="waving"
                  size={136}
                  label="N-01 en 3D saludando en la sección de contacto"
                />
              </div>
              <div className="rounded-[14px] bg-[#0A0A0D] border border-[#F2F0EB]/12 px-4 py-3 space-y-1">
                <div className="type-mono uppercase text-[#7EA2DB] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7EA2DB] animate-pulse" />
                  N-01 · EN LÍNEA
                </div>
                <div className="text-sm text-[#CBD4E3]">
                  Respuesta directa en &lt; 24h
                </div>
              </div>
            </div>

            <div className="lg:hidden inline-flex items-center gap-3.5 p-3 pr-5 rounded-[14px] bg-[#0A0A0D] border border-[#F2F0EB]/12">
              <div className="relative w-12 h-12 rounded-[10px] overflow-hidden border border-[#7EA2DB]/45 shrink-0 bg-[#000000]">
                <Image
                  src="/images/nocode-mascot.jpg"
                  alt="Mascota N-01 de NoCode"
                  width={48}
                  height={48}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="type-mono uppercase text-[#7EA2DB] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7EA2DB] animate-pulse" />
                  N-01 · EN LÍNEA
                </div>
                <div className="text-sm text-[#CBD4E3] mt-0.5">
                  Respuesta directa en &lt; 24h
                </div>
              </div>
            </div>
            <div className="pt-2">
              <a
                href={directWa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#F2F0EB] hover:bg-[#7EA2DB] text-[#000000] rounded-[8px] px-6 py-3.5 type-mono font-semibold uppercase transition-colors duration-300"
              >
                <span>Escríbeme directo por WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Clean Rounded-[16px] 4-Step Guided Intake Form */}
          <div className="lg:col-span-7">
            <SpotlightCard className="rounded-[16px] bg-[#0A0A0D] border border-[#F2F0EB]/12 p-6 sm:p-10 space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between type-mono font-semibold text-[#9AA8BF]">
                  <span>PASO 0{step} / 04</span>
                  <span className="text-[#7EA2DB] tabular-nums">{step * 25}%</span>
                </div>
                <div className="h-1 bg-[#000000] overflow-hidden">
                  <div
                    className="h-full bg-[#7EA2DB] transition-all duration-300"
                    style={{ width: `${step * 25}%` }}
                  />
                </div>
              </div>

              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="type-h3 text-[#F2F0EB]">
                    Empecemos por ti
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block type-mono uppercase text-[#9AA8BF] mb-1.5"
                      >
                        ¿Cómo te llamas?
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej. Carlos Mendoza"
                        className="w-full bg-[#000000] border border-[#F2F0EB]/18 rounded-[8px] px-4 py-3 text-base text-[#F2F0EB] placeholder:text-[#9AA8BF]/65 focus:outline-none focus:border-[#7EA2DB]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-wa"
                        className="block type-mono uppercase text-[#9AA8BF] mb-1.5"
                      >
                        Tu número de WhatsApp
                      </label>
                      <input
                        id="contact-wa"
                        name="whatsapp"
                        type="tel"
                        autoComplete="tel"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="Ej. +57 321 921 2455"
                        className="w-full bg-[#000000] border border-[#F2F0EB]/18 rounded-[8px] px-4 py-3 text-base text-[#F2F0EB] placeholder:text-[#9AA8BF]/65 focus:outline-none focus:border-[#7EA2DB]"
                      />
                    </div>
                  </div>
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      disabled={!canNextStep1}
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 bg-[#F2F0EB] hover:bg-[#7EA2DB] text-[#000000] rounded-[8px] disabled:opacity-35 disabled:cursor-not-allowed px-6 py-3 type-mono uppercase font-semibold transition-colors duration-300 cursor-pointer"
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
                  <h3 className="type-h3 text-[#F2F0EB]">
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
                          className={`text-left p-4 border rounded-[8px] text-sm font-semibold transition-colors cursor-pointer ${
                            active
                              ? "bg-[#F2F0EB] border-[#F2F0EB] text-[#000000]"
                              : "bg-[#000000] border-[#F2F0EB]/16 text-[#F2F0EB] hover:border-[#7EA2DB]"
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
                      className="inline-flex items-center gap-1.5 type-mono uppercase text-[#9AA8BF] hover:text-[#F2F0EB] transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Atrás
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-2 bg-[#F2F0EB] hover:bg-[#7EA2DB] text-[#000000] rounded-[8px] px-6 py-3 type-mono uppercase font-semibold transition-colors duration-300 cursor-pointer"
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
                  <label
                    htmlFor="contact-details"
                    className="block type-h3 text-[#F2F0EB]"
                  >
                    Cuéntame brevemente tu objetivo
                  </label>
                  <textarea
                    id="contact-details"
                    rows={4}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Ej. Quiero una web moderna para captar clientes desde Instagram y un bot de WhatsApp que responda precios y agende citas..."
                    className="w-full bg-[#000000] border border-[#F2F0EB]/18 rounded-[8px] px-4 py-3 text-base text-[#F2F0EB] placeholder:text-[#9AA8BF]/65 focus:outline-none focus:border-[#7EA2DB] resize-none"
                  />
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-1.5 type-mono uppercase text-[#9AA8BF] hover:text-[#F2F0EB] transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Atrás
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="inline-flex items-center gap-2 bg-[#F2F0EB] hover:bg-[#7EA2DB] text-[#000000] rounded-[8px] px-6 py-3 type-mono uppercase font-semibold transition-colors duration-300 cursor-pointer"
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
                  <div className="flex items-center gap-2.5 text-[#7EA2DB]">
                    <CheckCircle2 className="w-5 h-5" />
                    <h3 className="type-h3 text-[#F2F0EB]">
                      Todo listo, {name}
                    </h3>
                  </div>
                  <div className="bg-[#000000] border border-[#F2F0EB]/14 p-5 space-y-2.5 text-sm text-[#CBD4E3]">
                    <div>
                      <span className="text-[#9AA8BF] type-mono uppercase">
                        Servicio:
                      </span>{" "}
                      <strong className="text-[#F2F0EB]">{service}</strong>
                    </div>
                    <div>
                      <span className="text-[#9AA8BF] type-mono uppercase">
                        WhatsApp:
                      </span>{" "}
                      <strong className="text-[#F2F0EB]">{whatsapp}</strong>
                    </div>
                    {details && (
                      <div>
                        <span className="text-[#9AA8BF] type-mono uppercase">
                          Objetivo:
                        </span>{" "}
                        <span>{details}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-1.5 type-mono uppercase text-[#9AA8BF] hover:text-[#F2F0EB] transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Editar
                    </button>
                    <a
                      href={buildWhatsAppUrl(summaryMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#F2F0EB] hover:bg-[#7EA2DB] text-[#000000] rounded-[8px] px-6 py-3 type-mono uppercase font-semibold transition-colors duration-300"
                    >
                      <span>Enviar ahora por WhatsApp</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}
            </SpotlightCard>
          </div>
        </div>

        {/* Minimalist Footer Bar */}
        <div className="pt-8 pr-0 sm:pr-20 border-t border-[#F2F0EB]/14 flex flex-col sm:flex-row items-center justify-between gap-4 type-mono text-[#9AA8BF]">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 bg-[#0A0A0D] border border-[#F2F0EB]/22 rounded-[6px] text-[#F2F0EB] font-display font-semibold text-xs flex items-center justify-center">
              N
            </span>
            <span className="font-display font-medium text-sm text-[#F2F0EB]">
              {SITE_CONFIG.brandName}
            </span>
            <span className="hidden md:inline text-[#9AA8BF]">
              · {SITE_CONFIG.tagline}
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={SITE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#9AB8E8] transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>{SITE_CONFIG.instagramHandle}</span>
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="inline-flex items-center gap-1.5 hover:text-[#9AB8E8] transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{SITE_CONFIG.email}</span>
            </a>
          </div>

          <div>
            © {new Date().getFullYear()} {SITE_CONFIG.brandName}
          </div>
        </div>
      </div>
    </footer>
  );
}
