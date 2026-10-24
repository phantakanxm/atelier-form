import { ImageReveal } from "@/components/ui/ImageReveal";
import { LineHeading } from "@/components/ui/LineHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { images } from "@/lib/images";

const PRINCIPLES = [
  { index: "01", title: "Structure", text: "The frame is the first decision and the last ornament." },
  { index: "02", title: "Material", text: "Surfaces are left honest, so they record time and touch." },
  { index: "03", title: "Light", text: "Openings are placed to draw light, not to frame views alone." },
  { index: "04", title: "Proportion", text: "Measure gives calm; every dimension answers to another." },
];

export function Philosophy() {
  return (
    <section aria-labelledby="philosophy-title" className="relative border-t border-concrete">
      <div className="frame relative py-[clamp(6rem,12vw,11rem)]">
        <div className="grid-12 gap-y-8">
          <SectionLabel index="02" className="col-span-4 md:col-span-8 lg:col-span-4">
            Philosophy
          </SectionLabel>
          <LineHeading
            id="philosophy-title"
            lines={["Built from", "the essential."]}
            lineClassNames={[undefined, "lg:pl-[calc(2*(100%_+_var(--gutter))/12)]"]}
            className="headline col-span-4 md:col-span-8 lg:col-span-12"
          />
        </div>

        <div className="relative mt-16 md:mt-24">
        {/* Construction line on the text column's edge, kept below the heading */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-10 bottom-0 left-0 right-0 hidden lg:block">
          <div className="grid-12 h-full">
            <span data-anim="rule-y" className="col-start-6 -ml-[calc(var(--gutter)/2)] block h-full w-px bg-concrete" />
          </div>
        </div>
        <div className="grid-12 relative gap-y-14">
          <ImageReveal
            image={images.concreteTexture}
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
            parallax={4}
            className="col-span-4 md:col-span-4 lg:col-span-4 lg:row-span-2"
            caption="Fig. 017 — Board-formed concrete, diagonal light"
          />

          <div className="col-span-4 md:col-span-4 lg:col-span-6 lg:col-start-6">
            <p className="lede max-w-[30ch] text-ink" data-anim="fade">
              We believe architecture begins with clarity. Through structure, material, light, and proportion, we
              create spaces that are both purposeful and deeply human.
            </p>

            <ol className="mt-14 grid grid-cols-1 gap-x-[var(--gutter)] sm:grid-cols-2" data-anim="stagger">
              {PRINCIPLES.map((p) => (
                <li key={p.index} className="border-t border-concrete pt-4 pb-8">
                  <p className="meta flex justify-between text-charcoal">
                    <span>{p.title}</span>
                    <span aria-hidden="true">{p.index}</span>
                  </p>
                  <p className="mt-3 max-w-[30ch] text-[0.9375rem] leading-snug text-charcoal">{p.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <ImageReveal
            image={images.lightGeometry}
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6 lg:self-end"
            caption={
              <span className="flex justify-between gap-4">
                <span>Fig. 018 — Light, shadow & geometry</span>
                <span className="hidden sm:inline">Studio reference</span>
              </span>
            }
          />
        </div>
        </div>
      </div>
    </section>
  );
}
