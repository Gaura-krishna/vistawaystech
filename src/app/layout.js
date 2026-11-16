import { Manrope, Inter } from 'next/font/google';
import '@/styles/globals.css';
import ThemeRegistry from '@/theme/ThemeRegistry';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/ui/ScrollProgress';
import MobileActionBar from '@/components/ui/MobileActionBar';
import { site } from '@/content/site';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap', weight: ['500', '600', '700', '800'] });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Technology & Engineering Solutions`, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: '/' },
};

export const viewport = { themeColor: '#101838', width: 'device-width', initialScale: 1 };

const orgJsonLd = { '@context': 'https://schema.org', '@type': 'Organization', name: site.name, url: site.url, logo: new URL(site.logo.src, site.url).toString(), email: site.contact.email, telephone: site.contact.phone, address: { '@type': 'PostalAddress', streetAddress: site.contact.address, addressLocality: 'Hyderabad', postalCode: '500085', addressCountry: 'IN' } };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to main content</a>
        <ThemeRegistry>
          <ScrollProgress />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileActionBar />
        </ThemeRegistry>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
