import { ArrowRight } from "lucide-react";
import { TransitionLink } from "@/components/motion/TransitionLink";

export default function NotFound() {
  return (
    <section className="frame flex min-h-[80svh] flex-col justify-end pt-[var(--header-h)] pb-20">
      <p className="meta text-charcoal">Error 404 — No such space</p>
      <h1 className="display mt-6">
        Void.
      </h1>
      <p className="body mt-8 max-w-[40ch]">This page does not exist. The plan has an empty room here.</p>
      <TransitionLink href="/works" className="btn group mt-10 w-fit">
        Back to the index
        <ArrowRight aria-hidden="true" size={14} strokeWidth={1.5} className="arrow-shift" />
      </TransitionLink>
    </section>
  );
}
