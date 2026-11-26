import type { Metadata } from "next";
import Link from "next/link";
import { CrBreadcrumb } from "@cristal-ui/react/ssr";
import { OrderForm } from "./OrderForm";
import styles from "../velo.module.css";

export const metadata: Metadata = {
  title: "Panier · Kairn",
  description: "Livraison à domicile ou retrait en atelier, offerts.",
};

export default function CartPage() {
  return (
    <main className={styles.inner}>
      <CrBreadcrumb lang="fr">
        <Link href="/l/velo">Accueil</Link>
        <span>Panier</span>
      </CrBreadcrumb>
      <h1 className={styles.heading}>Panier</h1>
      <OrderForm />
    </main>
  );
}
