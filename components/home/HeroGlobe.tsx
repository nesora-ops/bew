"use client";

import dynamic from "next/dynamic";

/**
 * Loads the hero globe on the client only, in its own chunk, so the canvas code and
 * Motion never sit in the way of the hero text. The parent reserves the globe's
 * square box, so nothing shifts when it arrives.
 */
const AnimatedGlobe = dynamic(() => import("./AnimatedGlobe"), { ssr: false });

export function HeroGlobe() {
  return <AnimatedGlobe />;
}
