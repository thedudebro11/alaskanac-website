import { BreadcrumbNav } from './BreadcrumbNav';
import { CTABanner } from './CTABanner';
import styles from './ServicePageLayout.module.css';

interface Crumb {
  name: string;
  href?: string;
}

interface Props {
  h1: string;
  subHeadline?: string;
  breadcrumbs: Crumb[];
  children: React.ReactNode;
  ctaHeadline?: string;
}

export function ServicePageLayout({ h1, subHeadline, breadcrumbs, children, ctaHeadline }: Props) {
  return (
    <>
      <div className={styles.hero}>
        <div className="container">
          <BreadcrumbNav crumbs={breadcrumbs} />
          <h1 className={styles.h1}>{h1}</h1>
          {subHeadline && <p className={styles.sub}>{subHeadline}</p>}
        </div>
      </div>

      <div className={styles.content}>
        <div className="container">
          {children}
        </div>
      </div>

      <CTABanner
        headline={ctaHeadline ?? 'Ready to schedule service?'}
        subtext="NATE-certified technicians. Same-day service available."
        buttonLabel="Schedule Now — (844) 364-5800"
        buttonHref="/contact/"
        variant="blue"
      />
    </>
  );
}
