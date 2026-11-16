import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageBanner from '@/components/ui/PageBanner';
import Accordion from '@/components/careers/Accordion';
import ApplyForm from '@/components/careers/ApplyForm';
import SectionRenderer from '@/components/sections';
import s from '@/components/careers/Careers.module.css';
import { listPublished, getBySlug } from '@/lib/jobs';
import { buildMetadata } from '@/lib/metadata';
import { copy, site } from '@/content/site';

export const revalidate = 300; // admin changes also trigger on-demand revalidation

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const job = await getBySlug(slug).catch(() => null);
  if (!job) return { title: 'Job not found', robots: { index: false, follow: false } };
  return buildMetadata({ title: `${job.title} – Careers`, description: job.summary || `Apply for ${job.title} at ${site.name} (${job.location}).`, path: `/careers/${job.slug}` });
}

const Paragraphs = ({ text }) => text.split(/\n{2,}/).map((p) => <p key={p}>{p}</p>);
const Bullets = ({ items }) => (items.length ? <ul className={s.bullets}>{items.map((x) => <li key={x}>{x}</li>)}</ul> : null);

export default async function JobPage({ params }) {
  const { slug } = await params;
  const [job, all] = await Promise.all([getBySlug(slug).catch(() => null), listPublished().catch(() => [])]);
  if (!job) notFound();
  const similar = all.filter((j) => j.id !== job.id).slice(0, 3);
  const meta = [job.location, job.mode, job.type, job.experience && `Experience: ${job.experience}`, job.department].filter(Boolean);

  // Shown until the admin adds real text (no invented requirements).
  const pending = <p>Full details for this role are being finalised. Email <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> to ask about it, or apply below.</p>;

  const items = [
    { title: 'Job Description', open: true, content: (job.description || job.skills) ? <>{job.description && <Paragraphs text={job.description} />}{job.skills && <p><strong>Required skills:</strong> {job.skills}</p>}</> : pending },
    { title: 'Roles & Responsibilities', content: job.responsibilities.length > 0 && <Bullets items={job.responsibilities} /> },
    { title: 'Skills & Requirements', content: job.requirements.length > 0 && <Bullets items={job.requirements} /> },
    { title: 'Qualification', content: job.qualification ? <Paragraphs text={job.qualification} /> : pending },
    { title: 'Location', content: <p>{job.location}{job.mode ? ` · ${job.mode}` : ''}</p> },
    { title: 'Additional Information', content: job.additionalInfo && <Paragraphs text={job.additionalInfo} /> },
    { title: `About ${site.name}`, content: <p>{copy.about.who[0]}</p> },
  ];

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'JobPosting', title: job.title,
    description: [job.summary, job.description, ...job.responsibilities, ...job.requirements].filter(Boolean).join('\n') || job.title,
    datePosted: job.postedAt.slice(0, 10), ...(job.validThrough ? { validThrough: job.validThrough } : {}),
    employmentType: { 'Full time': 'FULL_TIME', 'Part time': 'PART_TIME', Contract: 'CONTRACTOR', Internship: 'INTERN' }[job.type] || undefined,
    hiringOrganization: { '@type': 'Organization', name: site.name, sameAs: site.url, logo: new URL(site.logo.src, site.url).toString() },
    jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: job.location, addressCountry: 'IN' } },
    ...(job.mode === 'Work From Home' ? { jobLocationType: 'TELECOMMUTE', applicantLocationRequirements: { '@type': 'Country', name: 'India' } } : {}),
    directApply: true, url: `${site.url}/careers/${job.slug}`,
  };

  return (
    <>
      <PageBanner title={job.title} crumbs={[{ label: 'Careers', href: '/careers' }, { label: job.title, href: `/careers/${job.slug}` }]} />
      <section className="section" style={{ paddingBottom: 'var(--space-8)' }}>
        <div className={`container ${s.detail}`}>
          <div>
            <ul className={s.headMeta}>{meta.map((m) => <li key={m}>{m}</li>)}</ul>
            <Accordion items={items} />
          </div>
          <aside className={s.aside} aria-label="Apply and similar jobs">
            <div className={s.sideCard}>
              <h2>Interested in this role?</h2>
              <a href="#apply" className="btn btn--primary" style={{ width: '100%' }}>Apply for this job</a>
            </div>
            {similar.length > 0 && (
              <div className={s.sideCard}>
                <h2>Similar jobs</h2>
                <ul className={s.similar}>{similar.map((j) => <li key={j.id}><Link href={`/careers/${j.slug}`}><strong>{j.title}</strong><small>{[j.location, j.mode].filter(Boolean).join(' · ')}</small></Link></li>)}</ul>
              </div>
            )}
          </aside>
        </div>
      </section>
      <section className="section section--white">
        <div className="container"><ApplyForm roles={all.map((j) => j.title)} defaultRole={job.title} email={site.contact.email} title={`Apply for ${job.title}`} /></div>
      </section>
      <SectionRenderer sections={[{ type: 'cta', title: "Don't see the right fit?", text: 'Send us your resume and we will keep it for future roles.' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
