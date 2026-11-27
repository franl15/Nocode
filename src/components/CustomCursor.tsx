"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine)"
    ).matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    const ring = ringRef.current;
    if (!ring) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void import("gsap").then(({ default: gsap }) => {
      if (cancelled || !ring) return;

      const xTo = gsap.quickTo(ring, "x", { duration: 0.3, ease: "power3.out" });
      const yTo = gsap.quickTo(ring, "y", { duration: 0.3, ease: "power3.out" });

      const onMove = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };

      const onOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        if (target?.closest("[data-cursor='interactive']")) {
          gsap.to(ring, {
            opacity: 1,
            scale: 1.35,
            duration: 0.25,
            ease: "power2.out",
          });
        } else {
          gsap.to(ring, {
            opacity: 0,
            scale: 0.85,
            duration: 0.2,
            ease: "power2.out",
          });
        }
      };

      const onLeave = () => {
        gsap.to(ring, { opacity: 0, duration: 0.2 });
      };

      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseover", onOver, { passive: true });
      document.addEventListener("mouseleave", onLeave);

      cleanup = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseover", onOver);
        document.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[90] w-11 h-11 -ml-[22px] -mt-[22px] border border-[#7EA2DB] opacity-0 hidden lg:block"
    />
  );
}
