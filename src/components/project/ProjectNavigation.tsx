import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { TransitionLink } from "@/components/motion/TransitionLink";
import type { Project } from "@/lib/projects";

export function ProjectNavigation({ next, total }: { next: Project; total: number }) {
  return (
    <nav aria-label="Project navigation" className="frame border-t border-concrete pt-6 pb-[clamp(5rem,10vw,9rem)]">
      <div className="meta flex justify-between text-charcoal">
        <TransitionLink href="/works" className="group flex min-h-11 items-center gap-2">
          <ArrowLeft aria-hidden="true" size={14} strokeWidth={1.5} className="transition-transform duration-500 group-hover:-translate-x-1" />
          <span className="link-line">All projects</span>
        </TransitionLink>
        <span className="flex min-h-11 items-center">
          Next — {next.index} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <TransitionLink href={`/works/${next.slug}`} className="group grid-12 mt-10 items-end gap-y-8 md:mt-16">
        <span className="col-span-4 md:col-span-8 lg:col-span-7">
          <span className="meta block text-charcoal">Next project</span>
          <span className="title-shift mt-4 block text-[clamp(3.5rem,11vw,12rem)] leading-[0.82] font-semibold tracking-[-0.06em] uppercase">
            {next.name}
          </span>
          <span className="lede mt-3 flex items-center gap-3 text-charcoal">
            {next.suffix}
            <ArrowUpRight aria-hidden="true" size={22} strokeWidth={1.25} className="arrow-shift-diag text-ink" />
          </span>
        </span>
        <span className="relative col-span-4 block overflow-hidden bg-concrete/50 md:col-span-5 lg:col-span-4 lg:col-start-9">
          <span className="block" style={{ aspectRatio: `${next.cover.width} / ${next.cover.height}` }} />
          <span className="img-hover absolute inset-0">
            <Image src={next.cover.src} alt="" fill placeholder="blur" sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
          </span>
        </span>
      </TransitionLink>
    </nav>
  );
}
