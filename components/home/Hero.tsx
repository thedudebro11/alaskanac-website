import Image from 'next/image';
import { BUSINESS } from '@/content/business';
import { BookingModal } from '@/components/shared/BookingModal';
import { ReviewBadge } from '@/components/shared/ReviewBadge';
import { SpinningBadge } from '@/components/shared/SpinningBadge';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <ReviewBadge className={styles.badge} />

          <h1 className={styles.h1}>
            HVAC Tucson AZ —<br />
            Alaskan Air Conditioning
          </h1>

          <p className={styles.sub}>
            Expert AC maintenance, installation, and heating service in Tucson &amp; Phoenix.
            NATE-certified. Trusted since {BUSINESS.foundingYear}.
          </p>

          <div className={styles.ctaRow}>
            <BookingModal
              location="Tucson"
              label="Schedule Now — Tucson"
              className="btn-primary btn-primary--large"
            />
            <BookingModal
              location="Phoenix"
              label="Schedule Now — Phoenix"
              className="btn-secondary"
            />
          </div>

          <p className={styles.trustLine}>
            <span>✓ Same-day service available</span>
            <span>✓ 24/7 emergency</span>
            <span>✓ Free quotes</span>
          </p>
        </div>

        {/* Replace logo.png with hero-van-team.webp (min 1600px wide) when client delivers it */}
        <div className={styles.imageWrapper}>
          <Image
            src="/images/logo.png"
            alt="Alaskan Air Conditioning & Heating — Tucson AZ"
            width={900}
            height={742}
            priority
            sizes="(max-width: 767px) 0px, (max-width: 1200px) 50vw, 640px"
            className={styles.heroImage}
          />
          <div className={styles.spinOverlay} aria-hidden="true">
            <SpinningBadge />
          </div>
        </div>
      </div>
    </section>
  );
}
