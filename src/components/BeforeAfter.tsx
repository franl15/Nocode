"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";

interface Scenario {
  id: "web" | "whatsapp" | "software";
  tab: string;
  before: {
    badge: string;
    metric: string;
    metricLabel: string;
    barWidth: string;
    points: string[];
  };
  after: {
    badge: string;
    metric: string;
    metricLabel: string;
    barWidth: string;
    points: string[];
  };
}

const SCENARIOS: Scenario[] = [
  {
    id: "web",
    tab: "Web & Velocidad",
    before: {
      badge: "SIN OPTIMIZAR",
      metric: "6.2s",
      metricLabel: "CARGA LENTA EN MÓVIL",
      barWidth: "24%",
      points: [
        "Plantilla pesada que ahuyenta visitas",
        "Propuesta confusa sin ruta clara",
        "Formularios lentos o sin respuesta",
      ],
    },
    after: {
      badge: "CON NOCODE · NEXT.JS",
      metric: "0.6s",
      metricLabel: "CARGA INSTANTÁNEA (90+ MOBILE)",
      barWidth: "96%",
      points: [
        "Carga sub-segundo desde Instagram y Google",
        "Propuesta clara en menos de 5 segundos",
        "Cotización directa a WhatsApp en 1 clic",
      ],
    },
  },
  {
    id: "whatsapp",
    tab: "WhatsApp IA",
    before: {
      badge: "ATENCIÓN MANUAL",
      metric: "4h",
      metricLabel: "DEMORA EN RESPONDER",
      barWidth: "20%",
      points: [
        "Chats acumulados y clientes perdidos",
        "Precios repetidos a mano todo el día",
        "Citas sin recordatorio ni seguimiento",
      ],
    },
    after: {
      badge: "AGENTE IA 24/7",
      metric: "3s",
      metricLabel: "RESPUESTA Y AGENDA AUTÓNOMA",
      barWidth: "98%",
      points: [
        "Responde tarifas y dudas al instante",
        "Agenda directo en tu Google Calendar",
        "Sincronizado con CRM y recordatorios",
      ],
    },
  },
  {
    id: "software",
    tab: "Software Interno",
    before: {
      badge: "HOJAS SUELTAS",
      metric: "40m",
      metricLabel: "POR COTIZACIÓN MANUAL",
      barWidth: "22%",
      points: [
        "6 archivos de Excel desconectados",
        "Cotizaciones manuales con errores",
        "Cero visibilidad en tiempo real",
      ],
    },
    after: {
      badge: "PANEL A MEDIDA",
      metric: "10s",
      metricLabel: "COTIZACIÓN PDF AUTOMÁTICA",
      barWidth: "95%",
      points: [
        "PDF generado y enviado en 1 clic",
        "Ventas y finanzas en una sola base",
        "-42 horas operativas cada mes",
      ],
    },
  },
];

export function BeforeAfter() {
  const [activeId, setActiveId] = useState<Scenario["id"]>("web");
  const scenario = SCENARIOS.find((s) => s.id === activeId) ?? SCENARIOS[0];

  return (
    <section
      id="antes-despues"
      className="relative bg-[#000000] text-[#F2F0EB] py-24 sm:py-28 px-5 sm:px-8 border-b border-[#F2F0EB]/12"
    >
      <div className="max-w-[1440px] mx-auto space-y-10">
        {/* Header + Scenario Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-xl space-y-3">
            <span className="type-mono uppercase text-[#9AA8BF] block">
              02 // ANTES VS. DESPUÉS
            </span>
            <h2 className="type-h2 text-[#F2F0EB]">
              Lo bueno, a la vista.
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Escenarios comparativos"
            className="inline-flex flex-wrap items-center gap-2 bg-[#0A0A0D] border border-[#F2F0EB]/12 p-1.5 rounded-[12px] self-start"
          >
            {SCENARIOS.map((item) => {
              const active = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveId(item.id)}
                  className={`px-4 py-2 type-mono uppercase rounded-[8px] transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    active
                      ? "bg-[#F2F0EB] text-[#000000] font-semibold"
                      : "text-[#9AA8BF] hover:text-[#F2F0EB] hover:bg-[#14141A]"
                  }`}
                >
                  {item.tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Clean Dark Bento with Speed Bars */}
        <div
          key={scenario.id}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* BEFORE */}
          <article className="rounded-[16px] bg-[#0A0A0D] border border-[#F2F0EB]/10 p-8 sm:p-10 flex flex-col justify-between gap-7">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 type-mono uppercase text-[#9AA8BF] bg-[#14141A] border border-[#F2F0EB]/10 rounded-[8px] px-3 py-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-[#9AA8BF]" />
                {scenario.before.badge}
              </span>

              <div className="space-y-3">
                <div className="type-metric text-[#9AA8BF]">
                  {scenario.before.metric}
                </div>
                <div className="type-mono uppercase text-[#9AA8BF]/80">
                  {scenario.before.metricLabel}
                </div>
                <div className="h-1.5 rounded-full bg-[#14141A] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#9AA8BF]/45 transition-all duration-500"
                    style={{ width: scenario.before.barWidth }}
                  />
                </div>
              </div>

              <ul className="space-y-3 pt-2">
                {scenario.before.points.map((pt) => (
                  <li
                    key={pt}
                    className="flex items-center gap-3 text-[16px] text-[#9AA8BF]"
                  >
                    <span
                      aria-hidden="true"
                      className="w-1.5 h-1.5 rounded-full bg-[#9AA8BF]/45 shrink-0"
                    />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* AFTER */}
          <article className="relative overflow-hidden rounded-[16px] bg-[#0A0A0D] border border-[#7EA2DB]/40 p-8 sm:p-10 flex flex-col justify-between gap-7">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0"
              style={{
                background:
                  "radial-gradient(70% 60% at 85% 0%, rgba(126,162,219,0.14) 0%, rgba(10,10,13,0) 70%)",
              }}
            />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 type-mono uppercase text-[#7EA2DB] bg-[#14141A] border border-[#7EA2DB]/35 rounded-[8px] px-3 py-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7EA2DB]" />
                  {scenario.after.badge}
                </span>
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-1.5 type-mono uppercase text-[#7EA2DB] hover:text-[#9AB8E8] transition-colors"
                >
                  <span>Implementarlo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="space-y-3">
                <div className="type-metric text-[#7EA2DB]">
                  {scenario.after.metric}
                </div>
                <div className="type-mono uppercase text-[#CBD4E3]">
                  {scenario.after.metricLabel}
                </div>
                <div className="h-1.5 rounded-full bg-[#14141A] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#7EA2DB] transition-all duration-500"
                    style={{ width: scenario.after.barWidth }}
                  />
                </div>
              </div>

              <ul className="space-y-3 pt-2">
                {scenario.after.points.map((pt) => (
                  <li
                    key={pt}
                    className="flex items-center gap-3 text-[16px] text-[#F2F0EB]"
                  >
                    <span
                      aria-hidden="true"
                      className="w-1.5 h-1.5 rounded-full bg-[#7EA2DB] shrink-0"
                    />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
