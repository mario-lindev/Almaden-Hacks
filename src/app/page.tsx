import Mountains from "@/components/Mountains";
import Nav from "@/components/Nav";
import Horses from "@/components/Horses";
import EventActions from "@/components/EventActions";
import Reveal from "@/components/Reveal";
import Scramble from "@/components/Scramble";
import { AsciiText, Constellation, Donut, Gear } from "@/components/AsciiScenes";

const faqs = [
  ["New to hackathons?", "You’re welcome here. Build an app, game, website, or hardware project with other high school students. No experience needed."],
  ["When and where?", "We’re targeting May–June in Almaden Valley, San Jose. The date, venue, and full eligibility details will be announced before registration opens."],
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
          <p className="hero-description">A high school hackathon in San Jose. Build software. Make hardware. Try something new.</p>
          <div className="hero-actions"><EventActions /><a className="text-link" href="#about">Take a look around <span aria-hidden="true">↓</span></a></div>
          <p className="event-meta"><span className="status-dot" />Leland High School <span className="meta-divider">/</span> San Jose, CA <span className="meta-divider">/</span> May–June</p>
        </div>
        <div className="hero-landscape"><div className="landscape-sun" /><Mountains /><Horses /></div>
      </section>

      <section className="about section-wrap" id="about">
        <div className="about-grid">
          <Scramble lines={["Good things happen", "when curious people", "build together."]} />
          <div className="about-copy" data-reveal><p className="lead">Your idea. Your first build.</p><p>Meet other high school students and turn an idea into something real—software or hardware. All experience levels welcome.</p><a className="text-link" href="#community">Find your people <span aria-hidden="true">↗</span></a></div>
        </div>
        <div className="experience-grid" data-reveal="stagger">
          <article><div className="card-art"><Donut /></div><h3>Make something yours.</h3><p>Apps, games, websites. Build what makes you curious.</p></article>
          <article><div className="card-art"><Gear /></div><h3>Yes, hardware too.</h3><p>Go beyond the screen. Bring a hardware idea and make it move.</p></article>
          <article><div className="card-art"><Constellation /></div><h3>Leave with your people.</h3><p>Meet teammates, trade ideas, and learn together.</p></article>
        </div>
      </section>

      <section className="schedule" id="schedule">
        <div className="section-wrap schedule-grid">
          <div className="schedule-intro"><Scramble lines={["Come with an idea.", "Leave with a story."]} /><p className="schedule-note">Meet. Build. Share. Exact times coming soon.</p><EventActions className="button button-light" /></div>
          <ol className="timeline" data-reveal="stagger">{[["Meet & dream", "Meet your team and pick an idea."], ["Build & explore", "Build software or hardware. Test it. Make it better."], ["Show & celebrate", "Demo your project and see what everyone made."]].map(([title, text], i) => <li key={title}><span className="timeline-number">0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
        </div>
      </section>

      <section className="community section-wrap" id="community">
        <Scramble lines={["The best part?", "The people."]} />
        <div className="community-copy" data-reveal><p>Meet future teammates and catch event announcements on Discord.</p><EventActions kind="discord" /><span className="availability">Community invite coming soon</span></div>
      </section>

      <section className="sponsors section-wrap" id="sponsors">
        <div className="sponsor-heading"><Scramble lines={["A little support.", "A whole lot of possibility."]} /><p data-reveal>Help the next generation of builders get started.</p></div>
        <div className="sponsor-board" data-reveal><div className="sponsor-callout"><h3>Your support belongs here.</h3><p>Become a founding sponsor of Almaden Hacks.</p><a className="button" href="https://hcb.hackclub.com/almaden-hacks" target="_blank" rel="noreferrer">Support Almaden Hacks <span aria-hidden="true">↗</span></a></div><div className="sponsor-side"><p>Fuel the day.</p><p>Share your experience.</p><p>Back a new generation.</p><small>Sponsor announcements coming soon.</small></div></div>
      </section>

      <section className="faq section-wrap" id="faq">
        <div className="faq-intro"><Scramble lines={["Good questions."]} /><p data-reveal>First hackathon?<br />You’re in good company.</p><div className="faq-mark"><AsciiText text="?" color="#2d4faa" lens="#c4622d" sway /></div></div>
        <div className="faq-list" data-reveal>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
      </section>

    </main>
    <footer className="footer">
      <a href="#top" className="footer-wordmark" aria-label="Almaden Hacks, back to top"><AsciiText text="Almaden Hacks" color="#dfe8df" lens="#f0c987" /></a>
      <div className="footer-top"><div><a href="#about">About</a><a href="#schedule">The day</a><a href="#sponsors">Sponsorship</a><a href="#faq">FAQ</a></div><a href="#top" className="back-top">Back to top ↑</a></div>
      <div className="footer-bottom"><span>Built with a little wild ambition in Almaden. Presented by Leland High School.</span><a href="https://hcb.hackclub.com/almaden-hacks" target="_blank" rel="noreferrer">Fiscally sponsored by HCB</a></div>
      <div className="design-credit"><span>Website designed by <a href="https://mariolin.com" target="_blank" rel="noreferrer">Mario Lin</a> and <a href="https://rishithc.com" target="_blank" rel="noreferrer">Rishith Chennupati</a></span><a href="https://github.com/rishith-c" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/rishith-chennupati-b4ba202a4/" target="_blank" rel="noreferrer">LinkedIn</a></div>
    </footer>
  </>;
}
