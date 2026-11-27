import type { ReactNode } from "react";
import Link from "next/link";
import { Barlow_Condensed } from "next/font/google";
import { CrButton } from "@cristal-ui/react/ssr";
import styles from "./salle-de-sport.module.css";

const display = Barlow_Condensed({ weight: ["600", "700"], subsets: ["latin"], variable: "--font-display" });

// Night theme whatever the site theme: black and white photos, one acid green for actions.
export default function GymLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${styles.page} cr-theme-dark ${display.variable}`} lang="fr">
      <header className={styles.bar}>
        <Link href="/l/salle-de-sport" className={styles.logo}>
          Fonte
        </Link>
        <nav aria-label="Navigation principale" className={styles.nav}>
          <Link href="/l/salle-de-sport#disciplines">Disciplines</Link>
          <Link href="/l/salle-de-sport/planning">Planning</Link>
          <Link href="/l/salle-de-sport/abonnements">Abonnements</Link>
          <Link href="/l/salle-de-sport/coachs">Coachs</Link>
        </nav>
        <CrButton href="/l/salle-de-sport/essai" size="s" className={styles.cta}>
          Séance d&apos;essai gratuite
        </CrButton>
      </header>

      {children}

      <footer className={styles.footer}>
        <p>
          Fonte est une salle fictive créée pour landing-lab. Photos : Victor Freitas sur{" "}
          <a href="https://unsplash.com/fr/@victorfreitas" target="_blank" rel="noopener noreferrer">
            Unsplash
          </a>
          .
        </p>
        <CrButton href="/" variant="link">
          Toutes les landings
        </CrButton>
      </footer>
    </div>
  );
}
