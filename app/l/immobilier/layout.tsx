import type { ReactNode } from "react";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { CrButton } from "@cristal-ui/react/ssr";
import styles from "./immobilier.module.css";

const serif = Cormorant_Garamond({ weight: ["500", "600"], subsets: ["latin"], variable: "--font-display" });

// Night theme whatever the site theme: the photos are dusk shots and the gold reads best on navy.
export default function RealEstateLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${styles.page} cr-theme-dark ${serif.variable}`} lang="fr">
      <header className={styles.bar}>
        <Link href="/l/immobilier" className={styles.logo}>
          <span className={styles.mark} aria-hidden="true">
            H
          </span>
          <span>
            Haven
            <small>Immobilier</small>
          </span>
        </Link>
        <nav aria-label="Navigation principale" className={styles.nav}>
          <Link href="/l/immobilier/biens">Nos biens</Link>
          <Link href="/l/immobilier/biens?offre=vente">Acheter</Link>
          <Link href="/l/immobilier/biens?offre=location">Louer</Link>
          <Link href="/l/immobilier/vendre">Vendre</Link>
          <Link href="/l/immobilier/agence">L&apos;agence</Link>
          <Link href="/l/immobilier/conseils">Conseils</Link>
        </nav>
        <CrButton href="/l/immobilier/rendez-vous" size="s" className={styles.barButton}>
          Prendre rendez-vous
        </CrButton>
      </header>

      {children}

      <footer className={styles.footer}>
        <p>
          Haven est une agence fictive créée pour landing-lab. Photos :{" "}
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
