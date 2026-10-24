import type { ElementType } from "react";

type LineHeadingProps = {
  as?: ElementType;
  lines: string[];
  className?: string;
  id?: string;
  /** Per-line classes, e.g. to indent the second line onto a later grid column. */
  lineClassNames?: (string | undefined)[];
  animate?: boolean;
  /** Hide lines until the reveal is armed; use for headings visible on first paint. */
  gate?: boolean;
};

/** Heading split into overflow masks so each line can rise into place. */
export function LineHeading({
  as: Tag = "h2",
  lines,
  className,
  id,
  lineClassNames = [],
  animate = true,
  gate = false,
}: LineHeadingProps) {
  return (
    <Tag id={id} className={className} data-anim={animate ? "lines" : undefined}>
      {lines.map((line, i) => (
        <span key={i} className={`line-mask ${lineClassNames[i] ?? ""}`}>
          <span data-hero-hide={gate && animate ? "" : undefined}>{line}</span>
          {i < lines.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
