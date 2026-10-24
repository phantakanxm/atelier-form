import { Bubble, Dim, Label, North, P, R } from "./primitives";

/** Schematic ground-floor plan: a closed ring of rooms around an open courtyard. */
export function VoidPlan() {
  return (
    <>
      <Label x={60} y={40}>GROUND FLOOR PLAN</Label>
      {[
        [300, "1"],
        [420, "2"],
        [780, "3"],
        [900, "4"],
      ].map(([x, id]) => (
        <g key={id}>
          <Bubble x={x as number} y={44} id={id as string} />
          <P d={`M${x} 58V80`} s="axis" />
        </g>
      ))}
      <Bubble x={250} y={80} id="A" />
      <Bubble x={250} y={560} id="B" />

      {/* Closed perimeter and inner courtyard wall */}
      <R x={300} y={80} w={600} h={480} s="wall" />
      <R x={420} y={200} w={360} h={240} s="wall" />

      {/* Rooms */}
      <P d="M300 300H420M300 420H420M560 80V200M700 80V200M780 320H900M520 440V560M680 440V560" s="wall" />

      {/* Roof edge above the courtyard */}
      <R x={446} y={224} w={308} h={192} s="dash" />

      {/* Olive tree and reflecting pool */}
      <circle cx={600} cy={292} r={44} strokeWidth={0.9} data-draw="" pathLength={1} />
      <circle cx={600} cy={292} r={5} strokeWidth={1.5} data-draw="" pathLength={1} />
      <R x={470} y={356} w={260} h={44} s="line" />
      <P d="M490 372H560M600 384H700" s="thin" />

      <North x={1080} y={130} />
      <Dim x1={300} x2={900} y={606} label="CLOSED RING" />

      <Label x={600} y={250} anchor="middle" size={12}>COURTYARD</Label>
      <Label x={600} y={393} anchor="middle" size={10}>POOL</Label>
      <Label x={360} y={365} anchor="middle" size={11}>BEDROOMS</Label>
      <Label x={630} y={145} anchor="middle" size={11}>LIVING</Label>
      <Label x={840} y={385} anchor="middle" size={11}>KITCHEN</Label>
      <Label x={600} y={505} anchor="middle" size={11}>ENTRY</Label>
    </>
  );
}
