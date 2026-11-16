import Link from 'next/link';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <section className="section container">
      <span className="eyebrow">404</span>
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist or has moved.</p>
      <Link href="/" className="btn btn--primary">Back to home</Link>
    </section>
  );
}
