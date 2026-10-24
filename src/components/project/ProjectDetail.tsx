import { ArrowLeft } from "lucide-react";
import { RevealScope } from "@/components/motion/RevealScope";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { LineHeading } from "@/components/ui/LineHeading";
import { Rule } from "@/components/ui/Rule";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { ArchImage } from "@/lib/images";
import { getNextProject, projectPhotos, projects, type Project } from "@/lib/projects";
import { EditorialGallery } from "./EditorialGallery";
import { Lightbox } from "./Lightbox";
import { ProjectDrawing } from "./ProjectDrawing";
import { ProjectMetadata } from "./ProjectMetadata";
import { ProjectNavigation } from "./ProjectNavigation";

export function ProjectDetail({ project }: { project: Project }) {
  const next = getNextProject(project.slug);
  const total = String(projects.length).padStart(2, "0");
  const portraitNarrative = project.narrative.image.height > project.narrative.image.width;
  const photos = projectPhotos(project);
  const zoomIndex = (image: ArchImage) => photos.findIndex((photo) => photo.image === image);

  return (
    <RevealScope>
      <Lightbox items={photos}>
      <article>
        {/* 1 — Title */}
        <header className="frame pt-[calc(var(--header-h)_+_1.5rem)]">
          <div className="meta flex items-center justify-between border-b border-concrete pb-3 text-charcoal" data-anim="fade">
            <TransitionLink href="/works" className="group flex min-h-11 items-center gap-2">
              <ArrowLeft
                aria-hidden="true"
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-500 group-hover:-translate-x-1"
              />
              <span className="link-line">Index</span>
            </TransitionLink>
            <span>
              Project {project.index} / {total}
            </span>
            <span className="hidden sm:inline">
              {project.category} — {project.year}
            </span>
          </div>

          <div className="grid-12 items-end gap-y-6 pt-[clamp(3rem,8vw,7rem)] pb-10 md:pb-14">
            <LineHeading
              as="h1"
              gate
              lines={[project.name, project.suffix]}
              lineClassNames={[undefined, "text-[0.42em] leading-[1.05] tracking-[-0.04em] mt-2"]}
              className="display col-span-4 md:col-span-8 lg:col-span-9"
            />
            <p className="meta col-span-4 text-charcoal md:col-span-4 lg:col-span-3 lg:pb-3 lg:text-right" data-anim="fade">
              {project.typology}
              <br />
              Fictional concept, {project.year}
            </p>
          </div>
        </header>

        {/* 2 — Hero photograph, edge to edge */}
        <ImageReveal image={project.hero} zoom={0} sizes="100vw" priority parallax={5} />

        {/* 3 — Metadata */}
        <section aria-label="Project information" className="frame pt-10 md:pt-14">
          <ProjectMetadata items={project.metadata} />
        </section>

        {/* 4 — Overview */}
        <section aria-labelledby="overview-title" className="frame grid-12 gap-y-10 py-[clamp(5rem,10vw,9rem)]">
          <div className="col-span-4 md:col-span-2 lg:col-span-3">
            <SectionLabel index="01">
              <span id="overview-title">Overview</span>
            </SectionLabel>
          </div>
          <div className="col-span-4 md:col-span-6 lg:col-span-8 lg:col-start-5">
            <p className="lede max-w-[34ch] text-ink" data-anim="fade">
              {project.overview.lede}
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-[var(--gutter)]" data-anim="stagger">
              {project.overview.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="body max-w-[44ch]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* 5 — Design concept */}
        <section aria-labelledby="concept-title" className="frame pb-[clamp(5rem,10vw,9rem)]">
          <Rule />
          <div className="grid-12 gap-y-10 pt-10">
            <div className="col-span-4 md:col-span-8 lg:col-span-7">
              <SectionLabel index="02" className="mb-6">
                Design concept
              </SectionLabel>
              <LineHeading id="concept-title" lines={project.concept.heading} className="headline" />
            </div>
            <p className="body col-span-4 max-w-[36ch] md:col-span-5 lg:col-span-4 lg:col-start-9 lg:self-end" data-anim="fade">
              {project.concept.body}
            </p>
          </div>

          <ol className="grid-12 mt-16 gap-y-10 md:mt-24" data-anim="stagger">
            {project.concept.principles.map((principle, i) => (
              <li key={principle.title} className="col-span-4 md:col-span-4 lg:col-span-4">
                <div className="flex items-baseline justify-between border-t border-ink pt-3">
                  <h3 className="text-sm font-semibold tracking-[0.02em] uppercase">{principle.title}</h3>
                  <span aria-hidden="true" className="meta text-charcoal">
                    0{i + 1}
                  </span>
                </div>
                <p className="body mt-4 max-w-[34ch] text-[0.9375rem]">{principle.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Drawing */}
        <section aria-labelledby="drawing-title" className="frame pb-[clamp(5rem,10vw,9rem)]">
          <div className="grid-12 items-end gap-y-6 pb-8 md:pb-10">
            <div className="col-span-4 md:col-span-4 lg:col-span-6">
              <SectionLabel index="03">
                <span id="drawing-title">Drawing</span>
              </SectionLabel>
            </div>
            <p className="body col-span-4 max-w-[44ch] md:col-span-4 lg:col-span-5 lg:col-start-8" data-anim="fade">
              {project.drawing.note}
            </p>
          </div>
          <ProjectDrawing drawing={project.drawing} />
        </section>

        {/* 6 — Gallery */}
        <section aria-label="Gallery" className="pb-[clamp(5rem,10vw,9rem)]">
          <EditorialGallery blocks={project.gallery} zoomIndex={zoomIndex} />
        </section>

        {/* 7 — Material and spatial narrative */}
        <section aria-labelledby="narrative-title" className="frame pb-[clamp(5rem,10vw,9rem)]">
          <Rule origin="right" />
          <div className="grid-12 gap-y-14 pt-10">
            <div
              className={`col-span-4 md:col-span-8 ${
                portraitNarrative ? "lg:col-span-6 lg:col-start-7 lg:row-start-1" : "lg:col-span-5"
              }`}
            >
              <SectionLabel index="04" className="mb-6">
                Material & space
              </SectionLabel>
              <LineHeading id="narrative-title" lines={project.narrative.heading} className="headline" />
              <div className="mt-10 space-y-6" data-anim="stagger">
                {project.narrative.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="body max-w-[46ch]">
                    {paragraph}
                  </p>
                ))}
              </div>
              <dl className="mt-12 border-b border-concrete" data-anim="stagger">
                {project.narrative.materials.map((material) => (
                  <div key={material.name} className="grid grid-cols-2 gap-[var(--gutter)] border-t border-concrete py-3">
                    <dt className="text-[0.9375rem] font-medium">{material.name}</dt>
                    <dd className="meta self-center text-charcoal">{material.role}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <ImageReveal
              image={project.narrative.image}
              zoom={photos.length - 1}
              sizes={portraitNarrative ? "(min-width: 1024px) 40vw, 100vw" : "(min-width: 1024px) 50vw, 100vw"}
              parallax={4}
              caption={project.narrative.imageCaption}
              className={`col-span-4 md:col-span-8 ${
                portraitNarrative
                  ? "md:col-span-6 lg:col-span-5 lg:col-start-1 lg:row-start-1"
                  : "lg:col-span-6 lg:col-start-7 lg:self-end"
              }`}
            />
          </div>
        </section>
      </article>
      </Lightbox>

      {/* 8 — Next project */}
      <ProjectNavigation next={next} total={projects.length} />
    </RevealScope>
  );
}
