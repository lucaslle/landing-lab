import type { Metadata } from "next";
import { Library } from "../Lists";
import styles from "../jeux.module.css";

export const metadata: Metadata = { title: "Bibliothèque · Pulse" };

export default function Page() {
  return (
    <main className={styles.page2}>
      <h1 className={styles.title}>Bibliothèque</h1>
      <p className={styles.muted}>Les jeux achetés sur ce navigateur.</p>
      <Library />
    </main>
  );
}
