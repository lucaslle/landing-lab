import type { CSSProperties } from "react";
import Link from "next/link";
import { Instrument_Serif } from "next/font/google";
import { CrCard, CrEmptyState, CrKbd, CrThemeToggle } from "@cristal-ui/react/ssr";
import { LandingPreview } from "./LandingPreview";
import { LandingSearch } from "./LandingSearch";
import { landings } from "./landings";
import styles from "./page.module.css";

const serif = Instrument_Serif({ weight: "400", subsets: ["latin"], variable: "--font-serif" });

const statusLabel = { live: "En ligne", draft: "Brouillon" };
// The status only tells something when the landings differ.
const showStatus = new Set(landings.map((landing) => landing.status)).size > 1;

export default function Hub() {
  return (
    <div className={`${styles.page} ${serif.variable}`}>
      <header className={styles.bar}>
        <span className={styles.brand}>
          <span className={styles.loupe} aria-hidden="true" />
          landing-lab
        </span>
        <nav className={styles.actions} aria-label="Outils">
          <LandingSearch landings={landings} />
          <CrThemeToggle lang="fr" />
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.intro} aria-labelledby="titre">
          <div>
            <h1 id="titre" className={styles.title}>
              Mes landing pages
            </h1>
            <p className={styles.lead}>
              Les pages construites avec Cristal. Ouvrez-en une d&apos;un clic ou avec <CrKbd keys="Mod+K" />
            </p>
          </div>
          <p className={styles.count}>
            <strong>{landings.length}</strong> landing{landings.length > 1 ? "s" : ""}
          </p>
        </section>

        {landings.length === 0 ? (
          <CrEmptyState lang="fr" heading="Aucune landing pour l'instant" illustration="inbox">
            Créez app/l/&lt;slug&gt;/page.tsx, puis ajoutez-la dans app/landings.ts
          </CrEmptyState>
        ) : (
          <ul className={styles.grid}>
            {landings.map((landing, index) => (
              <li key={landing.slug} className={styles.tile} style={{ "--i": index } as CSSProperties}>
                <CrCard className={styles.card}>
                  <div slot="header">
                    <LandingPreview href={`/l/${landing.slug}`} title={landing.title} />
                  </div>
                  <div className={styles.info}>
                    <p className={styles.meta}>
                      <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                      /l/{landing.slug}
                      {showStatus && ` · ${statusLabel[landing.status]}`}
                    </p>
                    <h2 className={styles.name}>
                      <Link href={`/l/${landing.slug}`} className={styles.link}>
                        {landing.title}
                      </Link>
                    </h2>
                    <p className={styles.description}>{landing.description}</p>
                    {landing.pages && (
                      <nav aria-label={`Pages de ${landing.title}`} className={styles.pages}>
                        {landing.pages.map((page) => (
                          <Link key={page.href} href={page.href}>
                            {page.label}
                          </Link>
                        ))}
                      </nav>
                    )}
                  </div>
                </CrCard>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
