"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Bot, Check, BarChart3, Globe } from "lucide-react";
import {
  DeviceShowcase3D,
  type ShowcaseCapture,
} from "@/components/DeviceShowcase3D";
import { MascotN013D } from "@/components/MascotN013D";

interface ProjectCase {
  id: string;
  category: "todos" | "ai" | "web" | "software";
  badge: string;
  title: string;
  desc: string;
  metric: string;
  domain: string;
  accessibleSummary: string;
  kind: "ai" | "web" | "software";
  desktopImage?: ShowcaseCapture;
  mobileImage?: ShowcaseCapture;
}

const PROJECTS: ProjectCase[] = [
  {
    id: "whatsapp-ia",
    category: "ai",
    badge: "AUTOMATIZACIÓN IA // EN PRODUCCIÓN",
    title: "Agente de WhatsApp + Agenda Automática",
    desc: "Responde dudas, cotiza y confirma citas en Google Calendar sin intervención humana.",
    metric: "+38 citas agendadas / semana",
    domain: "crm.nocode.studio/whatsapp-ia",
    accessibleSummary:
      "Vista en laptop y celular del agente de WhatsApp con IA activo 24/7, mostrando conversaciones automatizadas, confirmación de citas y sincronización en tiempo real con Google Calendar y CRM.",
    kind: "ai",
    desktopImage: {
      src: "/images/casos/caso-01-desktop.jpg",
      width: 1408,
      height: 768,
      alt: "Consola operativa de escritorio del agente de WhatsApp con IA y agenda automática sincronizada con CRM",
    },
  },
  {
    id: "estudio-b2b",
    category: "web",
    badge: "DISEÑO WEB // ALTA CONVERSIÓN",
    title: "Landing & Catálogo de Autor para Estudio B2B",
    desc: "Velocidad sub-segundo (0.6s) y embudo directo hacia WhatsApp y formulario calificado.",
    metric: "3.2x más solicitudes calificadas",
    domain: "atelier-vera.studio",
    accessibleSummary:
      "Vista en laptop y celular de la landing editorial B2B en Next.js con puntuación Lighthouse 99, tiempo de carga de 0.6 segundos y embudo directo hacia WhatsApp.",
    kind: "web",
    desktopImage: {
      src: "/images/casos/caso-02-desktop.jpg",
      width: 1408,
      height: 768,
      alt: "Landing y catálogo editorial de escritorio para estudio de arquitectura B2B Atelier Vera",
    },
  },
  {
    id: "panel-operativo",
    category: "software",
    badge: "SOFTWARE A MEDIDA // DASHBOARD",
    title: "Panel Operativo y Cotizador en Tiempo Real",
    desc: "Reemplazó 6 hojas de Excel: genera cotizaciones PDF en 10s y notifica a ventas.",
    metric: "-42 horas manuales al mes",
    domain: "app.operaciones-v2.co",
    accessibleSummary:
      "Vista en laptop y celular del panel operativo interno con 42 cotizaciones activas, 68.4 por ciento de aprobación y generación automática de PDF en 10 segundos.",
    kind: "software",
    desktopImage: {
      src: "/images/casos/caso-03-desktop.jpg",
      width: 1408,
      height: 768,
      alt: "Dashboard operativo de escritorio y cotizador PDF en tiempo real con métricas comerciales",
    },
  },
];

const FILTERS = [
  { key: "todos", label: "Todos" },
  { key: "ai", label: "Automatización IA" },
  { key: "web", label: "Diseño Web" },
  { key: "software", label: "Software a Medida" },
] as const;

function DesktopFallbackScreen({ kind }: { kind: ProjectCase["kind"] }) {
  if (kind === "ai") {
    return (
      <div className="p-5 sm:p-6 space-y-5 bg-[#000000] text-[#F2F0EB]">
        <div className="flex items-center justify-between text-xs font-mono-tech border-b border-[#F2F0EB]/12 pb-3">
          <span className="inline-flex items-center gap-1.5 font-semibold text-[#F2F0EB]">
            <Bot className="w-4 h-4 text-[#7EA2DB]" /> FLUJO WHATSAPP IA
          </span>
          <span className="px-2 py-0.5 border border-[#7EA2DB]/45 bg-[#0A0A0D] text-[#7EA2DB] text-xs font-semibold">
            ACTIVO 24/7
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono-tech text-[#9AA8BF]">
          <Check className="w-3.5 h-3.5 text-[#7EA2DB]" />
          <span>Sincronizado con Google Calendar &amp; CRM</span>
        </div>
      </div>
    );
  }
  if (kind === "web") {
    return (
      <div className="p-5 sm:p-6 space-y-4 bg-[#000000] text-[#F2F0EB]">
        <div className="flex items-center justify-between text-xs border-b border-[#F2F0EB]/12 pb-3 font-mono-tech">
          <span className="font-semibold flex items-center gap-1.5 text-[#F2F0EB]">
            <Globe className="w-3.5 h-3.5 text-[#7EA2DB]" /> estudio-pro.co
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="p-5 sm:p-6 space-y-4 bg-[#000000] text-[#F2F0EB]">
      <div className="flex items-center justify-between text-xs font-mono-tech border-b border-[#F2F0EB]/12 pb-3">
        <span className="inline-flex items-center gap-1.5 font-semibold text-[#F2F0EB]">
          <BarChart3 className="w-4 h-4 text-[#7EA2DB]" /> PANEL OPERATIVO V2
        </span>
      </div>
    </div>
  );
}

function MobileFallbackScreen({ kind }: { kind: ProjectCase["kind"] }) {
  if (kind === "ai") {
    return (
      <div className="min-h-[290px] p-2.5 bg-[#0B0D14] text-[#F2F0EB] flex flex-col justify-between gap-2.5">
        <div className="space-y-2">
          <div className="flex items-center justify-between border-b border-[#F2F0EB]/10 pb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#7EA2DB]/25 border border-[#7EA2DB]/50 flex items-center justify-center text-[8px] font-semibold text-[#F2F0EB]">
                SN
              </span>
              <div>
                <div className="text-[9px] font-semibold leading-none">Sofía N.</div>
                <div className="text-[7px] text-[#34D399] flex items-center gap-1 mt-0.5">
                  <span className="w-1 h-1 rounded-full bg-[#34D399]" /> IA 24/7
                </div>
              </div>
            </div>
            <span className="px-1.5 py-0.5 rounded-full bg-[#34D399]/15 border border-[#34D399]/40 text-[7px] text-[#34D399] font-mono-tech">
              LIVE
            </span>
          </div>

          <div className="bg-[#161B26] border border-[#F2F0EB]/10 rounded-[8px] p-1.5 text-[8px] leading-snug text-[#CBD4E3]">
            Hola, quiero agendar demo mañana
          </div>
          <div className="ml-3 bg-gradient-to-br from-[#3B5998] to-[#5B84C4] rounded-[8px] p-1.5 text-[8px] leading-snug text-[#FFFFFF]">
            ¡Claro! Tengo espacio a las 11:00 o 16:30
          </div>
          <div className="bg-[#121C18] border border-[#34D399]/45 rounded-[8px] p-2 space-y-1">
            <div className="flex items-center justify-between text-[8px] font-semibold text-[#34D399]">
              <span>Cita confirmada</span>
              <span>11:00</span>
            </div>
            <div className="text-[7px] text-[#CBD4E3]">
              Google Calendar · Sync CRM
            </div>
          </div>
        </div>

        <div className="rounded-[8px] bg-[#12151E] border border-[#F2F0EB]/10 p-2">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] font-semibold text-[#F2F0EB]">94%</span>
            <span className="text-[7px] text-[#9AA8BF]">Conversión</span>
          </div>
          <svg viewBox="0 0 100 24" className="w-full h-5 mt-1" aria-hidden="true">
            <path
              d="M2 20 C18 18, 26 8, 42 12 C56 16, 68 4, 82 9 C90 12, 95 6, 98 3"
              fill="none"
              stroke="#34D399"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    );
  }

  if (kind === "web") {
    return (
      <div className="min-h-[290px] bg-[#0B0D12] text-[#F2F0EB] flex flex-col">
        <div className="relative h-40 w-full overflow-hidden">
          <Image
            src="/images/casos/caso-02-desktop.jpg"
            alt="Vista móvil de Atelier Vera"
            fill
            sizes="150px"
            className="object-cover object-[86%_35%] scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-[#0B0D12]/35 to-[#0B0D12]/40" />
          <div className="relative z-10 p-2.5 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between text-[7px] tracking-widest text-[#F2F0EB]/90 font-semibold">
              <span>ATELIER VERA</span>
              <span>MENU</span>
            </div>
            <div className="space-y-1.5">
              <div className="text-[11px] font-semibold leading-tight tracking-tight">
                SCULPTING SILENCE
              </div>
              <span className="inline-block bg-[#F2F0EB] text-[#000000] text-[7px] font-semibold px-2 py-0.5 rounded-full">
                EXPLORE WORK
              </span>
            </div>
          </div>
        </div>

        <div className="p-2.5 space-y-1.5 flex-1 bg-[#0B0D12]">
          <div className="rounded-[6px] bg-[#141720] border border-[#F2F0EB]/12 p-2 flex items-center justify-between">
            <div>
              <div className="text-[7px] text-[#9AA8BF] font-mono-tech">01</div>
              <div className="text-[8px] font-semibold">VILLA SOLIS</div>
            </div>
            <span className="text-[7px] text-[#7EA2DB]">0.6s</span>
          </div>
          <div className="rounded-[6px] bg-[#141720] border border-[#F2F0EB]/12 p-2 flex items-center justify-between">
            <div>
              <div className="text-[7px] text-[#9AA8BF] font-mono-tech">02</div>
              <div className="text-[8px] font-semibold">PAVILION K</div>
            </div>
            <span className="text-[7px] text-[#7EA2DB]">99</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[290px] p-2.5 bg-[#090B10] text-[#F2F0EB] flex flex-col justify-between gap-2">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-semibold text-[#CBD4E3]">Overview</span>
          <span className="px-1.5 py-0.5 rounded-[4px] bg-[#7EA2DB]/20 border border-[#7EA2DB]/45 text-[7px] text-[#9AB8E8]">
            + Quote
          </span>
        </div>

        <div className="rounded-[8px] bg-[#12151E] border border-[#F2F0EB]/10 p-2 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[7px] text-[#9AA8BF]">Revenue</span>
            <span className="text-[7px] text-[#34D399] font-semibold">+18.4%</span>
          </div>
          <div className="text-[13px] font-semibold tracking-tight">$284,500</div>
          <svg viewBox="0 0 100 32" className="w-full h-8" aria-hidden="true">
            <defs>
              <linearGradient id="mobAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#67E8F9" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 28 C18 22, 32 24, 48 16 C64 9, 80 11, 100 3 L100 32 L0 32 Z"
              fill="url(#mobAreaGrad)"
            />
            <path
              d="M0 28 C18 22, 32 24, 48 16 C64 9, 80 11, 100 3"
              fill="none"
              stroke="#67E8F9"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="space-y-1">
          {[
            { name: "Grupo Norte", amt: "$18.4k", status: "Approved", cls: "bg-[#34D399]/20 text-[#34D399]" },
            { name: "Studio K", amt: "$42.0k", status: "Review", cls: "bg-[#7EA2DB]/20 text-[#9AB8E8]" },
            { name: "Clínica Sur", amt: "$9.6k", status: "Sent", cls: "bg-[#38BDF8]/20 text-[#7DD3FC]" },
          ].map((row) => (
            <div
              key={row.name}
              className="rounded-[6px] bg-[#12151E] border border-[#F2F0EB]/8 px-2 py-1.5 flex items-center justify-between text-[7px]"
            >
              <span className="text-[#CBD4E3] font-medium truncate">{row.name}</span>
              <span className={`px-1.5 py-0.5 rounded-full font-semibold ${row.cls}`}>
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState<
    "todos" | "ai" | "web" | "software"
  >("todos");

  const visibleProjects =
    activeFilter === "todos"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  // Transiciones Awwwards-style (perspectiva 3D + clip-path reveal con GSAP ScrollTrigger bajo demanda, solo escritorio)
  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isDesktop || reduced) return;

    const section = sectionRef.current;
    if (!section) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();

        void Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]).then(([{ default: gsap }, { ScrollTrigger }]) => {
          if (cancelled || !sectionRef.current) return;
          gsap.registerPlugin(ScrollTrigger);

          const ctx = gsap.context(() => {
            const rows = gsap.utils.toArray<HTMLElement>(".portfolio-case-row");
            rows.forEach((row) => {
              const media = row.querySelector<HTMLElement>(".portfolio-case-media");
              const copy = row.querySelector<HTMLElement>(".portfolio-case-copy");

              if (media) {
                gsap.fromTo(
                  media,
                  {
                    y: 44,
                    scale: 0.94,
                    opacity: 0.25,
                    clipPath: "inset(8% 0% 8% 0% round 12px)",
                  },
                  {
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    clipPath: "inset(0% 0% 0% 0% round 0px)",
                    duration: 1.05,
                    ease: "power3.out",
                    scrollTrigger: {
                      trigger: row,
                      start: "top 84%",
                      end: "top 38%",
                      scrub: 0.55,
                    },
                  }
                );
              }

              if (copy) {
                gsap.fromTo(
                  copy,
                  { y: 32, opacity: 0.2 },
                  {
                    y: 0,
                    opacity: 1,
                    duration: 0.85,
                    ease: "power3.out",
                    scrollTrigger: {
                      trigger: row,
                      start: "top 82%",
                      end: "top 44%",
                      scrub: 0.45,
                    },
                  }
                );
              }
            });
          }, sectionRef);

          revert = () => ctx.revert();
        });
      },
      { rootMargin: "240px 0px 240px 0px" }
    );

    io.observe(section);

    return () => {
      cancelled = true;
      io.disconnect();
      revert?.();
    };
  }, [activeFilter]);

  return (
    <section
      ref={sectionRef}
      id="proyectos"
      className="relative overflow-x-clip bg-[#000000] text-[#F2F0EB] py-24 sm:py-32 px-5 sm:px-8 border-b border-[#F2F0EB]/12"
    >
      <div className="max-w-[1440px] mx-auto space-y-16">
        {/* Header + Filter Pills (estilo dark.design, botones redondeados 8px) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <span className="type-mono uppercase text-[#9AA8BF] block">
              05 // CASOS Y DESARROLLOS
            </span>
            <h2 className="type-h2 text-[#F2F0EB]">
              Sistemas reales, resultados medibles.
            </h2>
            <p className="type-body text-[#CBD4E3]">
              Cada proyecto combina diseño limpio, velocidad técnica y automatización
              pensada para vender y ahorrar horas.
            </p>
          </div>

          <div className="flex flex-col lg:items-end gap-4">
            <div className="hidden lg:flex items-center gap-3">
              <div className="text-right">
                <div className="type-mono uppercase text-[#7EA2DB]">
                  N-01 // SHOWCASE
                </div>
                <div className="text-xs text-[#9AA8BF]">
                  Sistemas en producción
                </div>
              </div>
              <MascotN013D
                pose="presenting"
                size={120}
                label="N-01 en 3D presentando los desarrollos"
              />
            </div>

            <div className="inline-flex flex-wrap items-center gap-2">
              {FILTERS.map((f) => {
                const active = activeFilter === f.key;
                return (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setActiveFilter(f.key)}
                    className={`px-4 py-2 type-mono uppercase rounded-[8px] border transition-all duration-300 cursor-pointer ${
                      active
                        ? "bg-[#F2F0EB] text-[#000000] border-[#F2F0EB] font-semibold"
                        : "bg-[#0A0A0D] text-[#9AA8BF] border-[#F2F0EB]/16 hover:border-[#7EA2DB] hover:text-[#F2F0EB]"
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Case Study Rows con transiciones 3D + clip-path reveal */}
        <div className="relative z-10 space-y-24">
          {visibleProjects.map((project, idx) => {
            const reversed = idx % 2 === 1;
            return (
              <div
                key={project.id}
                className="portfolio-case-row grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-12 border-t border-[#F2F0EB]/14 first:border-t-0 first:pt-0"
              >
                <div
                  className={`portfolio-case-media lg:col-span-7 ${
                    reversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <DeviceShowcase3D
                    title={project.title}
                    accessibleSummary={project.accessibleSummary}
                    orientation={reversed ? "right" : "left"}
                    domainLabel={project.domain}
                    desktopImage={project.desktopImage}
                    mobileImage={project.mobileImage}
                    desktopFallback={<DesktopFallbackScreen kind={project.kind} />}
                    mobileFallback={<MobileFallbackScreen kind={project.kind} />}
                  />
                </div>

                <div
                  className={`portfolio-case-copy lg:col-span-5 space-y-5 ${
                    reversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <span className="inline-block bg-[#0A0A0D] border border-[#F2F0EB]/16 rounded-[8px] px-3.5 py-1.5 type-mono uppercase font-medium text-[#9AA8BF]">
                    {project.badge}
                  </span>
                  <h3 className="type-h3 text-[#F2F0EB]">
                    {project.title}
                  </h3>
                  <p className="type-body text-[#CBD4E3]">
                    {project.desc}
                  </p>
                  <div className="type-mono uppercase font-semibold text-[#7EA2DB]">
                    {project.metric}
                  </div>
                  <div className="pt-2">
                    <a
                      href="#contacto"
                      className="inline-flex items-center gap-2.5 bg-[#F2F0EB] hover:bg-[#7EA2DB] text-[#000000] rounded-[8px] px-6 py-3 type-mono uppercase font-semibold transition-colors duration-300"
                    >
                      <span>Quiero algo así</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
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
