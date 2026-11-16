/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'] },
  // TODO(after site audit): add redirects() from the legacy vistawaystech.com URLs
  // (e.g. /embedded-systems/, /software-development/) to the new /services/[slug] routes
  // so existing search rankings are preserved.
};
export default nextConfig;
