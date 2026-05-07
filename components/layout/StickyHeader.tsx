'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { BUSINESS } from '@/content/business';
import { EmergencyBadge } from '@/components/shared/EmergencyBadge';
import { BookingModal } from '@/components/shared/BookingModal';
import { MobileNav } from './MobileNav';
import styles from './StickyHeader.module.css';

const NAV_LINKS = [
  { label: 'Services', href: '/services/' },
  { label: 'About', href: '/about/' },
  { label: 'FAQ', href: '/faq/' },
  { label: 'Contact', href: '/contact/' },
];

export function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} role="banner">
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="Alaskan Air Conditioning — Home">
            <div className={styles.logoWrapper}>
              <Image
                src="/images/logo.png"
                alt="Alaskan Air Conditioning & Heating"
                width={900}
                height={742}
                className={styles.logoImg}
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right */}
          <div className={styles.desktopRight}>
            <EmergencyBadge />
            <a href={BUSINESS.phone.href} className={styles.phoneLink}>
              {BUSINESS.phone.display}
            </a>
            <BookingModal location="Tucson" label="BOOK NOW" className="btn-primary" />
          </div>

          {/* Mobile Controls */}
          <div className={styles.mobileControls}>
            <a href={BUSINESS.phone.href} className={styles.mobilePhone} aria-label="Call us">
              📞
            </a>
            <button
              className={styles.hamburger}
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              type="button"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
