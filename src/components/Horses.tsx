"use client";

import { useEffect, useState } from "react";
import AsciiCanvas, { type AsciiLayer } from "./AsciiCanvas";

/** Size and ground position are fractions of the canvas height; gait is cycles/s. */
type Plane = { color: string; alpha: number; size: number; y: number; gait: number; count: number; offset: number };

const HERDS: Record<"hero" | "closing", Plane[]> = {
  hero: [
    { color: "#8fa8b9", alpha: 0.65, size: 0.36, y: 0.45, gait: 1.15, count: 3, offset: 0.18 },
    { color: "#537799", alpha: 0.85, size: 0.54, y: 0.68, gait: 1.35, count: 2, offset: 0.46 },
    { color: "#244d87", alpha: 1, size: 0.76, y: 0.96, gait: 1.55, count: 2, offset: 0.14 },
  ],
  closing: [
    { color: "#8fa8b5", alpha: 0.8, size: 0.36, y: 0.45, gait: 1.15, count: 3, offset: 0.3 },
    { color: "#2f557a", alpha: 1, size: 0.76, y: 0.96, gait: 1.55, count: 2, offset: 0.7 },
  ],
};

let sprite: Promise<HTMLImageElement> | null = null;
const loadSprite = () => (sprite ??= new Promise(resolve => {
  const image = new Image();
  image.onload = () => resolve(image);
  image.src = "/gallop.jpg";
}));

export default function Horses({ herd = "hero" }: { herd?: "hero" | "closing" }) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  useEffect(() => { loadSprite().then(setImage); }, []);
  const planes = HERDS[herd];

  if (!image) return <div className={`horse-art horse-art-${herd}`} />;

  const layers = (t: number, w: number, h: number): AsciiLayer[] => planes.map((plane, p) => ({
    color: plane.color,
    alpha: plane.alpha,
    draw: s => {
      const fw = image.width / 4, fh = image.height / 2;
      const size = Math.min(h * plane.size, w * 0.74);
      const loop = w + size * 1.4;
      for (let n = 0; n < plane.count; n++) {
        const gait = plane.gait * (1 + n * 0.035);
        const cycle = t * gait + p * 0.31 + n * 0.43;
        const step = Math.floor(cycle * 8) % 8;
        const speed = size * gait * 0.42;
        const x = ((plane.offset + n / plane.count) * loop + t * speed) % loop - size * 1.2;
        const ground = h * plane.y;
        const bob = Math.sin(cycle * Math.PI * 2) * size * 0.008;

        // Dust drifts behind the hooves, thinning as each particle rises.
        for (let d = 0; d < 12; d++) {
          const age = (cycle * 1.7 + d / 12) % 1;
          s.fillStyle = `rgb(${Math.round(210 + age * 45)},${Math.round(210 + age * 45)},${Math.round(210 + age * 45)})`;
          s.beginPath();
          s.ellipse(x + size * (0.25 - age * 0.4), ground - size * (0.07 + age * 0.07), size * (0.008 + age * 0.015), size * 0.008, 0, 0, Math.PI * 2);
          s.fill();
        }
        s.drawImage(image, (step % 4) * fw, Math.floor(step / 4) * fh, fw, fh, x, ground - size + bob, size, size);
      }
    },
  }));

  return <div className={`horse-art horse-art-${herd}`}>
    <AsciiCanvas
      label={herd === "hero" ? "A herd of seven horses galloping across the foothills in animated blue ASCII" : "Horses galloping toward the finish in ASCII"}
      layers={layers}
      cell={w => (w < 600 ? 2.5 : w > 1900 ? 4 : 3)}
      fps={30}
    />
  </div>;
}
