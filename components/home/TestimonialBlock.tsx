'use client';
import type React from 'react';
import { TESTIMONIALS } from '@/content/testimonials';
import { TestimonialCard } from '@/components/shared/TestimonialCard';
import { BUSINESS } from '@/content/business';
import { useScrollReveal } from '@/lib/useScrollReveal';
import styles from './TestimonialBlock.module.css';

const REVEAL_DIRECTIONS = ['reveal--left', 'reveal', 'reveal--right'] as const;

export function TestimonialBlock() {
  const headingRef = useScrollReveal({ threshold: 0.3 });
  const gridRef = useScrollReveal({ threshold: 0.1 });

  return (
    <section className={`section--gray ${styles.section}`}>
      <div className="container">
        <h2
          ref={headingRef as React.RefObject<HTMLHeadingElement>}
          className={`${styles.heading} reveal`}
        >
          What Our Customers Say
        </h2>
        <p className={styles.sub}>
          {BUSINESS.ratings.displayCount} reviews · {BUSINESS.ratings.schemaValue} stars on Google
        </p>
        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className={styles.grid}
        >
          {TESTIMONIALS.slice(0, 3).map((testimonial, i) => (
            <div key={i} className={REVEAL_DIRECTIONS[i]}>
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
        <div className={styles.cta}>
          <a
            href={`https://search.google.com/local/writereview?placeid=${BUSINESS.tucson.placeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.reviewLink}
          >
            Leave us a review on Google →
          </a>
        </div>
      </div>
    </section>
  );
}
