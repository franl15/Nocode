"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const xToRing = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });
    const xToDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2.out" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2.out" });

    let visible = false;

    const onMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([ring, dot], { opacity: 1, duration: 0.25 });
      }
      xToRing(e.clientX);
      yToRing(e.clientY);
      xToDot(e.clientX);
      yToDot(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("a, button, input, textarea, [data-cursor='interactive']")) {
        gsap.to(ring, { scale: 1.65, borderColor: "#7EA2DB", duration: 0.25, ease: "power2.out" });
      } else {
        gsap.to(ring, { scale: 1, borderColor: "rgba(242,240,235,0.45)", duration: 0.25, ease: "power2.out" });
      }
    };

    const onLeave = () => {
      visible = false;
      gsap.to([ring, dot], { opacity: 0, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[90] w-9 h-9 -ml-[18px] -mt-[18px] rounded-full border border-[#F2F0EB]/45 opacity-0 hidden lg:block mix-blend-difference"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[90] w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-white opacity-0 hidden lg:block mix-blend-difference"
      />
    </>
  );
}
