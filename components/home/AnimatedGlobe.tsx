"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { LAND_GRID } from "@/components/ui/globe-utils/globe-land-grid";

/**
 * The home hero's globe: a dot-matrix Earth with a graticule and a decorative
 * network of arcs, turning slowly on its axis.
 *
 * It is drawn on a canvas and re-projected every frame (orthographic), because
 * spinning a flat drawing with a CSS `rotateY` flips it like a coin rather than
 * turning a sphere. Land comes from Natural Earth via LAND_GRID. The cities and arcs
 * are decorative: no data or claim is attached to them.
 *
 * On scroll the globe rises and grows until it is fully in view (Motion `useScroll`).
 * It is loaded client-only by HeroGlobe, so it never delays the hero text. It pauses
 * off screen, and under reduced motion it neither turns nor moves.
 */

const DEG = Math.PI / 180;
/** Camera latitude: the north tilts toward the viewer. */
const TILT = 18 * DEG;
/** Starting longitude at the centre of the disc: the Atlantic. */
const START = 20 * DEG;
/** One full turn every 90 seconds. */
const SPEED = (2 * Math.PI) / 90_000;
/** About 30 frames a second is plenty for a turn this slow. */
const FRAME_MS = 32;

const CITIES: Record<string, [number, number]> = {
  newYork: [40.7, -74],
  toronto: [43.7, -79.4],
  sanFrancisco: [37.8, -122.4],
  mexicoCity: [19.4, -99.1],
  bogota: [4.7, -74.1],
  saoPaulo: [-23.5, -46.6],
  london: [51.5, -0.1],
  madrid: [40.4, -3.7],
  frankfurt: [50.1, 8.7],
  lagos: [6.5, 3.4],
  cairo: [30, 31.2],
  nairobi: [-1.3, 36.8],
  johannesburg: [-26.2, 28],
  dubai: [25.2, 55.3],
  mumbai: [19.1, 72.9],
  singapore: [1.35, 103.8],
  tokyo: [35.7, 139.7],
  sydney: [-33.9, 151.2],
};

const LINKS: [string, string][] = [
  ["newYork", "london"],
  ["newYork", "toronto"],
  ["newYork", "saoPaulo"],
  ["sanFrancisco", "newYork"],
  ["sanFrancisco", "tokyo"],
  ["mexicoCity", "newYork"],
  ["bogota", "saoPaulo"],
  ["bogota", "madrid"],
  ["madrid", "saoPaulo"],
  ["london", "lagos"],
  ["london", "dubai"],
  ["frankfurt", "mumbai"],
  ["frankfurt", "cairo"],
  ["cairo", "nairobi"],
  ["nairobi", "johannesburg"],
  ["lagos", "johannesburg"],
  ["dubai", "mumbai"],
  ["mumbai", "singapore"],
  ["singapore", "tokyo"],
  ["singapore", "sydney"],
];

type Vec = [number, number, number];

const toVec = (lat: number, lon: number): Vec => [
  Math.cos(lat * DEG) * Math.sin(lon * DEG),
  Math.sin(lat * DEG),
  Math.cos(lat * DEG) * Math.cos(lon * DEG),
];

/** Land dots as unit vectors, flattened [x, y, z, x, y, z, ...]. */
function landPoints(): Float32Array {
  const { rows, cols, runs } = LAND_GRID;
  const out: number[] = [];
  runs.forEach((row, i) => {
    const lat = -90 + ((i + 0.5) * 180) / rows;
    const n = Math.max(1, Math.round(cols * Math.cos(lat * DEG)));
    for (let k = 0; k < row.length; k += 2) {
      for (let j = row[k]; j < row[k] + row[k + 1]; j++) {
        out.push(...toVec(lat, -180 + ((j + 0.5) * 360) / n));
      }
    }
  });
  return new Float32Array(out);
}

/** A great-circle arc from a to b, lifted off the surface toward its middle. */
function arc(a: Vec, b: Vec, steps = 28): Vec[] {
  const dot = Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]);
  const omega = Math.acos(dot);
  const s = Math.sin(omega) || 1;
  const lift = 0.04 + omega * 0.07;
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    const wa = Math.sin((1 - t) * omega) / s;
    const wb = Math.sin(t * omega) / s;
    const h = 1 + lift * Math.sin(Math.PI * t);
    return [(a[0] * wa + b[0] * wb) * h, (a[1] * wa + b[1] * wb) * h, (a[2] * wa + b[2] * wb) * h];
  });
}

function token(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

function withAlpha(hex: string, alpha: number) {
  const n = parseInt(hex.replace("#", ""), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

export default function AnimatedGlobe() {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawn, setDrawn] = useState(false);
  const reduceMotion = useReducedMotion();

  // 0 when the globe's top meets the bottom of the viewport, 1 when it is fully in view.
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const green = token("--color-accent", "#1d5a3a");
    const deep = token("--color-accent-strong", "#0a3d1e");
    const glow = token("--color-holo-deep", "#12a66b");
    const land = landPoints();
    const nodes = Object.values(CITIES).map(([lat, lon]) => toVec(lat, lon));
    const arcs = LINKS.map(([a, b]) => arc(toVec(...CITIES[a]), toVec(...CITIES[b])));

    const sinT = Math.sin(TILT);
    const cosT = Math.cos(TILT);
    let size = 0;
    let dpr = 1;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas!.clientWidth;
      canvas!.width = Math.round(size * dpr);
      canvas!.height = Math.round(size * dpr);
    }

    function draw(rotation: number) {
      const c = ctx!;
      const r = (size / 2 - 2) * dpr;
      const cx = (size / 2) * dpr;
      const cy = (size / 2) * dpr;
      const sinR = Math.sin(rotation);
      const cosR = Math.cos(rotation);

      // Turn about the polar axis, then tilt toward the viewer. Returns screen x, y and depth.
      const project = (v: Vec | Float32Array, i = 0): [number, number, number] => {
        const x0 = v[i];
        const y0 = v[i + 1];
        const z0 = v[i + 2];
        const x = x0 * cosR + z0 * sinR;
        const z1 = z0 * cosR - x0 * sinR;
        const y = y0 * cosT - z1 * sinT;
        const z = z1 * cosT + y0 * sinT;
        return [cx + r * x, cy - r * y, z];
      };

      c.clearRect(0, 0, canvas!.width, canvas!.height);

      // Sphere: a pale green body, lit from the upper left, and a fine rim.
      const body = c.createRadialGradient(cx - r * 0.35, cy - r * 0.45, r * 0.1, cx, cy, r);
      body.addColorStop(0, withAlpha(glow, 0.1));
      body.addColorStop(1, withAlpha(green, 0.07));
      c.beginPath();
      c.arc(cx, cy, r, 0, Math.PI * 2);
      c.fillStyle = body;
      c.fill();
      c.lineWidth = 1 * dpr;
      c.strokeStyle = withAlpha(green, 0.3);
      c.stroke();

      // Graticule every 15 degrees, front side only.
      c.beginPath();
      const line = (points: Vec[]) => {
        let open = false;
        for (const p of points) {
          const [sx, sy, z] = project(p);
          if (z <= 0) {
            open = false;
            continue;
          }
          if (open) c.lineTo(sx, sy);
          else c.moveTo(sx, sy);
          open = true;
        }
      };
      for (let lat = -75; lat <= 75; lat += 15) {
        line(Array.from({ length: 121 }, (_, i) => toVec(lat, -180 + i * 3)));
      }
      for (let lon = -180; lon < 180; lon += 15) {
        line(Array.from({ length: 61 }, (_, i) => toVec(-90 + i * 3, lon)));
      }
      c.lineWidth = 0.75 * dpr;
      c.strokeStyle = withAlpha(green, 0.16);
      c.stroke();

      // Land dots, in four depth bands so the limb fades and each band is one fill.
      const bands = [0.25, 0.5, 0.75, 1];
      const paths = bands.map(() => new Path2D());
      const dot = Math.max(1, size / 340) * dpr;
      for (let i = 0; i < land.length; i += 3) {
        const [sx, sy, z] = project(land, i);
        if (z <= 0.02) continue;
        const band = Math.min(3, Math.floor(z * 4));
        const radius = dot * (0.6 + 0.4 * z);
        paths[band].moveTo(sx + radius, sy);
        paths[band].arc(sx, sy, radius, 0, Math.PI * 2);
      }
      paths.forEach((path, band) => {
        c.fillStyle = withAlpha(green, 0.2 + 0.7 * bands[band]);
        c.fill(path);
      });

      // Network arcs and their nodes.
      c.beginPath();
      for (const points of arcs) line(points);
      c.lineWidth = 1 * dpr;
      c.strokeStyle = withAlpha(deep, 0.4);
      c.stroke();

      for (const node of nodes) {
        const [sx, sy, z] = project(node);
        if (z <= 0.05) continue;
        c.beginPath();
        c.arc(sx, sy, 6 * dpr, 0, Math.PI * 2);
        c.fillStyle = withAlpha(green, 0.14 * z);
        c.fill();
        c.beginPath();
        c.arc(sx, sy, 2.6 * dpr, 0, Math.PI * 2);
        c.fillStyle = withAlpha(deep, 0.5 + 0.5 * z);
        c.fill();
      }
    }

    resize();
    let rotation = START;
    draw(rotation);
    setDrawn(true);

    const sizer = new ResizeObserver(() => {
      resize();
      draw(rotation);
    });
    sizer.observe(canvas);

    if (reduceMotion) return () => sizer.disconnect();

    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!last) last = now;
      const dt = now - last;
      if (dt < FRAME_MS) return;
      last = now;
      rotation += Math.min(dt, 100) * SPEED;
      draw(rotation);
    };
    const visibility = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      last = 0;
      if (entry.isIntersecting) raf = requestAnimationFrame(tick);
    });
    visibility.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      visibility.disconnect();
      sizer.disconnect();
    };
  }, [reduceMotion]);

  return (
    <div ref={frameRef} className="absolute inset-0">
      <motion.div className="size-full" style={reduceMotion ? undefined : { y, scale }}>
        <canvas
          ref={canvasRef}
          className={`size-full transition-opacity duration-(--dur-hero) ease-calm ${
            drawn ? "opacity-100" : "opacity-0"
          }`}
        />
      </motion.div>
    </div>
  );
}
