import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CrAlert, CrBreadcrumb, CrSkeleton } from "@cristal-ui/react/ssr";
import { MenuTabs } from "./MenuTabs";
import styles from "../gastronomie.module.css";

export const metadata: Metadata = {
  title: "Menus · Ardoise",
  description: "Menu Saison en 7 temps, Menu Jardin végétal en 6 temps et menu Déjeuner en 3 temps, avec ou sans accord mets et vins.",
};

export default function MenusPage() {
  return (
    <main className={styles.inner}>
      <CrBreadcrumb lang="fr">
        <Link href="/l/gastronomie">Ardoise</Link>
        <span>Menus</span>
      </CrBreadcrumb>
      <h1 className={styles.title}>Les menus</h1>
      {/* The tab opens from the URL (?menu=…): the tabs render in the browser, behind this boundary. */}
      <Suspense fallback={<CrSkeleton shape="block" height="720px" />}>
        <MenuTabs />
      </Suspense>
      <CrAlert lang="fr" variant="info" heading="Allergies et régimes">
        Signalez-les à la réservation : chaque menu peut être adapté, à condition que nous le sachions la veille.
      </CrAlert>
    </main>
  );
}
