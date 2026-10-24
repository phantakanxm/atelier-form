"use client";

import { ArrowUp } from "lucide-react";
import { useLenis } from "@/components/motion/SmoothScrollProvider";

export function BackToTop() {
  const lenisRef = useLenis();

  return (
    <button
      type="button"
      className="group meta flex min-h-11 items-center gap-2"
      onClick={() => {
        if (lenisRef.current) lenisRef.current.scrollTo(0, { duration: 1.4 });
        else window.scrollTo({ top: 0 });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
    >
      <span className="link-line">Back to top</span>
      <ArrowUp aria-hidden="true" size={14} strokeWidth={1.5} className="arrow-shift-diag" />
    </button>
  );
}
