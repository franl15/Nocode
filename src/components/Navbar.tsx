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
      className={`fixed top-0 left-0 right-0 z-[95] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "bg-[#000000]/92 backdrop-blur-md border-b border-[#F2F0EB]/15"
          : "bg-transparent border-b border-[#F2F0EB]/10"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Wordmark */}
        <a
          href="#inicio"
          className="flex items-center gap-2.5 sm:gap-3 text-[#F2F0EB] group shrink-0"
        >
          <span className="w-8 h-8 bg-[#0A0A0D] border border-[#F2F0EB]/22 rounded-[8px] flex items-center justify-center font-display font-semibold text-sm tracking-tighter transition-colors group-hover:bg-[#F2F0EB] group-hover:text-[#000000]">
            N
          </span>
          <span className="font-display font-semibold text-base sm:text-lg tracking-tight uppercase">
            {SITE_CONFIG.brandName}
          </span>
          <span className="hidden xl:inline-block type-mono uppercase text-[#9AA8BF] border-l border-[#F2F0EB]/14 pl-3">
            Ingeniería Digital
          </span>
        </a>

        {/* Desktop Nav */}
        <nav
          aria-label="Navegación principal"
          className="hidden lg:flex items-center gap-8 type-mono uppercase text-[#9AA8BF]"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="editorial-link hover:text-[#F2F0EB] transition-colors py-1 whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Signature CTA + Mobile Menu */}
        <div className="flex items-center gap-2.5 shrink-0">
          <MagneticButton
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#F2F0EB] hover:bg-[#7EA2DB] text-[#000000] rounded-[8px] px-4 sm:px-5 py-2 sm:py-2.5 type-mono font-semibold uppercase transition-colors duration-300 whitespace-nowrap"
          >
            <span className="sm:hidden">Cotizar</span>
            <span className="hidden sm:inline">Iniciar proyecto</span>
            <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
          </MagneticButton>

          <button
            type="button"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 border border-[#F2F0EB]/22 rounded-[8px] text-[#F2F0EB] hover:bg-[#14141A] hover:border-[#7EA2DB] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#030712] border-b border-[#F2F0EB]/14 px-5 py-6">
          <nav
            aria-label="Menú móvil"
            className="flex flex-col gap-4 type-mono uppercase text-[#F2F0EB]"
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 border-b border-[#F2F0EB]/12 flex items-center justify-between hover:text-[#9AB8E8] transition-colors"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#9AA8BF]" />
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
