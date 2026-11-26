import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CrBreadcrumb, CrSkeleton } from "@cristal-ui/react/ssr";
import { destinations } from "../data";
import { DestinationList } from "./DestinationList";
import styles from "../voyage.module.css";

export const metadata: Metadata = {
  title: "Toutes nos destinations · Ailleurs",
  description: "Séjours et circuits sur quatre continents, vols et hôtels compris.",
};

export default function DestinationsPage() {
  return (
    <main className={`${styles.main} ${styles.inner}`}>
      <CrBreadcrumb lang="fr">
        <Link href="/l/voyage">Accueil</Link>
        <span>Destinations</span>
      </CrBreadcrumb>
      <h1 className={styles.heading}>
        Toutes nos <span>destinations</span>
      </h1>
      <p className={styles.muted}>
        {destinations.length} voyages sur quatre continents, vols et hôtel compris. Choisissez-en un pour voir le
        programme jour par jour.
      </p>
      {/* The list reads the search from the URL: it renders in the browser, behind this boundary. */}
      <Suspense fallback={<CrSkeleton shape="block" height="480px" />}>
        <DestinationList />
      </Suspense>
    </main>
  );
}
