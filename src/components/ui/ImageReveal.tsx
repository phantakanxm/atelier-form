import type { ReactNode } from "react";

import Image from "next/image";
import type { ArchImage } from "@/lib/images";

type ImageRevealProps = {
  image: ArchImage;
  sizes: string;
  className?: string;
  /** Override the frame ratio (e.g. "4 / 5"); defaults to the photograph's own ratio. */
  ratio?: string;
  caption?: ReactNode;
  captionClassName?: string;
  parallax?: number;
  priority?: boolean;
  /** Hide until the reveal is armed; use for images visible on first paint. */
  gate?: boolean;
  hover?: boolean;
  /** Focal point for any crop, e.g. "50% 60%". */
  position?: string;
  /** Index into a surrounding <Lightbox>; renders a full-screen opener over the image. */
  zoom?: number;
};

/**
 * A photograph inside a rectangular frame. The frame is revealed by a clip-path mask,
 * the inner layer optionally drifts (parallax), and the middle layer scales on hover.
 */
export function ImageReveal({
  image,
  sizes,
  className = "",
  ratio,
  caption,
  captionClassName = "",
  parallax,
  priority = false,
  gate = priority,
  hover = false,
  position = "50% 50%",
  zoom,
}: ImageRevealProps) {
  return (
    <figure className={className}>
      <div
        data-anim="image"
        data-hero-hide={gate ? "" : undefined}
        className="relative overflow-hidden bg-concrete/50"
        style={{ aspectRatio: ratio ?? `${image.width} / ${image.height}` }}
      >
        <div className={`absolute inset-0 ${hover ? "img-hover" : ""}`}>
          <div
            data-anim-inner
            data-parallax={parallax}
            className={`absolute inset-x-0 ${parallax ? "-top-[6%] -bottom-[6%]" : "inset-y-0"}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              placeholder="blur"
              sizes={sizes}
              priority={priority}
              quality={85}
              className="object-cover"
              style={{ objectPosition: position }}
            />
          </div>
        </div>
        {zoom !== undefined ? (
          <button
            type="button"
            data-zoom={zoom}
            aria-label={`View full screen: ${image.alt}`}
            className="group/zoom absolute inset-0 z-10 cursor-zoom-in"
          >
            <span className="meta absolute right-3 bottom-3 bg-ivory px-2 py-1 text-ink opacity-0 transition-opacity duration-300 group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100">
              View +
            </span>
          </button>
        ) : null}
      </div>
      {caption ? (
        <figcaption className={`meta mt-3 text-charcoal ${captionClassName}`}>{caption}</figcaption>
      ) : null}
    </figure>
  );
}
