"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";

export const MAX_CAPTURE_HEIGHT = 3000;

export interface ShowcaseCapture {
  src: string;
  width: number;
  /** Altura máxima recomendada: 3000px para mantener rendimiento móvil */
  height: number;
  alt: string;
}

interface DeviceShowcase3DProps {
  title: string;
  accessibleSummary: string;
  orientation?: "left" | "right";
  desktopImage?: ShowcaseCapture;
  mobileImage?: ShowcaseCapture;
  desktopFallback: ReactNode;
  mobileFallback: ReactNode;
  domainLabel: string;
}

export function DeviceShowcase3D({
  title,
  accessibleSummary,
  orientation = "left",
  desktopImage,
  mobileImage,
  desktopFallback,
  mobileFallback,
  domainLabel,
}: DeviceShowcase3DProps) {
  const figureRef = useRef<HTMLElement>(null);
  const laptopViewportRef = useRef<HTMLDivElement>(null);
  const laptopTrackRef = useRef<HTMLDivElement>(null);
  const phoneViewportRef = useRef<HTMLDivElement>(null);
  const phoneTrackRef = useRef<HTMLDivElement>(null);

  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detectar prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Pausar fuera de pantalla con IntersectionObserver
  useEffect(() => {
    const el = figureRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setInView(entry.isIntersecting);
      },
      { rootMargin: "140px 0px 140px 0px", threshold: 0.01 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Cargar GSAP + ScrollTrigger con dynamic import solo cuando entra en vista
  useEffect(() => {
    const container = figureRef.current;
    const laptopVp = laptopViewportRef.current;
    const laptopTrack = laptopTrackRef.current;
    const phoneVp = phoneViewportRef.current;
    const phoneTrack = phoneTrackRef.current;

    if (!container || !laptopVp || !laptopTrack || !phoneVp || !phoneTrack) {
      return;
    }

    if (reducedMotion || !inView) {
      if (reducedMotion) {
        laptopTrack.style.transform = "translate3d(0, 0, 0)";
        phoneTrack.style.transform = "translate3d(0, 0, 0)";
      }
      return;
    }

    let cancelled = false;
    let revert: (() => void) | undefined;

    void Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const laptopShift = () =>
          -Math.max(0, laptopTrack.scrollHeight - laptopVp.clientHeight);
        const phoneShift = () =>
          -Math.max(0, phoneTrack.scrollHeight - phoneVp.clientHeight);

        gsap.fromTo(
          laptopTrack,
          { y: 0 },
          {
            y: laptopShift,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top 82%",
              end: "bottom 18%",
              scrub: 0.65,
              invalidateOnRefresh: true,
            },
          }
        );

        gsap.fromTo(
          phoneTrack,
          { y: 0 },
          {
            y: phoneShift,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top 82%",
              end: "bottom 18%",
              scrub: 0.85,
              invalidateOnRefresh: true,
            },
          }
        );
      }, container);

      revert = () => ctx.revert();
    });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [reducedMotion, inView]);

  const isRight = orientation === "right";
  const baseRotateY = isRight ? -7 : 7;
  const hoverRotateY = isRight ? -2 : 2;
  const laptopTransform = reducedMotion
    ? "none"
    : hovered
      ? `rotateY(${hoverRotateY}deg) rotateX(1.5deg) translateZ(0)`
      : `rotateY(${baseRotateY}deg) rotateX(4deg) translateZ(0)`;

  const phoneTransform = reducedMotion
    ? "none"
    : hovered
      ? `translateZ(56px) rotateY(${hoverRotateY * 1.1}deg) translateY(-6px)`
      : `translateZ(42px) rotateY(${baseRotateY * 1.2}deg) translateY(0px)`;

  const safeDesktopHeight = desktopImage
    ? Math.min(desktopImage.height, MAX_CAPTURE_HEIGHT)
    : 0;
  const safeMobileHeight = mobileImage
    ? Math.min(mobileImage.height, MAX_CAPTURE_HEIGHT)
    : 0;

  return (
    <figure
      ref={figureRef}
      aria-label={`Vista de escritorio y móvil de ${title}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative py-4 sm:py-6 select-none"
      style={{ perspective: "1400px" }}
    >
      {/* Resumen legible para lectores de pantalla */}
      <figcaption className="sr-only">{accessibleSummary}</figcaption>

      {/* Contenedor 3D SIN overflow: hidden (evita aplanamiento en Safari/WebKit) */}
      <div
        className="relative w-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
        style={{
          transformStyle: "preserve-3d",
          transform: laptopTransform,
          willChange: inView && !reducedMotion ? "transform" : "auto",
        }}
      >
        {/* ================= LAPTOP 16:10 ================= */}
        <div
          className={`relative w-full ${
            isRight ? "sm:pl-8" : "sm:pr-8"
          }`}
        >
          {/* Tapa / Bisel de pantalla */}
          <div className="bg-[#0A0A0D] p-2 sm:p-2.5 border border-[#F2F0EB]/18 rounded-t-[10px] device-frame-shadow">
            {/* Barra superior decorativa del laptop */}
            <div
              aria-hidden="true"
              className="flex items-center justify-between px-2 pb-2"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#F2F0EB]/25" />
                <span className="w-2 h-2 rounded-full bg-[#F2F0EB]/25" />
                <span className="w-2 h-2 rounded-full bg-[#7EA2DB]" />
              </div>
              <span className="type-mono text-[#9AA8BF] text-xs">
                {domainLabel}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#14141A] border border-[#F2F0EB]/20" />
            </div>

            {/* Viewport interno con overflow: hidden (elemento hoja, seguro para Safari 3D) */}
            <div
              ref={laptopViewportRef}
              className="relative w-full aspect-[11/6] bg-[#000000] border border-[#F2F0EB]/12 rounded-[4px] overflow-hidden"
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <div
                ref={laptopTrackRef}
                className="w-full h-full"
                style={{
                  willChange: inView && !reducedMotion ? "transform" : "auto",
                }}
              >
                {desktopImage ? (
                  <Image
                    src={desktopImage.src}
                    width={desktopImage.width}
                    height={safeDesktopHeight}
                    alt={desktopImage.alt}
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="w-full h-full object-contain block"
                  />
                ) : (
                  <div aria-hidden="true">{desktopFallback}</div>
                )}
              </div>

              {/* Degradado sutil inferior para sugerir continuidad del scroll */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#030712]/70 to-transparent"
              />
            </div>
          </div>

          {/* Chasis / Base metálica del laptop (decorativa) */}
          <div aria-hidden="true" className="relative mx-auto w-[103%] -ml-[1.5%]">
            <div className="h-2.5 sm:h-3 bg-[#14141A] border-x border-b border-[#F2F0EB]/16 rounded-b-[6px] flex items-start justify-center">
              <span className="w-16 sm:w-24 h-1 bg-[#000000]/80 rounded-b-[2px]" />
            </div>
          </div>
        </div>

        {/* ================= CELULAR 9:19.5 (PRIMER PLANO 3D) ================= */}
        <div
          className={`hidden sm:block absolute bottom-1 w-[132px] md:w-[148px] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${
            isRight ? "left-0" : "right-0"
          }`}
          style={{
            transform: phoneTransform,
            willChange: inView && !reducedMotion ? "transform" : "auto",
          }}
        >
          <div className="bg-[#0A0A0D] p-1.5 border border-[#F2F0EB]/22 rounded-[20px] device-frame-shadow">
            {/* Isla superior decorativa */}
            <div
              aria-hidden="true"
              className="flex justify-center pt-1 pb-1.5"
            >
              <span className="w-10 h-1.5 rounded-full bg-[#14141A] border border-[#F2F0EB]/15" />
            </div>

            {/* Viewport interno del celular con overflow: hidden (elemento hoja) */}
            <div
              ref={phoneViewportRef}
              className="relative w-full aspect-[9/19] bg-[#000000] border border-[#F2F0EB]/10 rounded-[12px] overflow-hidden"
              style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <div
                ref={phoneTrackRef}
                className="w-full"
                style={{
                  willChange: inView && !reducedMotion ? "transform" : "auto",
                }}
              >
                {mobileImage ? (
                  <Image
                    src={mobileImage.src}
                    width={mobileImage.width}
                    height={safeMobileHeight}
                    alt={mobileImage.alt}
                    loading="lazy"
                    sizes="160px"
                    className="w-full h-auto block"
                  />
                ) : (
                  <div aria-hidden="true">{mobileFallback}</div>
                )}
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#030712]/75 to-transparent"
              />
            </div>

            {/* Barra inferior decorativa del celular */}
            <div aria-hidden="true" className="flex justify-center pt-1.5 pb-0.5">
              <span className="w-9 h-1 rounded-full bg-[#F2F0EB]/25" />
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
