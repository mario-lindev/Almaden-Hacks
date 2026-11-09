"use client";

import { useEffect, useRef } from "react";
import { HORSE_ROWS } from "./rearing-horse-data";

export default function RearingHorse() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, visible = false, previous = 0;
    const paint = (now: number) => {
      frame = 0;
      if (!visible || document.hidden) return;
      if (!preference.matches) frame = requestAnimationFrame(paint);
      if (now - previous < 40 && !preference.matches) return;
      previous = now;
      const w = canvas.clientWidth, h = canvas.clientHeight;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const cell = Math.min(w / 106, h / 130);
      const line = cell * 1.62;
      const ox = (w - 100 * cell) / 2, oy = (h - 76 * line) / 2;
      const t = preference.matches ? 0 : now / 1000;
      ctx.font = `${cell * 1.6}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textBaseline = "top";
      ctx.fillStyle = "#203d51";
      HORSE_ROWS.forEach((row, y) => {
        const upper = Math.max(0, 1 - y / 76);
        for (let x = 0; x < row.length; x++) {
          if (row[x] === " ") continue;
          // Keep the hooves planted while the chest breathes and forelegs flex.
          const foreleg = x < 38 && y > 24 && y < 46 ? Math.sin((y - 24) / 22 * Math.PI) : 0;
          const tail = x > 70 && y > 40 ? 1 : 0;
          const dx = Math.sin(t * 1.5) * upper * 2.2 + Math.sin(t * 1.8 + y * .08) * tail * 1.5;
          const dy = Math.sin(t * 1.5 + .6) * foreleg * 2.5 + Math.sin(t * 1.5) * upper * .7;
          ctx.fillText(row[x], ox + x * cell + dx, oy + y * line + dy);
        }
      });
    };
    const start = () => { cancelAnimationFrame(frame); previous = 0; if (visible && !document.hidden) frame = requestAnimationFrame(paint); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; start(); });
    observer.observe(canvas);
    const resize = new ResizeObserver(start); resize.observe(canvas);
    preference.addEventListener("change", start);
    document.addEventListener("visibilitychange", start);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); resize.disconnect(); preference.removeEventListener("change", start); document.removeEventListener("visibilitychange", start); };
  }, []);
  return <div className="rearing-horse"><canvas ref={ref} role="img" aria-label="A rearing ASCII horse, gently shifting its body and raised front legs" /></div>;
}
