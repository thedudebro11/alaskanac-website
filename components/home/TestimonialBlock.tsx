import { TESTIMONIALS } from '@/content/testimonials';
import { TestimonialCard } from '@/components/shared/TestimonialCard';
import { BUSINESS } from '@/content/business';
import styles from './TestimonialBlock.module.css';

export function TestimonialBlock() {
  return (
    <section className={`section--gray ${styles.section}`}>
      <div className="container">
        <h2 className={styles.heading}>What Our Customers Say</h2>
        <p className={styles.sub}>
          {BUSINESS.ratings.displayCount} reviews · {BUSINESS.ratings.schemaValue} stars on Google
        </p>
        <div className={styles.grid}>
          {TESTIMONIALS.slice(0, 3).map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} />
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
