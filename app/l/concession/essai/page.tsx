import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CrBreadcrumb, CrSkeleton } from "@cristal-ui/react/ssr";
import { TestDriveForm } from "./TestDriveForm";
import styles from "../concession.module.css";

export const metadata: Metadata = {
  title: "Réserver un essai · Renc",
  description: "Essayez la voiture de votre choix, au showroom ou livrée chez vous.",
};

export default function TestDrivePage() {
  return (
    <main className={styles.inner}>
      <CrBreadcrumb lang="fr">
        <Link href="/l/concession">Accueil</Link>
        <span>Essai</span>
      </CrBreadcrumb>
      <h1 className={styles.headingLarge}>Réserver un essai</h1>
      <p className={styles.muted}>Un conseiller confirme le créneau par téléphone dans la journée.</p>
      {/* The vehicle comes from the URL (?vehicule=…): the form renders in the browser, behind this boundary. */}
      <Suspense fallback={<CrSkeleton shape="block" height="720px" />}>
        <TestDriveForm />
      </Suspense>
    </main>
  );
}
