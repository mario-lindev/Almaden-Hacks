import Image from "next/image";

const groups = [
  {
    title: "Partners",
    sponsors: [
      { name: "YRI Fellowship", href: "https://www.yriscience.com/?ref=ALMADENHACKS", logo: "/sponsors/yri.png", description: "Research fellowship support", featured: true },
    ],
  },
  {
    title: "Prize sponsors",
    sponsors: [
      { name: "Scrimba", href: "https://scrimba.com", logo: "/sponsors/scrimba.png", description: "One-year Pro subscriptions for winners", featured: false },
      { name: "Tumult", href: "https://tumult.com", logo: "/sponsors/tumult.gif", description: "Hype licenses for prizes", featured: false },
    ],
  },
  {
    title: "Developer perks",
    sponsors: [
      { name: "Browserbase", href: "https://www.browserbase.com", logo: "/sponsors/browserbase.svg", description: "Developer plan discount offer", featured: false },
    ],
  },
];

export default function Sponsors() {
  return <div className="sponsor-tiers">
    {groups.map(group => <section className="sponsor-tier" aria-label={group.title} key={group.title}>
      <h3 className="sponsor-tier-title">{group.title}</h3>
      <ul className="sponsor-logos">
        {group.sponsors.map(sponsor => <li key={sponsor.name}>
          <a className={`sponsor-link${sponsor.featured ? " sponsor-link-featured" : ""}`} href={sponsor.href} target="_blank" rel="noreferrer" aria-label={`Visit ${sponsor.name}`}>
            <div className={`sponsor-identity sponsor-identity-${sponsor.name === "Tumult" ? "tumult" : sponsor.featured ? "yri" : "icon"}`}>
              <Image src={sponsor.logo} alt={sponsor.name} width={sponsor.featured ? 800 : sponsor.name === "Tumult" ? 220 : 256} height={sponsor.featured ? 800 : sponsor.name === "Tumult" ? 88 : 256} />
              {!sponsor.featured && sponsor.name !== "Tumult" && <span aria-hidden="true">{sponsor.name}</span>}
            </div>
            <span className="sponsor-description">{sponsor.description}<span aria-hidden="true">↗</span></span>
          </a>
        </li>)}
      </ul>
      {group.title === "Developer perks" && <p className="sponsor-terms">Browserbase requires a payment card. Paid billing resumes after three months; usage overages may apply.</p>}
    </section>)}
    <div className="sponsor-invite"><p>Interested in sponsoring?</p><a className="text-link" href="https://hcb.hackclub.com/almaden-hacks" target="_blank" rel="noreferrer">Support Almaden Hacks <span aria-hidden="true">↗</span></a></div>
  </div>;
}
