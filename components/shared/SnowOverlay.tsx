'use client';
import { useEffect, useState } from 'react';
import styles from './SnowOverlay.module.css';

// Mix of unicode snowflake glyphs + small dots for the "powder snow" feel
const CHARS = ['❄', '❅', '❆', '·', '·', '·', '·', '·'];
const COUNT = 55;

interface Flake {
  id: number;
  char: string;
  left: number;
  size: number;
  duration: number;
  delay: number;    // negative = already mid-fall on page load
  drift: number;    // horizontal displacement over the full fall
  opacity: number;
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function SnowOverlay() {
  const [flakes, setFlakes] = useState<Flake[]>([]);

  useEffect(() => {
    // Respect OS-level "reduce motion" — no snow for users who need it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setFlakes(
      Array.from({ length: COUNT }, (_, i) => ({
        id: i,
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        left: rand(0, 100),
        size: rand(7, 22),
        duration: rand(8, 24),
        delay: rand(-24, 0), // spread flakes throughout fall cycle immediately
        drift: rand(-120, 120),
        opacity: rand(0.15, 0.65),
      }))
    );
  }, []);

  if (!flakes.length) return null;

  return (
    <div className={styles.container} aria-hidden="true">
      {flakes.map((f) => (
        <span
          key={f.id}
          className={styles.flake}
          style={{
            left: `${f.left}%`,
            fontSize: `${f.size}px`,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            opacity: f.opacity,
            '--drift': `${f.drift}px`,
          } as React.CSSProperties}
        >
          {f.char}
        </span>
      ))}
    </div>
  );
}
