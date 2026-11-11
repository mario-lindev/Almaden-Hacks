import Image from "next/image";
import Link from "next/link";
import Clock from "@/components/Clock";
import Nav from "@/components/Nav";
import EventActions from "@/components/EventActions";
import Sponsors from "@/components/Sponsors";
import Experience from "@/components/Experience";
import { EVENT_LINKS } from "@/lib/event";

const faqs = [
  ["New to hackathons?", "You’re welcome here. Build an app, game, website, or hardware project with other high school students. No experience needed."],
  ["When and where?", "June 12, 2027, starting at 8:00 AM Pacific in Almaden Valley, San Jose. The venue and full eligibility details are coming soon."],
  ["Do I need a team?", "Come with friends or meet teammates at the event. Bring a laptop and charger; team details and a packing list will follow."],
  ["Will there be hardware?", "Yes! Hardware will be part of Almaden Hacks, alongside software projects. Details on available equipment and materials are coming soon."],
  ["Can I help or sponsor?", "Yes. Support the event through our HCB page. Mentor and sponsorship details are coming soon."],
];
export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a><Nav />
    <main id="main">
      <section className="hero" id="top" aria-labelledby="hero-title">
        <picture className="hero-visual">
          <source media="(max-width: 800px)" srcSet="/art/almaden-mobile.webp" />
          <Image className="hero-backdrop" src="/art/almaden-scene-soft-sky.webp" alt="" fill priority sizes="100vw" />
        </picture>
        <div className="hero-copy">
          <div className="hero-title-lockup"><h1 id="hero-title" aria-label="Almaden Hacks">Almaden<br /><span className="hero-last-line">Hacks</span></h1></div>
          <p className="hero-description">A high school hackathon for software and hardware projects in San Jose.</p>
          <div className="hero-actions"><EventActions /><EventActions kind="discord" className="button button-secondary" /></div>
        </div>
      </section>

      <section className="event-bar section-wrap" aria-label="Event details">
        <div className="event-date"><time dateTime="2027-06-12T08:00:00-07:00">June 12, 2027</time><p>8:00 AM Pacific · Almaden Valley, San Jose</p></div>
        <Clock />
      </section>

      <section className="about section-wrap" id="about" aria-labelledby="about-title">
        <div className="about-grid">
          <h2 id="about-title">Software, hardware,<br />and students who build.</h2>
          <div className="about-copy"><p>Meet other high school students and build a software or hardware project. All experience levels welcome.</p><a className="text-link" href={EVENT_LINKS.discord} target="_blank" rel="noreferrer">Join the Discord <span aria-hidden="true">↗</span></a></div>
        </div>
        <Experience />
      </section>

      <section className="sponsors section-wrap" id="sponsors" aria-labelledby="sponsors-title">
        <div className="sponsor-heading"><h2 id="sponsors-title">Partners &amp; Sponsors</h2><p>Prizes, tools, and support for Almaden Hacks.</p></div>
        <Sponsors />
      </section>

      <section className="faq section-wrap" id="faq" aria-labelledby="faq-title">
        <div className="faq-intro"><h2 id="faq-title">A few things<br />to know.</h2></div>
        <div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
      </section>

    </main>
    <footer className="footer">
      <a href="#top" className="footer-wordmark" aria-label="Almaden Hacks, back to top">Almaden Hacks</a>
      <div className="footer-top"><div><a href="#about">About</a><a href="#sponsors">Sponsorship</a><a href="#faq">FAQ</a><Link href="/team">Our Team</Link></div><a href="#top" className="back-top">Back to top ↑</a></div>
      <div className="footer-bottom"><span>Organized by students at Leland High School.</span><a href="https://hcb.hackclub.com/almaden-hacks" target="_blank" rel="noreferrer">Fiscally sponsored by HCB</a></div>
      <div className="design-credit"><span>Website designed by <a href="https://mariolin.com" target="_blank" rel="noreferrer">Mario Lin</a> and <a href="https://rishithc.com" target="_blank" rel="noreferrer">Rishith Chennupati</a></span><a href="https://github.com/rishith-c" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/rishith-chennupati-b4ba202a4/" target="_blank" rel="noreferrer">LinkedIn</a></div>
    </footer>
  </>;
}
