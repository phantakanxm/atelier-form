import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "ATELIER / FORM — Form follows feeling.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    eyebrow: "INDEX 001",
    title: "Form follows feeling.",
    subtitle: "Architecture & design studio",
    photo: "home.jpg",
  });
}
