import { ImageReveal } from "@/components/ui/ImageReveal";
import type { ArchImage } from "@/lib/images";
import type { GalleryBlock } from "@/lib/projects";

type ZoomIndex = (image: ArchImage) => number;

function Block({ block, zoomIndex }: { block: GalleryBlock; zoomIndex: ZoomIndex }) {
  switch (block.kind) {
    case "full":
      return (
        <ImageReveal
          image={block.image}
          zoom={zoomIndex(block.image)}
          sizes="100vw"
          parallax={4}
          caption={block.caption}
          captionClassName="frame"
        />
      );

    case "pair":
      return (
        <div className="frame grid-12 items-end gap-y-12">
          <ImageReveal
            image={block.portrait}
            zoom={zoomIndex(block.portrait)}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            parallax={4}
            caption={block.captions[0]}
            className={`col-span-4 md:col-span-4 ${block.reverse ? "lg:col-span-4 lg:col-start-9" : "lg:col-span-4 lg:col-start-2"}`}
          />
          <ImageReveal
            image={block.landscape}
            zoom={zoomIndex(block.landscape)}
            sizes="(min-width: 1024px) 50vw, 100vw"
            caption={block.captions[1]}
            className={`col-span-4 md:col-span-8 ${
              block.reverse ? "lg:col-span-7 lg:col-start-1 lg:row-start-1" : "lg:col-span-6 lg:col-start-7"
            }`}
          />
        </div>
      );

    case "offset": {
      const left = block.side === "left";
      return (
        <div className="frame grid-12 items-end gap-y-10">
          <ImageReveal
            image={block.image}
            zoom={zoomIndex(block.image)}
            sizes="(min-width: 1024px) 58vw, 100vw"
            parallax={4}
            caption={block.caption}
            className={`col-span-4 md:col-span-6 ${left ? "lg:col-span-7 lg:col-start-1" : "lg:col-span-5 lg:col-start-7"}`}
          />
          <p
            data-anim="fade"
            className={`body col-span-4 max-w-[36ch] md:col-span-6 ${
              left ? "lg:col-span-3 lg:col-start-9" : "lg:col-span-3 lg:col-start-2 lg:row-start-1 lg:self-start"
            }`}
          >
            {block.note}
          </p>
        </div>
      );
    }

    case "statement":
      return (
        <div className="frame grid-12">
          <blockquote className="col-span-4 md:col-span-7 lg:col-span-8 lg:col-start-3">
            <p data-anim="fade" className="text-[clamp(1.75rem,3.6vw,3.5rem)] leading-[1.05] font-medium tracking-[-0.035em]">
              <span aria-hidden="true" className="text-stone">“</span>
              {block.text}
              <span aria-hidden="true" className="text-stone">”</span>
            </p>
          </blockquote>
        </div>
      );
  }
}

export function EditorialGallery({ blocks, zoomIndex }: { blocks: GalleryBlock[]; zoomIndex: ZoomIndex }) {
  return (
    <div className="space-y-24 md:space-y-36">
      {blocks.map((block, i) => (
        <Block key={i} block={block} zoomIndex={zoomIndex} />
      ))}
    </div>
  );
}
