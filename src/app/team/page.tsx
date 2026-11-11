import type { Metadata } from "next";
import Nav from "@/components/Nav";
import styles from "./Team.module.css";

export const metadata: Metadata = {
  title: "Our Team | Almaden Hacks",
  description: "Meet the students organizing Almaden Hacks at Leland High School.",
};

const organizers = [
  { name: "Mario Lin", role: "Co-founder and lead organizer", href: "https://mariolin.com" },
  { name: "Rishith Chennupati", role: "Organizer", href: "https://rishithc.com" },
];

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

        <section aria-labelledby="organizers-title">
          <h2 id="organizers-title">Organizers</h2>
          <ul className={styles.grid}>
            {organizers.map((person) => (
              <li key={person.name}>
                <a className={styles.card} href={person.href}>
                  <span className={styles.details}>
                    <span className={styles.name}>{person.name}</span>
                    <span className={styles.role}>{person.role}</span>
                  </span>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
