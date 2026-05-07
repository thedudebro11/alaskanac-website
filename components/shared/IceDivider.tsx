interface Props {
  fill: string;
  variant?: 1 | 2 | 3;
  flip?: boolean;
  height?: number;
}

// Three distinct jagged ice-edge paths — different spike rhythms so back-to-back
// dividers on the same page don't look repetitive. All paths trace left→right
// along the jagged top edge, then fill down to y=80.
const PATHS: Record<1 | 2 | 3, string> = {
  1: 'M0 80 L0 52 L28 30 L52 50 L82 12 L108 42 L138 22 L165 55 L192 18 L220 40 L248 8 L275 35 L305 20 L332 48 L362 10 L390 38 L418 25 L448 55 L475 15 L505 42 L535 8 L562 35 L592 20 L620 52 L648 18 L678 44 L705 10 L732 38 L762 25 L790 55 L818 14 L848 40 L875 22 L905 52 L932 8 L960 36 L990 20 L1018 50 L1045 15 L1075 42 L1102 8 L1132 38 L1160 25 L1188 55 L1215 12 L1245 40 L1272 22 L1302 52 L1330 10 L1358 38 L1388 20 L1415 48 L1440 32 L1440 80 Z',
  2: 'M0 80 L0 45 L40 18 L85 42 L130 5 L175 32 L210 55 L255 20 L295 45 L340 10 L380 38 L420 22 L460 55 L500 12 L540 40 L578 25 L618 52 L658 8 L698 42 L738 18 L778 50 L815 15 L855 40 L895 22 L935 55 L972 10 L1012 38 L1052 20 L1090 52 L1128 15 L1168 42 L1205 8 L1245 38 L1285 22 L1322 55 L1360 18 L1400 42 L1440 28 L1440 80 Z',
  3: 'M0 80 L0 48 L22 35 L42 55 L62 20 L85 45 L105 10 L125 38 L148 25 L168 52 L192 15 L215 40 L238 8 L262 35 L285 55 L308 18 L332 42 L355 12 L378 38 L402 22 L425 50 L448 8 L472 36 L495 20 L518 55 L542 15 L565 40 L588 5 L612 32 L635 55 L658 18 L682 42 L705 8 L728 38 L752 25 L775 52 L798 12 L822 40 L845 22 L868 55 L892 10 L915 38 L938 20 L962 50 L985 15 L1008 42 L1032 8 L1055 36 L1078 22 L1102 55 L1125 14 L1148 40 L1172 8 L1195 36 L1218 20 L1242 52 L1265 15 L1288 42 L1312 8 L1335 38 L1358 22 L1382 50 L1410 18 L1440 35 L1440 80 Z',
};

export function IceDivider({ fill, variant = 1, flip = false, height = 80 }: Props) {
  return (
    <div
      aria-hidden="true"
      data-ice-variant={String(variant)}
      style={{
        lineHeight: 0,
        display: 'block',
        overflow: 'hidden',
        marginBottom: '-1px',
        transform: flip ? 'scaleY(-1)' : 'none',
      }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        width="100%"
        height={height}
        style={{ display: 'block' }}
        focusable="false"
      >
        <path d={PATHS[variant]} fill={fill} />
      </svg>
    </div>
  );
}
