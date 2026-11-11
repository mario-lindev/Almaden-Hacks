"use client";

import { useEffect, useState } from "react";

// June in San Jose observes PDT (UTC−07:00). This instant is timezone-independent.
export const EVENT_START = Date.parse("2027-06-05T08:00:00-07:00");

export function countdownAt(now: number) {
  const seconds = Math.max(0, Math.floor((EVENT_START - now) / 1000));
  return [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24,
    Math.floor(seconds / 60) % 60, seconds % 60];
}

export default function Clock() {
  const [remaining, setRemaining] = useState<number[] | null>(null);
  useEffect(() => {
    const update = () => setRemaining(countdownAt(Date.now()));
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);
  const started = remaining?.every(value => value === 0);
  return <div className="countdown" role="group" aria-label="Countdown to June 5, 2027 at 8 AM Pacific">
    {started && <p className="countdown-status">The event has started.</p>}
    <div className="countdown-units" aria-live="off">
      {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => <div className="countdown-unit" key={label}>
        <span className="countdown-number">{remaining ? String(remaining[i]).padStart(2, "0") : "––"}</span>
        <span className="countdown-caption">{label}</span>
      </div>)}
    </div>
  </div>;
}
