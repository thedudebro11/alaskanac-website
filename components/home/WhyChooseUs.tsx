import { BUSINESS } from '@/content/business';
import styles from './WhyChooseUs.module.css';

const DIFFERENTIATORS = [
  {
    icon: '🏆',
    title: `Serving Tucson Since ${BUSINESS.foundingYear}`,
    description:
      'Over 50 years in the Arizona HVAC industry. We know Tucson summers — ' +
      'and we know what it takes to keep your system running through them.',
  },
  {
    icon: '🔧',
    title: 'NATE-Certified Technicians',
    description:
      'Every tech on our team is NATE-certified — the gold standard for HVAC ' +
      'competency. We\'re also a Trane Comfort Specialist dealer.',
  },
  {
    icon: '❄',
    title: 'The Alaskafication Difference',
    description:
      'Our signature maintenance service goes further than a basic tune-up. ' +
      'Alaskafied systems last longer, run more efficiently, and fail less often.',
  },
  {
    icon: '⚡',
    title: '24/7 Emergency Service',
    description:
      "When your AC fails at 110°F, you can't wait until Monday. We answer " +
      'the phone 24 hours a day and dispatch emergency techs on nights and weekends.',
  },
  {
    icon: '⭐',
    title: `${BUSINESS.ratings.displayCount} 5-Star Reviews`,
    description:
      'Our ${BUSINESS.ratings.schemaValue}-star rating across thousands of reviews ' +
      'reflects the same quality on every job — from a maintenance call to a full install.',
  },
  {
    icon: '📋',
    title: 'Honest, Upfront Pricing',
    description:
      'We quote before we work. No hidden fees, no surprise charges. ' +
      'Free quotes on installations. The Alaskan way — not the cheap way.',
  },
];

export function WhyChooseUs() {
  return (
    <section className={`section--navy ${styles.section}`}>
      <div className="container">
        <h2 className={styles.heading}>Why Tucson Trusts Alaskan AC</h2>
        <div className={styles.grid}>
          {DIFFERENTIATORS.map((item) => (
            <div key={item.title} className={styles.item}>
              <span className={styles.icon} aria-hidden="true">{item.icon}</span>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
