import type { ReactNode } from "react";
import Link from "next/link";
import { Kaushan_Script, Poppins } from "next/font/google";
import { CrButton } from "@cristal-ui/react/ssr";
import { CartButton, CartToaster } from "./Cart";
import { Icon } from "./Icon";
import styles from "./fast-food.module.css";

const display = Poppins({ weight: ["600", "800"], subsets: ["latin"], variable: "--font-display" });
const script = Kaushan_Script({ weight: "400", subsets: ["latin"], variable: "--font-script" });

const promises = [
  { icon: "leaf", label: "Produits frais chaque matin" },
  { icon: "star", label: "Très bien noté par nos clients" },
  { icon: "scooter", label: "Livré en 30 minutes" },
  { icon: "lock", label: "Paiement sécurisé" },
] as const;

// Light theme whatever the site theme (cr-theme): cream paper, amber accent, the food photos carry the color.
export default function FastFoodLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${styles.page} cr-theme ${display.variable} ${script.variable}`} lang="fr">
      <header className={styles.bar}>
        <Link href="/l/fast-food" className={styles.logo}>
          Tasty Bites
          <small>Bon goût · Bonne humeur</small>
        </Link>
        <nav aria-label="Navigation principale" className={styles.nav}>
          <Link href="/l/fast-food">Accueil</Link>
          <Link href="/l/fast-food/carte">La carte</Link>
          <Link href="/l/fast-food/carte?categorie=burgers">Burgers</Link>
          <Link href="/l/fast-food/carte?categorie=pizzas">Pizzas</Link>
          <Link href="/l/fast-food#livraison">Livraison</Link>
        </nav>
        <div className={styles.actions}>
          <CartButton />
          <CrButton href="/l/fast-food/carte" size="s" className={styles.barButton}>
            Commander <Icon name="arrow" />
          </CrButton>
        </div>
      </header>

      {children}

      <footer className={styles.footer}>
        <ul className={styles.promises}>
          {promises.map((promise) => (
            <li key={promise.label}>
              <Icon name={promise.icon} className={styles.promiseIcon} />
              {promise.label}
            </li>
          ))}
        </ul>
        <div className={styles.footerBottom}>
          <p>
            Tasty Bites est un fast food fictif créé pour landing-lab. Photos :{" "}
            <a href="https://unsplash.com/fr" target="_blank" rel="noopener noreferrer">
              Unsplash
            </a>
            .
          </p>
          <CrButton href="/" variant="link">
            Toutes les landings
          </CrButton>
        </div>
      </footer>
      <CartToaster />
    </div>
  );
}
