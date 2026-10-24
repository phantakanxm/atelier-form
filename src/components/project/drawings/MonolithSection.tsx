import { Bubble, Dim, GroundHatch, Label, P, R } from "./primitives";

function stairPath(x: number, y: number, steps: number, run: number, rise: number) {
  let d = `M${x} ${y}`;
  for (let i = 0; i < steps; i++) d += `v${-rise}h${run}`;
  return d;
}

/** Schematic section A–A: a glazed living level beneath a cantilevered concrete volume. */
export function MonolithSection() {
  return (
    <>
      <Label x={60} y={40}>SECTION A–A</Label>
      {[
        [200, "A"],
        [380, "B"],
        [760, "C"],
        [1000, "D"],
      ].map(([x, id]) => (
        <g key={id}>
          <Bubble x={x as number} y={70} id={id as string} />
          <P d={`M${x} 84V560`} s="axis" />
        </g>
      ))}

      {/* Ground, with the sunken court */}
      <P d="M60 560H780V600H940V560H1140" s="wall" />
      <GroundHatch x1={60} x2={770} y={560} />
      <GroundHatch x1={950} x2={1130} y={560} />

      {/* Stair tower */}
      <R x={200} y={170} w={60} h={390} s="wall" />
      <P d={stairPath(206, 556, 9, 5, 40)} s="thin" />

      {/* Glazed living level */}
      <R x={260} y={410} w={500} h={14} s="wall" />
      <P
        d={Array.from({ length: 9 }, (_, i) => `M${300 + i * 55} 424V560`).join("")}
        s="thin"
      />

      {/* Cantilevered upper volume */}
      <R x={380} y={250} w={620} h={160} s="wall" />
      <R x={420} y={298} w={500} h={56} s="line" />

      {/* Low sun */}
      <P d="M1130 90L760 404" s="dash" />

      <Dim x1={760} x2={1000} y={222} label="CANTILEVER" />
      <Dim x1={200} x2={1000} y={626} label="OVERALL" />

      <Label x={440} y={385} size={12}>UPPER LEVEL — SLEEP / RETREAT</Label>
      <Label x={280} y={500} size={12}>GLAZED LIVING LEVEL</Label>
      <Label x={860} y={590} anchor="middle" size={11}>SUNKEN COURT</Label>
      <Label x={1120} y={120} anchor="end" size={11}>LOW SUN</Label>
    </>
  );
}
