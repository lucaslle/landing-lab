import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CrBreadcrumb, CrSkeleton } from "@cristal-ui/react/ssr";
import { MenuList } from "./MenuList";
import styles from "../fast-food.module.css";

export const metadata: Metadata = {
  title: "La carte · Tasty Bites",
  description: "Burgers, pizzas, accompagnements, boissons et desserts.",
};

export default function MenuPage() {
  return (
    <main className={`${styles.main} ${styles.inner}`}>
      <CrBreadcrumb lang="fr">
        <Link href="/l/fast-food">Accueil</Link>
        <span>La carte</span>
      </CrBreadcrumb>
      <div>
        <p className={styles.eyebrow}>Fait maison chaque jour</p>
        <h1 className={styles.heading}>La carte</h1>
      </div>
      {/* The category comes from the URL: the list renders in the browser, behind this boundary. */}
      <Suspense fallback={<CrSkeleton shape="block" height="640px" />}>
        <MenuList />
      </Suspense>
    </main>
  );
}
