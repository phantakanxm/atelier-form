import { Bubble, Dim, Label, North, P, R } from "./primitives";

/** Schematic plan: two parallel exhibition volumes joined by a glazed central atrium. */
export function AxisPlan() {
  const mullions = Array.from({ length: 15 }, (_, i) => 200 + i * 57)
    .map((x) => `M${x} 284v12M${x} 384v12`)
    .join("");
  const treads = Array.from({ length: 11 }, (_, i) => `M${575 + i * 15} 300v38`).join("");

  return (
    <>
      <Label x={60} y={40}>PLAN — LEVEL 0</Label>
      {[
        [180, "1"],
        [460, "2"],
        [740, "3"],
        [1020, "4"],
      ].map(([x, id]) => (
        <g key={id}>
          <Bubble x={x as number} y={64} id={id as string} />
          <P d={`M${x} 78V110`} s="axis" />
        </g>
      ))}

      {/* Parallel halls */}
      <R x={180} y={110} w={840} h={160} s="wall" />
      <R x={180} y={410} w={840} h={160} s="wall" />
      <P d="M460 110V270M740 110V270M460 410V570M740 410V570" s="wall" />

      {/* Glazed atrium */}
      <P d="M180 290H1020M180 390H1020" s="line" />
      <P d={mullions} s="thin" />
      <R x={200} y={316} w={800} h={48} s="dash" />
      <R x={560} y={300} w={180} h={38} s="line" />
      <P d={treads} s="thin" />

      {/* The axis, extended into the landscape by water */}
      <P d="M40 340H1180" s="axis" />
      <R x={60} y={300} w={100} h={80} s="line" />
      <R x={1040} y={300} w={120} h={80} s="line" />
      <P d="M72 324H130M1052 356H1130" s="thin" />

      <North x={1110} y={170} />
      <Dim x1={180} x2={1020} y={612} label="PARALLEL VOLUMES" />

      <Label x={320} y={195} anchor="middle" size={12}>HALL A</Label>
      <Label x={320} y={495} anchor="middle" size={12}>HALL B</Label>
      <Label x={300} y={345} size={11}>ATRIUM / SKYLIGHT ABOVE</Label>
      <Label x={650} y={355} anchor="middle" size={10}>STAIR</Label>
      <Label x={60} y={290} size={11}>AXIS</Label>
    </>
  );
}
