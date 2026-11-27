import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CrBreadcrumb, CrSkeleton } from "@cristal-ui/react/ssr";
import { ReservationForm } from "./ReservationForm";
import styles from "../gastronomie.module.css";

export const metadata: Metadata = {
  title: "Réserver une table · Ardoise",
  description: "Choisissez la date, le service, le menu et le nombre de convives.",
};

export default function ReservationPage() {
  return (
    <main className={styles.inner}>
      <CrBreadcrumb lang="fr">
        <Link href="/l/gastronomie">Ardoise</Link>
        <span>Réserver une table</span>
      </CrBreadcrumb>
      <h1 className={styles.title}>Réserver une table</h1>
      {/* Prefilled from the URL (?menu=…): the form renders in the browser, behind this boundary. */}
      <Suspense fallback={<CrSkeleton shape="block" height="760px" />}>
        <ReservationForm />
      </Suspense>
    </main>
  );
}
