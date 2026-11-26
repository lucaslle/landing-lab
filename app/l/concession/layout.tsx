import type { ReactNode } from "react";
import Link from "next/link";
import { Lexend_Exa } from "next/font/google";
import { CrButton } from "@cristal-ui/react/ssr";
import styles from "./concession.module.css";

const display = Lexend_Exa({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-display" });

const columns = [
  {
    title: "Acheter",
    links: [
      { label: "Tout le stock", href: "/l/concession/vehicules" },
      { label: "Véhicules neufs", href: "/l/concession/vehicules?etat=neuf" },
      { label: "Occasions", href: "/l/concession/vehicules?etat=occasion" },
      { label: "Réserver un essai", href: "/l/concession/essai" },
    ],
  },
  {
    title: "La maison",
    links: [
      { label: "À propos", href: "/l/concession#a-propos" },
      { label: "Le journal", href: "/l/concession/journal" },
      { label: "Toutes les landings", href: "/" },
    ],
  },
];

// Light page between a dark hero and a dark footer, whatever the site theme (cr-theme).
export default function DealerLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${styles.page} cr-theme ${display.variable}`} lang="fr">
      <header className={styles.bar}>
        <nav aria-label="Navigation principale" className={styles.nav}>
          <Link href="/l/concession#a-propos">À propos</Link>
          <Link href="/l/concession/vehicules">Véhicules</Link>
          <Link href="/l/concession/essai">Essai</Link>
          <Link href="/l/concession/journal">Journal</Link>
        </nav>
        <Link href="/l/concession" className={styles.logo}>
          renc
        </Link>
        <CrButton href="/l/concession/essai" size="s" className={styles.peach}>
          Réserver un essai
        </CrButton>
      </header>

      {children}

      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div>
            <p className={styles.footerLogo}>renc</p>
            <p>Concessionnaire de prestige</p>
            <p className={styles.footerMuted}>Avenue de la Grande-Armée, 75017 Paris</p>
          </div>
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className={styles.footerTitle}>{column.title}</p>
              {column.links.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}
          <div>
            <p className={styles.footerTitle}>Nous joindre</p>
            <p className={styles.footerMuted}>Du lundi au samedi, 9 h 30 à 19 h</p>
            <p className={styles.footerMuted}>Showroom et atelier sur rendez-vous</p>
          </div>
        </div>
        <p className={styles.footerNote}>
          Renc est un concessionnaire fictif créé pour landing-lab. Les marques citées appartiennent à leurs propriétaires.
          Photos :{" "}
          <a href="https://unsplash.com/fr" target="_blank" rel="noopener noreferrer">
            Unsplash
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
