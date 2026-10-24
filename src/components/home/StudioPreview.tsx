import { ArrowRight } from "lucide-react";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { LineHeading } from "@/components/ui/LineHeading";
import { images } from "@/lib/images";
import { PROCESS } from "@/lib/studio";

export function StudioPreview() {
  return (
    <section aria-labelledby="practice-title" className="on-dark bg-ink text-ivory">
      <div className="frame py-[clamp(6rem,12vw,11rem)]">
        <div className="grid-12 gap-y-16">
          <div className="col-span-4 flex flex-col md:col-span-8 lg:col-span-5">
            <p className="meta flex gap-3 text-ivory/70" data-anim="fade">
              <span aria-hidden="true">(03)</span>
              <span>Studio</span>
            </p>
            <LineHeading id="practice-title" lines={["The practice", "of form."]} className="headline mt-6" />
            <p className="mt-10 max-w-[40ch] text-base leading-relaxed text-ivory/80" data-anim="fade">
              Every project moves through the same disciplined sequence. We work slowly in drawings and physical
              models, so that by the time a building is detailed, its idea is already simple enough to survive
              construction.
            </p>

            <ol className="mt-12 border-b border-ivory/20" data-anim="stagger">
              {PROCESS.map((step, i) => (
                <li key={step.title} className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-ivory/20 py-4 sm:grid-cols-[3rem_8rem_1fr]">
                  <span className="meta pt-0.5 text-ivory/60">0{i + 1}</span>
                  <span className="text-sm font-medium tracking-[0.02em] uppercase">{step.title}</span>
                  <span className="col-start-2 text-sm text-ivory/70 sm:col-start-3">{step.text}</span>
                </li>
              ))}
            </ol>

            <TransitionLink
              href="/studio"
              className="btn btn-light group mt-12 w-full sm:w-fit"
            >
              Enter the studio
              <ArrowRight aria-hidden="true" size={14} strokeWidth={1.5} className="arrow-shift" />
            </TransitionLink>
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
            <ImageReveal
              image={images.studioWorkspace}
              sizes="(min-width: 1024px) 48vw, 100vw"
              parallax={4}
              caption="Fig. 014 — The workspace"
              captionClassName="text-ivory/70"
            />
            <div className="grid-12 mt-10 lg:mt-16 lg:[grid-template-columns:repeat(6,minmax(0,1fr))]">
              <ImageReveal
                image={images.studioModels}
                sizes="(min-width: 1024px) 24vw, (min-width: 768px) 50vw, 100vw"
                className="col-span-4 md:col-span-5 lg:col-span-4"
                caption="Fig. 015 — Massing models"
                captionClassName="text-ivory/70"
              />
              <p className="meta col-span-4 mt-6 self-end text-ivory/60 md:col-span-3 md:mt-0 md:pl-4 lg:col-span-2">
                Models are built for every project at three scales: site, building and detail.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
