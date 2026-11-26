import type { Metadata } from "next";
import Link from "next/link";
import { CrBreadcrumb } from "@cristal-ui/react/ssr";
import { EstimateForm } from "./EstimateForm";
import styles from "../immobilier.module.css";

export const metadata: Metadata = {
  title: "Vendre votre bien · Haven",
  description: "Estimez votre bien en ligne, puis vendez-le avec un conseiller Haven.",
};

const steps = [
  { title: "Estimation", text: "Visite gratuite et avis de valeur écrit sous 48 heures." },
  { title: "Mandat", text: "Mandat exclusif de trois mois, honoraires de 4 % à la charge de l'acquéreur." },
  { title: "Mise en valeur", text: "Photos, film et plan 3D réalisés par nos équipes." },
  { title: "Visites", text: "Acquéreurs qualifiés uniquement : financement vérifié avant toute visite." },
  { title: "Signature", text: "Compromis puis acte chez le notaire, avec votre conseiller à chaque étape." },
];

export default function SellPage() {
  return (
    <main className={`${styles.main} ${styles.inner}`}>
      <CrBreadcrumb lang="fr">
        <Link href="/l/immobilier">Accueil</Link>
        <span>Vendre</span>
      </CrBreadcrumb>
      <div>
        <p className={styles.kicker}>Vendre</p>
        <h1 className={styles.heading}>
          Combien vaut <em>votre maison ?</em>
        </h1>
      </div>
      <p className={styles.muted}>Une première estimation en ligne, calculée sur nos ventes récentes dans votre secteur.</p>
      <EstimateForm />

      <section className={styles.section} aria-labelledby="etapes-titre">
        <h2 id="etapes-titre" className={styles.heading}>
          Une vente en cinq étapes
        </h2>
        <ol className={styles.steps}>
          {steps.map((step) => (
            <li key={step.title}>
              <strong>{step.title}</strong>
              <span className={styles.muted}>{step.text}</span>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
