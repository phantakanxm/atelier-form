import type { ReactNode } from "react";

type SectionLabelProps = { index: string; children: ReactNode; className?: string };

export function SectionLabel({ index, children, className = "" }: SectionLabelProps) {
  return (
    <p className={`meta flex gap-3 ${className}`} data-anim="fade">
      <span aria-hidden="true">({index})</span>
      <span>{children}</span>
    </p>
  );
}
