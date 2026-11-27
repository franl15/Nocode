"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface SpotlightCardProps {
  as?: "article" | "div";
  className?: string;
  children: ReactNode;
}

export function SpotlightCard({
  as = "div",
  className = "",
  children,
}: SpotlightCardProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const isDesktopFine = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine)"
    ).matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isDesktopFine || reduced) return;

    const el = ref.current;
    if (!el) return;

    let rafId = 0;
    let nextX = 0;
    let nextY = 0;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      nextX = e.clientX - rect.left;
      nextY = e.clientY - rect.top;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          el.style.setProperty("--mx", `${nextX}px`);
          el.style.setProperty("--my", `${nextY}px`);
          rafId = 0;
        });
      }
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  if (as === "article") {
    return (
      <article
        ref={ref as React.RefObject<HTMLElement>}
        className={`spotlight-card ${className}`}
      >
        {children}
      </article>
    );
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`spotlight-card ${className}`}
    >
      {children}
    </div>
  );
}
