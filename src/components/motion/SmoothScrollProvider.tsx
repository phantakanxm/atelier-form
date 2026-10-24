"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useRef, type ReactNode, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const LenisContext = createContext<RefObject<Lenis | null>>({ current: null });

export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Lenis is driven by GSAP's ticker so there is exactly one rAF loop, and every
 * Lenis scroll event updates ScrollTrigger. Reduced motion falls back to native scroll.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let tick: ((time: number) => void) | null = null;

    const start = () => {
      const lenis = new Lenis({ lerp: 0.11, smoothWheel: true, anchors: true });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      lenisRef.current = lenis;
    };

    const stop = () => {
      if (tick) gsap.ticker.remove(tick);
      tick = null;
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };

    const sync = () => {
      stop();
      if (!reduce.matches) start();
    };

    gsap.ticker.lagSmoothing(0);
    sync();
    reduce.addEventListener("change", sync);
    return () => {
      reduce.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}
