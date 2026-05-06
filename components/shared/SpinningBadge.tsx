import styles from './SpinningBadge.module.css';

interface Props {
  className?: string;
}

export function SpinningBadge({ className }: Props) {
  const text = '★  KEEPING TUCSON COOL  ★  SINCE 1972  ★  ALASKAFIED  ';
  return (
    <div className={`${styles.wrapper}${className ? ` ${className}` : ''}`}>
      <svg
        viewBox="0 0 200 200"
        className={styles.svg}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <path
            id="spinPathAC"
            d="M 100,100 m -78,0 a 78,78 0 1,0 156,0 a 78,78 0 1,0 -156,0"
          />
        </defs>
        <text className={styles.text}>
          <textPath href="#spinPathAC" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
      <div className={styles.center}>
        <span className={styles.snowflake}>❄</span>
      </div>
    </div>
  );
}
