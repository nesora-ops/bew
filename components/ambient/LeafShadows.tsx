/**
 * Dappled leaf shadows: the site-wide ambient texture.
 *
 * One fixed, viewport-sized layer behind every page, like light falling through
 * foliage onto the canvas while the content scrolls over it. Opaque surfaces (cards,
 * the footer, the CTA panel) sit above it, as they would in real light.
 *
 * Our own drawing, generated here from a few branch descriptions (nothing is taken
 * from any reference). Each layer is flattened to two paths (leaves and stems), so
 * the markup and the DOM stay small on every page. It is inline SVG, so it is never
 * an LCP candidate. The blur is applied inside the SVG, which rasterises it once;
 * the drift animates the HTML wrappers' transform only, so it stays on the
 * compositor. Under reduced motion the `leaf-drift-*` classes do nothing.
 *
 * The shadow is the leaf green at 10% (near) and 6% (far). Where both overlap, muted
 * body text still has 5.82:1 contrast and accent text 5.72:1.
 */

type Branch = {
  /** Start point in the 1440x900 viewBox. */
  x: number;
  y: number;
  /** Growth direction in degrees (0 points right, 90 points down). */
  angle: number;
  length: number;
  /** Sideways pull of the stem's curve, as a fraction of its length (signed). */
  bend: number;
  leaves: number;
  leafLength: number;
  leafWidth: number;
  /** Angle between each leaf and the stem, in degrees. */
  spread: number;
};

/** Shadow colour: the leaf green. */
const LEAF = "#1f4d33";

const NEAR: Branch[] = [
  { x: 1500, y: -50, angle: 158, length: 640, bend: 0.12, leaves: 11, leafLength: 128, leafWidth: 36, spread: 48 },
  { x: -70, y: 30, angle: 22, length: 500, bend: -0.1, leaves: 9, leafLength: 112, leafWidth: 32, spread: 52 },
  { x: 1490, y: 560, angle: 196, length: 340, bend: -0.14, leaves: 7, leafLength: 92, leafWidth: 27, spread: 46 },
  { x: -60, y: 960, angle: -38, length: 420, bend: 0.12, leaves: 8, leafLength: 104, leafWidth: 30, spread: 50 },
];

const FAR: Branch[] = [
  { x: 1380, y: -90, angle: 122, length: 860, bend: 0.08, leaves: 20, leafLength: 96, leafWidth: 15, spread: 68 },
  { x: -90, y: 640, angle: -16, length: 620, bend: 0.1, leaves: 16, leafLength: 84, leafWidth: 14, spread: 70 },
  { x: 430, y: -70, angle: 104, length: 320, bend: -0.12, leaves: 7, leafLength: 88, leafWidth: 26, spread: 50 },
  { x: 1520, y: 980, angle: 214, length: 520, bend: -0.08, leaves: 14, leafLength: 80, leafWidth: 14, spread: 66 },
];

const r = Math.round;

/** Flattens a layer's branches into one leaf path (filled) and one stem path (stroked). */
function layerPaths(branches: Branch[]) {
  let leaves = "";
  let stems = "";
  for (const b of branches) {
    const rad = (b.angle * Math.PI) / 180;
    const ex = b.x + Math.cos(rad) * b.length;
    const ey = b.y + Math.sin(rad) * b.length;
    const cx = (b.x + ex) / 2 - Math.sin(rad) * b.bend * b.length;
    const cy = (b.y + ey) / 2 + Math.cos(rad) * b.bend * b.length;
    stems += `M${r(b.x)} ${r(b.y)}Q${r(cx)} ${r(cy)} ${r(ex)} ${r(ey)}`;

    for (let i = 0; i < b.leaves; i++) {
      const t = 0.1 + (0.88 * i) / Math.max(1, b.leaves - 1);
      const u = 1 - t;
      const px = u * u * b.x + 2 * u * t * cx + t * t * ex;
      const py = u * u * b.y + 2 * u * t * cy + t * t * ey;
      const tangent = Math.atan2(
        2 * u * (cy - b.y) + 2 * t * (ey - cy),
        2 * u * (cx - b.x) + 2 * t * (ex - cx),
      );
      const side = i % 2 === 0 ? 1 : -1;
      // Deterministic jitter so the branch doesn't look mechanical.
      const jitter = (((i * 37) % 11) - 5) * 1.8;
      const angle =
        i === b.leaves - 1 ? tangent : tangent + ((side * b.spread + jitter) * Math.PI) / 180;
      const taper = 1 - 0.42 * t;
      const length = b.leafLength * taper;
      const width = b.leafWidth * taper;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const at = (x: number, y: number) => `${r(px + x * cos - y * sin)} ${r(py + x * sin + y * cos)}`;
      leaves +=
        `M${at(0, 0)}C${at(length * 0.25, -width)} ${at(length * 0.7, -width * 0.9)} ${at(length, 0)}` +
        `C${at(length * 0.7, width * 0.9)} ${at(length * 0.25, width)} ${at(0, 0)}Z`;
    }
  }
  return { leaves, stems };
}

function Layer({
  branches,
  blur,
  stem,
  filterId,
  align,
  color = LEAF,
}: {
  branches: Branch[];
  blur: number;
  stem: number;
  filterId: string;
  align: "xMinYMid" | "xMaxYMid";
  color?: string;
}) {
  const { leaves, stems } = layerPaths(branches);
  return (
    <svg viewBox="0 0 1440 900" preserveAspectRatio={`${align} slice`} className="size-full">
      <defs>
        <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation={blur} />
        </filter>
      </defs>
      <g filter={`url(#${filterId})`}>
        <path d={stems} fill="none" stroke={color} strokeWidth={stem} strokeLinecap="round" />
        <path d={leaves} fill={color} />
      </g>
    </svg>
  );
}

export function LeafShadows() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="leaf-drift-far absolute -inset-[4%] opacity-[0.06] will-change-transform">
        <Layer branches={FAR} blur={6} stem={3} filterId="leaves-far" align="xMinYMid" />
      </div>
      <div className="leaf-drift-near absolute -inset-[4%] opacity-[0.1] will-change-transform">
        <Layer branches={NEAR} blur={2.5} stem={4} filterId="leaves-near" align="xMaxYMid" />
      </div>
    </div>
  );
}

/**
 * The same leaves as light rather than shadow, for a dark green surface: off-white
 * at 8% (near) and 5% (far). It fills its positioned parent instead of the viewport.
 */
export function LeafLight() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="leaf-drift-far absolute -inset-[4%] opacity-[0.05] will-change-transform">
        <Layer branches={FAR} blur={6} stem={3} filterId="leaves-far-light" align="xMinYMid" color="#f4f4f0" />
      </div>
      <div className="leaf-drift-near absolute -inset-[4%] opacity-[0.08] will-change-transform">
        <Layer branches={NEAR} blur={2.5} stem={4} filterId="leaves-near-light" align="xMaxYMid" color="#f4f4f0" />
      </div>
    </div>
  );
}
