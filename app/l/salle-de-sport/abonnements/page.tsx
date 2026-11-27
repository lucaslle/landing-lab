import type { Metadata } from "next";
import Link from "next/link";
import { CrAccordion, CrAccordionItem, CrBreadcrumb } from "@cristal-ui/react/ssr";
import { Plans } from "./Plans";
import styles from "../salle-de-sport.module.css";

export const metadata: Metadata = {
  title: "Abonnements · Fonte",
  description: "Trois abonnements sans engagement, de l'accès libre au coaching individuel, ou deux mois offerts en payant à l'année.",
};

const questions = [
  { question: "Puis-je résilier quand je veux ?", answer: "Oui pour les abonnements au mois : la résiliation prend effet à la fin du mois en cours, sans frais. L'abonnement à l'année n'est pas remboursable, mais il peut être cédé." },
  { question: "Et si je me blesse ou que je pars en vacances ?", answer: "Vous pouvez suspendre votre abonnement jusqu'à deux mois par an, sur simple demande à l'accueil ou par e-mail." },
  { question: "Je n'ai jamais touché une barre, c'est pour moi ?", answer: "Oui. Chaque nouvel abonné a une séance d'accueil avec un coach, et tous les cours ont une version adaptée aux débutants." },
  { question: "Existe-t-il un tarif étudiant ?", answer: "Oui, 20 % de réduction sur tous les abonnements sur présentation d'une carte étudiante valide." },
];

export default function PlansPage() {
  return (
    <main className={styles.inner}>
      <CrBreadcrumb lang="fr">
        <Link href="/l/salle-de-sport">Fonte</Link>
        <span>Abonnements</span>
      </CrBreadcrumb>
      <div className={styles.titleRow}>
        <h1 className={styles.title}>Abonnements</h1>
        <p className={styles.muted}>Tous les abonnements commencent par une séance d&apos;essai gratuite, sans carte bancaire.</p>
      </div>
      <Plans />
      <section className={styles.block} aria-labelledby="questions-titre">
        <h2 id="questions-titre" className={styles.heading}>
          Questions fréquentes
        </h2>
        <CrAccordion lang="fr" headingLevel={3}>
          {questions.map((item, index) => (
            <CrAccordionItem key={item.question} label={item.question} open={index === 0}>
              <p className={styles.muted}>{item.answer}</p>
            </CrAccordionItem>
          ))}
        </CrAccordion>
      </section>
    </main>
  );
}
