"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    num: "01",
    title: "Páginas Web de Alto Impacto",
    desc: "Sitios sub-segundo en Next.js diseñados para convertir visitas en clientes.",
    deliverables: ["Next.js", "SEO Técnico", "WhatsApp"],
    tag: "WEB",
  },
  {
    num: "02",
    title: "Automatizaciones & Agentes IA",
    desc: "Agentes en WhatsApp y CRM que responden, califican y agendan 24/7.",
    deliverables: ["WhatsApp IA", "n8n / Make", "CRM Sync"],
    tag: "MÁS SOLICITADO",
    featured: true,
  },
  {
    num: "03",
    title: "Software a Medida",
    desc: "Dashboards, cotizadores PDF y portales internos sin plantillas rígidas.",
    deliverables: ["Full-Stack", "Dashboards", "APIs"],
    tag: "SISTEMAS",
  },
  {
    num: "04",
    title: "Rediseño & Optimización CRO",
    desc: "Eliminamos lentitud y fricción para multiplicar tus solicitudes.",
    deliverables: ["UX / UI", "Core Web Vitals", "Mobile-First"],
    tag: "OPTIMIZACIÓN",
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const section = sectionRef.current;
    if (!section) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    // Importar GSAP/ScrollTrigger bajo demanda solo cuando el usuario se acerca a #servicios
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
            gsap.from(".service-row", {
              y: 24,
              duration: 0.7,
              stagger: 0.07,
              ease: "power3.out",
              immediateRender: false,
              scrollTrigger: {
                trigger: ".services-list",
                start: "top 86%",
                once: true,
              },
              clearProps: "transform",
            });
          }, sectionRef);

          revert = () => ctx.revert();
        });
      },
      { rootMargin: "260px 0px 260px 0px" }
    );

    io.observe(section);

    return () => {
      cancelled = true;
      io.disconnect();
      revert?.();
    };
  }, []);

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="relative bg-[#000000] text-[#F2F0EB] py-24 sm:py-32 px-5 sm:px-8 border-b border-[#F2F0EB]/12"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Asymmetric Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-14">
          <div className="lg:col-span-8 space-y-4">
            <span className="type-mono uppercase text-[#9AA8BF] block">
              03 // CAPACIDADES
            </span>
            <h2 className="type-h2 text-[#F2F0EB]">
              Ingeniería enfocada en retorno, no en adornos.
            </h2>
          </div>
          <p className="lg:col-span-4 type-body text-[#CBD4E3]">
            Cada entrega se construye con código limpio, arquitectura modular y
            control total para tu equipo.
          </p>
        </div>

        {/* Clean Rounded-[16px] Service Cards */}
        <div className="services-list space-y-3">
          {SERVICES.map((item) => (
            <a
              key={item.num}
              href="#contacto"
              className="service-row group grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start lg:items-center p-6 sm:p-8 rounded-[16px] bg-[#0A0A0D] border border-[#F2F0EB]/10 hover:bg-[#14141A] hover:border-[#7EA2DB]/40 transition-colors duration-300"
            >
              <div className="lg:col-span-1 type-mono font-semibold text-[#7EA2DB]">
                /{item.num}
              </div>

              <div className="lg:col-span-4 space-y-2.5">
                <h3 className="type-h3 text-[#F2F0EB] transition-transform duration-300 group-hover:translate-x-1">
                  {item.title}
                </h3>
                <span
                  className={`inline-block type-mono uppercase px-3 py-1 rounded-[8px] border ${
                    item.featured
                      ? "bg-[#7EA2DB]/15 text-[#7EA2DB] border-[#7EA2DB]/40"
                      : "bg-[#14141A] border-[#F2F0EB]/12 text-[#9AA8BF] group-hover:border-[#7EA2DB]/40 group-hover:text-[#F2F0EB]"
                  }`}
                >
                  {item.tag}
                </span>
              </div>

              <p className="lg:col-span-4 type-body text-[#CBD4E3]">
                {item.desc}
              </p>

              <div className="lg:col-span-3 flex items-center justify-between lg:justify-end gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {item.deliverables.map((d) => (
                    <span
                      key={d}
                      className="type-mono uppercase px-2.5 py-1 rounded-[8px] bg-[#14141A] border border-[#F2F0EB]/12 text-[#9AA8BF]"
                    >
                      {d}
                    </span>
                  ))}
                </div>
                <span className="w-10 h-10 rounded-[8px] border border-[#F2F0EB]/18 group-hover:border-[#7EA2DB] group-hover:bg-[#7EA2DB] group-hover:text-[#000000] flex items-center justify-center transition-colors shrink-0">
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
