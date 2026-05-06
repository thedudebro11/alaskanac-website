'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { BUSINESS } from '@/content/business';
import styles from './MobileNav.module.css';

const NAV_LINKS = [
  { label: 'Services', href: '/services/' },
  { label: 'Alaskafy Your System', href: '/alaskafy-your-system/' },
  { label: 'AC Installation', href: '/ac-installation/' },
  { label: 'Heating & Furnaces', href: '/heating-and-furnaces/' },
  { label: 'Indoor Air Quality', href: '/indoor-air-quality/' },
  { label: 'About', href: '/about/' },
  { label: 'FAQ', href: '/faq/' },
  { label: 'Contact', href: '/contact/' },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: Props) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className={styles.backdrop}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <nav
        className={`${styles.panel} ${open ? styles.open : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close navigation menu"
          type="button"
        >
          ✕
        </button>

        {/* Location Selector */}
        <div className={styles.locationSelector}>
          <Link href="/tucson-az/" onClick={onClose} className={styles.locationLink}>
            Tucson, AZ
          </Link>
          <span className={styles.locationDivider}>/</span>
          <Link href="/phoenix-az/" onClick={onClose} className={styles.locationLink}>
            Phoenix, AZ
          </Link>
        </div>

        <ul className={styles.navList}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={styles.navLink} onClick={onClose}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.footer}>
          <a href={BUSINESS.phone.href} className={styles.phoneLink}>
            {BUSINESS.phone.display}
          </a>
          <a href="/contact/" className="btn-primary" onClick={onClose}>
            Schedule Service
          </a>
        </div>
      </nav>
    </>
  );
}
