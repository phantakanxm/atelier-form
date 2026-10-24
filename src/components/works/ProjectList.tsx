"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { TransitionLink } from "@/components/motion/TransitionLink";
import type { IndexProject } from "./ProjectIndex";

export function ProjectList({ projects }: { projects: IndexProject[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const moveY = useRef<((value: number) => void) | null>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    () => {
      moveY.current = gsap.quickTo(previewRef.current, "y", { duration: 0.7, ease: "power3.out" });
    },
    { scope: listRef },
  );

  // The preview is drawn open/closed like the site's other rectangular masks.
  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;
    gsap.to(preview, {
      clipPath: active === null ? "inset(0% 0% 100% 0%)" : "inset(0% 0% 0% 0%)",
      duration: prefersReducedMotion() ? 0 : 0.6,
      ease: "power3.inOut",
      overwrite: "auto",
    });
  }, [active]);

  const show = (index: number, row: HTMLElement) => {
    const preview = previewRef.current;
    if (!preview) return;
    const y = row.offsetTop + row.offsetHeight / 2 - preview.offsetHeight / 2;
    if (active === null || prefersReducedMotion()) gsap.set(preview, { y });
    else moveY.current?.(y);
    setActive(index);
  };

  return (
    <div
      ref={listRef}
      className="relative"
      onMouseLeave={() => setActive(null)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setActive(null);
      }}
    >
      <ul>
      {projects.map((project, i) => (
        <li key={project.slug} data-index-item>
          <div data-index-rule aria-hidden="true" className="h-px bg-concrete" />
          <TransitionLink
            href={`/works/${project.slug}`}
            onMouseEnter={(e) => show(i, e.currentTarget)}
            onFocus={(e) => show(i, e.currentTarget)}
            className="group grid-12 items-start gap-y-4 py-6 md:items-baseline md:py-9"
          >
            <span className="meta col-span-1 pt-2 text-charcoal">{project.index}</span>
            <span className="title-shift col-span-3 md:col-span-4">
              <span className="block text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.88] font-semibold tracking-[-0.05em] uppercase">
                {project.name}
              </span>
              <span className="lede mt-1 block text-charcoal">{project.suffix}</span>
            </span>
            <span
              aria-hidden="true"
              className="relative col-span-1 col-start-1 row-start-2 aspect-square overflow-hidden bg-concrete/50 md:hidden"
            >
              <Image src={project.cover.src} alt="" fill sizes="25vw" className="object-cover" />
            </span>
            <span className="meta col-span-2 col-start-2 row-start-2 text-charcoal md:col-span-2 md:col-start-6 md:row-start-1 lg:col-start-10">
              {project.category}
            </span>
            <span className="meta col-span-1 col-start-4 row-start-2 flex justify-end gap-3 md:col-start-8 md:row-start-1 lg:col-start-12">
              {project.year}
              <ArrowUpRight aria-hidden="true" size={14} strokeWidth={1.5} className="arrow-shift-diag" />
            </span>
          </TransitionLink>
        </li>
      ))}
      <li aria-hidden="true">
        <div data-index-rule className="h-px bg-concrete" />
      </li>
      </ul>

      {/* Hover / focus preview, desktop only: sits in the empty columns 7–9 */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-[calc(6*(100%_+_var(--gutter))/12)] hidden w-[calc(3*(100%_+_var(--gutter))/12_-_var(--gutter))] lg:block"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <div className="relative aspect-[3/2] overflow-hidden bg-concrete">
          {projects.map((project, i) => (
            <Image
              key={project.slug}
              src={project.cover.src}
              alt=""
              fill
              sizes="25vw"
              className={`object-cover transition-[opacity,transform] duration-700 ease-[var(--ease-out-arch)] ${
                active === i ? "scale-100 opacity-100" : "scale-105 opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
