import Link from 'next/link';
import s from './sections.module.css';
import { copy, services, site, serviceHref, extra } from '@/content/site';
import PageBanner from '@/components/ui/PageBanner';
import Words from '@/components/ui/Words';
import Reveal from '@/components/ui/Reveal';
import SpotlightGrid from '@/components/ui/SpotlightGrid';
import ServiceIcon from '@/components/ui/ServiceIcon';
import SectionHeading from '@/components/ui/SectionHeading';
import Photo from '@/components/ui/Photo';
import JobBoard from '@/components/careers/JobBoard';
import ApplyForm from '@/components/careers/ApplyForm';
import { listPublished } from '@/lib/jobs';

const Arrow = () => <span className="arr" aria-hidden="true">→</span>;

const GLYPHS = [
  <path key="0" d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5" />,
  <g key="1"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></g>,
  <path key="2" d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" />,
  <g key="3"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></g>,
  <path key="4" d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />,
];
const Glyph = ({ i }) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{GLYPHS[i % GLYPHS.length]}</svg>;

function PageHero(props) { return <PageBanner {...props} />; }

function Hero({ eyebrow = 'IT · Engineering · Business Solutions', title = copy.hero.title, mutedFrom = 2, text = copy.hero.text }) {
  return (
    <section className={s.hero} aria-labelledby="hero-title">
      <div className="container">
        <span className={s.badge}><i />{eyebrow}</span>
        <h1 id="hero-title" className={s.h1}><Words text={title} mutedFrom={mutedFrom} /></h1>
        <p className={s.lead}>{text}</p>
        <div className={s.ctas}>
          <Link href="/contact-us" className="btn btn--primary">Get Started <Arrow /></Link>
          <Link href="/services" className="btn btn--secondary">Explore Services</Link>
        </div>
        <div className={s.heroVisual}>
          <div className={s.rings} aria-hidden="true"><i /><i /><i /></div>
          <div className={s.frame}><Photo slot="hero" priority /></div>
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const list = (hidden) => <ul className={s.group} aria-hidden={hidden || undefined}>{services.map((v) => <li key={v.slug}>{v.name}</li>)}</ul>;
  return <section className={s.ticker} aria-label="Our services"><div className={s.track}>{list(false)}{list(true)}</div></section>;
}

function Features({ items = copy.hero.features }) {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <Reveal target="[data-r]" className={s.trio}>
          {items.map(([t, d], i) => <div key={t} className={s.trioItem} data-r><span>{i + 1}</span><h3>{t}</h3><p>{d}</p></div>)}
        </Reveal>
      </div>
    </section>
  );
}

function ServicesBento({ eyebrow, title = 'A Diverse Portfolio,', muted = 'Built for Changing Demands', description = copy.servicesIntro }) {
  return (
    <section className="section">
      <div className="container">
        <Reveal><SectionHeading eyebrow={eyebrow} title={title} muted={muted} description={description} center /></Reveal>
        <Reveal target="[data-r]">
          <SpotlightGrid className={s.cards}>
            {services.map((svc) => (
              <Link key={svc.slug} href={serviceHref(svc)} className={`${s.card} ${s[`c-${svc.accent}`]}`} data-spot data-r>
                <span className={s.dotWrap}><span className={s.dotIcon} /><span className={s.dotIn}><ServiceIcon slug={svc.slug} size={20} /></span></span>
                <h3>{svc.name}</h3>
                <p>{svc.short}</p>
                <span className={s.more}>Learn More <span aria-hidden="true">→</span></span>
              </Link>
            ))}
          </SpotlightGrid>
        </Reveal>
      </div>
    </section>
  );
}

function WhyPartner({ title = 'Why Partner with', muted = 'VISTAWAYS TECH?', items = copy.whyPartner.items }) {
  const [first] = items;
  return (
    <section className="section section--white">
      <div className="container">
        <Reveal><SectionHeading title={title} muted={muted} description="From ideation to deployment, we cover all your business needs." center /></Reveal>
        <div className={s.mediaSplit}>
          <Reveal className={s.mediaCard}>
            <Photo slot="why-partner" />
            <div className={s.overlay}><strong><i />{first[0]}</strong><p>{first[1]}</p></div>
          </Reveal>
          <Reveal target="[data-r]">
            <ul className={s.list}>
              {items.map(([t, d], i) => (
                <li key={t} className={s.listItem} data-r><span className={s.glyph}><Glyph i={i} /></span><div><h3>{t}</h3><p>{d}</p></div></li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Split({ eyebrow, title, muted, paragraphs = [], slot = 'about-team', cta, reverse = false, id = 'split-title', lead = false }) {
  return (
    <section className="section" aria-labelledby={id}>
      <div className={`container ${s.introGrid} ${reverse ? s.reverse : ''}`}>
        <Reveal><div className={s.introMedia}><Photo slot={slot} /></div></Reveal>
        <Reveal delay={0.1}>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2 id={id}>{title}{muted && <> <span className="tone">{muted}</span></>}</h2>
          {paragraphs.map((p, i) => <p key={p} className={lead && i === 0 ? s.introLead : undefined}>{p}</p>)}
          {cta && <Link href={cta.href} className="btn btn--secondary">{cta.label} <Arrow /></Link>}
        </Reveal>
      </div>
    </section>
  );
}

function Intro() {
  return <Split eyebrow={copy.intro.eyebrow} title="Innovating Technology," muted="Empowering Businesses" paragraphs={copy.intro.paragraphs} cta={{ href: '/about-us', label: 'About Us' }} id="intro-title" lead />;
}

function Tiles({ title = 'Why Choose', muted = 'Us', items = extra.whyChoose }) {
  return (
    <section className="section section--dark dark">
      <div className="container">
        <Reveal><SectionHeading title={title} muted={muted} center /></Reveal>
        <Reveal target="li"><ul className={s.dTiles}>{items.map((t, i) => <li key={t}><span>{String(i + 1).padStart(2, '0')}</span>{t}</li>)}</ul></Reveal>
      </div>
    </section>
  );
}

function Testimonials({ items = extra.testimonials }) {
  if (!items.length) return null;
  return (
    <section className="section section--dark dark">
      <div className="container">
        <Reveal><SectionHeading title="What Our Clients" muted="Say" center /></Reveal>
        <Reveal target="figure"><div className={s.quotes}>{items.map((q) => <figure key={q.name} className={s.quote}><blockquote style={{ margin: 0 }}><p>“{q.text}”</p></blockquote><figcaption>{q.name}</figcaption></figure>)}</div></Reveal>
      </div>
    </section>
  );
}

function MissionVision() {
  return (
    <section className="section section--white">
      <div className="container">
        <Reveal target="[data-r]" className={s.mvGrid}>
          <div className={s.mv} data-r><span className="eyebrow">Our Mission</span><p>{copy.about.mission}</p></div>
          <div className={s.mv} data-r><span className="eyebrow">Our Vision</span><p>{copy.about.vision}</p></div>
        </Reveal>
      </div>
    </section>
  );
}

function Numbered({ eyebrow, title, muted, items = [], white = false }) {
  return (
    <section className={`section${white ? ' section--white' : ''}`}>
      <div className="container" style={{ maxWidth: 'var(--container-md)' }}>
        <Reveal><SectionHeading eyebrow={eyebrow} title={title} muted={muted} /></Reveal>
        <Reveal><ol className={s.numbered}>{items.map((it) => {
          const [t, d] = Array.isArray(it) ? it : [it, ''];
          return <li key={t}><div><h3>{t}</h3>{d && <p>{d}</p>}</div></li>;
        })}</ol></Reveal>
      </div>
    </section>
  );
}

function Statement({ eyebrow, title, muted, text, white = true }) {
  return (
    <section className={`section${white ? ' section--white' : ''}`}>
      <div className="container" style={{ maxWidth: 'var(--container-md)', textAlign: 'center' }}>
        <Reveal><SectionHeading eyebrow={eyebrow} title={title} muted={muted} center /><p style={{ fontSize: 'var(--fs-lead)', margin: '0 auto' }}>{text}</p></Reveal>
      </div>
    </section>
  );
}

function CTA({ title = copy.journey.title, text = copy.journey.text, primary = { label: 'Contact Us', href: '/contact-us' } }) {
  const { phone, email } = site.contact;
  return (
    <div className="container">
      <section className={s.ctaWrap} aria-labelledby="cta-title">
        <div className={s.cta}>
          <div className={s.rings} aria-hidden="true"><i /><i /><i /></div>
          <Reveal>
            <h2 id="cta-title">{title}</h2>
            {text && <p>{text}</p>}
            <div className={`${s.ctaBtns} dark`}><Link href={primary.href} className="btn btn--primary">{primary.label} <Arrow /></Link></div>
            <div className={s.ctaLinks}>
              <a href={`tel:${phone.replace(/[^+\d]/g, '')}`}>{phone}</a>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}


const CheckGlyph = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7" /></svg>;

function Offerings({ title = [], items = [], accent = 'teal' }) {
  return (
    <section className={`section ${s[`a-${accent}`]}`}>
      <div className="container">
        <Reveal><SectionHeading title={title[0]} muted={title[1]} center /></Reveal>
        <Reveal target="[data-r]">
          <div className={s.offerGrid}>
            {items.map(([t, d], i) => (
              <article key={t} className={s.offer} data-r><span className={s.num}>{String(i + 1).padStart(2, '0')}</span><h3>{t}</h3><p>{d}</p></article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Tech({ title = [], intro, items = [], accent = 'teal' }) {
  return (
    <section className={`section section--dark dark ${s[`a-${accent}`]}`}>
      <div className="container">
        <Reveal><SectionHeading title={title[0]} muted={title[1]} center /></Reveal>
        {intro && <p className={s.techIntro}>{intro}</p>}
        <Reveal target="li">
          <ul className={s.techGrid}>
            {items.map((it) => Array.isArray(it)
              ? <li key={it[0]}><strong>{it[0]}</strong><span>{it[1]}</span></li>
              : <li key={it}><span className={s.plain} style={{ color: '#fff' }}>{it}</span></li>)}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function SvcWhy({ title = [], items = [], slot, accent = 'teal' }) {
  return (
    <section className={`section section--white ${s[`a-${accent}`]}`}>
      <div className={`container ${s.whyGrid}`}>
        <Reveal>
          <SectionHeading title={title[0]} muted={title[1]} />
          <ul className={s.list}>
            {items.map(([t, d]) => <li key={t} className={s.listItem}><span className={s.glyph}><CheckGlyph /></span><div><h3>{t}</h3><p>{d}</p></div></li>)}
          </ul>
          <Link href="/contact-us" className="btn btn--primary" style={{ marginTop: 'var(--space-5)' }}>Contact Us <Arrow /></Link>
        </Reveal>
        <Reveal delay={0.1}><div className={s.introMedia}><Photo slot={slot} /></div></Reveal>
      </div>
    </section>
  );
}

function Related({ current }) {
  return (
    <section className="section" style={{ paddingBottom: 0 }}>
      <div className="container">
        <h2 style={{ fontSize: 'var(--fs-h3)' }}>Explore our other services</h2>
        <ul className={s.relatedLinks}>{services.filter((v) => v.slug !== current).map((v) => <li key={v.slug}><Link href={serviceHref(v)}>{v.name}</Link></li>)}</ul>
      </div>
    </section>
  );
}

async function Careers() {
  const jobs = await listPublished().catch(() => []);
  return (
    <>
      <section className="section" id="openings">
        <div className="container">
          <Reveal><SectionHeading eyebrow="Current Openings" title="Find Your" muted="Next Role" center /></Reveal>
          <JobBoard jobs={jobs} email={site.contact.email} />
        </div>
      </section>
      <section className="section section--white">
        <div className="container"><ApplyForm roles={jobs.map((j) => j.title)} email={site.contact.email} title="Send a general application" /></div>
      </section>
    </>
  );
}

const registry = { pageHero: PageHero, hero: Hero, ticker: Ticker, features: Features, split: Split, intro: Intro, servicesBento: ServicesBento, whyPartner: WhyPartner, tiles: Tiles, missionVision: MissionVision, numbered: Numbered, statement: Statement, testimonials: Testimonials, cta: CTA, careers: Careers, offerings: Offerings, tech: Tech, svcWhy: SvcWhy, related: Related };

/** Renders a page from an array of `{ type, ...props }`. Reorder, remove or override props in src/content/pages.js. */
export default function SectionRenderer({ sections }) {
  return sections.map(({ type, ...props }, i) => {
    const C = registry[type];
    return C ? <C key={`${type}-${i}`} {...props} /> : null;
  });
}
