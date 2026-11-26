import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CrBreadcrumb, CrSkeleton } from "@cristal-ui/react/ssr";
import { ListingList } from "./ListingList";
import styles from "../immobilier.module.css";

export const metadata: Metadata = {
  title: "Nos biens · Haven",
  description: "Villas, chalets, maisons et appartements à vendre et à louer.",
};

export default function ListingsPage() {
  return (
    <main className={`${styles.main} ${styles.inner}`}>
      <CrBreadcrumb lang="fr">
        <Link href="/l/immobilier">Accueil</Link>
        <span>Nos biens</span>
      </CrBreadcrumb>
      <div>
        <p className={styles.kicker}>Catalogue</p>
        <h1 className={styles.heading}>
          Nos biens <em>à vendre et à louer</em>
        </h1>
      </div>
      {/* The filters come from the URL: the list renders in the browser, behind this boundary. */}
      <Suspense fallback={<CrSkeleton shape="block" height="640px" />}>
        <ListingList />
      </Suspense>
    </main>
  );
}
