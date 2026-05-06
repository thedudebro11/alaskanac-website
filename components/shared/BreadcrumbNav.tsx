import Link from 'next/link';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { SchemaScript } from './SchemaScript';
import styles from './BreadcrumbNav.module.css';

interface Crumb {
  name: string;
  href?: string;
}

interface Props {
  crumbs: Crumb[];
}

export function BreadcrumbNav({ crumbs }: Props) {
  const schemaItems = crumbs.map((crumb, i) => ({
    name: crumb.name,
    url: crumb.href ? `https://www.alaskanac.com${crumb.href}` : `https://www.alaskanac.com`,
  }));

  return (
    <>
      <SchemaScript schema={generateBreadcrumbSchema(schemaItems)} />
      <nav aria-label="Breadcrumb" className={styles.nav}>
        <ol className={styles.list}>
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <li key={i} className={styles.item}>
                {i > 0 && <span className={styles.sep} aria-hidden="true">›</span>}
                {isLast || !crumb.href ? (
                  <span className={styles.current} aria-current="page">{crumb.name}</span>
                ) : (
                  <Link href={crumb.href} className={styles.link}>{crumb.name}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
