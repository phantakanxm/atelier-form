import type { StaticImageData } from "next/image";
import heroSrc from "@/assets/architecture/hero/brutalist-house-in-a-rocky-landscape.webp";
import monolithExteriorSrc from "@/assets/architecture/monolith/brutalist-concrete-house-at-golden-hour.webp";
import monolithLivingSrc from "@/assets/architecture/monolith/minimalist-concrete-glass-living-room.webp";
import monolithStairSrc from "@/assets/architecture/monolith/brutalist-stairwell-in-sunlight.webp";
import monolithDetailSrc from "@/assets/architecture/monolith/brutalist-house-in-mountain-light.webp";
import voidExteriorSrc from "@/assets/architecture/void/mediterranean-courtyard-house-overlooking-the-sea.webp";
import voidCourtyardSrc from "@/assets/architecture/void/modern-concrete-courtyard-oasis.webp";
import voidBedroomSrc from "@/assets/architecture/void/brutalist-bedroom-with-olive-courtyard.webp";
import voidLightSrc from "@/assets/architecture/void/sunlit-brutalist-courtyard-with-reflecting-pool.webp";
import axisExteriorSrc from "@/assets/architecture/axis/brutalist-museum-with-reflecting-pools.webp";
import axisHallSrc from "@/assets/architecture/axis/brutalist-gallery-of-stone-sculptures.webp";
import axisAtriumSrc from "@/assets/architecture/axis/sunlit-brutalist-atrium-with-staircase.webp";
import axisPerspectiveSrc from "@/assets/architecture/axis/brutalist-museum-at-golden-hour.webp";
import studioWorkspaceSrc from "@/assets/architecture/studio/sunlit-minimalist-architectural-atelier.webp";
import studioModelsSrc from "@/assets/architecture/studio/sunlit-architectural-atelier-model.webp";
import studioMaterialsSrc from "@/assets/architecture/studio/brutalist-material-library-in-sunlight.webp";
import concreteTextureSrc from "@/assets/architecture/editorial/brutalist-concrete-in-diagonal-light.webp";
import lightGeometrySrc from "@/assets/architecture/editorial/brutalist-concrete-passage-in-light-and-shadow.webp";

export type ArchImage = {
  src: StaticImageData;
  width: number;
  height: number;
  alt: string;
};

function photo(src: StaticImageData, alt: string): ArchImage {
  return { src, width: src.width, height: src.height, alt };
}

/** Every photograph in the site, keyed by its role in the brief (01–18). */
export const images = {
  hero: photo(
    heroSrc,
    "A board-formed concrete house with a cantilevered upper volume, set low in a rocky desert landscape at dusk.",
  ),
  monolithExterior: photo(
    monolithExteriorSrc,
    "MONOLITH Residence: stacked concrete volumes and a floor-to-ceiling glazed living level in low golden light.",
  ),
  monolithLiving: photo(
    monolithLivingSrc,
    "Double-height living space with a full-width glass wall opening onto the hills, concrete walls and low upholstered seating.",
  ),
  monolithStair: photo(
    monolithStairSrc,
    "A folded concrete staircase climbing beside a tall slot window, its treads lit by a diagonal shaft of sun.",
  ),
  monolithDetail: photo(
    monolithDetailSrc,
    "Close view of the cantilevered concrete upper volume projecting over a glazed ground floor, framed by an olive tree.",
  ),
  voidExterior: photo(
    voidExteriorSrc,
    "VOID Courtyard House from above: a single-storey concrete ring enclosing an olive tree, planted beds and a shallow pool.",
  ),
  voidCourtyard: photo(
    voidCourtyardSrc,
    "Covered concrete gallery looking onto the central courtyard, with a long reflecting pool and a mature olive tree.",
  ),
  voidBedroom: photo(
    voidBedroomSrc,
    "A minimal bedroom with concrete ceiling and a full-height glass wall facing an olive tree in the courtyard.",
  ),
  voidLight: photo(
    voidLightSrc,
    "Sunlight and deep shadow divide the courtyard; a concrete roof edge cuts a sharp diagonal across the reflecting pool.",
  ),
  axisExterior: photo(
    axisExteriorSrc,
    "AXIS Gallery: two parallel concrete volumes joined by a glazed central atrium, mirrored in a reflecting pool.",
  ),
  axisHall: photo(
    axisHallSrc,
    "The main exhibition hall: a tall concrete room with stone sculptures on a polished floor beneath clerestory light.",
  ),
  axisAtrium: photo(
    axisAtriumSrc,
    "The glazed atrium: a concrete staircase rises along a full-height glass wall under a long skylight.",
  ),
  axisPerspective: photo(
    axisPerspectiveSrc,
    "Oblique view of the gallery's concrete volumes and recessed glazing, with a long linear terrace in golden-hour light.",
  ),
  studioWorkspace: photo(
    studioWorkspaceSrc,
    "The studio workspace: long worktables, drawings and shelves of models in a tall concrete room with large windows.",
  ),
  studioModels: photo(
    studioModelsSrc,
    "Massing models in pale card and timber laid out over drawings on a large table, lit by afternoon sun.",
  ),
  studioMaterials: photo(
    studioMaterialsSrc,
    "A material library: stacked samples of concrete, stone, steel and timber on shelves and a table.",
  ),
  concreteTexture: photo(
    concreteTextureSrc,
    "Close-up of a board-formed concrete wall with tie holes, crossed by a sharp diagonal line of shadow.",
  ),
  lightGeometry: photo(
    lightGeometrySrc,
    "A concrete passage where a deep overhang casts a hard-edged shadow across the floor and wall.",
  ),
} satisfies Record<string, ArchImage>;
