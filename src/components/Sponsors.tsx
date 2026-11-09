import Image from "next/image";
import { SPONSOR_GROUPS, type Sponsor } from "@/lib/sponsors";
import styles from "./Sponsors.module.css";

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const featured = sponsor.layout === "featured";
  const descriptionId = `sponsor-${sponsor.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <a
      className={`${styles.tile}${featured ? ` ${styles.featured}` : ""}`}
      href={sponsor.href}
      target="_blank"
      rel="noreferrer"
      title={sponsor.description}
      aria-label={`Visit ${sponsor.name}`}
      aria-describedby={descriptionId}
    >
      <div className={`${styles.identity} ${sponsor.layout ? styles.wordmark : styles.icon}`}>
        <Image
          className={sponsor.name === "CodeCrafters" ? styles.darkMark : undefined}
          src={sponsor.logo}
          alt={sponsor.name}
          width={featured ? 800 : 256}
          height={featured ? 800 : 256}
        />
        {!sponsor.layout && <span aria-hidden="true">{sponsor.name}</span>}
      </div>
      <span id={descriptionId} className={styles.visuallyHidden}>
        {sponsor.description}{sponsor.pending ? ". Pending confirmation." : ""}
      </span>
      {sponsor.pending && <span className={styles.pending}>Pending</span>}
    </a>
  );
}

export default function Sponsors() {
  return (
    <div className={styles.tiers}>
      <p className={styles.note}>Pending offers still need final confirmation.</p>
      {SPONSOR_GROUPS.map((group) => (
        <section className={styles.tier} aria-label={group.title} key={group.title}>
          <h3 className={styles.tierTitle}>{group.title}</h3>
          <ul className={styles.grid}>
            {group.backers.map((sponsor) => (
              <li key={sponsor.name}><SponsorCard sponsor={sponsor} /></li>
            ))}
          </ul>
        </section>
      ))}
      <div className={styles.invite}>
        <p>Interested in sponsoring?</p>
        <a href="https://hcb.hackclub.com/almaden-hacks" target="_blank" rel="noreferrer">
          Support Almaden Hacks <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
