import type { Metadata } from "next";
import { Suspense } from "react";
import { RevealScope } from "@/components/motion/RevealScope";
import { LineHeading } from "@/components/ui/LineHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectIndex } from "@/components/works/ProjectIndex";
import { ProjectIndexFromQuery } from "@/components/works/ProjectIndexFromQuery";
import { categories, projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Selected Works",
  description: "An index of space: three architectural concept projects by ATELIER / FORM.",
};

export default function WorksPage() {
  const indexProjects = projects.map(({ slug, index, name, suffix, category, typology, year, summary, cover }) => ({
    slug,
    index,
    name,
    suffix,
    category,
    typology,
    year,
    summary,
    cover,
  }));

  return (
    <RevealScope className="frame pt-[calc(var(--header-h)_+_clamp(3rem,8vw,7rem))] pb-[clamp(6rem,12vw,11rem)]">
      <header className="grid-12 items-end gap-y-8 pb-12 md:pb-20">
        <div className="col-span-4 md:col-span-6 lg:col-span-8">
          <SectionLabel index="01" className="mb-6">
            Works — Index
          </SectionLabel>
          <LineHeading as="h1" gate lines={["An index", "of space."]} className="display" />
        </div>
        <p className="body col-span-4 max-w-[36ch] md:col-span-2 lg:col-span-3 lg:col-start-10" data-anim="fade">
          Concept projects in residential and cultural architecture. Filter by typology, or switch between an
          image-led grid and a typographic list.
        </p>
      </header>

      {/* The static HTML renders the default grid; the query string is applied on the client. */}
      <Suspense fallback={<ProjectIndex projects={indexProjects} categories={categories} />}>
        <ProjectIndexFromQuery projects={indexProjects} categories={categories} />
      </Suspense>
    </RevealScope>
  );
}
