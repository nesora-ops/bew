/**
 * The live hologram globe: one full-screen triangle and one fragment shader, no
 * library. The shader intersects a sphere analytically for each pixel and draws a
 * glass body, a 20 degree graticule, dotted land (sampled from the Natural Earth
 * mask), faint scan lines, a fresnel tint, a crisp limb and an orbit ring. Every
 * line and dot is anti-aliased to about one pixel: nothing is blurred.
 *
 * Loaded on demand by `Globe.tsx` (never on the server). `createGlobe` returns null
 * when WebGL is unavailable or the browser flags a major performance caveat, and the
 * static poster stays in place.
 */
import {
  DOT_COLS,
  DOT_ROWS,
  GLOBE_COLORS,
  GLOBE_FRAMES,
  GLOBE_VIEWS,
  SPIN_SECONDS,
  type GlobeVariant,
} from "./config";
import { LAND_HEIGHT, LAND_RLE, LAND_WIDTH } from "./land-mask";

export type GlobeHandle = { destroy: () => void };

const VERTEX = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uCenter;
uniform float uRadius;
uniform float uPhi;
uniform float uTilt;
uniform float uTime;
uniform float uOrbit;
uniform sampler2D uLand;
uniform vec3 uBody;
uniform vec3 uLine;
uniform vec3 uDot;
uniform vec3 uRim;
uniform vec3 uGlow;

const float PI = 3.14159265;
const float ROWS = ${DOT_ROWS.toFixed(1)};
const float COLS = ${DOT_COLS.toFixed(1)};
const float STEP = PI / 9.0;

// Premultiplied "over": paint colour c at alpha a on top of dst.
vec4 over(vec4 dst, vec3 c, float a) {
  return vec4(c * a + dst.rgb * (1.0 - a), a + dst.a * (1.0 - a));
}

// Coverage of a line of half-width w at distance d, softened over one pixel (aa).
float line(float d, float w, float aa) {
  return 1.0 - smoothstep(w, w + aa, d);
}

float graticule(vec3 g, float aa) {
  float lat = asin(clamp(g.y, -1.0, 1.0));
  float lon = atan(g.x, g.z) - uPhi;
  float dLat = abs(fract(lat / STEP + 0.5) - 0.5) * STEP;
  float dLon = abs(fract(lon / STEP + 0.5) - 0.5) * STEP * cos(lat);
  float w = 0.45 * aa;
  float parallels = line(dLat, w, aa) * (1.0 - step(1.22, abs(lat)));
  float meridians = line(dLon, w, aa) * (1.0 - smoothstep(1.3, 1.45, abs(lat)));
  return max(parallels, meridians);
}

void main() {
  vec2 p = (gl_FragCoord.xy - uCenter) / uRadius;
  float r = length(p);
  float px = 1.0 / uRadius;
  vec4 col = vec4(0.0);

  if (r > 1.26) {
    gl_FragColor = col;
    return;
  }

  // Orbit ring: a tilted ellipse around the sphere. The lower half passes in front.
  float ringA = 0.0;
  float ringFront = 1.0;
  float sat = 0.0;
  if (uOrbit > 0.5) {
    float ca = cos(-0.22);
    float sa = sin(-0.22);
    vec2 q = vec2(ca * p.x - sa * p.y, sa * p.x + ca * p.y);
    vec2 ab = vec2(1.2, 0.3);
    vec2 k = q / ab;
    float e = length(k);
    vec2 grad = k / (ab * max(e, 1e-4));
    float d = abs(e - 1.0) / max(length(grad), 1e-4);
    ringA = line(d, 0.6 * px, px) * 0.6;
    ringFront = step(k.y, 0.0);
    // A small satellite travelling the ring.
    float th = uTime * 0.35;
    vec2 s = vec2(1.2 * cos(th), 0.3 * sin(th));
    float satFront = step(s.y, 0.0);
    vec2 sp = vec2(ca * s.x + sa * s.y, -sa * s.x + ca * s.y);
    sat = line(length(p - sp), 0.018, px) * max(satFront, step(1.0, length(sp)));
  }

  // Thin atmosphere line just outside the limb.
  col = over(col, uGlow, line(abs(r - 1.045), 0.5 * px, px) * 0.45);

  if (r < 1.0 + 2.0 * px) {
    float z = sqrt(max(0.0, 1.0 - r * r));
    float edge = 1.0 - smoothstep(1.0 - 1.5 * px, 1.0, r);
    float aa = px / max(z, 0.12);
    float ct = cos(uTilt);
    float st = sin(uTilt);

    // Far side graticule first, faint, for depth.
    vec3 back = vec3(p.x, p.y * ct - z * st, -p.y * st - z * ct);
    col = over(col, uLine, graticule(back, aa) * 0.14 * edge);
    // The orbit's far half sits behind the glass body.
    col = over(col, uRim, ringA * (1.0 - ringFront) * 0.5);

    // Glass body, lit from the upper left.
    float light = clamp(dot(vec3(p, z), normalize(vec3(-0.45, 0.55, 0.7))), 0.0, 1.0);
    col = over(col, mix(uBody, vec3(1.0), 0.5 * light), 0.5 * edge);

    // Scan lines: crisp, faint, drifting slowly downward.
    float scan = step(0.78, fract((gl_FragCoord.y + uTime * 14.0) / 6.0));
    col = over(col, uGlow, scan * 0.045 * edge);

    vec3 g = vec3(p.x, p.y * ct + z * st, -p.y * st + z * ct);
    col = over(col, uLine, graticule(g, aa) * 0.5 * edge);

    // Dotted land: a lat/long dot grid, kept where the mask says land.
    float lat = asin(clamp(g.y, -1.0, 1.0));
    float lon = atan(g.x, g.z) - uPhi;
    float dLat = PI / ROWS;
    float row = floor((lat + 0.5 * PI) / dLat);
    float latC = -0.5 * PI + (row + 0.5) * dLat;
    float n = max(1.0, floor(COLS * cos(latC) + 0.5));
    float dLon = 2.0 * PI / n;
    float lonN = mod(lon + PI, 2.0 * PI);
    float cell = floor(lonN / dLon);
    float land = texture2D(uLand, vec2((cell + 0.5) * dLon / (2.0 * PI), (0.5 * PI - latC) / PI)).r;
    float dist = length(vec2((lonN - (cell + 0.5) * dLon) * cos(lat), lat - latC));
    float dotA = line(dist, dLat * 0.3 - 0.5 * aa, aa) * step(0.5, land) * mix(0.55, 1.0, z);
    col = over(col, uDot, dotA * 0.95 * edge);

    // Fresnel tint toward the limb, then a crisp limb line.
    col = over(col, uGlow, pow(1.0 - z, 4.0) * 0.32 * edge);
    col = over(col, uRim, line(abs(r - 1.0), 0.6 * px, px) * 0.8);
  }

  // The orbit's near half, and its far half where it clears the sphere.
  col = over(col, uRim, ringA * max(ringFront, step(1.0, r)));
  col = over(col, uRim, sat * 0.9);

  gl_FragColor = col;
}
`;

function hexToRgb(hex: string): [number, number, number] {
  const value = parseInt(hex.slice(1), 16);
  return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255];
}

function decodeLand(): Uint8Array {
  const data = new Uint8Array(LAND_WIDTH * LAND_HEIGHT);
  let index = 0;
  for (const row of LAND_RLE.split("|")) {
    let land = false;
    for (const run of row.split(".")) {
      const length = parseInt(run, 36);
      if (land) data.fill(255, index, index + length);
      index += length;
      land = !land;
    }
  }
  return data;
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    if (process.env.NODE_ENV !== "production") console.warn(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function createGlobe(
  canvas: HTMLCanvasElement,
  options: { variant: GlobeVariant; onReady: () => void; onLost: () => void },
): GlobeHandle | null {
  const gl = canvas.getContext("webgl", {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    failIfMajorPerformanceCaveat: true,
    powerPreference: "low-power",
  });
  if (!gl) return null;

  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  gl.useProgram(program);

  // One triangle that covers the whole viewport.
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(program, "aPos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.LUMINANCE,
    LAND_WIDTH,
    LAND_HEIGHT,
    0,
    gl.LUMINANCE,
    gl.UNSIGNED_BYTE,
    decodeLand(),
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const uniform = (name: string) => gl.getUniformLocation(program, name);
  const uCenter = uniform("uCenter");
  const uRadius = uniform("uRadius");
  const uPhi = uniform("uPhi");
  const uTilt = uniform("uTilt");
  const uTime = uniform("uTime");
  gl.uniform1i(uniform("uLand"), 0);
  gl.uniform1f(uniform("uOrbit"), options.variant === "hero" ? 1 : 0);
  gl.uniform3fv(uniform("uBody"), hexToRgb(GLOBE_COLORS.body));
  gl.uniform3fv(uniform("uLine"), hexToRgb(GLOBE_COLORS.line));
  gl.uniform3fv(uniform("uDot"), hexToRgb(GLOBE_COLORS.dot));
  gl.uniform3fv(uniform("uRim"), hexToRgb(GLOBE_COLORS.rim));
  gl.uniform3fv(uniform("uGlow"), hexToRgb(GLOBE_COLORS.glow));

  const view = GLOBE_VIEWS[options.variant];
  const frame = GLOBE_FRAMES[options.variant];
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const maxDpr = coarse ? 1.5 : 2;
  const frameInterval = (navigator.hardwareConcurrency ?? 8) <= 4 ? 1000 / 30 : 0;

  // Map the frame the way the poster's preserveAspectRatio does: "meet" for the
  // square hero, "xMidYMax slice" for the horizon, so canvas and poster line up.
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    const width = Math.max(1, Math.round(canvas.clientWidth * dpr));
    const height = Math.max(1, Math.round(canvas.clientHeight * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    gl.viewport(0, 0, width, height);
    if (options.variant === "hero") {
      const scale = Math.min(width / frame.width, height / frame.height);
      gl.uniform2f(uCenter, width / 2, height / 2);
      gl.uniform1f(uRadius, frame.r * scale);
    } else {
      const scale = Math.max(width / frame.width, height / frame.height);
      gl.uniform2f(uCenter, width / 2, (frame.height - frame.cy) * scale);
      gl.uniform1f(uRadius, frame.r * scale);
    }
  };
  resize();

  let destroyed = false;
  let lost = false;
  let visible = !document.hidden;
  let inView = false;
  let running = false;
  let ready = false;
  let raf = 0;
  let previous = 0;
  let lastDraw = 0;
  let elapsed = 0;
  let yaw = 0;
  let pitch = 0;
  let targetYaw = 0;
  let targetPitch = 0;

  const frameLoop = (now: number) => {
    raf = 0;
    if (!running) return;
    raf = requestAnimationFrame(frameLoop);
    if (frameInterval && now - lastDraw < frameInterval - 1) return;
    lastDraw = now;
    // Advance only while running, so resuming never jumps.
    elapsed += previous ? Math.min(now - previous, 100) / 1000 : 0;
    previous = now;
    yaw += (targetYaw - yaw) * 0.05;
    pitch += (targetPitch - pitch) * 0.05;
    const scrollTilt =
      options.variant === "hero" ? Math.min(window.scrollY / window.innerHeight, 1) * 0.12 : 0;
    gl.uniform1f(uPhi, view.phi + (elapsed * 2 * Math.PI) / SPIN_SECONDS + yaw);
    gl.uniform1f(uTilt, view.tilt + pitch + scrollTilt);
    gl.uniform1f(uTime, elapsed);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (!ready) {
      ready = true;
      options.onReady();
    }
  };

  const update = () => {
    const shouldRun = visible && inView && !lost && !destroyed;
    if (shouldRun && !running) {
      running = true;
      previous = 0;
      raf = requestAnimationFrame(frameLoop);
    } else if (!shouldRun && running) {
      running = false;
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };

  const onVisibility = () => {
    visible = !document.hidden;
    update();
  };
  const onPointer = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    targetYaw = (event.clientX / window.innerWidth - 0.5) * 0.2;
    targetPitch = (event.clientY / window.innerHeight - 0.5) * 0.2;
  };
  const onLost = () => {
    lost = true;
    update();
    options.onLost();
  };

  const io = new IntersectionObserver(
    ([entry]) => {
      inView = entry.isIntersecting;
      update();
    },
    { rootMargin: "64px" },
  );
  io.observe(canvas);
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  document.addEventListener("visibilitychange", onVisibility);
  canvas.addEventListener("webglcontextlost", onLost);
  if (options.variant === "hero") window.addEventListener("pointermove", onPointer, { passive: true });

  return {
    destroy() {
      if (destroyed) return;
      destroyed = true;
      update();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onLost);
      window.removeEventListener("pointermove", onPointer);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}
