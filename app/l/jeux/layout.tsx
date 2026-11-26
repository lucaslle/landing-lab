import type { ReactNode } from "react";
import { Sora } from "next/font/google";
import { SideNav, TopBar } from "./Shell";
import { Social } from "./Social";
import { StoreToaster } from "./Store";
import styles from "./jeux.module.css";

const display = Sora({ weight: ["600", "700"], subsets: ["latin"], variable: "--font-display" });

// App shell of the store: navigation on the left, content in the middle, the community on the right.
// Night theme whatever the site theme.
export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${styles.page} cr-theme-dark ${display.variable}`} lang="fr">
      <div className={styles.app}>
        <SideNav />
        <div className={styles.center}>
          <TopBar />
          {children}
          <p className={styles.note}>
            Pulse est une boutique fictive créée pour landing-lab : jeux, studios et joueurs sont inventés. Visuels :{" "}
            <a href="https://unsplash.com/fr" target="_blank" rel="noopener noreferrer">
              Unsplash
            </a>
            .
          </p>
        </div>
        <Social />
      </div>
      <StoreToaster />
    </div>
  );
}
