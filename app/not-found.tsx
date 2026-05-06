import Link from 'next/link';
import { BUSINESS } from '@/content/business';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.sub}>
          This page doesn&apos;t exist. If you were looking for HVAC service in
          Tucson or Phoenix, we&apos;re still here.
        </p>
        <div className={styles.actions}>
          <Link href="/" className="btn-primary">Back to Home</Link>
          <a href={BUSINESS.phone.href} className="btn-secondary">
            Call {BUSINESS.phone.display}
          </a>
        </div>
      </div>
    </div>
  );
}
