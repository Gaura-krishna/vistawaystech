# Audit findings, decisions and open items

Source: page audit of the live vistawaystech.com (WordPress). Content in `src/content/site.js` comes from it. Typos and truncated sentences were corrected without adding new claims.

## URLs kept identical to the live site (SEO)
/about-us, /services, /software-development, /staffing-services, /cloud-services, /embedded-systems, /bpo-services, /careers, /contact-us.
Banking and Mechanical use `/banking-financial-solutions` and `/mechanical-engineering-services` (the latter matches a URL seen in search results; the Banking URL is unverified). Confirm both and add 301 redirects in `next.config.mjs` if the legacy slugs differ.

## URGENT: live-site problems found (not part of the new build)
1. Homepage carries Greek/Portuguese online-casino spam above the real content, and a German casino article is indexed on the domain. This looks like a compromise or injected content. Clean the WordPress site (malware scan, plugin/user audit, change credentials) before or at launch, and request de-indexing of the spam URLs.
2. /contact-us/ shows a public WordPress database error (LiteSpeed avatar table, duplicate key).
3. None of this is copied into the new site.

## Needs client confirmation
- **Testimonials (Ravi Kumar, Anita Sharma, Michael Lee)** exist on the live homepage but were deliberately NOT carried over: they are unverified, and the live site is compromised. Publish only if the client confirms they are genuine and approved.
- Banking & Financial Solutions and Mechanical Engineering Services: live copy is a single (truncated) sentence each. Pages are intentionally short until full content is supplied.
- Embedded Systems, BPO: only the intro text was retrieved. Cloud, Software, Staffing: lists may be partial.
- Industries page: removed at the client's request. Industries appear only on the Staffing Services page (six listed on the live site).
- Social media links (live page has a "Follow us" heading but no platform/URLs).
- Privacy policy text (page exists with a pending note; legal text required).
- Meta descriptions, canonical/schema/alt text on the live site were not exposed; new ones were written from verified copy.
- Careers: live page implies job listings and an on-site application. Currently: email application only, no fake openings. Decide on a form + recipient (and resume upload policy).
- Legal entity name and incorporation date (third-party listings only, unverified).

## Brand colour
- Signature accent is the live site's teal `#01B0B0` (single token `--color-teal-500` in `src/styles/tokens.css`; mirror in `src/theme/tokens.js`). Buttons and fills use navy text on teal (white on this teal fails contrast). Ask the client for official brand hex values; if they differ, change the token only.

## Integrations
- `CONTACT_WEBHOOK_URL` (see `.env.example`). Until set, the contact form returns an honest "not configured" error.

## Imagery
- Photos: 12 image slots (hero, intro, why-partner, about, careers, 7 services). Add files per `docs/IMAGE_GUIDE.md`; until then branded illustrations are shown. Only use photos you own or have licensed.

## Added from live-site screenshots (careers, contact, homepage)
- Careers copy, "Why Work with Us" and the four current openings (Sr. Azure Data Engineer, Python Developer, Power App Developer, SAP ABAP with OData) come from the live careers page. Confirm they are still open; edit `extra.openings` in `src/content/site.js`. Note: openings list Bangalore and Pune locations while the registered address is Hyderabad.
- Live site shows four social icons (Instagram, LinkedIn, Facebook, X) but the URLs were not visible. Add them to `site.social`; footer links appear automatically.
- Testimonials: still excluded. Add approved ones to `extra.testimonials` and the section appears.
- `CAREERS_WEBHOOK_URL` (falls back to `CONTACT_WEBHOOK_URL`). Not set: the apply form shows an honest "not configured" message with the email fallback. Resume file upload is not implemented (link field instead).
- Contact page embeds a Google Map for the verified address (no API key).

## Service pages (from live-page screenshots)
- Software, Staffing, Cloud, Embedded, Banking and Mechanical pages use the live pages' full copy: offerings, technologies, why-choose and closing messages.
- BPO: no live-page content supplied beyond the intro. Send its offerings, technologies and why-choose lists and the page fills in automatically (add `offerings`, `tech`, `why` to its entry in `src/content/site.js`).
- Capability and compliance claims are the client's own wording (for example GDPR, HIPAA, PCI-DSS, AML, the named tools and platforms). Have the client confirm they are accurate before launch.
- Each service page has two photo slots (intro and why-choose); see `docs/IMAGE_GUIDE.md`.

## Careers admin
- Hosting decision needed: file storage works only on a server with a persistent disk; on Vercel/serverless use the Upstash/KV option (see README). The KV path was written to Upstash's REST API but not tested against a live database; the file path and the validation/auth logic were tested.
- Admin has one shared password (no user accounts, no audit log). If the client needs several editors, add a proper login provider.
- The four seeded jobs only have title, location and work mode (all the live page showed). Job descriptions, skills, experience and so on must come from the client via /admin.
- Applications are not stored: they are forwarded to the webhook only, and there is no resume file upload.
