"use client";

import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { DESKTOP, gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { images } from "@/lib/images";
import { usePageTransition } from "@/components/motion/PageTransitionProvider";

const META = [
  { primary: "ATELIER / FORM", secondary: "Independent studio" },
  { primary: "Architecture & Design", secondary: "Structure — Material — Light" },
  { primary: "Selected Works / 2026", secondary: "Three concept projects" },
  { primary: "Index 001", secondary: "Solid & void" },
];

/**
 * Architectural Grid Reveal, ~2.3s:
 * 1. drafting lines extend from their anchors   (0.00 – 1.20)
 * 2. headline lines rise through masks          (0.50 – 1.60)
 * 3. the photograph is "built" upward in its frame (0.85 – 2.00) — pure CSS, so it
 *    paints with the HTML and counts for LCP without waiting for hydration
 * 4. metadata and scroll cue settle             (1.35 – 2.30)
 */
export function ArchitecturalHero() {
  const root = useRef<HTMLElement>(null);
  const intro = useRef<gsap.core.Timeline | null>(null);
  const { ready } = usePageTransition();
  const readyRef = useRef(ready);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.inOut" } });

        tl.fromTo("[data-v]", { scaleY: 0 }, { scaleY: 1, duration: 1.2, stagger: 0.12 }, 0)
          .fromTo(
            "[data-h]",
            { scaleX: 0 },
            { scaleX: 1, duration: 1.1, stagger: 0.1 },
            0.15,
          )
          .fromTo("[data-frame-x]", { scaleX: 0 }, { scaleX: 1, duration: 0.8, stagger: 0.08 }, 0.4)
          .fromTo("[data-frame-y]", { scaleY: 0 }, { scaleY: 1, duration: 0.8, stagger: 0.08 }, 0.45)
          .fromTo(
            "[data-line]",
            { yPercent: 112, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: "power4.out" },
            0.5,
          )
          .fromTo(
            "[data-hero-meta]",
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.05, ease: "power3.out" },
            1.35,
          );

        gsap.set("[data-hero-hide]", { visibility: "visible" });
        intro.current = tl;
        if (readyRef.current) tl.play();

        return () => {
          intro.current = null;
        };
      });

      // Scroll: the photograph opens up slightly and drifts; the headline lifts away.
      mm.add(`${MOTION_OK} and ${DESKTOP}`, () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.5 },
        });
        tl.to("[data-hero-scale]", { scale: 1.07, transformOrigin: "100% 0%" }, 0)
          .to("[data-hero-drift]", { yPercent: 8 }, 0)
          .to("[data-hero-title]", { yPercent: -18 }, 0)
          .to("[data-hero-fade]", { opacity: 0, duration: 0.4 }, 0);
      });
    },
    { scope: root },
  );

  useEffect(() => {
    readyRef.current = ready;
    if (ready) intro.current?.play();
  }, [ready]);

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      className="relative frame pt-[calc(var(--header-h)_+_0.75rem)] pb-16 lg:flex lg:min-h-svh lg:flex-col lg:pb-10"
    >
      {/* Drafting grid: verticals anchored to the margins and to the image column */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 frame">
        <div className="grid-12 h-full">
          <span data-v data-hero-hide className="col-start-1 row-start-1 block h-full w-px origin-top bg-concrete" />
          <span
            data-v
            data-hero-hide
            className="col-start-3 row-start-1 hidden h-full w-px origin-bottom bg-concrete md:block lg:col-start-6"
          />
          <span
            data-v
            data-hero-hide
            className="col-start-4 row-start-1 block h-full w-px origin-top justify-self-end bg-concrete md:col-start-8 lg:col-start-12"
          />
        </div>
      </div>

      <div className="relative" data-hero-fade>
        <ul className="grid-12 gap-y-3 py-4">
          {META.map((item, i) => (
            <li
              key={item.primary}
              data-hero-meta
              data-hero-hide
              className={`meta col-span-2 lg:col-span-3 ${i > 1 ? "hidden md:block" : ""} ${
                i === 1 ? "md:col-span-3" : ""
              } ${i === 3 ? "text-right md:col-span-1 lg:col-span-3" : ""} ${i === 2 ? "md:col-span-2" : ""}`}
            >
              <span className="block text-ink">{item.primary}</span>
              <span className="block text-charcoal/80">{item.secondary}</span>
            </li>
          ))}
        </ul>
        <span data-h data-hero-hide aria-hidden="true" className="block h-px origin-left bg-ink/70" />
      </div>

      <h1 id="hero-title" data-hero-title className="relative mt-6 md:mt-8">
        <span className="sr-only">Form follows feeling.</span>
        <span
          aria-hidden="true"
          className="block text-[clamp(2.5rem,11.2vw,4.75rem)] leading-[0.84] font-semibold tracking-[-0.055em] uppercase md:text-[11vw] lg:text-[min(10.6vw,19svh)]"
        >
          <span className="line-mask">
            <span data-line data-hero-hide>
              Form follows
            </span>
          </span>
          <span className="line-mask hero-indent">
            <span data-line data-hero-hide>
              Feeling.
            </span>
          </span>
        </span>
      </h1>

      <div className="grid-12 relative mt-8 gap-y-10 md:mt-10 lg:flex-1">
        <div className="order-2 col-span-4 flex flex-col justify-between gap-10 md:col-span-3 lg:order-1 lg:col-span-4">
          <div data-hero-fade>
            <p data-hero-meta data-hero-hide className="lede max-w-[18ch]">
              Architecture in its purest form.
            </p>
            <p data-hero-meta data-hero-hide className="body mt-5 max-w-[34ch] text-[0.9375rem]">
              An independent architecture and design studio working with structure, material, light and the
              relationship between solid and void.
            </p>
          </div>

          <div data-hero-fade>
          <a
            href="#selected-works"
            data-hero-meta
            data-hero-hide
            className="group meta flex w-fit items-center gap-4 py-2"
          >
            <span aria-hidden="true" className="relative block h-12 w-px overflow-hidden bg-concrete">
              <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-ink" />
            </span>
            <span className="flex items-center gap-2">
              Scroll to explore
              <ArrowDown aria-hidden="true" size={13} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-y-0.5" />
            </span>
          </a>
          </div>
        </div>

        <div className="order-1 col-span-4 md:col-span-5 md:col-start-4 lg:order-2 lg:col-span-7 lg:col-start-6">
          <figure>
            <div className="relative" data-hero-scale>
            {/* Construction frame: lines overshoot the corners like a drafted rectangle */}
            <span aria-hidden="true" data-frame-x data-hero-hide className="absolute -top-px -right-3 -left-3 z-10 h-px origin-left bg-ink/40" />
            <span aria-hidden="true" data-frame-x data-hero-hide className="absolute -right-3 -bottom-px -left-3 z-10 h-px origin-right bg-ink/40" />
            <span aria-hidden="true" data-frame-y data-hero-hide className="absolute -top-3 -bottom-3 -left-px z-10 w-px origin-bottom bg-ink/40" />
            <span aria-hidden="true" data-frame-y data-hero-hide className="absolute -top-3 -right-px -bottom-3 z-10 w-px origin-top bg-ink/40" />

            <div
              className="hero-build relative overflow-hidden bg-concrete/60"
              style={{ aspectRatio: `${images.hero.width} / ${images.hero.height}` }}
            >
              <div data-hero-drift className="absolute inset-x-0 -top-[10%] bottom-0">
                <div className="hero-settle absolute inset-0">
                  <Image
                    src={images.hero.src}
                    alt={images.hero.alt}
                    fill
                    placeholder="blur"
                    priority
                    quality={85}
                    sizes="(min-width: 1024px) 58vw, (min-width: 768px) 62vw, 100vw"
                    className="object-cover object-bottom"
                  />
                </div>
              </div>
            </div>
            </div>
            <figcaption data-hero-meta data-hero-hide className="meta mt-4 flex justify-between gap-4 text-charcoal">
              <span>Fig. 001 — Concrete in landscape</span>
              <span className="hidden sm:inline">Signature study</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
