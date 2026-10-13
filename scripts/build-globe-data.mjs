// Builds the globe's land mask and static poster geometry.
//
// Source: Natural Earth 1:110m land (public domain), via the world-atlas@2.0.2
// package's land-110m.json (ISC). The download is not committed; only the outputs
// below are.
//
// Usage: node scripts/build-globe-data.mjs <path/to/land-110m.json>
//
// Writes:
//   components/globe/land-mask.ts    run-length-encoded 512x256 equirectangular mask
//   components/globe/poster-data.ts  SVG path data for the static posters
//
// The views, frames and grids below must match components/globe/config.ts.

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const input = process.argv[2];
if (!input) {
  console.error("Usage: node scripts/build-globe-data.mjs <path/to/land-110m.json>");
  process.exit(1);
}
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const topo = JSON.parse(readFileSync(input, "utf8"));

const DEG = Math.PI / 180;
const VIEWS = {
  hero: { tilt: 22 * DEG, phi: -10 * DEG },
  horizon: { tilt: -35 * DEG, phi: -20 * DEG },
};
const FRAMES = {
  hero: { width: 1000, height: 1000, cx: 500, cy: 500, r: 400 },
  horizon: { width: 1600, height: 480, cx: 800, cy: 1613, r: 1440 },
};
/**
 * Dot grids for the posters. The hero poster sits on the home page, so it uses a
 * sparser grid than the live globe (about 4 degree rows) to keep the HTML small. The
 * horizon only shows a thin arc on the 404, so it can use the live grid.
 */
const POSTER_GRIDS = {
  hero: { rows: 44, cols: 88 },
  horizon: { rows: 75, cols: 150 },
};

// 1. Decode the TopoJSON arcs (quantised, delta-encoded) into lon/lat rings.
const [sx, sy] = topo.transform.scale;
const [tx, ty] = topo.transform.translate;
const arcs = topo.arcs.map((arc) => {
  let x = 0;
  let y = 0;
  return arc.map(([dx, dy]) => {
    x += dx;
    y += dy;
    return [x * sx + tx, y * sy + ty];
  });
});
const ringFrom = (indices) =>
  indices.flatMap((index, k) => {
    const arc = index < 0 ? [...arcs[~index]].reverse() : arcs[index];
    return k === 0 ? arc : arc.slice(1);
  });
const rings = [];
for (const geometry of topo.objects.land.geometries) {
  const polygons = geometry.type === "Polygon" ? [geometry.arcs] : geometry.arcs;
  for (const polygon of polygons) for (const ring of polygon) rings.push(ringFrom(ring));
}

// 2. Rasterise to an equirectangular mask (row 0 = north) with an even-odd scanline fill.
const W = 512;
const H = 256;
const mask = new Uint8Array(W * H);
for (let row = 0; row < H; row++) {
  const lat = 90 - ((row + 0.5) * 180) / H;
  const xs = [];
  for (const ring of rings) {
    for (let i = 0; i < ring.length - 1; i++) {
      const [x1, y1] = ring[i];
      const [x2, y2] = ring[i + 1];
      if ((y1 <= lat && y2 > lat) || (y2 <= lat && y1 > lat)) {
        xs.push(x1 + ((lat - y1) / (y2 - y1)) * (x2 - x1));
      }
    }
  }
  xs.sort((a, b) => a - b);
  for (let k = 0; k + 1 < xs.length; k += 2) {
    const c0 = Math.max(0, Math.ceil(((xs[k] + 180) / 360) * W - 0.5));
    const c1 = Math.min(W - 1, Math.floor(((xs[k + 1] + 180) / 360) * W - 0.5));
    for (let c = c0; c <= c1; c++) mask[row * W + c] = 1;
  }
}

// 3. Run-length encode each row: base36 runs separated by ".", starting with water.
const rle = [];
let landPixels = 0;
for (let row = 0; row < H; row++) {
  const runs = [];
  let value = 0;
  let run = 0;
  for (let c = 0; c < W; c++) {
    const v = mask[row * W + c];
    landPixels += v;
    if (v === value) run++;
    else {
      runs.push(run);
      value = v;
      run = 1;
    }
  }
  runs.push(run);
  rle.push(runs.map((n) => n.toString(36)).join("."));
}

const isLand = (lat, lon) => {
  const row = Math.min(H - 1, Math.max(0, Math.floor(((90 - lat) / 180) * H)));
  const col = ((Math.floor(((lon + 180) / 360) * W) % W) + W) % W;
  return mask[row * W + col] === 1;
};

// 4. Orthographic projection, matching the shader in components/globe/globe-gl.ts.
const r1 = (n) => Math.round(n);
function project(latDeg, lonDeg, view, frame) {
  const lat = latDeg * DEG;
  const lon = lonDeg * DEG + view.phi;
  const x = Math.cos(lat) * Math.sin(lon);
  const y = Math.sin(lat);
  const z = Math.cos(lat) * Math.cos(lon);
  const ct = Math.cos(view.tilt);
  const st = Math.sin(view.tilt);
  return {
    x: frame.cx + frame.r * x,
    y: frame.cy - frame.r * (y * ct - z * st),
    z: y * st + z * ct,
  };
}
const inFrame = (frame) => (p) =>
  p.x >= -20 && p.x <= frame.width + 20 && p.y >= -20 && p.y <= frame.height + 20;

function dots(variant) {
  const view = VIEWS[variant];
  const frame = FRAMES[variant];
  const visible = inFrame(frame);
  const { rows, cols } = POSTER_GRIDS[variant];
  let d = "";
  for (let i = 0; i < rows; i++) {
    const lat = -90 + ((i + 0.5) * 180) / rows;
    const n = Math.max(1, Math.round(cols * Math.cos(lat * DEG)));
    for (let j = 0; j < n; j++) {
      const lon = -180 + ((j + 0.5) * 360) / n;
      if (!isLand(lat, lon)) continue;
      const p = project(lat, lon, view, frame);
      if (p.z < 0.06 || !visible(p)) continue;
      d += `M${r1(p.x)} ${r1(p.y)}h0`;
    }
  }
  return d;
}

function graticule(variant) {
  const view = VIEWS[variant];
  const frame = FRAMES[variant];
  const visible = inFrame(frame);
  const segments = [];
  const trace = (points) => {
    let current = [];
    for (const p of points) {
      if (p.z > 0 && visible(p)) current.push(p);
      else {
        if (current.length > 1) segments.push(current);
        current = [];
      }
    }
    if (current.length > 1) segments.push(current);
  };
  const range = (from, to, step) =>
    Array.from({ length: Math.floor((to - from) / step) + 1 }, (_, i) => from + i * step);
  for (let lat = -60; lat <= 60; lat += 20) {
    trace(range(-180, 180, 5).map((lon) => project(lat, lon, view, frame)));
  }
  for (let lon = -180; lon < 180; lon += 20) {
    trace(range(-80, 80, 5).map((lat) => project(lat, lon, view, frame)));
  }
  return segments.map((s) => "M" + s.map((p) => `${r1(p.x)} ${r1(p.y)}`).join("L")).join("");
}

const header =
  "// Generated by scripts/build-globe-data.mjs from Natural Earth 1:110m land\n" +
  "// (public domain, via world-atlas@2.0.2). Do not edit by hand.\n\n";

writeFileSync(
  join(root, "components/globe/land-mask.ts"),
  header +
    `export const LAND_WIDTH = ${W};\n` +
    `export const LAND_HEIGHT = ${H};\n\n` +
    "/** Rows north to south: base36 run lengths separated by \".\", starting with water. */\n" +
    `export const LAND_RLE =\n  "${rle.join("|")}";\n`,
);

const heroDots = dots("hero");
const heroGraticule = graticule("hero");
const horizonDots = dots("horizon");
const horizonGraticule = graticule("horizon");
writeFileSync(
  join(root, "components/globe/poster-data.ts"),
  header +
    `export const HERO_DOTS =\n  "${heroDots}";\n\n` +
    `export const HERO_GRATICULE =\n  "${heroGraticule}";\n\n` +
    `export const HORIZON_DOTS =\n  "${horizonDots}";\n\n` +
    `export const HORIZON_GRATICULE =\n  "${horizonGraticule}";\n`,
);

console.log(
  `rings ${rings.length}, land ${((landPixels / (W * H)) * 100).toFixed(1)}%, ` +
    `RLE ${rle.join("|").length} chars, hero dots ${heroDots.split("M").length - 1}, ` +
    `horizon dots ${horizonDots.split("M").length - 1}`,
);
