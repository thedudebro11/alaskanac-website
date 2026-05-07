'use client';
import { useEffect, useRef } from 'react';
import styles from './SnowPhysics.module.css';

const COLS = 180;          // horizontal resolution of accumulation array
const MAX_ACCUM = 30;      // max snow depth in px before overflow triggers
const FLAKE_COUNT = 65;

// Top-edge vertices for each IceDivider variant (SVG coordinate space: viewBox 0 0 1440 80)
// Y values < 80 are the jagged peaks; Y=80 is the bottom fill — we only store peak vertices
const PROFILES: Record<string, [number, number][]> = {
  '1': [[0,52],[28,30],[52,50],[82,12],[108,42],[138,22],[165,55],[192,18],[220,40],[248,8],[275,35],[305,20],[332,48],[362,10],[390,38],[418,25],[448,55],[475,15],[505,42],[535,8],[562,35],[592,20],[620,52],[648,18],[678,44],[705,10],[732,38],[762,25],[790,55],[818,14],[848,40],[875,22],[905,52],[932,8],[960,36],[990,20],[1018,50],[1045,15],[1075,42],[1102,8],[1132,38],[1160,25],[1188,55],[1215,12],[1245,40],[1272,22],[1302,52],[1330,10],[1358,38],[1388,20],[1415,48],[1440,32]],
  '2': [[0,45],[40,18],[85,42],[130,5],[175,32],[210,55],[255,20],[295,45],[340,10],[380,38],[420,22],[460,55],[500,12],[540,40],[578,25],[618,52],[658,8],[698,42],[738,18],[778,50],[815,15],[855,40],[895,22],[935,55],[972,10],[1012,38],[1052,20],[1090,52],[1128,15],[1168,42],[1205,8],[1245,38],[1285,22],[1322,55],[1360,18],[1400,42],[1440,28]],
  '3': [[0,48],[22,35],[42,55],[62,20],[85,45],[105,10],[125,38],[148,25],[168,52],[192,15],[215,40],[238,8],[262,35],[285,55],[308,18],[332,42],[355,12],[378,38],[402,22],[425,50],[448,8],[472,36],[495,20],[518,55],[542,15],[565,40],[588,5],[612,32],[635,55],[658,18],[682,42],[705,8],[728,38],[752,25],[775,52],[798,12],[822,40],[845,22],[868,55],[892,10],[915,38],[938,20],[962,50],[985,15],[1008,42],[1032,8],[1055,36],[1078,22],[1102,55],[1125,14],[1148,40],[1172,8],[1195,36],[1218,20],[1242,52],[1265,15],[1288,42],[1312,8],[1335,38],[1358,22],[1382,50],[1410,18],[1440,35]],
};

function buildProfile(variant: string): Float32Array {
  const verts = PROFILES[variant] ?? PROFILES['1'];
  const out = new Float32Array(COLS);
  for (let i = 0; i < COLS; i++) {
    const xSvg = (i / (COLS - 1)) * 1440;
    let y = verts[0][1];
    for (let j = 0; j < verts.length - 1; j++) {
      if (xSvg >= verts[j][0] && xSvg <= verts[j + 1][0]) {
        const t = (xSvg - verts[j][0]) / (verts[j + 1][0] - verts[j][0]);
        y = verts[j][1] + t * (verts[j + 1][1] - verts[j][1]);
        break;
      }
    }
    out[i] = y;
  }
  return out;
}

interface Glacier {
  el: HTMLElement;
  profile: Float32Array;
  accum: Float32Array;
}

interface Flake {
  x: number; y: number;
  vx: number; vy: number;
  size: number; opacity: number;
  layer: 0 | 1 | 2;
}

function rand(a: number, b: number) { return Math.random() * (b - a) + a; }

function spawnFlake(w: number, startY?: number): Flake {
  const layer = Math.floor(Math.random() * 3) as 0 | 1 | 2;
  const speeds  = [rand(0.3, 0.7),  rand(0.65, 1.2), rand(1.0, 2.0)];
  const sizes   = [rand(1.0, 2.5),  rand(2.0, 4.0),  rand(3.0, 6.0)];
  const opacities = [rand(0.15, 0.35), rand(0.35, 0.62), rand(0.55, 0.88)];
  return {
    x: Math.random() * w,
    y: startY ?? rand(-60, -5),
    vx: rand(-0.28, 0.28),
    vy: speeds[layer],
    size: sizes[layer],
    opacity: opacities[layer],
    layer,
  };
}

export function SnowPhysics() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    // Discover all IceDividers — tagged via data-ice-variant attribute
    const glaciers: Glacier[] = Array.from(
      document.querySelectorAll<HTMLElement>('[data-ice-variant]')
    ).map(el => ({
      el,
      profile: buildProfile(el.getAttribute('data-ice-variant') ?? '1'),
      accum: new Float32Array(COLS).fill(0),
    }));

    // Pre-spread flakes across the full page height on load
    const flakes: Flake[] = Array.from({ length: FLAKE_COUNT }, () => ({
      ...spawnFlake(w),
      y: rand(0, h),
    }));

    let wind = 0, windTarget = 0, windTick = 0;
    let raf = 0, last = 0;

    function loop(now: number) {
      const dt = Math.min((now - last) / 16, 3);
      last = now;

      // Gentle wind gusts that change direction periodically
      windTick -= dt;
      if (windTick <= 0) { windTarget = rand(-0.55, 0.55); windTick = rand(120, 300); }
      wind += (windTarget - wind) * 0.007 * dt;

      ctx.clearRect(0, 0, w, h);

      // Read all glacier rects once per frame — avoids layout thrash inside inner loop
      const rects = glaciers.map(g => g.el.getBoundingClientRect());

      // ── Flake physics ──────────────────────────────────────────────────────
      for (let i = flakes.length - 1; i >= 0; i--) {
        const f = flakes[i];
        f.x += (f.vx + wind * (f.layer + 1) * 0.3) * dt;
        f.y += f.vy * dt;
        if (f.x < -10) f.x = w + 10;
        else if (f.x > w + 10) f.x = -10;
        if (f.y > h + 20) { flakes[i] = spawnFlake(w); continue; }

        // Check every glacier for collision — first hit wins (top-to-bottom order)
        let landed = false;
        for (let g = 0; g < glaciers.length; g++) {
          const rect = rects[g];
          if (rect.top > h + 40 || rect.bottom < -40) continue;
          const col = Math.max(0, Math.min(COLS - 1, Math.round((f.x / w) * (COLS - 1))));
          // Surface Y = glacier top edge in viewport space, raised by current snow depth
          const surfaceY = rect.top + (glaciers[g].profile[col] / 80) * rect.height - glaciers[g].accum[col];
          if (f.y >= surfaceY - f.size * 0.5) {
            const add = Math.min(f.size * 0.45, MAX_ACCUM - glaciers[g].accum[col]);
            glaciers[g].accum[col] += add;
            // Spread laterally so snow fills valleys naturally
            if (col > 0)      glaciers[g].accum[col - 1] = Math.min(glaciers[g].accum[col - 1] + add * 0.14, MAX_ACCUM);
            if (col < COLS-1) glaciers[g].accum[col + 1] = Math.min(glaciers[g].accum[col + 1] + add * 0.14, MAX_ACCUM);
            flakes.splice(i, 1);
            landed = true;
            break;
          }
        }
        if (landed) continue;

        // Blue glow shadow makes flakes visible on both dark AND light section backgrounds
        ctx.shadowColor = 'rgba(100, 170, 230, 0.55)';
        ctx.shadowBlur = f.size * 2.2;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210, 238, 255, ${f.opacity})`;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
      }

      // Keep pool topped up after landings
      while (flakes.length < FLAKE_COUNT) flakes.push(spawnFlake(w));

      // ── Snow cap + overflow ────────────────────────────────────────────────
      for (let g = 0; g < glaciers.length; g++) {
        const glacier = glaciers[g];
        const rect = rects[g];
        if (rect.top > h + 40 || rect.bottom < -40) continue;

        // Smooth accumulation for visual only — raw accum drives physics
        const smooth = new Float32Array(COLS);
        for (let c = 0; c < COLS; c++) {
          const l  = c > 0      ? glacier.accum[c - 1] : glacier.accum[c];
          const r2 = c < COLS-1 ? glacier.accum[c + 1] : glacier.accum[c];
          smooth[c] = (l + glacier.accum[c] * 2 + r2) / 4;
        }

        // Snow cap fill: between snow top and glacier peak surface
        ctx.beginPath();
        for (let c = 0; c < COLS; c++) {
          const x     = (c / (COLS - 1)) * w;
          const topY  = rect.top + (glacier.profile[c] / 80) * rect.height - smooth[c];
          c === 0 ? ctx.moveTo(x, topY) : ctx.lineTo(x, topY);
        }
        for (let c = COLS - 1; c >= 0; c--) {
          const x      = (c / (COLS - 1)) * w;
          const baseY  = rect.top + (glacier.profile[c] / 80) * rect.height;
          ctx.lineTo(x, baseY);
        }
        ctx.closePath();

        const snowGrad = ctx.createLinearGradient(0, rect.top - MAX_ACCUM, 0, rect.top + rect.height * 0.4);
        snowGrad.addColorStop(0,    'rgba(245, 252, 255, 0.96)');
        snowGrad.addColorStop(0.45, 'rgba(215, 238, 255, 0.88)');
        snowGrad.addColorStop(1,    'rgba(188, 220, 248, 0.70)');
        ctx.fillStyle = snowGrad;
        ctx.fill();

        // Bright shimmer line at the snow surface edge
        ctx.beginPath();
        for (let c = 0; c < COLS; c++) {
          const x    = (c / (COLS - 1)) * w;
          const topY = rect.top + (glacier.profile[c] / 80) * rect.height - smooth[c];
          c === 0 ? ctx.moveTo(x, topY) : ctx.lineTo(x, topY);
        }
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.78)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Count how full this glacier is
        let fullCols = 0;
        for (let c = 0; c < COLS; c++) if (glacier.accum[c] >= MAX_ACCUM * 0.82) fullCols++;
        const fillRatio = fullCols / COLS;

        if (fillRatio > 0.62 && flakes.length < FLAKE_COUNT + 28) {
          // Overflow: spawn cascade flakes starting at the packed snow surface
          if (Math.random() < fillRatio * 0.45) {
            const c = Math.floor(Math.random() * COLS);
            flakes.push({
              x:       (c / (COLS - 1)) * w + rand(-10, 10),
              y:       rect.top + (glacier.profile[c] / 80) * rect.height - glacier.accum[c],
              vx:      rand(-0.5, 0.5) + wind,
              vy:      rand(1.5, 3.0),
              size:    rand(2.5, 5.5),
              opacity: rand(0.55, 0.85),
              layer:   1,
            });
          }
          // Drain slowly so the cycle repeats
          for (let c = 0; c < COLS; c++) {
            glacier.accum[c] = Math.max(0, glacier.accum[c] - 0.07 * dt);
          }
        }
      }

      raf = requestAnimationFrame(loop);
    }

    raf = requestAnimationFrame(loop);

    const onResize = () => {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w; canvas.height = h;
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
