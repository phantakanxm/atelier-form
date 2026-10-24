"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { MobileMenu } from "./MobileMenu";
import { isActivePath, NAV_ITEMS } from "./navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  // On a first visit to the home page the header joins the hero's entrance sequence.
  const [intro] = useState(() => pathname === "/");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - last) > 4) {
        setHidden(y > last && y > 360);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(
    () => {
      if (!intro) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-intro-item]",
          { y: -10, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.07, delay: 1.5, ease: "power3.out" },
        );
      });
    },
    { scope: headerRef },
  );

  const introAttr = intro ? { "data-intro-item": "", "data-hero-hide": "" } : {};
  const isHidden = hidden && !menuOpen;

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[transform,background-color,border-color] duration-500 ease-[var(--ease-out-arch)] ${
          scrolled ? "border-concrete bg-ivory" : "border-transparent bg-transparent"
        } ${isHidden ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="frame grid-12 h-[var(--header-h)] items-center">
          <TransitionLink
            href="/"
            {...introAttr}
            className="col-span-2 justify-self-start py-3 text-[0.9375rem] font-semibold tracking-[-0.01em] whitespace-nowrap md:col-span-3"
            aria-label="ATELIER / FORM — home"
          >
            ATELIER <span className="text-stone">/</span> FORM
          </TransitionLink>

          <p {...introAttr} className="meta hidden text-charcoal lg:col-span-3 lg:col-start-5 lg:block">
            Architecture in its purest form.
          </p>

          <nav aria-label="Primary" className="col-span-2 justify-self-end md:col-span-5 lg:col-span-5">
            <ul className="hidden items-center gap-10 md:flex">
              {NAV_ITEMS.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href} {...introAttr}>
                    <TransitionLink
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className="link-line flex items-baseline gap-2 py-2 text-[0.8125rem] font-medium tracking-[0.02em] uppercase"
                    >
                      <span className="font-mono text-[0.6875rem] text-charcoal/70">{item.index} /</span>
                      {item.label}
                    </TransitionLink>
                  </li>
                );
              })}
            </ul>

            <button
              ref={menuButtonRef}
              type="button"
              {...introAttr}
              className="meta flex min-h-11 items-center gap-3 border border-ink px-4 md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
            >
              Menu
              <span aria-hidden="true" className="flex w-4 flex-col gap-[3px]">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-full bg-current" />
              </span>
            </button>
          </nav>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        pathname={pathname}
        onClose={() => setMenuOpen(false)}
        returnFocusRef={menuButtonRef}
      />
    </>
  );
}
