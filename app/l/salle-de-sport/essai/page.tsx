import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CrBreadcrumb, CrSkeleton } from "@cristal-ui/react/ssr";
import { TrialForm } from "./TrialForm";
import styles from "../salle-de-sport.module.css";

export const metadata: Metadata = {
  title: "Séance d'essai gratuite · Fonte",
  description: "Une heure avec un coach pour découvrir la salle : bilan de mobilité, technique et entraînement.",
};

export default function TrialPage() {
  return (
    <main className={styles.inner}>
      <CrBreadcrumb lang="fr">
        <Link href="/l/salle-de-sport">Fonte</Link>
        <span>Séance d&apos;essai</span>
      </CrBreadcrumb>
      <div className={styles.titleRow}>
        <h1 className={styles.title}>Séance d&apos;essai gratuite</h1>
        <p className={styles.muted}>Une heure avec un coach, sans engagement et sans carte bancaire.</p>
      </div>
      {/* Prefilled from the URL (?abonnement=…): the form renders in the browser, behind this boundary. */}
      <Suspense fallback={<CrSkeleton shape="block" height="760px" />}>
        <TrialForm />
      </Suspense>
    </main>
  );
}
