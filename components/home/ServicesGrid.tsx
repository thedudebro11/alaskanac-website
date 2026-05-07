'use client';
import type React from 'react';
import { SERVICES } from '@/content/services';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { useScrollReveal } from '@/lib/useScrollReveal';
import styles from './ServicesGrid.module.css';

export function ServicesGrid() {
  const headingRef = useScrollReveal({ threshold: 0.3 });
  const gridRef = useScrollReveal({ threshold: 0.1 });

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <h2
          ref={headingRef as React.RefObject<HTMLHeadingElement>}
          className={`${styles.heading} reveal`}
        >
          Our HVAC Services
        </h2>
        <p className={styles.sub}>
          From our signature Alaskafication maintenance to full system installation,
          we cover every aspect of your home comfort.
        </p>
        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className={`${styles.grid} stagger`}
        >
          {SERVICES.map((service) => (
            <div key={service.slug} className="reveal--scale">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
