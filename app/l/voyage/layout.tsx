import type { ReactNode } from "react";
import Link from "next/link";
import { Caveat, Plus_Jakarta_Sans } from "next/font/google";
import { CrButton } from "@cristal-ui/react/ssr";
import styles from "./voyage.module.css";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });
const script = Caveat({ weight: ["600", "700"], subsets: ["latin"], variable: "--font-script" });

export default function TravelLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${styles.page} ${sans.variable} ${script.variable}`} lang="fr">
      <header className={styles.bar}>
        <Link href="/l/voyage" className={styles.logo}>
          <span aria-hidden="true">✈</span> Ailleurs
          <small>voyagez autrement</small>
        </Link>
        <nav aria-label="Navigation principale" className={styles.nav}>
          <Link href="/l/voyage/destinations">Destinations</Link>
          <Link href="/l/voyage/reservation">Réserver</Link>
          <Link href="/l/voyage#pourquoi">Pourquoi nous</Link>
        </nav>
        <div className={styles.help}>
          <span className={styles.muted}>Besoin d&apos;aide ?</span>
          <a href="tel:+33123456789">01 23 45 67 89</a>
        </div>
      </header>

      {children}

      <footer className={styles.footer}>
        <p>
          Ailleurs est une agence fictive créée pour landing-lab. Photos :{" "}
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
