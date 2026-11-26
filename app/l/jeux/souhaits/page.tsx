import type { Metadata } from "next";
import { Wishlist } from "../Lists";
import styles from "../jeux.module.css";

export const metadata: Metadata = { title: "Liste de souhaits · Pulse" };

export default function Page() {
  return (
    <main className={styles.page2}>
      <h1 className={styles.title}>Liste de souhaits</h1>
      <p className={styles.muted}>Les jeux que vous suivez, avec leur prix du moment.</p>
      <Wishlist />
    </main>
  );
}
