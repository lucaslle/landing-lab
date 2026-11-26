import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CrBreadcrumb, CrSkeleton } from "@cristal-ui/react/ssr";
import { BookingForm } from "./BookingForm";
import styles from "../voyage.module.css";

export const metadata: Metadata = {
  title: "Réserver un voyage · Ailleurs",
  description: "Choisissez votre destination, vos dates et votre formule.",
};

export default function BookingPage() {
  return (
    <main className={`${styles.main} ${styles.inner}`}>
      <CrBreadcrumb lang="fr">
        <Link href="/l/voyage">Accueil</Link>
        <Link href="/l/voyage/destinations">Destinations</Link>
        <span>Réservation</span>
      </CrBreadcrumb>
      <h1 className={styles.heading}>
        Réservez votre <span>voyage</span>
      </h1>
      <p className={styles.muted}>Un conseiller confirme chaque demande sous 24 heures, sans engagement.</p>
      {/* The form is prefilled from the URL: it renders in the browser, behind this boundary. */}
      <Suspense fallback={<CrSkeleton shape="block" height="560px" />}>
        <BookingForm />
      </Suspense>
    </main>
  );
}
