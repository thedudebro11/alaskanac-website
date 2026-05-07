import Link from 'next/link';
import Image from 'next/image';
import { BUSINESS } from '@/content/business';
import { NAP } from '@/components/shared/NAP';
import styles from './Footer.module.css';

const SERVICE_LINKS = [
  { label: 'Alaskafy Your System', href: '/alaskafy-your-system/' },
  { label: 'AC Installation', href: '/ac-installation/' },
  { label: 'Heating & Furnaces', href: '/heating-and-furnaces/' },
  { label: 'Indoor Air Quality', href: '/indoor-air-quality/' },
];

const COMPANY_LINKS = [
  { label: 'About', href: '/about/' },
  { label: 'FAQ', href: '/faq/' },
  { label: 'Contact', href: '/contact/' },
  { label: 'Tucson, AZ', href: '/tucson-az/' },
  { label: 'Phoenix, AZ', href: '/phoenix-az/' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logoLink} aria-label="Alaskan Air Conditioning — Home">
              <div className={styles.logoWrapper}>
                <Image
                  src="/images/logo.png"
                  alt="Alaskan Air Conditioning & Heating"
                  width={900}
                  height={742}
                  className={styles.logoImg}
                />
              </div>
            </Link>
            <p className={styles.tagline}>
              The Alaskan way, not the cheap way.
              <br />
              Serving Arizona since {BUSINESS.foundingYear}.
            </p>
            <p className={styles.social}>
              <span>{BUSINESS.ratings.schemaValue}★ · {BUSINESS.ratings.displayCount} Google Reviews</span>
            </p>
          </div>

          {/* Services */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Services</h3>
            <ul className={styles.linkList}>
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.footerLink}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Company</h3>
            <ul className={styles.linkList}>
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.footerLink}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Tucson</h3>
            <NAP location="tucson" />
            <h3 className={`${styles.columnTitle} ${styles.columnTitleSpaced}`}>Phoenix</h3>
            <NAP location="phoenix" />
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.legal}>
            © {year} Alaskan Air Conditioning & Heating. {BUSINESS.license}. All rights reserved.
          </p>
          <p className={styles.legal}>
            <a href="/contact/" className={styles.legalLink}>Contact</a>
            {' · '}
            <a href="/sitemap.xml" className={styles.legalLink}>Sitemap</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
