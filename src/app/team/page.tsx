import type { Metadata } from "next";
import Nav from "@/components/Nav";
import styles from "./Team.module.css";

export const metadata: Metadata = {
  title: "Our Team | Almaden Hacks",
  description: "Meet the students organizing Almaden Hacks at Leland High School.",
};

type TeamMember = { name: string; role?: string; href?: string };

const teams: { id: string; title: string; members: TeamMember[] }[] = [
  {
    id: "lead",
    title: "Lead Organizer",
    members: [
      { name: "Mario Lin", href: "https://www.linkedin.com/in/mario-lin7/" },
      { name: "Rishith Chennupati", href: "https://www.linkedin.com/in/rishith-chennupati-b4ba202a4/" },
    ],
  },
  {
    id: "executive",
    title: "Executive",
    members: [{ name: "Varun Chilukuri", href: "https://www.linkedin.com/in/varunchilukuri26/" }],
  },
  {
    id: "design-marketing",
    title: "Design & Marketing",
    members: [
      { name: "Tristan Cadatal" },
      { name: "Moksh Shah" },
      { name: "Quincy Cadatal" },
    ],
  },
  {
    id: "operations",
    title: "Operations",
    members: [
      { name: "Sanshray Chada", href: "https://www.linkedin.com/in/sanshraychada/" },
      { name: "Aaditya Shah" },
      { name: "Ferris Chia" },
      { name: "Gurvir Singh" },
    ],
  },
  {
    id: "volunteers",
    title: "Volunteers",
    members: [{ name: "Oliver Lin", role: "Compliance Manager @ Meta", href: "https://www.linkedin.com/in/oliver-lin-41999a14/" }],
  },
];

function MemberCard({ member }: { member: TeamMember }) {
  const details = (
    <span className={styles.details}>
      <span className={styles.name}>{member.name}</span>
      {member.role && <span className={styles.role}>{member.role}</span>}
    </span>
  );

  return member.href ? (
    <a className={styles.card} href={member.href}>
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
      <main id="main" className={`section-wrap ${styles.page}`}>
        <header className={styles.intro}>
          <h1>Our Team</h1>
          <p>Meet the students organizing Almaden Hacks at Leland High School.</p>
        </header>

        <div className={styles.teams}>
          {teams.map((team) => (
            <section key={team.id} aria-labelledby={`team-${team.id}`}>
              <h2 id={`team-${team.id}`}>{team.title}</h2>
              <ul className={styles.grid}>
                {team.members.map((member) => (
                  <li key={member.name}><MemberCard member={member} /></li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
