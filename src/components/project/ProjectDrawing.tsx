import type { ComponentType } from "react";
import type { DrawingKind, Project } from "@/lib/projects";
import { AxisPlan } from "./drawings/AxisPlan";
import { MonolithSection } from "./drawings/MonolithSection";
import { VoidPlan } from "./drawings/VoidPlan";

const DRAWINGS = {
  "monolith-section": MonolithSection,
  "void-plan": VoidPlan,
  "axis-plan": AxisPlan,
} satisfies Record<DrawingKind, ComponentType>;

/** A schematic drawing on a white sheet; its linework draws itself into place on scroll. */
export function ProjectDrawing({ drawing }: { drawing: Project["drawing"] }) {
  const Drawing = DRAWINGS[drawing.kind];
  return (
    <figure>
      <div className="overflow-x-auto border border-concrete bg-white">
        <svg
          viewBox="0 0 1200 650"
          role="img"
          aria-label={drawing.description}
          data-anim="draw"
          className="block h-auto w-full min-w-[40rem] text-ink"
          fill="none"
          stroke="currentColor"
          strokeLinecap="square"
        >
          <Drawing />
        </svg>
      </div>
      <figcaption className="meta mt-3 flex justify-between gap-4 text-charcoal">
        <span>{drawing.title}</span>
        <span className="hidden sm:inline">Schematic — not to scale</span>
      </figcaption>
    </figure>
  );
}
