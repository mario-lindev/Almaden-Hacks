import Image from "next/image";

type Backer = { name: string; href: string; logo: string; description: string; layout?: "featured" | "wordmark"; pending?: boolean };

const groups: { title: string; backers: Backer[] }[] = [
  {
    title: "Gold",
    backers: [
      { name: "YRI Fellowship", href: "https://www.yriscience.com/?ref=ALMADENHACKS", logo: "/sponsors/yri.png", description: "Research fellowship support", layout: "featured" },
    ],
  },
  {
    title: "Silver",
    backers: [
      { name: "Scrimba", href: "https://scrimba.com", logo: "/sponsors/scrimba.png", description: "One-year Pro subscriptions for winners" },
      { name: "Tumult", href: "https://tumult.com", logo: "/sponsors/tumult.gif", description: "Hype licenses for prizes", layout: "wordmark" },
      { name: "CodeCrafters", href: "https://codecrafters.io", logo: "/sponsors/codecrafters.svg", description: "VIP membership prize offer", pending: true },
      { name: "Interview Cake", href: "https://www.interviewcake.com", logo: "/sponsors/interviewcake.png", description: "Up to 50 seven-day course licenses offered", pending: true },
    ],
  },
  {
    title: "Bronze",
    backers: [
      { name: "Rosebud AI", href: "https://rosebud.ai", logo: "/sponsors/rosebud.png", description: "Participant or prize credits offered", pending: true },
      { name: "InterviewBuddy", href: "https://interviewbuddy.net", logo: "/sponsors/interviewbuddy.svg", description: "Interview practice credits and discounts offered", layout: "wordmark", pending: true },
      { name: "AoPS", href: "https://artofproblemsolving.com", logo: "/sponsors/aops.svg", description: "Product coupons under consideration", pending: true },
      { name: ".xyz", href: "https://gen.xyz", logo: "/sponsors/xyz.svg", description: "Domain support subject to application approval", pending: true },
    ],
  },

];

export default function Sponsors() {
  return <div className="backer-tiers">
    <p className="backer-note">Pending offers still need final confirmation.</p>
    {groups.map(group => <section className="backer-tier" aria-label={group.title} key={group.title}>
      <h3 className="backer-tier-title">{group.title}</h3>
      <ul className="backer-grid">
        {group.backers.map(backer => <li key={backer.name}>
          <a className={`backer-card${backer.layout === "featured" ? " backer-card-featured" : ""}`} href={backer.href} target="_blank" rel="noreferrer" aria-label={`Visit ${backer.name}`}>
            <div className={`backer-identity backer-identity-${backer.layout ?? "icon"}`}>
              <Image className={backer.name === "CodeCrafters" ? "backer-mark-dark" : undefined} src={backer.logo} alt={backer.name} width={backer.layout === "featured" ? 800 : 256} height={backer.layout === "featured" ? 800 : 256} />
              {!backer.layout && <span aria-hidden="true">{backer.name}</span>}
            </div>
            <span className="backer-description">{backer.description}<span aria-hidden="true">↗</span></span>
            {backer.pending && <span className="backer-status">Pending confirmation</span>}
          </a>
        </li>)}
      </ul>
    </section>)}
    <div className="backer-invite"><p>Interested in sponsoring?</p><a className="text-link" href="https://hcb.hackclub.com/almaden-hacks" target="_blank" rel="noreferrer">Support Almaden Hacks <span aria-hidden="true">↗</span></a></div>
  </div>;
}
