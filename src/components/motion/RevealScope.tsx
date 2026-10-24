"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { DESKTOP, gsap, MOTION_OK } from "@/lib/gsap";
import { usePageTransition } from "./PageTransitionProvider";

/**
 * Wires scroll animations declaratively, so section markup can stay in server components:
 *
 * data-anim="lines"   heading whose `.line-mask > span` children rise into place
 * data-anim="rule"    1px divider that draws along X (data-origin="right" to reverse)
 * data-anim="rule-y"  1px divider that draws down along Y
 * data-anim="fade"    block that settles upward (data-delay optional)
 * data-anim="stagger" container whose direct children settle in sequence
 * data-anim="image"   rectangular clip reveal; its [data-anim-inner] eases from a slight scale
 * data-anim="draw"    SVG drawing: [data-draw] strokes draw on, then [data-draw-fade] and labels appear
 * data-parallax="6"   inner image drift in percent, desktop only
 *
 * Elements marked data-hero-hide stay hidden (via CSS) until their from-state is applied,
 * which avoids a flash of the final state for above-the-fold content. Setup waits until
 * the page-transition panel has started to lift.
 */
export function RevealScope({ children, className }: { children: ReactNode; className?: string }) {
  const scope = useRef<HTMLDivElement>(null);
  const { ready } = usePageTransition();
  const context = useRef<gsap.Context | null>(null);

  // Arm once per mount, as soon as the page is ready. Leaving the page (ready → false)
  // must not revert anything, or content would vanish under the closing wipe.
  useLayoutEffect(() => {
    if (!ready || context.current) return;
    context.current = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MOTION_OK, desktop: DESKTOP }, (context) => {
        const { motion, desktop } = context.conditions ?? {};
        if (!motion) return;
        const q = gsap.utils.selector(scope);
        const at = (el: Element, start = "top 88%") => ({ trigger: el, start, once: true });

        q('[data-anim="lines"]').forEach((el) => {
          const lines = el.querySelectorAll(".line-mask > span");
          if (!lines.length) return;
          gsap.from(lines, {
            yPercent: 112,
            opacity: 0,
            duration: 1.15,
            ease: "power4.out",
            stagger: 0.09,
            scrollTrigger: at(el),
          });
        });

        q('[data-anim="rule"]').forEach((el) => {
          gsap.from(el, {
            scaleX: 0,
            transformOrigin: `${(el as HTMLElement).dataset.origin ?? "left"} center`,
            duration: 1.4,
            ease: "power3.inOut",
            scrollTrigger: at(el, "top 94%"),
          });
        });

        q('[data-anim="rule-y"]').forEach((el) => {
          gsap.from(el, {
            scaleY: 0,
            transformOrigin: "center top",
            duration: 1.4,
            ease: "power3.inOut",
            scrollTrigger: at(el, "top 90%"),
          });
        });

        q('[data-anim="fade"]').forEach((el) => {
          gsap.from(el, {
            y: 28,
            opacity: 0,
            duration: 1,
            delay: Number((el as HTMLElement).dataset.delay ?? 0),
            scrollTrigger: at(el),
          });
        });

        q('[data-anim="stagger"]').forEach((el) => {
          gsap.from(el.children, {
            y: 24,
            opacity: 0,
            duration: 0.9,
            stagger: 0.08,
            scrollTrigger: at(el),
          });
        });

        q('[data-anim="draw"]').forEach((el) => {
          const tl = gsap.timeline({ scrollTrigger: at(el, "top 75%") });
          const strokes = el.querySelectorAll("[data-draw]");
          tl.fromTo(
            strokes,
            { strokeDasharray: 1, strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut", stagger: { amount: 1.2 } },
          )
            .from(el.querySelectorAll("[data-draw-fade]"), { opacity: 0, duration: 0.8, stagger: 0.03 }, 0.6)
            .from(el.querySelectorAll("[data-draw-label]"), { opacity: 0, duration: 0.6, stagger: 0.03 }, 1.2);
        });

        q('[data-anim="image"]').forEach((el) => {
          const tl = gsap.timeline({ scrollTrigger: at(el, "top 85%") });
          tl.from(el, { clipPath: "inset(100% 0% 0% 0%)", duration: 1.3, ease: "power4.inOut" });
          const inner = el.querySelector("[data-anim-inner]");
          if (inner) tl.from(inner, { scale: 1.08, duration: 1.8, ease: "power3.out" }, 0.1);
        });

        if (desktop) {
          q("[data-parallax]").forEach((el) => {
            const amount = Number((el as HTMLElement).dataset.parallax) || 5;
            gsap.fromTo(
              el,
              { yPercent: -amount },
              {
                yPercent: amount,
                ease: "none",
                scrollTrigger: {
                  trigger: el.parentElement,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          });
        }

        const gated = q("[data-hero-hide]");
        if (gated.length) gsap.set(gated, { visibility: "visible" });
      });
    }, scope);
  }, [ready]);

  // The single owner of cleanup: kills every tween, ScrollTrigger and matchMedia on unmount.
  useLayoutEffect(
    () => () => {
      context.current?.revert();
      context.current = null;
    },
    [],
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
