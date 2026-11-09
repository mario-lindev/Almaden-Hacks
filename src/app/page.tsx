import Clock from "@/components/Clock";
import Mountains from "@/components/Mountains";
import Nav from "@/components/Nav";
import Horses from "@/components/Horses";
import EventActions from "@/components/EventActions";
import Reveal from "@/components/Reveal";
import Sponsors from "@/components/Sponsors";
import { Constellation, Donut, Gear } from "@/components/AsciiScenes";

const faqs = [
  ["New to hackathons?", "You’re welcome here. Build an app, game, website, or hardware project with other high school students. No experience needed."],
  ["When and where?", "June 5, 2027, starting at 8:00 AM Pacific in Almaden Valley, San Jose. The venue and full eligibility details are coming soon."],
  ["Do I need a team?", "Come with friends or meet teammates at the event. Bring a laptop and charger; team details and a packing list will follow."],
  ["Will there be hardware?", "Yes! Hardware will be part of Almaden Hacks, alongside software projects. Details on available equipment and materials are coming soon."],
  ["Can I help or sponsor?", "Yes. Support the event through our HCB page. Mentor and sponsorship details are coming soon."],
];
export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a><Nav /><Reveal />
    <main id="main">
      <section className="hero" id="top">
        <div className="hero-copy">
          <h1>Almaden Hacks</h1>
          <p className="hero-description">A high school hackathon for software and hardware projects in San Jose.</p>
          <div className="hero-actions"><EventActions /><a className="text-link" href="#about">About the event <span aria-hidden="true">↓</span></a></div>
        </div>
        <Clock />
        <div className="hero-landscape"><Mountains /><Horses /></div>
      </section>

      <section className="about section-wrap" id="about">
        <div className="about-grid">
          <h2>Almaden Hacks</h2>
          <div className="about-copy" data-reveal><p className="lead">Software, hardware, and students who build.</p><p>Meet other high school students and build a software or hardware project. All experience levels welcome.</p><a className="text-link" href="#community">Join the Discord <span aria-hidden="true">↗</span></a></div>
        </div>
        <div className="experience-grid" data-reveal="stagger">
          <article><div className="card-art"><Donut /></div><h3>Software</h3><p>Build an app, game, or website.</p></article>
          <article><div className="card-art"><Gear /></div><h3>Hardware</h3><p>Work on a physical project. Equipment details will be announced.</p></article>
          <article><div className="card-art"><Constellation /></div><h3>Teams</h3><p>Meet teammates, trade ideas, and learn together.</p></article>
        </div>
      </section>

      <section className="schedule" id="schedule">
        <div className="section-wrap schedule-grid">
          <div className="schedule-intro"><h2>The schedule</h2><p className="schedule-note">Saturday, June 5, 2027. We start at 8:00 AM Pacific. The full schedule will be announced on Luma.</p><EventActions className="button button-light" /></div>
          <ol className="timeline" data-reveal="stagger">{[["Team formation", "Meet your team and pick an idea."], ["Project time", "Build software or hardware. Test it. Make it better."], ["Demos", "Demo your project and see what everyone made."]].map(([title, text]) => <li key={title}><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
        </div>
      </section>

      <section className="community section-wrap" id="community">
        <h2>Discord</h2>
        <div className="community-copy" data-reveal><p>Meet future teammates and catch event announcements on Discord.</p><EventActions kind="discord" /></div>
      </section>

      <section className="sponsors section-wrap" id="sponsors">
        <div className="sponsor-heading"><h2>Sponsors</h2><p data-reveal>Prizes, tools, and support for Almaden Hacks.</p></div>
        <Sponsors />
      </section>

      <section className="faq section-wrap" id="faq">
        <div className="faq-intro"><h2>FAQ</h2></div>
        <div className="faq-list" data-reveal>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
      </section>

    </main>
    <footer className="footer">
      <a href="#top" className="footer-wordmark" aria-label="Almaden Hacks, back to top">Almaden Hacks</a>
      <div className="footer-top"><div><a href="#about">About</a><a href="#schedule">The day</a><a href="#sponsors">Sponsorship</a><a href="#faq">FAQ</a></div><a href="#top" className="back-top">Back to top ↑</a></div>
      <div className="footer-bottom"><span>Organized by students at Leland High School.</span><a href="https://hcb.hackclub.com/almaden-hacks" target="_blank" rel="noreferrer">Fiscally sponsored by HCB</a></div>
      <div className="design-credit"><span>Website designed by <a href="https://mariolin.com" target="_blank" rel="noreferrer">Mario Lin</a> and <a href="https://rishithc.com" target="_blank" rel="noreferrer">Rishith Chennupati</a></span><a href="https://github.com/rishith-c" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/rishith-chennupati-b4ba202a4/" target="_blank" rel="noreferrer">LinkedIn</a></div>
    </footer>
  </>;
}
