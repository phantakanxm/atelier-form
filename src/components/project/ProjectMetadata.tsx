import type { Project } from "@/lib/projects";

export function ProjectMetadata({ items }: { items: Project["metadata"] }) {
  return (
    <dl className="grid-12 gap-y-8" data-anim="stagger">
      {items.map((item) => (
        <div key={item.label} className="col-span-2 border-t border-ink pt-3 md:col-span-2 lg:col-span-2">
          <dt className="meta text-charcoal/80">{item.label}</dt>
          <dd className="mt-2 text-[0.9375rem] leading-snug font-medium">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
