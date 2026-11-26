import type { Metadata } from "next";
import Link from "next/link";
import { CrAccordion, CrAccordionItem, CrAlert, CrBreadcrumb, CrButton } from "@cristal-ui/react/ssr";
import { FeesTable } from "./FeesTable";
import styles from "../immobilier.module.css";

export const metadata: Metadata = {
  title: "Conseils · Haven",
  description: "Acheter, vendre, louer ou investir : nos réponses aux questions les plus fréquentes.",
};

const guides = [
  {
    title: "Acheter",
    questions: [
      {
        question: "Combien de temps dure un achat ?",
        answer: "Comptez trois mois entre l'offre acceptée et l'acte authentique : dix jours de rétractation après le compromis, puis le temps d'obtenir le prêt et les documents d'urbanisme.",
      },
      {
        question: "Faut-il un accord de prêt avant de visiter ?",
        answer: "Pour les biens de plus de 1 M€, nos vendeurs demandent une attestation de financement ou de fonds avant la visite. Votre conseiller vous oriente vers un courtier si besoin.",
      },
    ],
  },
  {
    title: "Vendre",
    questions: [
      {
        question: "Pourquoi un mandat exclusif ?",
        answer: "Un seul interlocuteur évite que le bien circule à plusieurs prix. En échange, nous prenons en charge photos, film et plan 3D, et nous vous rendons compte chaque semaine.",
      },
      {
        question: "Quels diagnostics préparer ?",
        answer: "Performance énergétique, amiante et plomb selon l'année de construction, électricité, gaz, termites selon la commune et assainissement si la maison n'est pas raccordée.",
      },
    ],
  },
  {
    title: "Louer",
    questions: [
      {
        question: "Location au mois ou à l'année ?",
        answer: "Nos villas de bord de mer se louent au mois en saison, nos maisons de montagne à la saison d'hiver, et quelques biens à l'année avec un bail meublé d'un an.",
      },
      {
        question: "Quel dépôt de garantie ?",
        answer: "Deux mois de loyer pour une location meublée à l'année. Pour la location saisonnière, le dépôt est fixé au contrat et rendu sous quinze jours.",
      },
    ],
  },
  {
    title: "Investir",
    questions: [
      {
        question: "Quel rendement attendre ?",
        answer: "Entre 2 et 4 % brut par an pour un bien de prestige loué à la saison, davantage en montagne. La valeur patrimoniale compte souvent plus que le rendement.",
      },
      {
        question: "Acheter en nom propre ou en société ?",
        answer: "Cela dépend de votre situation et de la transmission prévue. Nous travaillons avec des notaires et des avocats fiscalistes que nous pouvons vous présenter.",
      },
    ],
  },
];

export default function AdvicePage() {
  return (
    <main className={`${styles.main} ${styles.inner}`}>
      <CrBreadcrumb lang="fr">
        <Link href="/l/immobilier">Accueil</Link>
        <span>Conseils</span>
      </CrBreadcrumb>
      <div>
        <p className={styles.kicker}>Conseils</p>
        <h1 className={styles.heading}>
          Les réponses <em>avant de vous lancer</em>
        </h1>
      </div>

      <div className={styles.guides}>
        {guides.map((guide) => (
          <section key={guide.title} aria-labelledby={`guide-${guide.title}`}>
            <h2 id={`guide-${guide.title}`} className={styles.subheading}>
              {guide.title}
            </h2>
            <CrAccordion lang="fr" headingLevel={3}>
              {guide.questions.map((item) => (
                <CrAccordionItem key={item.question} label={item.question}>
                  {item.answer}
                </CrAccordionItem>
              ))}
            </CrAccordion>
          </section>
        ))}
      </div>

      <section className={styles.section} aria-labelledby="frais-titre">
        <h2 id="frais-titre" className={styles.heading}>
          Les frais de notaire <em>en un coup d&apos;œil</em>
        </h2>
        <FeesTable />
        <CrAlert lang="fr" variant="info" heading="Montants indicatifs">
          Les frais réels dépendent du département et des débours. Le notaire vous donne le chiffre exact avant le
          compromis.
        </CrAlert>
      </section>

      <div className={styles.confirmationActions}>
        <CrButton href="/l/immobilier/rendez-vous?motif=conseil">Poser une question à un conseiller</CrButton>
        <CrButton href="/l/immobilier/vendre" variant="outline" className={styles.ghost}>
          Estimer mon bien
        </CrButton>
      </div>
    </main>
  );
}
