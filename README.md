# StackGlint website

Company website for **StackGlint**: intelligent solutions, from code to cloud.

## Stack

- **Next.js 15** (App Router, static export) + **React 19** + **TypeScript**
- **Tailwind CSS 4** for styling, with design tokens in `app/globals.css`
- **Motion** (formerly Framer Motion) for animations
- Self-hosted fonts via **Fontsource**: Outfit, Manrope, JetBrains Mono

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
npm run typecheck
```

## Project structure

```
app/
  layout.tsx       fonts, SEO and social metadata
  page.tsx         page composition
  globals.css      Tailwind theme tokens and a few custom effects
components/
  Header.tsx       sticky nav, mobile menu, ⌘K command palette
  Hero.tsx         headline, deploy log
  Globe.tsx        draggable canvas globe with orbiting service icons
  StackLayers.tsx  3D service stack with tabs
  IdeaSection.tsx  idea -> product animation and project planner
  Sections.tsx     trust band, elements table, pipeline, how we work, contact, footer
  ui.tsx           logo, icons, buttons, chips, section headings
lib/
  content.ts       all site copy (edit text here)
  site.ts          email and site URL
  brand.ts         generated logo and icon vectors
  geo.json         world map data for the globe
public/            favicon, Apple touch icon, social share image
```

## Edit content

All text (services, stages, tech, planner options) lives in `lib/content.ts`.
The contact email lives in `lib/site.ts`.

## Deploy

Every push to `main` builds and publishes the site with GitHub Actions
(`.github/workflows/deploy.yml`).

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The site is then live at `https://stackglint.github.io/stackglint-website/`.

For a custom domain later, set `NEXT_PUBLIC_BASE_PATH` to empty and
`NEXT_PUBLIC_SITE_URL` to your domain in the workflow, and add the domain under Settings → Pages.
