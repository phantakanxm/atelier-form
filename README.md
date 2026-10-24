# ATELIER / FORM

A multi-page website for a fictional architecture studio, built as a frontend portfolio piece.
Brutalist minimalism and Swiss editorial design: a strict 12-column grid, monumental grotesk type,
monochrome photography, and restrained motion that behaves like drafting rather than decoration.

> ATELIER / FORM is not a real practice. Every project is a design concept; no clients, sites,
> awards or commissions are implied. The contact form validates in the browser and sends nothing.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger + `@gsap/react` · Lenis · `next/image` · Lucide

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static production build
npm run lint
npm run typecheck
```

Set `NEXT_PUBLIC_SITE_URL` in production so canonical, sitemap and Open Graph URLs use the real
domain (on Vercel, the production URL is picked up automatically).

## Routes

| Route | Content |
| --- | --- |
| `/` | Architectural grid-reveal hero, selected works, philosophy, studio preview |
| `/works` | Project index: grid / list views, category filter, state kept in the URL |
| `/works/[slug]` | Case study, statically generated for all three projects |
| `/studio` | Philosophy, approach, materials, models, process |
| `/contact` | Validated concept form with an honest demo result |

## How it is built

### Server-first markup, one animation wiring point

Pages and sections are server components. They describe motion declaratively with data
attributes (`data-anim="lines" | "rule" | "fade" | "stagger" | "image" | "draw"`, `data-parallax`).
A single client component, [`RevealScope`](src/components/motion/RevealScope.tsx), reads those
attributes and creates the ScrollTriggers. Content markup ships as HTML; only the animation layer is
client JavaScript.

`RevealScope` owns exactly one GSAP context per mount and reverts it on unmount, so navigating
away never leaves ScrollTriggers attached to removed elements.

### One animation loop

[`SmoothScrollProvider`](src/components/motion/SmoothScrollProvider.tsx) drives Lenis from
`gsap.ticker` (no second `requestAnimationFrame` loop) and feeds Lenis scroll events to
`ScrollTrigger.update`. With `prefers-reduced-motion: reduce`, Lenis is never created and native
scrolling is used.

### Page transitions without blocking navigation

[`PageTransitionProvider`](src/components/motion/PageTransitionProvider.tsx) runs a rectangular
charcoal wipe: it covers the page (0.4s) while the target route is prefetched, pushes the route,
and lifts as soon as the new pathname has rendered. It exposes a `ready` flag so entrance
animations start only when the panel lifts. Back/forward navigation and reduced motion skip the
wipe entirely; a timeout guarantees the panel never stays down.

### Hero and LCP

The hero's drafting lines and headline are a GSAP timeline. The photograph's "built from the
ground up" reveal is a CSS animation that starts on first paint with its base already visible, so
the Largest Contentful Paint does not wait for hydration.

### Drawings

Each case study has a schematic SVG drawing (a section for MONOLITH, plans for VOID and AXIS).
Strokes use `pathLength="1"`, so a single `stroke-dashoffset` tween draws any line regardless of
its real length. Patterned lines (axes, hidden edges) fade in instead.

### Content as data

All project content lives in [`src/lib/projects.ts`](src/lib/projects.ts) as typed data,
including a per-project gallery composition (`full`, `pair`, `offset`, `statement` blocks). One
template renders every case study. Photographs are statically imported WebP files, so dimensions
and blur placeholders come from the build.

## Accessibility

- Semantic landmarks, one `h1` per page, skip link, visible `:focus-visible` outlines
- Mobile menu: dialog semantics, focus moved in and returned, Tab trapped, Escape closes
- Lightbox: native `<dialog>` (focus trap, Escape, focus return), arrow keys and swipe
- Works filters and view switch use `aria-pressed` with a polite live region for results
- Form: labelled fields, `aria-invalid`, described errors, focus moved to the first invalid field
- Reduced motion: no smooth scroll, no transitions, all content visible immediately

## Images

Eighteen generated photographs, mapped to the roles in the brief:

| Role | File |
| --- | --- |
| Hero | `hero/brutalist-house-in-a-rocky-landscape` |
| MONOLITH — exterior, living, stair, detail | `monolith/*` |
| VOID — exterior, courtyard, bedroom, light & shadow | `void/*` |
| AXIS — exterior, hall, atrium, perspective | `axis/*` |
| Studio — workspace, models, material library | `studio/*` |
| Editorial — concrete texture, light & geometry | `editorial/*` |

Originals were PNG (≈47 MB); the site uses WebP at quality 90 (≈6 MB) in `src/assets/architecture`.
