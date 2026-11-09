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
      { name: "PCBWay", href: "https://www.pcbway.com", logo: "/marks/pcbway.svg", description: "50–60 PCBs, coupons for winners", layout: "wordmark" },
      { name: "iFixit", href: "https://www.ifixit.com", logo: "/marks/ifixit.svg", description: "Mako and Pro Tech toolkits for teams and prizes", layout: "wordmark" },
      { name: "Scrimba", href: "https://scrimba.com", logo: "/marks/scrimba.png", description: "One-year Pro subscriptions for winners" },
      { name: "Tumult", href: "https://tumult.com", logo: "/marks/tumult.gif", description: "Hype licenses for prizes", layout: "wordmark" },
      { name: "Hack Club", href: "https://hackclub.com", logo: "/marks/hackclub.svg", description: "Fiscal sponsorship through HCB" },
      { name: "n8n", href: "https://n8n.io", logo: "/marks/n8n.svg", description: "Confirmed sponsor", layout: "wordmark" },
      { name: "CodeCrafters", href: "https://codecrafters.io", logo: "/marks/codecrafters.svg", description: "VIP membership prizes" },
      { name: "Interview Cake", href: "https://www.interviewcake.com", logo: "/marks/interviewcake.png", description: "Up to 50 seven-day course licenses" },
    ],
  },
  {
    title: "Bronze",
    backers: [
      { name: "Los Gatos Meats & Smokehouse", href: "https://www.losgatosmeats.com", logo: "/marks/losgatos.png", description: "Sandwich catering and lunch support under discussion", pending: true },
      { name: "TOGO’S", href: "https://togos.com", logo: "/marks/togos.png", description: "Sandwich catering inquiry; referred to a local owner", pending: true },
      { name: "In-N-Out Burger", href: "https://www.in-n-out.com", logo: "/marks/innout.svg", description: "Fundraising bundles inquiry; application requested", pending: true },
      { name: "Doorstop Education", href: "https://doorstopeducation.org", logo: "/marks/doorstop.svg", description: "Partnership under discussion", pending: true },
      { name: "SunFounder", href: "https://www.sunfounder.com", logo: "/marks/sunfounder.png", description: "10% attendee discount on most products with code LOYAL10" },
      { name: "Rosebud AI", href: "https://rosebud.ai", logo: "/marks/rosebud.png", description: "Participant or prize credits" },
      { name: "InterviewBuddy", href: "https://interviewbuddy.net", logo: "/marks/interviewbuddy.svg", description: "Interview practice credits and discounts", layout: "wordmark" },
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
