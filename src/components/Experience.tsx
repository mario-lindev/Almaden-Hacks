"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Constellation, Donut, Gear } from "./AsciiScenes";
import EventActions from "./EventActions";
import styles from "./Experience.module.css";

const experiences = [
  { title: "Software", description: "Build an app, game, or website.", Art: Donut },
  { title: "Hardware", description: "Work on a physical project. Equipment details will be announced.", Art: Gear },
  { title: "Teams", description: "Meet teammates, trade ideas, and learn together.", Art: Constellation },
];

export default function Experience() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const { title, description, Art } = experiences[active];

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    switch (event.key) {
      case "ArrowRight": next = (index + 1) % experiences.length; break;
      case "ArrowLeft": next = (index + experiences.length - 1) % experiences.length; break;
      case "Home": next = 0; break;
      case "End": next = experiences.length - 1; break;
      default: return;
    }
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className={styles.experience}>
      <div className={styles.tabs} role="tablist" aria-label="Explore the experience">
        {experiences.map((experience, index) => (
          <button
            key={experience.title}
            ref={node => { tabs.current[index] = node; }}
            id={`${id}-tab-${index}`}
            className={styles.tab}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls={`${id}-panel`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={event => onKeyDown(event, index)}
          >
            {experience.title}
          </button>
        ))}
      </div>
      <div
        id={`${id}-panel`}
        className={styles.panel}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        tabIndex={0}
      >
        <div className={styles.copy}>
          <h3>{title}</h3>
          <p>{description}</p>
          <EventActions />
        </div>
        <div className={styles.art}><Art /></div>
      </div>
    </div>
  );
}
