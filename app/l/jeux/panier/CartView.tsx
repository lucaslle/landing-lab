"use client";

import { useState } from "react";
import { CrAlert, CrButton } from "@cristal-ui/react";
import { Cart } from "../Lists";
import { checkout } from "../Store";
import styles from "../jeux.module.css";

export function CartView() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className={styles.page2}>
        <CrAlert lang="fr" variant="success" heading="Achat confirmé">
          Vos jeux sont dans la bibliothèque. Cette boutique est fictive : rien n&apos;a été payé.
        </CrAlert>
        <div className={styles.topActions} style={{ marginLeft: 0 }}>
          <CrButton href="/l/jeux/bibliotheque" className={styles.cta}>
            Ouvrir la bibliothèque
          </CrButton>
        </div>
      </div>
    );
  }

  return (
    <Cart
      onCheckout={() => {
        checkout();
        setDone(true);
      }}
    />
  );
}
