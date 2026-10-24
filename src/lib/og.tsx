import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

const root = process.cwd();
const font = (path: string) => readFile(join(root, "node_modules/geist/dist/fonts", path));

type OgCard = { eyebrow: string; title: string; subtitle: string; photo: string };

/** Editorial share card: typography on ivory beside a photograph, on the site's grid. */
export async function renderOg({ eyebrow, title, subtitle, photo }: OgCard) {
  const [semibold, mono, image] = await Promise.all([
    font("geist-sans/Geist-SemiBold.ttf"),
    font("geist-mono/GeistMono-Regular.ttf"),
    readFile(join(root, "src/assets/og", photo)),
  ]);

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#F2F0EB", color: "#141414" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 480,
            padding: "44px 40px",
            borderRight: "1px solid #141414",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Mono", fontSize: 15 }}>
            <span>ATELIER / FORM</span>
            <span>{eyebrow}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 82, lineHeight: 0.88, letterSpacing: "-0.05em", textTransform: "uppercase" }}>
              {title}
            </span>
            <span style={{ marginTop: 18, fontSize: 30, letterSpacing: "-0.02em", color: "#33332F" }}>{subtitle}</span>
          </div>
          <div style={{ display: "flex", borderTop: "1px solid #C7C4BE", paddingTop: 14, fontFamily: "Mono", fontSize: 14 }}>
            ARCHITECTURE IN ITS PUREST FORM.
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img only */}
        <img src={`data:image/jpeg;base64,${image.toString("base64")}`} width={720} height={630} alt="" />
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
        { name: "Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
