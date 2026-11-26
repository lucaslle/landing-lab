import type { Metadata } from "next";
import { CartView } from "./CartView";
import styles from "../jeux.module.css";

export const metadata: Metadata = { title: "Panier · Pulse" };

export default function CartPage() {
  return (
    <main className={styles.page2}>
      <h1 className={styles.title}>Panier</h1>
      <CartView />
    </main>
  );
}
