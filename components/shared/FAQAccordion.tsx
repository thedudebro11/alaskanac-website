import type { FAQ } from '@/lib/types';
import styles from './FAQAccordion.module.css';

interface Props {
  faqs: FAQ[];
}

export function FAQAccordion({ faqs }: Props) {
  return (
    <dl className={styles.list}>
      {faqs.map((faq, i) => (
        <details key={i} className={styles.item}>
          <summary className={styles.question}>
            <span>{faq.question}</span>
            <span className={styles.icon} aria-hidden="true">+</span>
          </summary>
          <div className={styles.answer}>
            <p>{faq.answer}</p>
          </div>
        </details>
      ))}
    </dl>
  );
}
