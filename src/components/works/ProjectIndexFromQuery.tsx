"use client";

import { useSearchParams } from "next/navigation";
import type { Category } from "@/lib/projects";
import { ProjectIndex, type Filter, type IndexProject } from "./ProjectIndex";

type Props = { projects: IndexProject[]; categories: Category[] };

export function ProjectIndexFromQuery({ projects, categories }: Props) {
  const params = useSearchParams();
  const view = params.get("view") === "list" ? "list" : "grid";
  const category = params.get("category");
  const filter: Filter = categories.find((c) => c.toLowerCase() === category) ?? "All";

  return <ProjectIndex projects={projects} categories={categories} initialView={view} initialFilter={filter} />;
}
