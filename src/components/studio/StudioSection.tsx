import type { ReactNode } from "react";
import { Rule } from "@/components/ui/Rule";
import { SectionLabel } from "@/components/ui/SectionLabel";

type StudioSectionProps = {
  index: string;
  label: string;
  titleId: string;
  children: ReactNode;
};

/** A numbered studio chapter: drawn rule, index label, then free content on the grid. */
export function StudioSection({ index, label, titleId, children }: StudioSectionProps) {
  return (
    <section aria-labelledby={titleId} className="frame py-[clamp(5rem,10vw,9rem)]">
      <Rule />
      <div className="flex justify-between pt-4 pb-12 md:pb-16">
        <SectionLabel index={index}>{label}</SectionLabel>
        <p aria-hidden="true" className="meta text-charcoal">
          {index} / 05
        </p>
      </div>
      {children}
    </section>
  );
}
