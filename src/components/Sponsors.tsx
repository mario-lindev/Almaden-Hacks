import Image from "next/image";

type Backer = { name: string; href: string; logo: string; description: string; layout?: "featured" | "wordmark"; pending?: boolean };

const groups: { title: string; backers: Backer[] }[] = [
  {
    title: "Gold",
    backers: [
      { name: "YRI Fellowship", href: "https://www.yriscience.com/?ref=ALMADENHACKS", logo: "/marks/yri.png", description: "Research fellowship support", layout: "featured" },
      { name: "ElevenLabs", href: "https://elevenlabs.io", logo: "/marks/elevenlabs.svg", description: "One free month of Creator for every participant, plus Pro and Scale plans for winners", layout: "wordmark" },
    ],
  },
  {
    title: "Silver",
    backers: [
      { name: "Scrimba", href: "https://scrimba.com", logo: "/marks/scrimba.png", description: "One-year Pro subscriptions for winners" },
      { name: "Tumult", href: "https://tumult.com", logo: "/marks/tumult.gif", description: "Hype licenses for prizes", layout: "wordmark" },
      { name: "Hack Club", href: "https://hackclub.com", logo: "/marks/hackclub.svg", description: "Fiscal sponsorship through HCB" },
      { name: "n8n", href: "https://n8n.io", logo: "/marks/n8n.svg", description: "Confirmed sponsor", layout: "wordmark" },
      { name: "CodeCrafters", href: "https://codecrafters.io", logo: "/marks/codecrafters.svg", description: "VIP membership prize offer", pending: true },
      { name: "Interview Cake", href: "https://www.interviewcake.com", logo: "/marks/interviewcake.png", description: "Up to 50 seven-day course licenses offered", pending: true },
    ],
  },
  {
    title: "Bronze",
    backers: [
      { name: "Browserbase", href: "https://www.browserbase.com", logo: "/marks/browserbase.svg", description: "Three-month Developer plan coupon offered. Payment card required." },
      { name: "iFixit", href: "https://www.ifixit.com", logo: "/marks/ifixit.svg", description: "Tool kits and prizes under discussion", layout: "wordmark", pending: true },
      { name: "Rosebud AI", href: "https://rosebud.ai", logo: "/marks/rosebud.png", description: "Participant or prize credits offered", pending: true },
      { name: "InterviewBuddy", href: "https://interviewbuddy.net", logo: "/marks/interviewbuddy.svg", description: "Interview practice credits and discounts offered", layout: "wordmark", pending: true },
      { name: "AoPS", href: "https://artofproblemsolving.com", logo: "/marks/aops.svg", description: "Product coupons under consideration", layout: "wordmark", pending: true },
      { name: ".xyz", href: "https://gen.xyz", logo: "/marks/xyz.svg", description: "Domain support subject to application approval", pending: true },
      { name: "Adobe", href: "https://www.adobe.com", logo: "/marks/adobe.svg", description: "Support under discussion", layout: "wordmark", pending: true },
      { name: "CodeRabbit", href: "https://www.coderabbit.ai", logo: "/marks/coderabbit.svg", description: "Support under discussion", layout: "wordmark", pending: true },
      { name: "Firecrawl", href: "https://www.firecrawl.dev", logo: "/marks/firecrawl.svg", description: "Support under discussion", layout: "wordmark", pending: true },
      { name: "Major League Hacking", href: "https://www.mlh.com", logo: "/marks/mlh.svg", description: "Support under discussion", layout: "wordmark", pending: true },
      { name: "NordPass", href: "https://nordpass.com", logo: "/marks/nordpass.svg", description: "Support under discussion", pending: true },
      { name: "Retell AI", href: "https://www.retellai.com", logo: "/marks/retell.svg", description: "Support under discussion", layout: "wordmark", pending: true },
      { name: "Speak", href: "https://www.speak.com", logo: "/marks/speak.svg", description: "Support under discussion", layout: "wordmark", pending: true },
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
              <Image className={backer.name === "CodeCrafters" ? "backer-mark-dark" : undefined} src={backer.logo} alt={backer.name} loading="eager" width={backer.layout === "featured" ? 800 : 256} height={backer.layout === "featured" ? 800 : 256} />
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
