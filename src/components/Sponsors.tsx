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
        {sponsor.description}
      </span>
    </a>
  );
}

function SponsorCycle({ sponsors }: { sponsors: Sponsor[] }) {
  const rows = [
    sponsors.filter((_, index) => index % 2 === 0),
    sponsors.filter((_, index) => index % 2 === 1),
  ].filter((row) => row.length > 0);

  return (
    <div className={styles.cycle}>
      <input className={styles.cyclePause} id="sponsor-cycle-pause" type="checkbox" />
      <label htmlFor="sponsor-cycle-pause">Pause logo animation</label>
      <div className={styles.cycleWindow} aria-hidden="true">
        {rows.map((row, index) => (
          <div className={styles.cycleTrack} key={index}>
            {[0, 1, 2].map((copy) => (
              <div className={styles.cycleGroup} key={copy}>
                {row.map((sponsor) => (
                  <div
                    className={styles.cycleMark}
                    data-dark={sponsor.layout === "featured" || sponsor.name === "Scrimba"}
                    key={sponsor.name}
                  >
                    <Image
                      className={sponsor.name === "CodeCrafters" ? styles.darkMark : undefined}
                      src={sponsor.logo}
                      alt=""
                      width={128}
                      height={40}
                      loading="eager"
                    />
                    {!sponsor.layout && <span>{sponsor.name}</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Sponsors() {
  const confirmedGroups = SPONSOR_GROUPS.map((group) => ({
    ...group,
    backers: group.backers.filter((sponsor) => !sponsor.pending),
  })).filter((group) => group.backers.length > 0);

  const sponsors = confirmedGroups.flatMap((group) => group.backers);

  return (
    <div className={styles.tiers}>
      {sponsors.length > 0 && <SponsorCycle sponsors={sponsors} />}
      {confirmedGroups.map((group) => (
        <section className={styles.tier} data-tier={group.title} aria-label={group.title} key={group.title}>
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
