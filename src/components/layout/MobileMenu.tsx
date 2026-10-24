"use client";

import { X } from "lucide-react";
import { useEffect, useRef, type KeyboardEvent, type RefObject } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLenis } from "@/components/motion/SmoothScrollProvider";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { isActivePath, NAV_ITEMS } from "./navigation";

const MENU_ITEMS = [{ href: "/", index: "00", label: "Index" }, ...NAV_ITEMS];

type MobileMenuProps = {
  open: boolean;
  pathname: string;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
};

export function MobileMenu({ open, pathname, onClose, returnFocusRef }: MobileMenuProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const wasOpen = useRef(false);
  const lenisRef = useLenis();

  useGSAP(
    () => {
      timeline.current = gsap
        .timeline({
          paused: true,
          onReverseComplete: () => {
            gsap.set(rootRef.current, { visibility: "hidden" });
          },
        })
        .fromTo(
          rootRef.current,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.55, ease: "power3.inOut" },
        )
        .from(
          "[data-menu-rule]",
          { scaleX: 0, transformOrigin: "left center", duration: 0.7, stagger: 0.05, ease: "power3.inOut" },
          0.2,
        )
        .from("[data-menu-item]", { yPercent: 105, duration: 0.7, stagger: 0.06, ease: "power4.out" }, 0.28)
        .from("[data-menu-meta]", { opacity: 0, duration: 0.4 }, 0.5);
    },
    { scope: rootRef },
  );

  useEffect(() => {
    const tl = timeline.current;
    const root = rootRef.current;
    if (!tl || !root) return;
    if (open === wasOpen.current) return;
    wasOpen.current = open;
    const reduce = prefersReducedMotion();

    if (open) {
      gsap.set(root, { visibility: "visible" });
      if (reduce) tl.progress(1).pause();
      else tl.timeScale(1).play();
      lenisRef.current?.stop();
      document.documentElement.style.overflow = "hidden";
      closeRef.current?.focus();
    } else {
      if (reduce) {
        tl.progress(0).pause();
        gsap.set(root, { visibility: "hidden" });
      } else {
        tl.timeScale(1.7).reverse();
      }
      lenisRef.current?.start();
      document.documentElement.style.overflow = "";
      returnFocusRef.current?.focus({ preventScroll: true });
    }
  }, [open, lenisRef, returnFocusRef]);

  // The overlay only exists below the tablet breakpoint.
  useEffect(() => {
    if (!open) return;
    const wide = window.matchMedia("(min-width: 48rem)");
    const onChange = () => wide.matches && onClose();
    wide.addEventListener("change", onChange);
    return () => wide.removeEventListener("change", onChange);
  }, [open, onClose]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key !== "Tab" || !rootRef.current) return;
    const focusables = rootRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  return (
    <div
      ref={rootRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      inert={!open}
      onKeyDown={onKeyDown}
      className="on-dark invisible fixed inset-0 z-[70] flex flex-col bg-ink text-ivory md:hidden"
      style={{ clipPath: "inset(0% 0% 100% 0%)" }}
    >
      <div className="frame flex h-[var(--header-h)] shrink-0 items-center justify-between">
        <span className="text-[0.9375rem] font-semibold tracking-[-0.01em]">
          ATELIER <span className="text-stone">/</span> FORM
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="meta flex min-h-11 items-center gap-3 border border-ivory px-4"
        >
          Close
          <X aria-hidden="true" size={14} strokeWidth={1.5} />
        </button>
      </div>

      <nav aria-label="Mobile" className="frame flex flex-1 flex-col justify-center">
        <ul>
          {MENU_ITEMS.map((item) => {
            const active = item.href === "/" ? pathname === "/" : isActivePath(pathname, item.href);
            return (
              <li key={item.href}>
                <div data-menu-rule className="h-px bg-ivory/20" />
                <TransitionLink
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className="group flex items-end justify-between gap-4 py-4"
                >
                  <span className="line-mask">
                    <span
                      data-menu-item
                      className="text-[clamp(3rem,15vw,6rem)] leading-[0.9] font-semibold tracking-[-0.05em] uppercase"
                    >
                      {item.label}
                    </span>
                  </span>
                  <span className="meta pb-2 text-ivory/70">
                    {active ? "Current — " : ""}
                    {item.index}
                  </span>
                </TransitionLink>
              </li>
            );
          })}
          <li aria-hidden="true">
            <div data-menu-rule className="h-px bg-ivory/20" />
          </li>
        </ul>
      </nav>

      <div data-menu-meta className="frame meta flex justify-between pb-6 text-ivory/70">
        <span>Architecture in its purest form.</span>
        <span>Fictional studio</span>
      </div>
    </div>
  );
}
