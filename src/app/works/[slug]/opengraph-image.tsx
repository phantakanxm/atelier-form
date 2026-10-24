import { OG_SIZE, renderOg } from "@/lib/og";
import { getProject, projects } from "@/lib/projects";

export const size = OG_SIZE;
export const contentType = "image/png";

export const alt = "A concept project by ATELIER / FORM";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug)!;
  return renderOg({
    eyebrow: `PROJECT ${project.index}`,
    title: project.name,
    subtitle: `${project.suffix} — ${project.typology}, ${project.year}`,
    photo: `${project.slug}.jpg`,
  });
}
