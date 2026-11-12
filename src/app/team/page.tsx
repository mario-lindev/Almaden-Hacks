import Image from "next/image";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import styles from "./Team.module.css";

export const metadata: Metadata = {
  title: "Our Team | Almaden Hacks",
  description: "Meet the students organizing Almaden Hacks at Leland High School.",
};

type TeamMember = {
  name: string;
  role: string;
  href?: string;
};

type Team = {
  id: string;
  title: string;
  members: TeamMember[];
};

const teams: Team[] = [
  {
    id: "lead",
    title: "Lead Organizers",
    members: [
      {
        name: "Mario Lin",
        role: "Co-Founder, Lead Outreach and Lead Developer",
        href: "https://www.linkedin.com/in/mario-lin7/",
      },
      {
        name: "Rishith Chennupati",
        role: "Co-Founder, Lead Outreach and Lead Developer",
        href: "https://www.linkedin.com/in/rishith-chennupati-b4ba202a4/",
      },
      {
        name: "Varun Chilukuri",
        role: "Co-Founder, Lead Outreach",
        href: "https://www.linkedin.com/in/varunchilukuri26/",
      },
    ],
  },
  {
    id: "design-marketing",
    title: "Design & Marketing",
    members: [
      { name: "Tristan Cadatal", role: "Outreach" },
      { name: "Moksh Shah", role: "Outreach" },
      { name: "Quincy Cadatal", role: "Outreach" },
      { name: "Pratheek Konduru", role: "Outreach" },
      { name: "Suhas Kudithpudi", role: "Outreach" },
      { name: "Abhiram Gadikere", role: "Outreach" },
    ],
  },
  {
    id: "operations",
    title: "Operations",
    members: [
      {
        name: "Sanshray Chada",
        role: "Outreach and Helper",
        href: "https://www.linkedin.com/in/sanshraychada/",
      },
      {
        name: "Aaditya Shah",
        role: "Helper",
        href: "https://aadityashah.vercel.app/",
      },
      { name: "Ferris Chia", role: "Helper" },
      { name: "Gurvir Singh", role: "Helper" },
    ],
  },
  {
    id: "volunteers",
    title: "Volunteers",
    members: [
      {
        name: "Oliver Lin",
        role: "Hardware Compliance Manager @ Meta, Volunteer Judge (Hardware)",
        href: "https://www.linkedin.com/in/oliver-lin-41999a14/",
      },
      {
        name: "Varsha Chilukuri",
        role: "AI Engineer @ Observe.AI, Volunteer Judge (Software)",
        href: "https://www.linkedin.com/in/varshachilukuri/",
      },
    ],
  },
];

function MemberCard({ member }: { member: TeamMember }) {
  const details = (
    <span className={styles.details}>
      <span className={styles.name}>{member.name}</span>
      <span className={styles.role}>{member.role}</span>
    </span>
  );

  return member.href ? (
    <a className={styles.card} href={member.href} target="_blank" rel="noopener noreferrer">
      {details}
      <span aria-hidden="true">↗</span>
    </a>
  ) : (
    <div className={styles.card}>{details}</div>
  );
}

export default function TeamPage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav />
      <main id="main" className={styles.page}>
        <header className={styles.intro}>
          <div className={styles.introCopy}>
            <h1>Our Team</h1>
            <p>Meet the Leland High School students and volunteers behind Almaden Hacks.</p>
          </div>
          <div className={styles.landscape}>
            <Image
              src="/art/almaden-scene-soft-sky.webp"
              alt=""
              fill
              sizes="(max-width: 720px) 100vw, 55vw"
            />
          </div>
        </header>

        <div className={styles.teams}>
          {teams.map((team) => (
            <section className={styles.group} key={team.id} aria-labelledby={`team-${team.id}`}>
              <h2 id={`team-${team.id}`}>{team.title}</h2>
              <ul className={styles.grid}>
                {team.members.map((member) => (
                  <li key={member.name}>
                    <MemberCard member={member} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
