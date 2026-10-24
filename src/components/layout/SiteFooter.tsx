import { TransitionLink } from "@/components/motion/TransitionLink";
import { RevealScope } from "@/components/motion/RevealScope";
import { projects } from "@/lib/projects";
import { BackToTop } from "./BackToTop";
import { NAV_ITEMS } from "./navigation";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-ink text-ivory">
      <RevealScope className="frame pt-20 pb-8 md:pt-28">
        <div className="grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-4 lg:col-span-4">
            <p className="lede max-w-[22ch]" data-anim="fade">
              Architecture shaped by structure, material, light, and the relationship between solid and void.
            </p>
          </div>

          <nav aria-label="Footer" className="col-span-2 md:col-span-2 lg:col-span-2 lg:col-start-6">
            <p className="meta mb-5 text-ivory/60">Index</p>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <TransitionLink href={item.href} className="link-line text-sm">
                    {item.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-2 lg:col-span-2">
            <p className="meta mb-5 text-ivory/60">Projects</p>
            <ul className="space-y-2">
              {projects.map((project) => (
                <li key={project.slug}>
                  <TransitionLink href={`/works/${project.slug}`} className="link-line text-sm">
                    {project.name}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-3 lg:col-start-10">
            <p className="meta mb-5 text-ivory/60">Note</p>
            <p className="text-sm leading-relaxed text-ivory/80">
              ATELIER / FORM is a fictional studio. All projects are design concepts created for a frontend
              portfolio; no clients, sites or commissions are implied.
            </p>
          </div>
        </div>

        <div className="mt-20 overflow-hidden md:mt-28">
          <div aria-hidden="true" data-anim="rule" className="h-px bg-ivory/20" />
          <p
            aria-hidden="true"
            className="pt-4 text-[13.6vw] leading-[0.8] font-semibold tracking-[-0.06em] whitespace-nowrap"
          >
            ATELIER<span className="text-stone">/</span>FORM
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ivory/20 pt-4 text-ivory/70">
          <p className="meta">© 2026 — Concept website</p>
          <p className="meta hidden md:block">Architecture in its purest form.</p>
          <BackToTop />
        </div>
      </RevealScope>
    </footer>
  );
}
