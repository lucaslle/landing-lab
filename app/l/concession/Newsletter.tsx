"use client";

import { useState, type FormEvent } from "react";
import { CrAlert, CrButton, CrInput, CrToaster } from "@cristal-ui/react";
import styles from "./concession.module.css";

export function Newsletter() {
  const [sent, setSent] = useState(0);

  const subscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(Date.now());
  };

  return (
    <form className={styles.newsletterForm} onSubmit={subscribe}>
      <CrInput lang="fr" label="Votre e-mail" name="email" type="email" autocomplete="email" placeholder="exemple@mail.fr" required />
      <CrButton type="submit" className={styles.green}>
        S&apos;inscrire
      </CrButton>
      <CrToaster lang="fr">
        {sent > 0 && (
          <CrAlert key={sent} lang="fr" variant="success" duration={5000} onCrClose={() => setSent(0)}>
            Inscription notée. Cette démo n&apos;envoie pas d&apos;e-mails.
          </CrAlert>
        )}
      </CrToaster>
    </form>
  );
}
