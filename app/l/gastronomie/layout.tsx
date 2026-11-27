import type { ReactNode } from "react";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { CrButton } from "@cristal-ui/react/ssr";
import styles from "./gastronomie.module.css";

const display = Cormorant_Garamond({ weight: ["500", "600"], style: ["normal", "italic"], subsets: ["latin"], variable: "--font-display" });

// Light theme whatever the site theme (cr-theme): linen paper, slate ink and one wine red for booking.
export default function GastronomyLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${styles.page} cr-theme ${display.variable}`} lang="fr">
      <header className={styles.bar}>
        <Link href="/l/gastronomie" className={styles.logo}>
          Ardoise
        </Link>
        <nav aria-label="Navigation principale" className={styles.nav}>
          <Link href="/l/gastronomie/menus">Menus</Link>
          <Link href="/l/gastronomie/cave">La cave</Link>
          <Link href="/l/gastronomie/maison">La maison</Link>
          <Link href="/l/gastronomie#infos">Infos pratiques</Link>
        </nav>
        <CrButton href="/l/gastronomie/reserver" size="s" className={styles.book}>
          Réserver une table
        </CrButton>
      </header>

      {children}

      <footer className={styles.footer}>
        <p>
          Ardoise est un restaurant fictif créé pour landing-lab. Photos :{" "}
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
