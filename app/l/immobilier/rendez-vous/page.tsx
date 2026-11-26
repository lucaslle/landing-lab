import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CrBreadcrumb, CrSkeleton } from "@cristal-ui/react/ssr";
import { AppointmentForm } from "./AppointmentForm";
import styles from "../immobilier.module.css";

export const metadata: Metadata = {
  title: "Prendre rendez-vous · Haven",
  description: "Visite d'un bien, conseil ou estimation : choisissez un créneau avec un conseiller.",
};

export default function AppointmentPage() {
  return (
    <main className={`${styles.main} ${styles.inner}`}>
      <CrBreadcrumb lang="fr">
        <Link href="/l/immobilier">Accueil</Link>
        <span>Rendez-vous</span>
      </CrBreadcrumb>
      <div>
        <p className={styles.kicker}>Rendez-vous</p>
        <h1 className={styles.heading}>
          Rencontrons-nous <em>sur place ou en visio</em>
        </h1>
      </div>
      <p className={styles.muted}>Un conseiller confirme chaque créneau par e-mail dans la journée.</p>
      {/* The form is prefilled from the URL (?bien=…&motif=…): it renders in the browser, behind this boundary. */}
      <Suspense fallback={<CrSkeleton shape="block" height="720px" />}>
        <AppointmentForm />
      </Suspense>
    </main>
  );
}
