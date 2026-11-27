"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "inicio", code: "00", label: "Inicio" },
  { id: "antes-despues", code: "01", label: "Comparativa" },
  { id: "servicios", code: "02", label: "Servicios" },
  { id: "proceso", code: "03", label: "Proceso" },
  { id: "proyectos", code: "04", label: "Casos" },
  { id: "faq", code: "05", label: "FAQ" },
  { id: "contacto", code: "06", label: "Contacto" },
] as const;

export function SectionRail() {
  const [activeId, setActiveId] = useState<string>("inicio");

  useEffect(() => {
    const isWide = window.matchMedia("(min-width: 1280px)").matches;
    if (!isWide) return;

    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (!elements.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: [0.05, 0.25, 0.5] }
    );

    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const activeSection =
    SECTIONS.find((s) => s.id === activeId) ?? SECTIONS[0];

  return (
    <aside
      aria-label="Navegación lateral de secciones"
      className="hidden 2xl:flex fixed right-5 top-1/2 -translate-y-1/2 z-[90] flex-col items-center gap-3 pointer-events-auto"
    >
      <div className="bg-[#000000]/88 backdrop-blur-xs border border-[#F2F0EB]/15 px-2.5 py-3.5 flex flex-col items-center gap-2.5">
        <span className="font-mono-tech text-[12px] tracking-[0.12em] text-[#7EA2DB] font-semibold">
          {activeSection.code}
        </span>

        <div className="w-px h-3 bg-[#F2F0EB]/18" aria-hidden="true" />

        <nav className="flex flex-col items-center gap-2">
          {SECTIONS.map((item) => {
            const isActive = item.id === activeId;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-label={`Ir a ${item.label}`}
                aria-current={isActive ? "location" : undefined}
                title={`${item.code} // ${item.label}`}
                className="group relative flex items-center justify-center w-5 h-5"
              >
                {isActive ? (
                  <span className="inline-flex items-center justify-center font-mono-tech text-[12px] leading-none text-[#7EA2DB]">
                    [·]
                  </span>
                ) : (
                  <span className="w-1.5 h-1.5 bg-[#9AA8BF]/45 group-hover:bg-[#9AB8E8] transition-colors" />
                )}
              </a>
            );
          })}
        </nav>

        <div className="w-px h-3 bg-[#F2F0EB]/18" aria-hidden="true" />

        <span
          className="font-mono-tech text-[12px] tracking-[0.12em] text-[#9AA8BF] uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          {activeSection.label}
        </span>
      </div>
    </aside>
  );
}
