"use client";

import { useEffect, useState } from "react";
import AsciiCanvas, { type AsciiLayer } from "./AsciiCanvas";

/** Size and ground position are fractions of the canvas height; gait is cycles/s. */
type Plane = { color: string; alpha: number; size: number; y: number; gait: number; count: number; offset: number };

const HERDS: Record<"hero" | "closing", Plane[]> = {
  hero: [
    { color: "#101010", alpha: 1, size: 0.95, y: 0.96, gait: 1.8, count: 1, offset: 0.22 },
  ],
  closing: [
    { color: "#8fa8b5", alpha: 0.8, size: 0.55, y: 0.55, gait: 1.8, count: 1, offset: 0.3 },
    { color: "#2f557a", alpha: 1, size: 1.08, y: 1.02, gait: 2.0, count: 1, offset: 0.7 },
  ],
};

let sprite: Promise<HTMLImageElement> | null = null;
const loadSprite = () => (sprite ??= new Promise(resolve => {
  const image = new Image();
  image.onload = () => resolve(image);
  image.src = "/gallop-motion.webp";
}));

export default function Horses({ herd = "hero", animated = true }: { herd?: "hero" | "closing"; animated?: boolean }) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  useEffect(() => { loadSprite().then(setImage); }, []);
  const planes = HERDS[herd];

  if (!image) return <div className={`horse-art horse-art-${herd}`} />;

  const layers = (t: number, w: number, h: number): AsciiLayer[] => planes.map((plane, p) => ({
    color: plane.color,
    alpha: plane.alpha,
    draw: s => {
      const fw = image.width / 8, fh = image.height / 8;
      const size = Math.min(h * plane.size, w * 0.95);
      const loop = w + size * 1.4;
      for (let n = 0; n < plane.count; n++) {
        const gait = plane.gait * (1 + n * 0.035);
        const cycle = t * gait + p * 0.31 + n * 0.43;
        const step = Math.floor(cycle * 64) % 64;
        const speed = size * gait * 0.65;
        const x = herd === "hero" ? (w - size) / 2 : ((plane.offset + n / plane.count) * loop + t * speed) % loop - size * 1.2;
        const ground = h * plane.y;
        s.filter = "contrast(1.8)";
        s.drawImage(image, (step % 8) * fw, Math.floor(step / 8) * fh, fw, fh, x, ground - size, size, size);
        s.filter = "none";
      }
    },
  }));

  return <div className={`horse-art horse-art-${herd}`}>
    <AsciiCanvas
      label={herd === "hero" ? "Almaden Hacks ASCII horse mascot" : "Horses galloping toward the finish in ASCII"}
      layers={layers}
      cell={w => (w < 600 ? 2.5 : w > 1900 ? 4 : 3)}
      fps={60}
      animate={animated}
      still={0.15}
    />
  </div>;
}
