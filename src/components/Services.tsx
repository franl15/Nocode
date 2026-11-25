"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    num: "01",
    title: "Páginas Web de Alto Impacto",
    desc: "Arquitectura editorial en Next.js y Tailwind optimizada para conversión, velocidad sub-segundo y posicionamiento técnico desde el día uno.",
    deliverables: ["Next.js / React", "SEO Técnico", "Embudo WhatsApp"],
    tag: "WEB",
  },
  {
    num: "02",
    title: "Automatizaciones & Agentes IA",
    desc: "Flujos autónomos en WhatsApp Business, correo y CRM que atienden consultas, califican clientes potenciales y agendan reuniones 24/7.",
    deliverables: ["WhatsApp IA", "n8n / Make", "CRM Sync"],
    tag: "MÁS SOLICITADO",
    featured: true,
  },
  {
    num: "03",
    title: "Software a Medida",
    desc: "Dashboards operativos, cotizadores internos en PDF, portales privados de clientes y aplicaciones web construidas sin plantillas rígidas.",
    deliverables: ["Full-Stack", "Dashboards", "Base de Datos"],
    tag: "SISTEMAS",
  },
  {
    num: "04",
    title: "Rediseño & Optimización CRO",
    desc: "Auditamos tu sitio actual, eliminamos cuellos de botella de velocidad y reescribimos la arquitectura visual para multiplicar conversiones.",
    deliverables: ["Auditoría UX", "Core Web Vitals", "Mobile-First"],
    tag: "OPTIMIZACIÓN",
  },
  {
    num: "05",
    title: "Integraciones & APIs",
    desc: "Conectamos pasarelas de pago, inventarios, facturación electrónica y mensajería para erradicar el trabajo manual duplicado.",
    deliverables: ["Webhooks", "APIs REST", "Sincronización"],
    tag: "BACKEND",
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".service-row", {
        y: 30,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-list",
          start: "top 82%",
          once: true,
        },
        clearProps: "transform",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="bg-[#F2F0EB] text-[#060D21] pt-14 pb-24 sm:pt-20 sm:pb-28 px-5 sm:px-8 border-b border-[#060D21]/15"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Asymmetric Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-16">
          <div className="lg:col-span-8 space-y-4">
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[#475575] block">
              01 // CAPACIDADES
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-[-0.03em] leading-[1.02]">
              Ingeniería enfocada en retorno, no en adornos.
            </h2>
          </div>
          <div className="lg:col-span-4 text-sm sm:text-base text-[#475575] leading-relaxed">
            Cada entrega se construye con código limpio, arquitectura modular y
            control total para tu equipo.
          </div>
        </div>

        {/* Editorial Exposed-Grid Service Rows */}
        <div className="services-list border-t border-[#060D21]/20">
          {SERVICES.map((item) => (
            <a
              key={item.num}
              href="#contacto"
              className="service-row group grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start lg:items-center py-8 sm:py-10 border-b border-[#060D21]/15 transition-colors duration-300 hover:bg-[#060D21] hover:text-[#F2F0EB] px-2 sm:px-5 -mx-2 sm:-mx-5"
            >
              <div className="lg:col-span-1 font-mono-tech text-sm font-semibold text-black group-hover:text-[#7EA2DB] transition-colors">
                /{item.num}
              </div>

              <div className="lg:col-span-4 space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                    {item.title}
                  </h3>
                </div>
                <span
                  className={`inline-block font-mono-tech text-[10px] uppercase tracking-[0.18em] px-2 py-0.5 border ${
                    item.featured
                      ? "bg-black text-white border-black group-hover:bg-[#F2F0EB] group-hover:text-black"
                      : "border-[#060D21]/25 text-[#475575] group-hover:border-[#F2F0EB]/25 group-hover:text-[#F2F0EB]/70"
                  }`}
                >
                  {item.tag}
                </span>
              </div>

              <div className="lg:col-span-5 text-sm sm:text-base text-[#475575] group-hover:text-[#F2F0EB]/75 leading-relaxed transition-colors">
                {item.desc}
              </div>

              <div className="lg:col-span-2 flex items-center justify-between lg:justify-end gap-4">
                <div className="flex flex-wrap gap-1.5 lg:hidden">
                  {item.deliverables.map((d) => (
                    <span
                      key={d}
                      className="font-mono-tech text-[10px] uppercase px-2 py-0.5 border border-current opacity-70"
                    >
                      {d}
                    </span>
                  ))}
                </div>
                <span className="w-11 h-11 border border-[#060D21]/25 group-hover:border-[#F2F0EB]/40 group-hover:bg-black group-hover:text-white flex items-center justify-center transition-all shrink-0">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
