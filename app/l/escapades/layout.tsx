import type { ReactNode } from "react";
import Link from "next/link";
import { Archivo } from "next/font/google";
import { CrButton } from "@cristal-ui/react/ssr";
import styles from "./escapades.module.css";

const display = Archivo({ weight: ["500", "700", "800"], subsets: ["latin"], variable: "--font-display" });

// Night theme whatever the site theme: the landscapes carry all the color, orange marks the booking.
export default function EscapesLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${styles.page} cr-theme-dark ${display.variable}`} lang="fr">
      <header className={styles.bar}>
        <Link href="/l/escapades" className={styles.logo}>
          Horizons
        </Link>
        <nav aria-label="Navigation principale" className={styles.nav}>
          <Link href="/l/escapades">Destinations</Link>
          <Link href="/l/escapades#types">Types de voyage</Link>
          <Link href="/l/escapades#inspiration">S&apos;inspirer</Link>
          <Link href="/l/escapades/offres">Offres spéciales</Link>
        </nav>
        <CrButton href="/l/escapades/reserver" size="s" className={styles.book}>
          Réserver
        </CrButton>
      </header>

      {children}

      <footer className={styles.footer}>
        <p>
          Horizons est une agence fictive créée pour landing-lab. Photos :{" "}
          <a href="https://unsplash.com/fr" target="_blank" rel="noopener noreferrer">
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
