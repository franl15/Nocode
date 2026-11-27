"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    // Lenis solo en escritorio con puntero fino; en móvil el scroll táctil nativo es más fluido y evita TBT
    const isDesktopFine = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine)"
    ).matches;

    if (prefersReduced || !isDesktopFine) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const init = async () => {
      const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const raf = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(raf);
        lenis.destroy();
      };
    };

    const idleId =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(() => void init(), { timeout: 1200 })
        : window.setTimeout(() => void init(), 250);

    return () => {
      cancelled = true;
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
      cleanup?.();
    };
  }, []);

  return null;
}
