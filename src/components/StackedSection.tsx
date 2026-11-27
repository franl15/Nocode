"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface StackedSectionProps {
  children: ReactNode;
  /** Orden de apilamiento ascendente para que cada sección se deslice sobre la anterior */
  zIndex: number;
  /** Activa position: sticky + escala 0.96 / atenuación en escritorio (>=1024px) sin reduced-motion */
  sticky?: boolean;
}

export function StackedSection({
  children,
  zIndex,
  sticky = false,
}: StackedSectionProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sticky) return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isDesktop || reduced) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

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
          if (cancelled || !outerRef.current || !innerRef.current) return;
          gsap.registerPlugin(ScrollTrigger);

          const ctx = gsap.context(() => {
            gsap.to(innerRef.current, {
              scale: 0.96,
              opacity: 0.72,
              ease: "none",
              transformOrigin: "center top",
              scrollTrigger: {
                trigger: outerRef.current,
                start: "bottom 92%",
                end: "bottom 15%",
                scrub: true,
              },
            });
          }, outerRef);

          revert = () => ctx.revert();
        });
      },
      { rootMargin: "200px 0px 200px 0px" }
    );

    io.observe(outer);

    return () => {
      cancelled = true;
      io.disconnect();
      revert?.();
    };
  }, [sticky]);

  return (
    <div
      ref={outerRef}
      style={{ zIndex }}
      className={sticky ? "relative lg:sticky lg:top-0" : "relative"}
    >
      <div ref={innerRef} className={sticky ? "lg:will-change-transform" : undefined}>
        {children}
      </div>
    </div>
  );
}
