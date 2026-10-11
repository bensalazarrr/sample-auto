# SAMPLE AUTO

A premium automotive services and parts website for a **fictional** Philippine workshop. Built with Next.js App Router and TypeScript, with accessible interactions, responsive layouts, and a complete dark/light design system.

**Repository and package name:** `sample-auto` · **Package manager:** npm · **Runtime:** Node.js 24

## Features

- Eight automotive services with PHP estimates and booking preselection.
- Twenty demonstration parts with instant search, category filters, sorting, and accessible product dialogs.
- Appointment and parts inquiry forms with React Hook Form and Zod validation, loading states, and local success simulations.
- Persistent themes, reduced-motion support, keyboard navigation, and responsive mobile menus.
- Local photography, original product illustrations, self-hosted typography, and page-specific metadata.
- Reusable developer credit: **Built by NinjaTech Guys**.

| Page              | Route       |
| ----------------- | ----------- |
| Home              | `/`         |
| Services          | `/services` |
| Auto Parts        | `/parts`    |
| About Us          | `/about`    |
| Contact & Booking | `/contact`  |

## Run locally

Use Node.js 24 and npm. The runtime is declared in `package.json` and `.nvmrc`. Run commands from the repository root; `npm ci` installs the versions recorded in the committed lockfile.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. On Windows PowerShell where script execution is restricted, use `npm.cmd` in place of `npm`.

No environment variables or external service accounts are needed for local development.

## Development commands

| Command             | Purpose                                                |
| ------------------- | ------------------------------------------------------ |
| `npm run dev`       | Start the development server                           |
| `npm run lint`      | Run ESLint                                             |
| `npm run typecheck` | Generate Next.js route types and check TypeScript      |
| `npm run build`     | Create an optimized production build                   |
| `npm start`         | Serve the production build locally                     |
| `npm run test:e2e`  | Run desktop/mobile Playwright and axe checks           |
| `npm run format`    | Format source, configuration, tests, and documentation |

Before committing application changes, run:

```sh
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Browser tests use an installed Google Chrome through Playwright. If Chrome is unavailable, install Playwright Chromium with `npx playwright install chromium` and remove `channel: 'chrome'` from the Playwright config. The tests start the production server, so run the build first. Tests cover all five routes, mobile and desktop, accessibility with axe, themes, catalog interactions, query preselection, form errors, local submission states, keyboard navigation, and viewport overflow. No Lighthouse score is claimed.

## Stack

Next.js App Router, TypeScript, React, Tailwind CSS v4, a shadcn-style local Radix Dialog primitive, Lucide, Motion, React Hook Form, and Zod. Manrope Variable is self-hosted through Fontsource. Exact dependency resolutions are in `package-lock.json`.

## Structure

```text
src/app/                 Five routes, metadata, layout, design tokens
src/components/          Navigation, footer, content, catalog, forms
src/components/ui/       Accessible reusable Radix dialog
src/data/services.ts     Eight services and sample PHP estimates
src/data/products.ts     Twenty products in seven categories
src/lib/config.ts        Business/contact details and image paths
src/lib/schemas.ts       Form validation schemas
src/lib/utils.ts         PHP formatting, date, class-name utilities
public/images/           Local photography, fallback, original parts artwork
scripts/generate-art.mjs Reproducible original product illustrations
tests/                   Playwright user journey and accessibility checks
```

## Configuration

Update `src/lib/config.ts` to change contact details, `tel:` URL, email, address, hours, Messenger URL, and `siteUrl`. The site origin is configured as https://sample-auto.vercel.app; update it if the production domain changes. Placeholder values intentionally do not represent a real business. Messenger remains a clear inactive demo state until a valid `https://m.me/<business>` URL is configured. The footer credit is the reusable `DeveloperCredit` component and has no invented destination.

Themes use CSS variables in `src/app/globals.css`. Dark is the initial default. An early inline script restores the localStorage preference before painting; React subscribes to the resulting theme. If adding a Content Security Policy, allow the bootstrap script via a hash or nonce. Storage failures are handled gracefully. Motion and CSS honor reduced-motion preferences.

Service links use `/contact?service=oil-change`; product links use `/contact?product=SA-004`. Unknown selections show a helpful message. `/contact?tab=parts` opens the general parts inquiry.

## Demo boundaries

- No backend, authentication, payment processing, shopping cart, analytics, or form delivery.
- Form data stays in component memory. Submit waits briefly, validates locally, and explicitly confirms that nothing was delivered or booked.
- Statistics, team profiles, testimonials, shop location, brands, inventory, and prices are illustrative.
- Images illustrate the concept; product illustrations do not establish vehicle compatibility.
- Search engines are set to `noindex, nofollow` for this fictional demo. Set a verified production origin and update metadata/robots before turning this into a real business site.

## Asset credits and licensing

Automotive photographs are downloaded from Unsplash and bundled locally to avoid runtime third-party dependencies. They are used under the [Unsplash License](https://unsplash.com/license), which permits demonstration and commercial website use. No endorsement by a vehicle manufacturer or photographed person is implied.

- Hero: Source image identifier: `photo-1503376780353-7e6692767b70`; download: https://images.unsplash.com/photo-1503376780353-7e6692767b70
- Workshop: https://images.unsplash.com/photo-1486262715619-67b85e0b08d3
- Road: https://images.unsplash.com/photo-1492144534655-ae79c964c9d7

Product art, fallback, and social graphic are original SVG illustrations included in the source. Manrope uses the SIL Open Font License, distributed with `@fontsource-variable/manrope`. Lucide uses the ISC License. Regenerate illustrations with `node scripts/generate-art.mjs`.

## Deployment to Vercel

The repository keeps the standard Next.js project layout and build scripts. No custom `vercel.json`, static export, backend service, or deployment credential is required for the current application. Next.js handles responsive local image optimization.

The existing Vercel project uses these settings:

| Setting               | Value                              |
| --------------------- | ---------------------------------- |
| Project name          | `sample-auto`                      |
| Framework preset      | Next.js                            |
| Root directory        | Repository root (`.`)              |
| Node.js version       | 24.x                               |
| Install command       | `npm ci`                           |
| Build command         | `npm run build`                    |
| Output directory      | Framework default; do not override |
| Environment variables | None required                      |

Set `business.siteUrl` in `src/lib/config.ts` to the verified deployment origin before publishing so Open Graph image URLs resolve correctly. Keep `noindex, nofollow` for the fictional demo unless you intentionally change its indexing policy.

The repository is [bensalazarrr/sample-auto](https://github.com/bensalazarrr/sample-auto), with `main` as the production branch. The Vercel project is `ben-f043/sample-auto`, with the configured production domain [sample-auto.vercel.app](https://sample-auto.vercel.app). Local `.vercel/` files and environment files are ignored; sanitized `.env.example` files may be tracked if configuration is added later.

## Dependency audit

At the implementation verification on October 12, 2026, the production dependency audit reported zero known vulnerabilities. The full audit reported five high-severity entries from one `braces` advisory propagated through Next.js ESLint tooling (`braces` → `micromatch` → `fast-glob` → `@next/eslint-plugin-next` → `eslint-config-next`). This is development tooling, not browser runtime code. The offered automatic fix downgraded the Next lint configuration to version 14; it was not applied because this project uses Next 16. Re-run `npm audit` and review upstream patches before upgrading the lint stack.

## Verification scope

- ESLint and TypeScript checks; optimized Next.js production build with all five primary routes prerendered.
- Desktop Chrome and mobile Chrome emulation, with additional overflow checks at 320, 768, 1024, and 1920 pixels.
- Automated axe WCAG A/AA scans in dark and light themes on all five pages.
- Search, category filters, price/name sorting, empty results, accessible product dialogs, Escape dismissal, and focus return.
- Service/product preselection, unknown product handling, field errors, quantity bounds, loading, reset, and explicitly simulated confirmations. Booking test checks that submission creates no POST request.
- Keyboard skip link, desktop active route, mobile menu, theme persistence, reduced-motion mode, and lazy-loaded photo completion.
- Desktop and mobile screenshots reviewed. Screenshots and failure traces are written under the ignored `test-results/` directory.

Automated checks do not replace a manual screen-reader review. Real iOS Safari, Firefox, and Lighthouse performance measurements have not been run.
