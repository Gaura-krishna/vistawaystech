export const MODES = ['Work From Office', 'Hybrid', 'Work From Home'];
export const TYPES = ['Full time', 'Part time', 'Contract', 'Internship'];

export const slugify = (s) =>
  String(s || '').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80) || 'job';

const str = (v, max) => String(v ?? '').replace(/\r\n/g, '\n').trim().slice(0, max);
const list = (v) => (Array.isArray(v) ? v : String(v ?? '').split('\n')).map((x) => String(x).trim().slice(0, 400)).filter(Boolean).slice(0, 40);

/** Validates and normalises admin input. Returns { errors } or { value }. */
export function clean(input) {
  const i = input || {};
  const value = {
    title: str(i.title, 120),
    department: str(i.department, 80),
    location: str(i.location, 120),
    mode: str(i.mode, 40),
    type: str(i.type, 40),
    experience: str(i.experience, 40),
    skills: str(i.skills, 300),
    summary: str(i.summary, 400),
    description: str(i.description, 8000),
    responsibilities: list(i.responsibilities),
    requirements: list(i.requirements),
    qualification: str(i.qualification, 1500),
    additionalInfo: str(i.additionalInfo, 3000),
    status: i.status === 'draft' ? 'draft' : 'published',
    validThrough: /^\d{4}-\d{2}-\d{2}$/.test(String(i.validThrough || '')) ? String(i.validThrough) : '',
  };
  const errors = {};
  if (!value.title) errors.title = 'Job title is required.';
  if (!value.location) errors.location = 'Location is required.';
  if (value.mode && !MODES.includes(value.mode)) errors.mode = 'Choose a valid work mode.';
  if (value.type && !TYPES.includes(value.type)) errors.type = 'Choose a valid job type.';
  return Object.keys(errors).length ? { errors } : { value };
}
