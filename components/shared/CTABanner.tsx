import Link from 'next/link';
import styles from './CTABanner.module.css';

interface Props {
  headline: string;
  subtext?: string;
  buttonLabel: string;
  buttonHref: string;
  variant?: 'blue' | 'orange';
}

export function CTABanner({
  headline,
  subtext,
  buttonLabel,
  buttonHref,
  variant = 'blue',
}: Props) {
  return (
    <section className={`${styles.banner} ${styles[`banner--${variant}`]}`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <h2 className={styles.headline}>{headline}</h2>
          {subtext && <p className={styles.subtext}>{subtext}</p>}
        </div>
        <Link href={buttonHref} className={styles.button}>
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
