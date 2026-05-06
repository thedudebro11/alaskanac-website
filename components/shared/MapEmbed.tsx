import styles from './MapEmbed.module.css';

interface Props {
  src: string;
  title: string;
  className?: string;
}

export function MapEmbed({ src, title, className }: Props) {
  return (
    <div className={`${styles.wrapper} ${className ?? ''}`}>
      <iframe
        src={src}
        title={title}
        className={styles.iframe}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
