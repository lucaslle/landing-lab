import { existsSync } from "node:fs";
import path from "node:path";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Barlow_Condensed } from "next/font/google";
import {
  CrAccordion,
  CrAccordionItem,
  CrAvatar,
  CrAvatarGroup,
  CrBackground,
  CrBadge,
  CrButton,
  CrCard,
} from "@cristal-ui/react/ssr";
import { classes, legends, slugOf } from "./legends";
import { LegendRoster } from "./LegendRoster";
import { Stats } from "./Stats";
import styles from "./apex.module.css";

export const metadata: Metadata = {
  title: "Apex Legends, toutes les légendes · landing-lab",
  description: "Page de fan : les légendes d'Apex Legends, leurs classes et leurs capacités.",
};

const display = Barlow_Condensed({ weight: ["600", "800"], subsets: ["latin"], variable: "--font-display" });

const platforms = ["PlayStation", "Xbox", "Nintendo Switch", "PC · Steam", "PC · EA app"];

const steps = [
  { title: "Atterris", text: "Choisis ta zone sur la carte et saute avec ton escouade." },
  { title: "Équipe-toi", text: "Fouille pour trouver armes, accessoires, boucliers et soins." },
  { title: "Fais équipe", text: "Combine les capacités de trois légendes qui se complètent." },
  { title: "Reste debout", text: "L'anneau se resserre : sois la dernière escouade en vie." },
];

export default function ApexLanding() {
  // Pictures dropped in public/legends/<slug>.(webp|png|jpg); legends without one keep their initials.
  const images = Object.fromEntries(
    legends.flatMap((legend) => {
      const file = ["webp", "png", "jpg"]
        .map((ext) => `${slugOf(legend.name)}.${ext}`)
        .find((name) => existsSync(path.join(process.cwd(), "public", "legends", name)));
      return file ? [[legend.name, `/legends/${file}`]] : [];
    }),
  );

  return (
    <div className={`${styles.apex} cr-theme-dark ${display.variable}`} lang="fr">
      <header className={styles.bar}>
        <span className={styles.wordmark}>
          APEX <span>fan lab</span>
        </span>
        <nav aria-label="Sections" className={styles.nav}>
          <a href="#legendes">Légendes</a>
          <a href="#classes">Classes</a>
          <a href="#jouer">Jouer</a>
        </nav>
        <CrButton href="/" variant="outline" size="s">
          Retour au labo
        </CrButton>
      </header>

      <CrBackground variant="grid" lang="fr" className={styles.hero}>
        <div className={styles.heroInner}>
          <CrBadge variant="primary">Page de fan</CrBadge>
          <h1 className={styles.title}>
            Apex <span>Legends</span>
          </h1>
          <p className={styles.tagline}>Choisis ta légende. Sois la dernière escouade debout.</p>
          <div className={styles.ctas}>
            <CrButton href="#legendes" size="l">
              Voir les {legends.length} légendes
            </CrButton>
            <CrButton href="#classes" variant="outline" size="l">
              Comprendre les classes
            </CrButton>
          </div>
          <Stats />
          <ul className={styles.fan} aria-hidden="true">
            {Object.values(classes).map((legendClass, index) => (
              <li key={legendClass.label} style={{ "--hue": legendClass.hue, "--i": index } as CSSProperties}>
                {legendClass.label}
              </li>
            ))}
          </ul>
        </div>
      </CrBackground>

      <section aria-label="Plateformes" className={styles.platforms}>
        <span className={styles.kicker}>Gratuit sur</span>
        <ul>
          {platforms.map((platform) => (
            <li key={platform}>
              <CrBadge>{platform}</CrBadge>
            </li>
          ))}
        </ul>
      </section>

      <main className={styles.main}>
        <section id="jouer" className={styles.section} aria-labelledby="jouer-titre">
          <h2 id="jouer-titre" className={styles.heading}>
            Comment ça se joue
          </h2>
          <ol className={styles.steps}>
            {steps.map((step, index) => (
              <li key={step.title}>
                <CrCard className={styles.step}>
                  <span className={styles.stepNumber} aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.muted}>{step.text}</p>
                </CrCard>
              </li>
            ))}
          </ol>
        </section>

        <section id="legendes" className={styles.section} aria-labelledby="legendes-titre">
          <h2 id="legendes-titre" className={styles.heading}>
            Choisis ta légende
          </h2>
          <p className={styles.muted}>Sélectionne une légende pour voir sa fiche : classe, capacités et bonus.</p>
          <LegendRoster images={images} />
        </section>

        <section id="classes" className={styles.section} aria-labelledby="classes-titre">
          <h2 id="classes-titre" className={styles.heading}>
            Les cinq classes
          </h2>
          <CrAccordion lang="fr" headingLevel={3} className={styles.classes}>
            {Object.entries(classes).map(([key, legendClass], index) => {
              const members = legends.filter((legend) => legend.legendClass === key);
              return (
                <CrAccordionItem key={key} label={`${legendClass.label} · ${members.length} légendes`} open={index === 0}>
                  <p>{legendClass.perk}</p>
                  <div className={styles.members}>
                    <CrAvatarGroup max={8}>
                      {members.map((legend) => (
                        <CrAvatar key={legend.name} name={legend.name} />
                      ))}
                    </CrAvatarGroup>
                    <span className={styles.muted}>{members.map((legend) => legend.name).join(", ")}</span>
                  </div>
                </CrAccordionItem>
              );
            })}
          </CrAccordion>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>
          Page de fan non officielle, sans lien avec Electronic Arts ni Respawn Entertainment. Apex Legends est une
          marque d&apos;Electronic Arts. Données à jour en novembre 2026 (saison 31).
        </p>
        <CrButton href="/" variant="link">
          Toutes les landings
        </CrButton>
      </footer>
    </div>
  );
}
