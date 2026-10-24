import type { SVGProps } from "react";

/**
 * Drawing primitives. Every stroked element carries pathLength="1" so the draw-on
 * animation can run stroke-dashoffset 1 → 0 regardless of its real length.
 */

type Stroke = "wall" | "line" | "thin" | "axis" | "dash";

const STROKE: Record<Stroke, SVGProps<SVGPathElement>> = {
  wall: { strokeWidth: 3 },
  line: { strokeWidth: 1.5 },
  thin: { strokeWidth: 0.9, opacity: 0.7 },
  axis: { strokeWidth: 0.9, strokeDasharray: "18 6 3 6", opacity: 0.6 },
  dash: { strokeWidth: 0.9, strokeDasharray: "6 6", opacity: 0.7 },
};

export function P({ d, s = "line" }: { d: string; s?: Stroke }) {
  // Patterned strokes cannot be drawn on with dashoffset, so they fade in instead.
  const patterned = s === "axis" || s === "dash";
  return (
    <path
      d={d}
      {...STROKE[s]}
      {...(patterned ? { "data-draw-fade": "" } : { "data-draw": "", pathLength: 1 })}
    />
  );
}

export function R({ x, y, w, h, s = "line" }: { x: number; y: number; w: number; h: number; s?: Stroke }) {
  return <P d={`M${x} ${y}h${w}v${h}h${-w}Z`} s={s} />;
}

export function Label({
  x,
  y,
  children,
  anchor = "start",
  size = 13,
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
  size?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      data-draw-label=""
      fill="currentColor"
      stroke="#ffffff"
      strokeWidth={6}
      paintOrder="stroke"
      style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.06em" }}
    >
      {children}
    </text>
  );
}

/** Structural grid bubble: a circle with an axis letter or number. */
export function Bubble({ x, y, id }: { x: number; y: number; id: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={13} strokeWidth={0.9} data-draw="" pathLength={1} />
      <Label x={x} y={y + 4.5} anchor="middle" size={12}>
        {id}
      </Label>
    </g>
  );
}

/** Horizontal dimension line with architectural ticks and a centred label. */
export function Dim({ x1, x2, y, label }: { x1: number; x2: number; y: number; label: string }) {
  return (
    <g>
      <P d={`M${x1} ${y}H${x2}`} s="thin" />
      <P d={`M${x1 - 6} ${y + 6}l12 -12M${x2 - 6} ${y + 6}l12 -12`} s="thin" />
      <P d={`M${x1} ${y - 14}v28M${x2} ${y - 14}v28`} s="thin" />
      <Label x={(x1 + x2) / 2} y={y - 10} anchor="middle" size={11}>
        {label}
      </Label>
    </g>
  );
}

/** North arrow for plans. */
export function North({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={22} strokeWidth={0.9} data-draw="" pathLength={1} />
      <P d={`M${x} ${y + 16}L${x} ${y - 16}M${x - 7} ${y - 6}L${x} ${y - 16}L${x + 7} ${y - 6}`} s="line" />
      <Label x={x} y={y - 30} anchor="middle" size={11}>
        N
      </Label>
    </g>
  );
}

/** Ground hatch: short diagonals below a datum line. */
export function GroundHatch({ x1, x2, y, step = 16 }: { x1: number; x2: number; y: number; step?: number }) {
  let d = "";
  for (let x = x1; x < x2; x += step) d += `M${x} ${y + 12}l12 -12`;
  return <P d={d} s="thin" />;
}
