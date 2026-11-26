import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CrBreadcrumb, CrSkeleton } from "@cristal-ui/react/ssr";
import { BookingForm } from "./BookingForm";
import styles from "../escapades.module.css";

export const metadata: Metadata = {
  title: "Réserver · Horizons",
  description: "Choisissez votre destination, votre date de départ et le nombre de voyageurs.",
};

export default function BookingPage() {
  return (
    <main className={styles.inner}>
      <CrBreadcrumb lang="fr">
        <Link href="/l/escapades">Destinations</Link>
        <span>Réserver</span>
      </CrBreadcrumb>
      <h1 className={styles.heading}>Réserver</h1>
      {/* Prefilled from the URL (?destination=…): the form renders in the browser, behind this boundary. */}
      <Suspense fallback={<CrSkeleton shape="block" height="640px" />}>
        <BookingForm />
      </Suspense>
    </main>
  );
}
