import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CrBreadcrumb, CrSkeleton } from "@cristal-ui/react/ssr";
import { StockList } from "./StockList";
import styles from "../concession.module.css";

export const metadata: Metadata = {
  title: "Véhicules en stock · Renc",
  description: "Voitures de prestige neuves et d'occasion, contrôlées et garanties.",
};

export default function StockPage() {
  return (
    <main className={styles.inner}>
      <CrBreadcrumb lang="fr">
        <Link href="/l/concession">Accueil</Link>
        <span>Véhicules</span>
      </CrBreadcrumb>
      <h1 className={styles.headingLarge}>Véhicules</h1>
      {/* The filters come from the URL: the list renders in the browser, behind this boundary. */}
      <Suspense fallback={<CrSkeleton shape="block" height="640px" />}>
        <StockList />
      </Suspense>
    </main>
  );
}
