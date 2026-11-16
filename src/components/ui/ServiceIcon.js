const paths = {
  'software-development': <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />,
  'staffing-services': <><circle cx="9" cy="8" r="3" /><path d="M3 20c0-3.5 2.5-6 6-6s6 2.5 6 6" /><circle cx="17" cy="9" r="2.5" /><path d="M17 14c2.5 0 4 2 4 5" /></>,
  'cloud-services': <path d="M7 18a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17 8.5 4.75 4.75 0 0 1 17 18z" />,
  'embedded-systems': <><rect x="7" y="7" width="10" height="10" rx="1.5" /><rect x="10" y="10" width="4" height="4" /><path d="M9 3v4M12 3v4M15 3v4M9 17v4M12 17v4M15 17v4M3 9h4M3 12h4M3 15h4M17 9h4M17 12h4M17 15h4" /></>,
  'banking-financial-solutions': <path d="M3 9l9-5 9 5zM5 11v7M9 11v7M15 11v7M19 11v7M3 21h18" />,
  'mechanical-engineering-services': <><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="6.5" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9L7 7M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" /></>,
  'bpo-services': <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /><path d="M19 20c0 1.5-2 2-5 2" /></>,
};

export default function ServiceIcon({ slug, size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[slug]}
    </svg>
  );
}
