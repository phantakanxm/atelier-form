import { ArrowRight, ArrowUpRight } from "lucide-react";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { LineHeading } from "@/components/ui/LineHeading";
import { Rule } from "@/components/ui/Rule";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { projects, type Project } from "@/lib/projects";

/** Three deliberately different compositions, so the sequence reads as an editorial spread. */
const LAYOUTS = [
  {
    image: "lg:col-span-8 lg:col-start-1",
    meta: "lg:col-span-4 lg:col-start-9 lg:self-end",
    sizes: "(min-width: 1024px) 64vw, 100vw",
  },
  {
    image: "lg:col-span-8 lg:col-start-5 lg:row-start-1",
    meta: "lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:self-start",
    sizes: "(min-width: 1024px) 64vw, 100vw",
  },
  {
    image: "lg:col-span-7 lg:col-start-2",
    meta: "lg:col-span-3 lg:col-start-10 lg:self-end",
    sizes: "(min-width: 1024px) 56vw, 100vw",
  },
] as const;

function FeaturedProject({ project, layout }: { project: Project; layout: (typeof LAYOUTS)[number] }) {
  return (
    <TransitionLink
      href={`/works/${project.slug}`}
      className="group grid-12 gap-y-6 outline-offset-8"
      aria-label={`${project.name} ${project.suffix} — ${project.category}, ${project.year}. View project`}
    >
      <ImageReveal
        image={project.cover}
        sizes={layout.sizes}
        hover
        parallax={4}
        className={`col-span-4 md:col-span-8 ${layout.image}`}
      />

      <div className={`col-span-4 md:col-span-8 ${layout.meta}`}>
        <p
          aria-hidden="true"
          className="text-[clamp(4.5rem,10vw,10rem)] leading-[0.78] font-semibold tracking-[-0.07em] text-concrete transition-colors duration-700 group-hover:text-stone"
        >
          {project.index}
        </p>
        <h3 className="title-shift mt-6">
          <span className="title block">{project.name}</span>
          <span className="lede mt-1 block text-charcoal">{project.suffix}</span>
        </h3>
        <dl className="meta mt-6 grid grid-cols-2 border-t border-concrete pt-3 text-charcoal">
          <div>
            <dt className="sr-only">Category</dt>
            <dd>{project.category}</dd>
          </div>
          <div className="text-right lg:text-left">
            <dt className="sr-only">Year</dt>
            <dd>{project.year}</dd>
          </div>
        </dl>
        <span className="meta mt-6 flex items-center gap-2 text-ink">
          <span className="link-line">View project</span>
          <ArrowUpRight aria-hidden="true" size={14} strokeWidth={1.5} className="arrow-shift-diag" />
        </span>
      </div>
    </TransitionLink>
  );
}

export function SelectedWorks() {
  return (
    <section
      id="selected-works"
      aria-labelledby="selected-works-title"
      className="frame scroll-mt-24 pt-[clamp(4rem,7vw,7rem)] pb-[clamp(6rem,12vw,11rem)]"
    >
      <div className="grid-12 items-end gap-y-8">
        <div className="col-span-4 md:col-span-5 lg:col-span-6">
          <SectionLabel index="01" className="mb-6">
            Selected works
          </SectionLabel>
          <LineHeading id="selected-works-title" lines={["Selected", "Works."]} className="headline" />
        </div>
        <p className="body col-span-4 max-w-[38ch] md:col-span-3 lg:col-span-3 lg:col-start-10" data-anim="fade">
          Three concept projects — a residence, a courtyard house and a gallery — each a study of how mass,
          light and void can be organised with the fewest possible means.
        </p>
      </div>

      <Rule className="mt-12 md:mt-16" />

      <ol className="mt-16 space-y-24 md:mt-24 md:space-y-36 lg:space-y-44">
        {projects.map((project, i) => (
          <li key={project.slug}>
            <FeaturedProject project={project} layout={LAYOUTS[i % LAYOUTS.length]!} />
          </li>
        ))}
      </ol>

      <Rule className="mt-24 md:mt-36" origin="right" />
      <div className="mt-6 flex flex-wrap items-center justify-between gap-6">
        <p className="meta text-charcoal">03 projects — Residential, Cultural</p>
        <TransitionLink href="/works" className="btn group">
          Full project index
          <ArrowRight aria-hidden="true" size={14} strokeWidth={1.5} className="arrow-shift" />
        </TransitionLink>
      </div>
    </section>
  );
}
