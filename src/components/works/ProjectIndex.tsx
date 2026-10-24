"use client";

import { LayoutGrid, Rows3 } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import type { Category, Project } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectList } from "./ProjectList";

export type IndexProject = Pick<
  Project,
  "slug" | "index" | "name" | "suffix" | "category" | "typology" | "year" | "summary" | "cover"
>;

export type View = "grid" | "list";
export type Filter = "All" | Category;

const GRID_LAYOUTS = [
  "lg:col-span-7",
  "lg:col-span-4 lg:col-start-9 lg:mt-56",
  "lg:col-span-6 lg:col-start-3 lg:-mt-8",
];

type ProjectIndexProps = {
  projects: IndexProject[];
  categories: Category[];
  initialView?: View;
  initialFilter?: Filter;
};

/** Mirrors the display state into the query string, so Back and shared links restore it. */
function writeQuery(view: View, filter: Filter) {
  const params = new URLSearchParams();
  if (view !== "grid") params.set("view", view);
  if (filter !== "All") params.set("category", filter.toLowerCase());
  const query = params.toString();
  window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
}

export function ProjectIndex({
  projects,
  categories,
  initialView = "grid",
  initialFilter = "All",
}: ProjectIndexProps) {
  const [view, setViewState] = useState<View>(initialView);
  const [filter, setFilterState] = useState<Filter>(initialFilter);

  const setView = (next: View) => {
    setViewState(next);
    writeQuery(next, filter);
  };
  const setFilter = (next: Filter) => {
    setFilterState(next);
    writeQuery(view, next);
  };
  const resultsRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [projects, filter],
  );

  const filters: { value: Filter; count: number }[] = [
    { value: "All", count: projects.length },
    ...categories.map((c) => ({ value: c, count: projects.filter((p) => p.category === c).length })),
  ];

  // Re-composes the index whenever the view or filter changes.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-index-item]", {
          y: 32,
          opacity: 0,
          duration: 0.8,
          stagger: 0.07,
          ease: "power3.out",
          clearProps: "transform,opacity",
        });
        if (!resultsRef.current?.querySelector("[data-index-rule]")) return;
        gsap.from("[data-index-rule]", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1,
          stagger: 0.06,
          ease: "power3.inOut",
        });
      });
    },
    { scope: resultsRef, dependencies: [view, filter], revertOnUpdate: true },
  );

  return (
    <div>
      <div className="flex flex-col gap-6 border-y border-concrete py-4 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              aria-pressed={filter === f.value}
              onClick={() => setFilter(f.value)}
              className={`meta min-h-10 border px-3 transition-colors duration-300 ${
                filter === f.value
                  ? "border-ink bg-ink text-ivory"
                  : "border-concrete text-charcoal hover:border-ink hover:text-ink"
              }`}
            >
              {f.value} <span aria-hidden="true">({String(f.count).padStart(2, "0")})</span>
              <span className="sr-only">, {f.count} {f.count === 1 ? "project" : "projects"}</span>
            </button>
          ))}
        </div>

        <div role="group" aria-label="Display mode" className="flex gap-2">
          {(["grid", "list"] as const).map((mode) => {
            const Icon = mode === "grid" ? LayoutGrid : Rows3;
            return (
              <button
                key={mode}
                type="button"
                aria-pressed={view === mode}
                onClick={() => setView(mode)}
                className={`meta flex min-h-10 items-center gap-2 border px-3 transition-colors duration-300 ${
                  view === mode
                    ? "border-ink bg-ink text-ivory"
                    : "border-concrete text-charcoal hover:border-ink hover:text-ink"
                }`}
              >
                <Icon aria-hidden="true" size={13} strokeWidth={1.5} />
                {mode === "grid" ? "Grid" : "List"}
              </button>
            );
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
        {filter === "All" ? "" : ` in ${filter}`}, {view} view.
      </p>

      <div ref={resultsRef} className="mt-12 md:mt-16">
        {view === "grid" ? (
          <ul className="grid-12 gap-y-20 md:gap-y-24">
            {visible.map((project, i) => (
              <li
                key={project.slug}
                data-index-item
                className={`col-span-4 md:col-span-8 ${
                  visible.length === 1 ? "lg:col-span-8" : GRID_LAYOUTS[i % GRID_LAYOUTS.length]
                }`}
              >
                <ProjectCard project={project} priority={i === 0} />
              </li>
            ))}
          </ul>
        ) : (
          <ProjectList projects={visible} />
        )}
      </div>
    </div>
  );
}
