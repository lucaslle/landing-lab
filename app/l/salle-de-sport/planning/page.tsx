import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CrBreadcrumb, CrSkeleton } from "@cristal-ui/react/ssr";
import { Schedule } from "./Schedule";
import styles from "../salle-de-sport.module.css";

export const metadata: Metadata = {
  title: "Planning des cours · Fonte",
  description: "Les cours de la semaine : haltérophilie, cross-training, force, cardio et gymnastique, avec les places restantes.",
};

export default function PlanningPage() {
  return (
    <main className={styles.inner}>
      <CrBreadcrumb lang="fr">
        <Link href="/l/salle-de-sport">Fonte</Link>
        <span>Planning</span>
      </CrBreadcrumb>
      <div className={styles.titleRow}>
        <h1 className={styles.title}>Planning de la semaine</h1>
        <p className={styles.muted}>Les cours se réservent jusqu&apos;à 7 jours à l&apos;avance et s&apos;annulent jusqu&apos;à 2 h avant.</p>
      </div>
      {/* The filter opens from the URL (?discipline=…): the grid renders in the browser, behind this boundary. */}
      <Suspense fallback={<CrSkeleton shape="block" height="720px" />}>
        <Schedule />
      </Suspense>
    </main>
  );
}
