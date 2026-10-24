"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
import { useLenis } from "./SmoothScrollProvider";

type TransitionContextValue = {
  navigate: (href: string) => void;
  /** False while the wipe panel covers the screen; entrance animations wait for it. */
  ready: boolean;
};

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
  ready: true,
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

const LABELS: Record<string, string> = {
  "/": "00 / Index",
  "/works": "01 / Works",
  "/studio": "02 / Studio",
  "/contact": "03 / Contact",
};

function labelFor(pathname: string) {
  if (LABELS[pathname]) return LABELS[pathname];
  const slug = pathname.split("/").filter(Boolean).pop() ?? "";
  return `Works / ${slug.replace(/-/g, " ")}`;
}

type Phase = "idle" | "covering" | "covered";

/**
 * Architectural wipe: a charcoal panel rises to cover the page (0.4s), the route
 * changes underneath it, and the panel lifts away once the new pathname renders.
 * Back/forward navigation and reduced motion bypass the panel entirely.
 */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenisRef = useLenis();
  const panelRef = useRef<HTMLDivElement>(null);
  const phase = useRef<Phase>("idle");
  const fallback = useRef<number | undefined>(undefined);
  const [ready, setReady] = useState(true);
  const [label, setLabel] = useState("");

  const uncover = useCallback(() => {
    const panel = panelRef.current;
    window.clearTimeout(fallback.current);
    lenisRef.current?.start();
    setReady(true);
    if (!panel) return;
    gsap.to(panel, {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: 0.5,
      ease: "power3.inOut",
      delay: 0.05,
      overwrite: true,
      onComplete: () => {
        gsap.set(panel, { visibility: "hidden" });
        phase.current = "idle";
      },
    });
  }, [lenisRef]);

  const navigate = useCallback(
    (href: string) => {
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) {
        window.location.assign(href);
        return;
      }

      if (url.pathname === window.location.pathname) {
        const lenis = lenisRef.current;
        if (lenis) lenis.scrollTo(url.hash || 0);
        else if (url.hash) document.querySelector(url.hash)?.scrollIntoView();
        else window.scrollTo({ top: 0 });
        return;
      }

      if (phase.current !== "idle") return;

      const panel = panelRef.current;
      if (!panel || prefersReducedMotion()) {
        router.push(href);
        return;
      }

      phase.current = "covering";
      setReady(false);
      setLabel(labelFor(url.pathname));
      router.prefetch(href);
      lenisRef.current?.stop();

      gsap.fromTo(
        panel,
        { visibility: "visible", clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.4,
          ease: "power3.inOut",
          overwrite: true,
          onComplete: () => {
            phase.current = "covered";
            router.push(href);
            // Never leave the panel stuck if navigation is slow or fails.
            fallback.current = window.setTimeout(uncover, 3000);
          },
        },
      );
    },
    [lenisRef, router, uncover],
  );

  // Runs after the new route's own layout effects, so its ScrollTriggers exist.
  useLayoutEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
    if (phase.current === "covered") uncover();
  }, [pathname, lenisRef, uncover]);

  const value = useMemo(() => ({ navigate, ready }), [navigate, ready]);

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <div
        ref={panelRef}
        aria-hidden="true"
        className="invisible fixed inset-0 z-[90] bg-charcoal text-ivory"
        style={{ clipPath: "inset(100% 0% 0% 0%)" }}
      >
        <div className="frame flex h-full flex-col justify-between py-6">
          <div className="meta flex justify-between border-b border-ivory/20 pb-4">
            <span>ATELIER / FORM</span>
            <span>Architecture in its purest form</span>
          </div>
          <div className="flex items-end justify-between border-t border-ivory/20 pt-4">
            <span className="title">{label}</span>
            <span className="meta">Loading</span>
          </div>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}
