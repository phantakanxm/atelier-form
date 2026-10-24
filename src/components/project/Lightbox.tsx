"use client";

import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import type { ArchImage } from "@/lib/images";
import { useLenis } from "@/components/motion/SmoothScrollProvider";

export type LightboxItem = { image: ArchImage; caption: string };

/**
 * Full-screen viewer for a project's photographs. Children mark openers with
 * data-zoom="<index>"; a native <dialog> provides the focus trap, Esc and focus return.
 */
export function Lightbox({ items, children }: { items: LightboxItem[]; children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const lenisRef = useLenis();
  const [index, setIndex] = useState<number | null>(null);
  const count = items.length;

  const show = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  const close = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog?.open) return;
    const finish = () => {
      dialog.close();
      setIndex(null);
    };
    if (prefersReducedMotion()) finish();
    else
      gsap.to(dialog, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.45,
        ease: "power3.inOut",
        onComplete: finish,
      });
  }, []);

  const onOpenerClick = (event: MouseEvent<HTMLDivElement>) => {
    const opener = (event.target as HTMLElement).closest<HTMLElement>("[data-zoom]");
    if (!opener) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    show(Number(opener.dataset.zoom));
    dialog.showModal();
    if (!prefersReducedMotion()) {
      gsap.fromTo(
        dialog,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.55, ease: "power3.inOut" },
      );
    }
  };

  // Lock page scroll while open.
  const open = index !== null;
  useEffect(() => {
    if (!open) return;
    const lenis = lenisRef.current;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [open, lenisRef]);

  // Settle each newly shown photograph.
  useEffect(() => {
    if (index === null || prefersReducedMotion() || !frameRef.current) return;
    gsap.fromTo(frameRef.current, { opacity: 0, scale: 1.02 }, { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" });
  }, [index]);

  const item = index === null ? null : items[index];

  return (
    <div onClick={onOpenerClick}>
      {children}

      <dialog
        ref={dialogRef}
        aria-label="Image viewer"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") show((index ?? 0) + 1);
          if (event.key === "ArrowLeft") show((index ?? 0) - 1);
        }}
        onTouchStart={(event) => {
          touchX.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          const start = touchX.current;
          const end = event.changedTouches[0]?.clientX;
          touchX.current = null;
          if (start === null || end === undefined || Math.abs(end - start) < 50) return;
          show((index ?? 0) + (end < start ? 1 : -1));
        }}
        className="on-dark m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-ink p-0 text-ivory backdrop:bg-ink"
      >
        {item ? (
          <div className="flex h-full flex-col">
            <div className="frame flex h-[var(--header-h)] shrink-0 items-center justify-between">
              <p className="meta text-ivory/70" aria-live="polite">
                {String(index! + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </p>
              <button
                type="button"
                onClick={close}
                autoFocus
                className="meta flex min-h-11 items-center gap-3 border border-ivory px-4"
              >
                Close
                <X aria-hidden="true" size={14} strokeWidth={1.5} />
              </button>
            </div>

            <div className="frame relative min-h-0 flex-1">
              <div ref={frameRef} className="relative h-full w-full">
                <Image
                  key={index}
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  placeholder="blur"
                  sizes="100vw"
                  quality={85}
                  className="object-contain"
                />
              </div>
            </div>

            <div className="frame flex shrink-0 items-center justify-between gap-6 py-5">
              <p className="meta max-w-[60ch] text-ivory/80">{item.caption}</p>
              {count > 1 ? (
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => show(index! - 1)}
                    aria-label="Previous image"
                    className="flex size-11 items-center justify-center border border-ivory/40 transition-colors hover:border-ivory"
                  >
                    <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    onClick={() => show(index! + 1)}
                    aria-label="Next image"
                    className="flex size-11 items-center justify-center border border-ivory/40 transition-colors hover:border-ivory"
                  >
                    <ArrowRight aria-hidden="true" size={16} strokeWidth={1.5} />
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
