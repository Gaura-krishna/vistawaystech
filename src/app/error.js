'use client';

export default function Error({ reset }) {
  return (
    <section className="section container" role="alert">
      <h1>Something went wrong</h1>
      <p>An unexpected error occurred. Please try again.</p>
      <button type="button" className="btn btn--primary" onClick={reset}>Try again</button>
    </section>
  );
}
