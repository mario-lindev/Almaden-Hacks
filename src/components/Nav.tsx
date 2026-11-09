"use client";

import { useEffect, useState } from "react";
import EventActions from "./EventActions";

const NAV_LINKS = [
  ["The experience", "about"],
  ["The day", "schedule"],
  ["Sponsors", "sponsors"],
  ["FAQ", "faq"],
] as const;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "nav is-scrolled" : "nav"}>
      <a href="#top" className="brand" aria-label="Almaden Hacks home">
        <span className="brand-wordmark">Almaden Hacks</span>
      </a>
      <button
        className="menu-button"
        aria-expanded={open}
        aria-controls="site-navigation"
        onClick={() => setOpen((wasOpen) => !wasOpen)}
      >
        {open ? "Close" : "Menu"}
      </button>
      <nav
        id="site-navigation"
        className={open ? "nav-links is-open" : "nav-links"}
        aria-label="Main navigation"
      >
        {NAV_LINKS.map(([label, id]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <EventActions className="nav-join" />
      </nav>
    </header>
  );
}
