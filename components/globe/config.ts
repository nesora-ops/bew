/**
 * Shared globe settings.
 *
 * A plain module (no "use client"), so the server-rendered poster and the client
 * WebGL module read the same values. `scripts/build-globe-data.mjs` repeats the
 * view, frame and grid numbers when it generates the poster: keep them in step.
 */

export const DEG = Math.PI / 180;

/** Where each variant looks: tilt tips the north pole toward the viewer, phi spins. */
export const GLOBE_VIEWS = {
  hero: { tilt: 22 * DEG, phi: -10 * DEG },
  horizon: { tilt: -35 * DEG, phi: -20 * DEG },
} as const;

/**
 * Each variant's frame, in poster (SVG viewBox) units. The canvas maps these the
 * same way the poster's `preserveAspectRatio` does, so the two line up.
 */
export const GLOBE_FRAMES = {
  hero: { width: 1000, height: 1000, cx: 500, cy: 500, r: 400 },
  horizon: { width: 1600, height: 480, cx: 800, cy: 1613, r: 1440 },
} as const;

/** Live dot grid: 2.4 degree rows, 150 dots around the equator. */
export const DOT_ROWS = 75;
export const DOT_COLS = 150;

/** One full turn takes this many seconds. */
export const SPIN_SECONDS = 80;

/**
 * Plain hex. Tailwind drops CSS variables that nothing references, so JavaScript
 * can't rely on reading the theme tokens at runtime.
 */
export const GLOBE_COLORS = {
  /** Glass body: the canvas tinted toward accent-soft. */
  body: "#eef3ec",
  /** Graticule: the leaf green. */
  line: "#2f7a52",
  /** Land dots: accent. */
  dot: "#1d5a3a",
  /** Limb and orbit: holo-deep. */
  rim: "#12a66b",
  /** Fresnel tint and atmosphere line: holo. */
  glow: "#2ee59d",
} as const;

export type GlobeVariant = keyof typeof GLOBE_VIEWS;
