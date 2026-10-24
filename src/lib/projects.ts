import { images, type ArchImage } from "./images";

export type Category = "Residential" | "Cultural";

export type DrawingKind = "monolith-section" | "void-plan" | "axis-plan";

export type GalleryBlock =
  | { kind: "full"; image: ArchImage; caption: string }
  | {
      kind: "pair";
      portrait: ArchImage;
      landscape: ArchImage;
      captions: [string, string];
      reverse?: boolean;
    }
  | { kind: "offset"; image: ArchImage; caption: string; side: "left" | "right"; note: string }
  | { kind: "statement"; text: string };

export type Project = {
  slug: string;
  index: string;
  name: string;
  suffix: string;
  category: Category;
  typology: string;
  year: string;
  summary: string;
  cover: ArchImage;
  hero: ArchImage;
  metadata: { label: string; value: string }[];
  overview: { lede: string; body: string[] };
  concept: {
    heading: string[];
    body: string;
    principles: { title: string; text: string }[];
  };
  drawing: { kind: DrawingKind; title: string; description: string; note: string };
  gallery: GalleryBlock[];
  narrative: {
    heading: string[];
    body: string[];
    materials: { name: string; role: string }[];
    image: ArchImage;
    imageCaption: string;
  };
};

export const projects: Project[] = [
  {
    slug: "monolith-residence",
    index: "01",
    name: "MONOLITH",
    suffix: "Residence",
    category: "Residential",
    typology: "Private residence",
    year: "2026",
    summary:
      "A private brutalist residence defined by cantilevered concrete volumes, structural clarity, and the tension between mass and openness.",
    cover: images.monolithExterior,
    hero: images.monolithExterior,
    metadata: [
      { label: "Typology", value: "Private residence" },
      { label: "Year", value: "2026" },
      { label: "Status", value: "Fictional concept" },
      { label: "Structure", value: "Cantilevered concrete" },
      { label: "Levels", value: "Two, plus a sunken court" },
      { label: "Setting", value: "Hillside (conceptual)" },
    ],
    overview: {
      lede: "Two concrete volumes are stacked and shifted, so the upper mass seems to hover above a ground floor made almost entirely of glass.",
      body: [
        "MONOLITH explores what a house becomes when its structure is allowed to speak plainly. The lower level is open and transparent, a continuous room of glass that gives itself to the landscape. Above it, a solid concrete volume closes in for sleep and retreat.",
        "The project is a study in contrast: weight over lightness, enclosure over exposure, shadow over glare. Each element has one job, and nothing is added that the structure does not already require.",
      ],
    },
    concept: {
      heading: ["MASS", "AGAINST", "OPENNESS."],
      body: "The design begins with a single gesture: a heavy box lifted off the ground. Everything else follows from the consequences of that cantilever.",
      principles: [
        {
          title: "Lifted mass",
          text: "The upper volume projects beyond its supports, making the structure legible from every approach.",
        },
        {
          title: "Transparent ground",
          text: "Living spaces sit in a glazed band, so the house reads as a solid held above a void.",
        },
        {
          title: "Vertical slot",
          text: "A narrow stair tower ties the two levels together and pulls daylight deep into the plan.",
        },
      ],
    },
    drawing: {
      kind: "monolith-section",
      title: "Fig. A — Section A–A",
      description:
        "Schematic section of MONOLITH Residence: a stair tower, a fully glazed living level, and a concrete upper volume cantilevering past its supports over a sunken court.",
      note: "The section is the project. One cut shows the whole idea: the glazed ground, the lifted mass, the stair that ties them together, and the low sun reaching under the cantilever.",
    },
    gallery: [
      {
        kind: "pair",
        portrait: images.monolithStair,
        landscape: images.monolithLiving,
        captions: [
          "Stair tower — a folded concrete flight lit by a single slot window.",
          "Living level — the glass wall dissolves the boundary to the hills.",
        ],
      },
      {
        kind: "statement",
        text: "The house is heaviest exactly where it touches the sky, and lightest where it meets the ground.",
      },
    ],
    narrative: {
      heading: ["MATERIAL", "& SPACE."],
      body: [
        "Board-formed concrete records the timber that shaped it, giving the large surfaces a fine horizontal grain that changes with the sun. Inside, the same concrete is left exposed on walls and soffits, so the house is the same material from outside to in.",
        "Floors are honed and pale, reflecting light upward into the double-height room. Steel is used only where the glass needs it — thin, dark, and set back from the face of the structure.",
      ],
      materials: [
        { name: "Board-formed concrete", role: "Structure, walls, soffits" },
        { name: "Structural glazing", role: "Ground-floor enclosure" },
        { name: "Blackened steel", role: "Mullions and stair rail" },
        { name: "Honed limestone", role: "Floors and terraces" },
      ],
      image: images.monolithDetail,
      imageCaption: "The cantilever — the upper volume projects over the glazed living level.",
    },
  },
  {
    slug: "void-courtyard-house",
    index: "02",
    name: "VOID",
    suffix: "Courtyard House",
    category: "Residential",
    typology: "Courtyard house",
    year: "2025",
    summary:
      "A single-story concrete residence organized around a central courtyard, exploring privacy, natural light, and the relationship between solid and void.",
    cover: images.voidExterior,
    hero: images.voidExterior,
    metadata: [
      { label: "Typology", value: "Courtyard house" },
      { label: "Year", value: "2025" },
      { label: "Status", value: "Fictional concept" },
      { label: "Plan", value: "Single storey, closed ring" },
      { label: "Centre", value: "Open courtyard and pool" },
      { label: "Setting", value: "Coastal plateau (conceptual)" },
    ],
    overview: {
      lede: "The house turns its back to the outside and opens entirely to an empty centre. The most important room has no roof.",
      body: [
        "VOID is planned as a continuous ring of rooms around a courtyard. Toward the perimeter, the walls are thick and largely closed, offering privacy and shade. Toward the centre, every room opens through full-height glass to a single olive tree and a long, still pool.",
        "Circulation runs along a covered gallery that frames the courtyard like a cloister. Moving through the house means moving around the void, which is always present but never entered directly from the outside.",
      ],
    },
    concept: {
      heading: ["SOLID", "AROUND", "VOID."],
      body: "Instead of placing an object in a landscape, the house encloses a landscape of its own. The courtyard is the program.",
      principles: [
        {
          title: "Closed perimeter",
          text: "Thick outer walls with few openings make privacy a property of the architecture itself.",
        },
        {
          title: "Open centre",
          text: "Every room faces inward, borrowing light, air and view from a shared outdoor room.",
        },
        {
          title: "Still water",
          text: "A shallow pool doubles the courtyard and reflects light under the deep roof edge.",
        },
      ],
    },
    drawing: {
      kind: "void-plan",
      title: "Fig. B — Ground floor plan",
      description:
        "Schematic plan of VOID Courtyard House: a closed ring of rooms surrounding a central courtyard with an olive tree and a long reflecting pool, the roof edge overhanging the court.",
      note: "In plan the house is a single thick ring. Rooms sit between two walls, and every one of them faces the same empty centre.",
    },
    gallery: [
      {
        kind: "full",
        image: images.voidCourtyard,
        caption: "The gallery — a covered walk along the courtyard and its reflecting pool.",
      },
      {
        kind: "offset",
        image: images.voidBedroom,
        side: "right",
        caption: "Bedroom — a quiet room that looks only at the tree.",
        note: "Private rooms take the deepest part of the plan. Their glass walls face inward, so even the most enclosed spaces receive direct sky.",
      },
    ],
    narrative: {
      heading: ["LIGHT", "MEASURED", "IN SHADOW."],
      body: [
        "The roof is a single thin plane that overhangs the courtyard by a full structural bay. Its edge throws a hard line of shadow that moves across the pool and paving through the day, turning the courtyard into a slow, legible sundial.",
        "Walls are cast in a warm, lightly textured concrete. Floors continue from inside to outside at the same level, so the threshold between room and courtyard is only a line of glass.",
      ],
      materials: [
        { name: "Warm in-situ concrete", role: "Walls and roof plane" },
        { name: "Frameless glazing", role: "Courtyard elevations" },
        { name: "Travertine paving", role: "Continuous floor, in and out" },
        { name: "Still water", role: "Reflecting pool" },
      ],
      image: images.voidLight,
      imageCaption: "Light and shadow — the roof edge draws a moving line across the courtyard.",
    },
  },
  {
    slug: "axis-gallery",
    index: "03",
    name: "AXIS",
    suffix: "Gallery",
    category: "Cultural",
    typology: "Cultural building",
    year: "2024",
    summary:
      "A contemporary cultural building composed of parallel concrete volumes connected by a glazed central atrium.",
    cover: images.axisExterior,
    hero: images.axisExterior,
    metadata: [
      { label: "Typology", value: "Gallery / cultural" },
      { label: "Year", value: "2024" },
      { label: "Status", value: "Fictional concept" },
      { label: "Organisation", value: "Two parallel volumes" },
      { label: "Connector", value: "Glazed central atrium" },
      { label: "Setting", value: "Open plain (conceptual)" },
    ],
    overview: {
      lede: "Two solid volumes run side by side. Between them, a glass atrium forms the axis that gives the gallery its name and its order.",
      body: [
        "AXIS separates the act of looking from the act of moving. The concrete volumes hold the exhibition halls: closed, calm and evenly lit from above. The glazed atrium between them holds circulation, gathering and a long view out to the landscape.",
        "Visitors cross the axis repeatedly, stepping from controlled light into open daylight and back again. The building is experienced as a rhythm of enclosure and release.",
      ],
    },
    concept: {
      heading: ["TWO", "VOLUMES,", "ONE AXIS."],
      body: "A simple diagram, held with discipline: two parallel bars, one connecting void, and a reflecting pool that extends the line into the land.",
      principles: [
        {
          title: "Parallel halls",
          text: "Matched volumes give the collection a steady, repeatable sequence of rooms.",
        },
        {
          title: "Glazed atrium",
          text: "The connecting space is entirely transparent: the only place where the building looks outward.",
        },
        {
          title: "Extended line",
          text: "Water and terraces continue the central axis beyond the building's edge.",
        },
      ],
    },
    drawing: {
      kind: "axis-plan",
      title: "Fig. C — Plan, level 0",
      description:
        "Schematic plan of AXIS Gallery: two parallel exhibition halls joined by a glazed atrium with a stair, and a central axis extended by reflecting pools at both ends.",
      note: "Two bars, one void, one line. The axis runs through the atrium and continues into the landscape as water.",
    },
    gallery: [
      {
        kind: "offset",
        image: images.axisPerspective,
        side: "left",
        caption: "Exterior perspective — recessed glazing cut into the concrete mass.",
        note: "From the oblique, the volumes read as solid stone. The deep recesses of the glazing only appear as the visitor moves along the terrace.",
      },
      {
        kind: "full",
        image: images.axisHall,
        caption: "Main exhibition hall — a tall room lit evenly from above.",
      },
    ],
    narrative: {
      heading: ["A ROUTE", "THROUGH", "LIGHT."],
      body: [
        "The atrium stair is the building's single vertical gesture. It rises along the glass wall beneath a continuous skylight, so moving between levels is always accompanied by sky.",
        "In the halls, concrete walls are left unfinished to act as a neutral, durable ground for the work. Floors are polished to carry the soft daylight from the clerestories across the full depth of each room.",
      ],
      materials: [
        { name: "Exposed concrete", role: "Hall volumes and walls" },
        { name: "Structural glass", role: "Atrium and skylight" },
        { name: "Polished concrete", role: "Gallery floors" },
        { name: "Reflecting water", role: "Forecourt pools" },
      ],
      image: images.axisAtrium,
      imageCaption: "Atrium and staircase — the vertical route beside the glass wall.",
    },
  },
];

export const categories: Category[] = ["Residential", "Cultural"];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length]!;
}

/** Every photograph of a project in reading order, with the caption it carries on the page. */
export function projectPhotos(project: Project) {
  const photos: { image: ArchImage; caption: string }[] = [
    { image: project.hero, caption: `${project.name} ${project.suffix} — ${project.typology}` },
  ];
  for (const block of project.gallery) {
    if (block.kind === "full" || block.kind === "offset") photos.push({ image: block.image, caption: block.caption });
    if (block.kind === "pair") {
      photos.push({ image: block.portrait, caption: block.captions[0] });
      photos.push({ image: block.landscape, caption: block.captions[1] });
    }
  }
  photos.push({ image: project.narrative.image, caption: project.narrative.imageCaption });
  return photos;
}
