import Link from 'next/link';
import type React from 'react';
import type { ServicePage } from '@/lib/types';
import styles from './ServiceCard.module.css';

function SnowflakeIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="2" y1="12" x2="22" y2="12"/>
      <line x1="12" y1="2" x2="12" y2="22"/>
      <path d="M20 16l-4-4 4-4M4 8l4 4-4 4M16 4l-4 4-4-4M8 20l4-4 4 4"/>
    </svg>
  );
}

function WindIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/>
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2"/>
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  );
}

const ICON_MAP: Record<string, () => React.JSX.Element> = {
  Snowflake: SnowflakeIcon,
  Wind: WindIcon,
  Flame: FlameIcon,
  Leaf: LeafIcon,
};

interface Props {
  service: ServicePage;
}

export function ServiceCard({ service }: Props) {
  const Icon = ICON_MAP[service.iconName] ?? SnowflakeIcon;

  return (
    <Link href={`/${service.slug}/`} className={styles.card}>
      {service.isSignature && (
        <span className={styles.badge}>Signature Service</span>
      )}
      <div className={styles.icon} aria-hidden="true">
        <Icon />
      </div>
      <h3 className={styles.name}>{service.name}</h3>
      <p className={styles.tagline}>{service.tagline}</p>
      <span className={styles.cta}>Learn more →</span>
    </Link>
  );
}
