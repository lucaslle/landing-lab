import type { ReactNode } from "react";
import Link from "next/link";
import { Barlow_Condensed } from "next/font/google";
import { CrButton } from "@cristal-ui/react/ssr";
import { CartButton, CartToaster } from "./Cart";
import styles from "./velo.module.css";

const display = Barlow_Condensed({ weight: ["500", "700"], subsets: ["latin"], variable: "--font-display" });

// Night theme whatever the site theme: studio photos on graphite, one green for actions.
export default function BikeLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${styles.page} cr-theme-dark ${display.variable}`} lang="fr">
      <header className={styles.bar}>
        <Link href="/l/velo" className={styles.logo}>
          kairn
        </Link>
        <nav aria-label="Navigation principale" className={styles.nav}>
          {["vortex", "strada", "sentier"].map((slug) => (
            <Link key={slug} href={`/l/velo/modeles/${slug}`}>
              {slug[0].toUpperCase() + slug.slice(1)}
            </Link>
          ))}
          <Link href="/l/velo#tailles">Tailles</Link>
        </nav>
        <CartButton />
      </header>

      {children}

      <footer className={styles.footer}>
        <p>
          Kairn est une marque fictive créée pour landing-lab. Photos :{" "}
          <a href="https://unsplash.com/fr" target="_blank" rel="noopener noreferrer">
            Unsplash
          </a>
          .
        </p>
        <CrButton href="/" variant="link">
          Toutes les landings
        </CrButton>
      </footer>
      <CartToaster />
    </div>
  );
}
