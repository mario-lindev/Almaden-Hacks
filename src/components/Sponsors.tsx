import Image from "next/image";
import { SPONSOR_GROUPS, type Sponsor } from "@/lib/sponsors";

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const featured = sponsor.layout === "featured";
  const imageSize = featured ? 800 : 256;

  return (
    <a
      className={`backer-card${featured ? " backer-card-featured" : ""}`}
      title={sponsor.description}
      href={sponsor.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Visit ${sponsor.name}`}
    >
      <div className={`backer-identity backer-identity-${sponsor.layout ?? "icon"}`}>
        <Image
          className={sponsor.name === "CodeCrafters" ? "backer-mark-dark" : undefined}
          src={sponsor.logo}
          alt={sponsor.name}
          loading="eager"
          width={imageSize}
          height={imageSize}
        />
        {!sponsor.layout && <span aria-hidden="true">{sponsor.name}</span>}
      </div>
      <span className="sr-only">
        {sponsor.description}<span aria-hidden="true">↗</span>
      </span>
      {sponsor.pending && <span className="backer-status">Pending confirmation</span>}
    </a>
  );
}

export default function Sponsors() {
  return (
    <div className="backer-tiers">
      <p className="backer-note">Pending offers still need final confirmation.</p>
      {SPONSOR_GROUPS.map((group) => (
        <section className="backer-tier" aria-label={group.title} key={group.title}>
          <h3 className="backer-tier-title">{group.title}</h3>
          <ul className="backer-grid">
            {group.backers.map((sponsor) => (
              <li key={sponsor.name}>
                <SponsorCard sponsor={sponsor} />
              </li>
            ))}
          </ul>
        </section>
      ))}
      <div className="backer-invite">
        <p>Interested in sponsoring?</p>
        <a
          className="text-link"
          href="https://hcb.hackclub.com/almaden-hacks"
          target="_blank"
          rel="noreferrer"
        >
          Support Almaden Hacks <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
