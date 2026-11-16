// Page composition. Each page is an ordered list of sections: reorder, delete or override props to customise.
// Types: pageHero, hero, ticker, features, servicesBento, whyPartner, intro, split, tiles, testimonials,
// missionVision, numbered, statement, cta, careers  (see src/components/sections/index.js)
// Two-tone headings: `title` renders in ink, `muted` continues in grey.
import { copy, extra } from './site';

export const homeSections = [
  { type: 'hero' },
  { type: 'ticker' },
  { type: 'servicesBento' },
  { type: 'features' },
  { type: 'whyPartner' },
  { type: 'intro' },
  { type: 'tiles' },
  { type: 'testimonials' }, // renders only when extra.testimonials has approved entries
  { type: 'cta' },
];

export const aboutSections = [
  { type: 'pageHero', title: 'About', muted: 'Us', description: 'A team of innovators, problem-solvers and business enablers.', crumbs: [{ label: 'About Us', href: '/about-us' }] },
  { type: 'split', eyebrow: 'Who We Are', title: 'Technology, engineering and', muted: 'business solutions under one roof', paragraphs: copy.about.who, slot: 'about-office', id: 'who-title', lead: true },
  { type: 'missionVision' },
  { type: 'numbered', eyebrow: 'Why Choose Us', title: 'Why Choose', muted: 'VISTAWAYS TECH?', items: copy.about.why },
  { type: 'statement', eyebrow: 'Our Commitment', title: 'Building relationships,', muted: 'not just projects', text: copy.about.commitment },
  { type: 'cta', title: "Let's work together", text: undefined },
];

export const servicesSections = [
  { type: 'pageHero', title: 'Our', muted: 'Services', description: 'A complete suite of technology and business solutions.', crumbs: [{ label: 'Services', href: '/services' }] },
  { type: 'servicesBento', title: 'Comprehensive Solutions,', muted: 'Endless Possibilities', description: copy.servicesPage.text },
  { type: 'numbered', eyebrow: 'Why Us', title: 'Why Choose', muted: 'VISTAWAYS TECH Services?', items: copy.servicesPage.why, white: true },
  { type: 'statement', title: 'Built to help you', muted: 'adapt, innovate and succeed', text: copy.servicesPage.closing, white: false },
  { type: 'cta', title: 'Tell us about your requirements', text: undefined },
];

export const careersSections = [
  { type: 'pageHero', title: 'Build Your', muted: 'Career', description: 'Join a team that fosters innovation, collaboration and growth.', crumbs: [{ label: 'Careers', href: '/careers' }] },
  { type: 'split', eyebrow: 'Careers at VISTAWAYS TECH', title: 'Our people are', muted: 'our greatest strength', paragraphs: extra.careers.intro, slot: 'careers-team', id: 'careers-title', reverse: true },
  { type: 'numbered', eyebrow: 'Why Work With Us', title: 'Why Work', muted: 'with Us?', items: extra.careers.why, white: true },
  { type: 'careers' },
  { type: 'cta', title: extra.careers.closing.title, text: extra.careers.closing.text, primary: { label: 'Contact Us', href: '/contact-us' } },
];
