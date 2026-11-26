import type { CSSProperties } from "react";
import { CrBackground, CrBadge, CrCard, CrEmptyState, CrThemeToggle } from "@cristal-ui/react/ssr";
import { LandingSearch } from "./LandingSearch";
import { landings } from "./landings";
import Link from "next/link";
import styles from "./page.module.css";

const status = {
  live: { label: "En ligne", variant: "success" },
  draft: { label: "Brouillon", variant: "neutral" },
} as const;

export default function Hub() {
  return (
    <CrBackground variant="aurora" lang="fr" className={styles.page}>
      <header className={styles.bar}>
        <span className={styles.brand}>landing-lab</span>
        <nav className={styles.actions} aria-label="Outils">
          <LandingSearch landings={landings} />
          <CrThemeToggle lang="fr" />
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <CrBadge variant="primary" count={landings.length}>
            Landings
          </CrBadge>
          <h1 className={styles.title}>Mes landing pages</h1>
          <p className={styles.lead}>Toutes les pages du labo, à un clic ou à un raccourci clavier.</p>
        </section>

        {landings.length === 0 ? (
          <CrEmptyState lang="fr" heading="Aucune landing pour l'instant" illustration="inbox">
            Créez app/l/&lt;slug&gt;/page.tsx, puis ajoutez-la dans app/landings.ts.
          </CrEmptyState>
        ) : (
          <ul className={styles.grid}>
            {landings.map((landing, index) => (
              <li
                key={landing.slug}
                className={styles.tile}
                style={{ "--hue": landing.hue, "--i": index } as CSSProperties}
              >
                <CrCard className={styles.card}>
                  <div slot="header" className={styles.preview} aria-hidden="true">
                    {landing.title.charAt(0)}
                  </div>
                  <div className={styles.body}>
                    <h2 className={styles.name}>
                      <Link href={`/l/${landing.slug}`} className={styles.link}>
                        {landing.title}
                      </Link>
                    </h2>
                    <CrBadge variant={status[landing.status].variant}>{status[landing.status].label}</CrBadge>
                  </div>
                  <p className={styles.description}>{landing.description}</p>
                </CrCard>
              </li>
            ))}
          </ul>
        )}
      </main>
    </CrBackground>
  );
}
