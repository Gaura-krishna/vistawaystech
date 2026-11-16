# VISTAWAYS TECH website

Next.js (App Router, JavaScript) + MUI + GSAP. Content is from the audited live site; see docs/CONTENT_NEEDED.md.

## Run
```bash
npm install
cp .env.example .env.local
npm run dev
```
Open http://localhost:3000. Internal token preview: /design-system (noindex).

## Structure
- `src/content/site.js` – verified company copy, nav, services (per-service layouts), contact facts
- `src/styles/tokens.css`, `src/theme/` – design tokens (colors sampled from the logo), MUI theme
- `src/components/layout|ui|forms` – Header (mega menu + drawer), Footer, PageBanner, SectionHeading, ServiceCard/Grid, CTASection, Breadcrumbs, Reveal (GSAP), ContactForm
- `src/app` – routes, `robots.js`, `sitemap.js`, `api/contact`

## Status
Written without being able to run `npm install` (registry blocked in the build sandbox), so it has not been compiled or visually tested. First run may need small fixes. See `docs/CONTENT_NEEDED.md` for what is pending.

## Customising sections
Pages are lists of sections in `src/content/pages.js`. Reorder, delete or override props (titles, items, variants). Section components live in `src/components/sections/index.js`; add a new type by writing a component and registering it in `registry`.
Motion: CSS (hero word reveal, aurora, ticker, floating tiles) plus GSAP ScrollTrigger (`Reveal`). All of it is disabled under `prefers-reduced-motion`.

## Careers admin (add / edit / delete jobs)
Open `/admin` (not linked anywhere, `noindex`). Sign in with `ADMIN_PASSWORD`; add, edit, publish/unpublish and delete jobs. Changes appear on `/careers` and `/careers/<job-slug>` immediately (pages revalidate on save).
1. Set in `.env.local` (or the host's environment): `ADMIN_PASSWORD` and `ADMIN_SECRET` (16+ random characters). Admin is disabled until both are set.
2. Storage: with nothing else set, jobs are saved to `data/jobs.json` (needs a writable, persistent server). On serverless hosting such as Vercel, add an Upstash Redis / Vercel KV database and set `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` (or Vercel's `KV_REST_API_URL` / `KV_REST_API_TOKEN`).
3. First run seeds the four openings from the live site; open each in admin to add its details.
Public pages: filterable job list with expandable rows, a detail page per job with accordion sections, `JobPosting` structured data, and an apply form (needs `CAREERS_WEBHOOK_URL` or `CONTACT_WEBHOOK_URL`). Job URLs are in the sitemap.
