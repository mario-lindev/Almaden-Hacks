"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "#%&*+=/\\<>?:;~-_";

/**
 * A heading that decodes out of random glyphs when it scrolls into view. The
 * real text holds the layout the whole time (transparent while the overlay
 * runs), so nothing shifts, and screen readers get the plain label.
 */
export default function Scramble({ lines, className }: { lines: string[]; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const live = Array.from(el.querySelectorAll<HTMLElement>(".scramble-live"));
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) return;
    let frame = 0;
    const run = () => {
      el.classList.add("is-armed");
      const start = performance.now();
      let lastGlyphUpdate = -Infinity;
      const total = lines.join("").length;
      const tick = (now: number) => {
        const t = now - start;
        // Fewer symbol changes, with the whole heading readable within 280ms.
        if (t - lastGlyphUpdate < 65 && t < 280) {
          frame = requestAnimationFrame(tick);
          return;
        }
        lastGlyphUpdate = t;
        let index = 0, done = true;
        live.forEach((node, l) => {
          node.textContent = Array.from(lines[l], ch => {
            const at = (index++ / total) * 180;
            if (ch === " " || t >= at + 100) return ch;
            done = false;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }).join("");
        });
        if (done) { el.classList.remove("is-armed"); live.forEach(node => (node.textContent = "")); return; }
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      run();
    }, { threshold: 0.2 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(frame); el.classList.remove("is-armed"); };
  }, [lines]);

  return <h2 ref={ref} className={`scramble ${className ?? ""}`} aria-label={lines.join(" ")}>
    {lines.map(line => <span key={line} className="scramble-line" aria-hidden="true"><span className="scramble-final">{line}</span><span className="scramble-live" /></span>)}
  </h2>;
}
