import type { Metadata } from "next";
import Link from "next/link";
import { CrBreadcrumb } from "@cristal-ui/react/ssr";
import { OrderForm } from "./OrderForm";
import styles from "../fast-food.module.css";

export const metadata: Metadata = {
  title: "Votre commande · Tasty Bites",
  description: "Livraison en 30 minutes ou à emporter en 15 minutes.",
};

export default function OrderPage() {
  return (
    <main className={`${styles.main} ${styles.inner}`}>
      <CrBreadcrumb lang="fr">
        <Link href="/l/fast-food">Accueil</Link>
        <Link href="/l/fast-food/carte">La carte</Link>
        <span>Commande</span>
      </CrBreadcrumb>
      <h1 className={styles.heading}>Votre commande</h1>
      <OrderForm />
    </main>
  );
}
