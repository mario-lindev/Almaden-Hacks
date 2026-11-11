"use client";

import { useEffect, useRef, useState } from "react";
import { EVENT_LINKS } from "@/lib/event";
import EventActions from "./EventActions";
import styles from "./Nav.module.css";

const NAV_LINKS = [
  ["About", "about"],
  ["Sponsors", "sponsors"],
  ["FAQ", "faq"],
] as const;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButton.current?.focus();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className={styles.header} data-scrolled={scrolled}>
      <a href="#top" className={styles.brand} aria-label="Almaden Hacks home" onClick={() => setOpen(false)}>
        Almaden Hacks
      </a>
      <button
        ref={menuButton}
        type="button"
        className={styles.menuButton}
        aria-expanded={open}
        aria-controls="site-navigation"
        onClick={() => setOpen((wasOpen) => !wasOpen)}
      >
        {open ? "Close" : "Menu"}
        <span className={styles.menuIcon} aria-hidden="true">{open ? "×" : "☰"}</span>
      </button>
      <nav
        id="site-navigation"
        className={`${styles.links} ${open ? styles.open : ""}`}
        aria-label="Main navigation"
        onClick={() => setOpen(false)}
      >
        {NAV_LINKS.map(([label, id]) => (
          <a key={id} className={styles.link} href={`#${id}`}>{label}</a>
        ))}
        <a className={styles.link} href={EVENT_LINKS.discord} target="_blank" rel="noreferrer">Join Discord</a>
        <EventActions className={styles.register} />
      </nav>
    </header>
  );
}
