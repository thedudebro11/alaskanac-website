'use client';
import { BUSINESS } from '@/content/business';
import { useScrollReveal } from '@/lib/useScrollReveal';
import styles from './WhyChooseUs.module.css';
import type React from 'react';

function AwardIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="6"/>
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  );
}

function SnowflakeIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="2" y1="12" x2="22" y2="12"/>
      <line x1="12" y1="2" x2="12" y2="22"/>
      <path d="M20 16l-4-4 4-4M4 8l4 4-4 4M16 4l-4 4-4-4M8 20l4-4 4 4"/>
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <path d="M12 11h4M12 16h4M8 11h.01M8 16h.01"/>
    </svg>
  );
}

const DIFFERENTIATORS = [
  {
    Icon: AwardIcon,
    title: `Serving Tucson Since ${BUSINESS.foundingYear}`,
    description:
      'Over 50 years in the Arizona HVAC industry. We know Tucson summers — ' +
      'and we know what it takes to keep your system running through them.',
  },
  {
    Icon: WrenchIcon,
    title: 'NATE-Certified Technicians',
    description:
      "Every tech on our team is NATE-certified — the gold standard for HVAC " +
      "competency. We're also a Trane Comfort Specialist dealer.",
  },
  {
    Icon: SnowflakeIcon,
    title: 'The Alaskafication Difference',
    description:
      'Our signature maintenance service goes further than a basic tune-up. ' +
      'Alaskafied systems last longer, run more efficiently, and fail less often.',
  },
  {
    Icon: ZapIcon,
    title: '24/7 Emergency Service',
    description:
      "When your AC fails at 110°F, you can't wait until Monday. We answer " +
      'the phone 24 hours a day and dispatch emergency techs on nights and weekends.',
  },
  {
    Icon: StarIcon,
    title: `${BUSINESS.ratings.displayCount} 5-Star Reviews`,
    description:
      `Our ${BUSINESS.ratings.schemaValue}-star rating across thousands of reviews ` +
      'reflects the same quality on every job — from a maintenance call to a full install.',
  },
  {
    Icon: ClipboardIcon,
    title: 'Honest, Upfront Pricing',
    description:
      'We quote before we work. No hidden fees, no surprise charges. ' +
      'Free quotes on installations. The Alaskan way — not the cheap way.',
  },
];

export function WhyChooseUs() {
  const headingRef = useScrollReveal({ threshold: 0.2 });
  const gridRef = useScrollReveal({ threshold: 0.1 });

  return (
    <section className={`section--navy ${styles.section}`}>
      <div className="container">
        <h2
          ref={headingRef as React.RefObject<HTMLHeadingElement>}
          className={`${styles.heading} reveal`}
        >
          Why Tucson Trusts Alaskan AC
        </h2>
        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className={`${styles.grid} stagger`}
        >
          {DIFFERENTIATORS.map((item) => (
            <div key={item.title} className={`${styles.item} reveal--scale`}>
              <span className={styles.icon} aria-hidden="true">
                <item.Icon />
              </span>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
