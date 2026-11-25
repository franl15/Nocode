"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { buildWhatsAppUrl, SITE_CONFIG } from "@/lib/config";
import { MagneticButton } from "@/components/MagneticButton";

const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Casos", href: "#proyectos" },
  { label: "FAQ", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > 180 && y > lastY + 10 && !mobileOpen) {
        setHidden(true);
      } else if (y < lastY - 6 || y < 120) {
        setHidden(false);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen]);

  const waHref = buildWhatsAppUrl(
    "Hola NoCode, quiero conversar sobre un proyecto de software, web o automatización."
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "bg-[#060D21]/90 backdrop-blur-md border-b border-[#F2F0EB]/12"
          : "bg-transparent border-b border-[#F2F0EB]/10"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Wordmark */}
        <a
          href="#inicio"
          className="flex items-center gap-3 text-[#F2F0EB] group"
        >
          <span className="w-8 h-8 bg-black border border-[#F2F0EB]/30 flex items-center justify-center font-display font-extrabold text-sm tracking-tighter transition-colors group-hover:bg-[#F2F0EB] group-hover:text-black">
            N
          </span>
          <span className="font-display font-extrabold text-lg tracking-tight uppercase">
            {SITE_CONFIG.brandName}
          </span>
          <span className="hidden lg:inline-block font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#7EA2DB] border-l border-[#F2F0EB]/15 pl-3">
            Ingeniería Digital
          </span>
        </a>

        {/* Desktop Nav */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-8 text-xs font-mono-tech uppercase tracking-[0.16em] text-[#F2F0EB]/80"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="editorial-link hover:text-white transition-colors py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <MagneticButton
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#F2F0EB] hover:bg-black text-black hover:text-white border border-[#F2F0EB] px-4 sm:px-5 py-2.5 text-xs font-mono-tech font-semibold uppercase tracking-[0.14em] transition-colors duration-300"
          >
            <span>Iniciar proyecto</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </MagneticButton>

          <button
            type="button"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 border border-[#F2F0EB]/20 text-[#F2F0EB]"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#030712] border-b border-[#F2F0EB]/15 px-5 py-6">
          <nav className="flex flex-col gap-4 font-mono-tech text-xs uppercase tracking-[0.18em] text-[#F2F0EB]">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-2 border-b border-[#F2F0EB]/10 flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#7EA2DB]" />
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
