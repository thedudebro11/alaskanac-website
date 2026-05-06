import type { Testimonial } from '@/lib/types';
import styles from './TestimonialCard.module.css';

interface Props {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: Props) {
  const stars = Array.from({ length: testimonial.stars }, (_, i) => i);

  return (
    <figure className={styles.card}>
      <div className={styles.stars} aria-label={`${testimonial.stars} out of 5 stars`}>
        {stars.map((i) => (
          <span key={i} aria-hidden="true">★</span>
        ))}
      </div>
      <blockquote className={styles.quote}>
        <p>{testimonial.quote}</p>
      </blockquote>
      <figcaption className={styles.reviewer}>
        <span className={styles.name}>{testimonial.reviewerName}</span>
        <span className={styles.meta}>{testimonial.location} · {testimonial.source}</span>
      </figcaption>
    </figure>
  );
}
