import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { RevealScope } from "@/components/motion/RevealScope";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { StudioSection } from "@/components/studio/StudioSection";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { LineHeading } from "@/components/ui/LineHeading";
import { Rule } from "@/components/ui/Rule";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { images } from "@/lib/images";
import { PROCESS } from "@/lib/studio";

export const metadata: Metadata = {
  title: "Studio",
  description: "A practice of precision: the philosophy, approach and process of the fictional studio ATELIER / FORM.",
};

const APPROACH = [
  { title: "Read the site", text: "Orientation, ground, wind and the long shadows of morning and evening set the first lines." },
  { title: "Find the diagram", text: "Each building is reduced to one organising idea that can be drawn in a single gesture." },
  { title: "Test in section", text: "Light, height and threshold are resolved in section before the plan is fixed." },
  { title: "Remove", text: "Whatever the idea does not need is taken away, until each element has a single role." },
];

const MATERIALS = [
  { name: "Concrete", note: "Board-formed, in-situ, left exposed" },
  { name: "Stone", note: "Travertine and limestone, honed" },
  { name: "Steel", note: "Blackened, used only where thin" },
  { name: "Glass", note: "Frameless where it meets the sky" },
  { name: "Timber", note: "Formwork first, then joinery" },
];

const SCALES = [
  { scale: "1:500", label: "Site — mass, orientation, approach" },
  { scale: "1:100", label: "Building — section, light, sequence" },
  { scale: "1:20", label: "Detail — joints, edges, thresholds" },
];

export default function StudioPage() {
  return (
    <RevealScope>
      {/* Intro */}
      <header className="frame pt-[calc(var(--header-h)_+_clamp(3rem,8vw,7rem))]">
        <SectionLabel index="02" className="mb-6">
          Studio — Practice
        </SectionLabel>
        <div className="grid-12 items-end gap-y-10">
          <LineHeading
            as="h1"
            gate
            lines={["A practice", "of precision."]}
            lineClassNames={[undefined, "lg:pl-[calc(2*(100%_+_var(--gutter))/12)]"]}
            className="display col-span-4 md:col-span-8 lg:col-span-12"
          />
        </div>
        <div className="grid-12 mt-12 gap-y-6 md:mt-16">
          <p className="meta col-span-4 text-charcoal md:col-span-2 lg:col-span-3" data-anim="fade">
            A fictional independent studio for architecture and design.
          </p>
          <p className="lede col-span-4 max-w-[32ch] md:col-span-6 lg:col-span-6 lg:col-start-7" data-anim="fade">
            ATELIER / FORM works on a small number of projects at a time, each developed by hand, in drawing and in
            model, until its structure is clear enough to be built without ornament.
          </p>
        </div>
      </header>

      <div className="frame mt-16 md:mt-24">
        <ImageReveal
          image={images.studioWorkspace}
          sizes="(min-width: 1440px) 1400px, 100vw"
          priority
          parallax={4}
          caption={
            <span className="flex justify-between gap-4">
              <span>Fig. 014 — The workspace</span>
              <span className="hidden sm:inline">Drawings, models, daylight</span>
            </span>
          }
        />
      </div>

      {/* 01 — Philosophy */}
      <StudioSection index="01" label="Studio philosophy" titleId="studio-philosophy">
        <div className="grid-12 gap-y-14">
          <ImageReveal
            image={images.concreteTexture}
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
            parallax={4}
            caption="Fig. 017 — Concrete texture"
            className="col-span-4 md:col-span-4 lg:col-span-4"
          />
          <div className="col-span-4 md:col-span-4 lg:col-span-6 lg:col-start-6 lg:self-center">
            <LineHeading id="studio-philosophy" lines={["We begin with", "what must remain."]} className="title" />
            <div className="mt-10 space-y-6" data-anim="stagger">
              <p className="body max-w-[46ch]">
                Architecture shaped by structure, material, light, and the relationship between solid and void.
                We look for the few elements a building cannot do without, and give each of them its full weight.
              </p>
              <p className="body max-w-[46ch]">
                The result is rarely minimal for its own sake. It is architecture that is easy to read: where the
                load goes, where the light enters, and where a person is invited to stop.
              </p>
            </div>
          </div>
        </div>
      </StudioSection>

      {/* 02 — Design approach */}
      <StudioSection index="02" label="Design approach" titleId="studio-approach">
        <LineHeading id="studio-approach" lines={["Four", "disciplines."]} className="headline" />
        <ol className="grid-12 mt-14 gap-y-10 md:mt-20" data-anim="stagger">
          {APPROACH.map((item, i) => (
            <li key={item.title} className="col-span-4 md:col-span-4 lg:col-span-3">
              <p aria-hidden="true" className="text-[clamp(3rem,5vw,4.5rem)] leading-none font-semibold tracking-[-0.06em] text-concrete">
                0{i + 1}
              </p>
              <h3 className="mt-6 border-t border-ink pt-3 text-sm font-semibold tracking-[0.02em] uppercase">
                {item.title}
              </h3>
              <p className="body mt-3 max-w-[32ch] text-[0.9375rem]">{item.text}</p>
            </li>
          ))}
        </ol>
      </StudioSection>

      {/* 03 — Material exploration */}
      <div className="bg-white">
        <StudioSection index="03" label="Material exploration" titleId="studio-material">
          <div className="grid-12 gap-y-14">
            <div className="col-span-4 md:col-span-8 lg:col-span-5">
              <LineHeading id="studio-material" lines={["Material", "as evidence."]} className="headline" />
              <p className="body mt-10 max-w-[44ch]" data-anim="fade">
                Our material library holds samples from every project: cast panels, stone offcuts, steel finishes
                and glass. We choose materials that show how they were made and that improve as they age.
              </p>
              <dl className="mt-12 border-b border-concrete" data-anim="stagger">
                {MATERIALS.map((m) => (
                  <div key={m.name} className="grid grid-cols-[7rem_1fr] gap-4 border-t border-concrete py-3">
                    <dt className="text-[0.9375rem] font-medium">{m.name}</dt>
                    <dd className="meta self-center text-charcoal">{m.note}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <ImageReveal
              image={images.studioMaterials}
              sizes="(min-width: 1024px) 40vw, (min-width: 768px) 60vw, 100vw"
              parallax={4}
              caption="Fig. 016 — The material library"
              className="col-span-4 md:col-span-6 lg:col-span-5 lg:col-start-8"
            />
          </div>
        </StudioSection>
      </div>

      {/* 04 — Models */}
      <StudioSection index="04" label="Architecture models" titleId="studio-models">
        <div className="grid-12 items-end gap-y-12">
          <ImageReveal
            image={images.studioModels}
            sizes="(min-width: 1024px) 64vw, 100vw"
            parallax={4}
            caption="Fig. 015 — Massing studies on the worktable"
            className="col-span-4 md:col-span-8 lg:col-span-8"
          />
          <div className="col-span-4 md:col-span-6 lg:col-span-4">
            <LineHeading id="studio-models" lines={["Thinking", "in scale."]} className="title" />
            <p className="body mt-6 max-w-[36ch]" data-anim="fade">
              Before any rendering, a project exists as a physical object. Models are made at three scales and
              photographed in real daylight.
            </p>
            <ul className="mt-8 border-b border-concrete" data-anim="stagger">
              {SCALES.map((s) => (
                <li key={s.scale} className="grid grid-cols-[4.5rem_1fr] gap-4 border-t border-concrete py-3">
                  <span className="text-[0.9375rem] font-semibold">{s.scale}</span>
                  <span className="meta self-center text-charcoal">{s.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </StudioSection>

      {/* 05 — Process */}
      <StudioSection index="05" label="Creative process" titleId="studio-process">
        <LineHeading id="studio-process" lines={["From silence", "to structure."]} className="headline" />
        <ol className="mt-14 grid grid-cols-1 gap-y-8 sm:grid-cols-2 md:mt-20 lg:grid-cols-5" data-anim="stagger">
          {PROCESS.map((step, i) => (
            <li key={step.title} className="relative pr-[var(--gutter)]">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="block size-2 bg-ink" />
                <span aria-hidden="true" className="h-px flex-1 bg-ink" />
              </div>
              <p className="meta mt-4 text-charcoal">Stage 0{i + 1}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] uppercase">{step.title}</h3>
              <p className="body mt-2 max-w-[28ch] text-[0.9375rem]">{step.text}</p>
            </li>
          ))}
        </ol>
      </StudioSection>

      {/* 06 — Contact CTA */}
      <section aria-labelledby="studio-cta" className="on-dark bg-ink text-ivory">
        <div className="frame py-[clamp(6rem,12vw,11rem)]">
          <Rule tone="dark" />
          <div className="grid-12 items-end gap-y-10 pt-10">
            <LineHeading
              id="studio-cta"
              lines={["Have a site", "in mind?"]}
              className="headline col-span-4 md:col-span-8 lg:col-span-8"
            />
            <div className="col-span-4 md:col-span-6 lg:col-span-4">
              <p className="mb-8 max-w-[36ch] text-base leading-relaxed text-ivory/80" data-anim="fade">
                The studio is fictional, but the conversation can be practised: the contact page holds a working,
                clearly labelled demo form.
              </p>
              <TransitionLink href="/contact" className="btn btn-light group w-full sm:w-fit">
                Start a conversation
                <ArrowRight aria-hidden="true" size={14} strokeWidth={1.5} className="arrow-shift" />
              </TransitionLink>
            </div>
          </div>
        </div>
      </section>
    </RevealScope>
  );
}
