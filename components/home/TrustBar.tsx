'use client';
import { useEffect, useRef, useState } from 'react';
import { BUSINESS } from '@/content/business';
import styles from './TrustBar.module.css';

const STATIC_ITEMS = [
  `Serving Arizona Since ${BUSINESS.foundingYear}`,
  'NATE Certified Technicians',
  'Trane Comfort Specialist',
  'Google Guaranteed',
  '24/7 Emergency Service',
  null, // animated review count goes here
  BUSINESS.license,
];

export function TrustBar() {
  const barRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  // Default to 4400 so SSR renders the correct number immediately
  const [reviewCount, setReviewCount] = useState(4400);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const increment = 4400 / (1500 / 16);
    const timer = setInterval(() => {
      current += increment;
      if (current >= 4400) {
        setReviewCount(4400);
        clearInterval(timer);
      } else {
        setReviewCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView]);

  return (
    <section ref={barRef} className={styles.bar} aria-label="Trust signals">
      <div className={`container ${styles.inner}`}>
        {STATIC_ITEMS.map((item, i) => (
          <div key={i} className={styles.item}>
            <span className={styles.check} aria-hidden="true">✓</span>
            {item === null ? (
              <span aria-live="polite">
                {reviewCount.toLocaleString()}+ 5-Star Reviews
              </span>
            ) : (
              <span>{item}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
