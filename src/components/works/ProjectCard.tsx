import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { TransitionLink } from "@/components/motion/TransitionLink";
import type { IndexProject } from "./ProjectIndex";

export function ProjectCard({ project, priority = false }: { project: IndexProject; priority?: boolean }) {
  return (
    <TransitionLink href={`/works/${project.slug}`} className="group block">
      <div
        className="relative overflow-hidden bg-concrete/50"
        style={{ aspectRatio: `${project.cover.width} / ${project.cover.height}` }}
      >
        <div className="img-hover absolute inset-0">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            placeholder="blur"
            priority={priority}
            quality={85}
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
          />
        </div>
        <span className="meta absolute top-3 left-3 bg-ivory px-2 py-1 text-ink">{project.index}</span>
      </div>

      <div className="mt-5 grid grid-cols-[1fr_auto] items-start gap-x-6 border-t border-concrete pt-4">
        <h2 className="title-shift">
          <span className="title block">{project.name}</span>
          <span className="lede mt-1 block text-charcoal">{project.suffix}</span>
        </h2>
        <ArrowUpRight aria-hidden="true" size={22} strokeWidth={1.25} className="arrow-shift-diag mt-1" />
        <dl className="meta col-span-2 mt-5 flex flex-wrap gap-x-6 gap-y-1 text-charcoal">
          <div className="flex gap-2">
            <dt className="text-charcoal/70">Type</dt>
            <dd>{project.typology}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-charcoal/70">Year</dt>
            <dd>{project.year}</dd>
          </div>
        </dl>
      </div>
    </TransitionLink>
  );
}
