"use client";

import { useState, type FormEvent } from "react";
import { CrAlert, CrButton, CrInput, CrToaster } from "@cristal-ui/react";
import styles from "./voyage.module.css";

export function Newsletter() {
  const [sent, setSent] = useState(0);

  const subscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(Date.now());
  };

  return (
    <form className={styles.newsletterForm} onSubmit={subscribe}>
      <CrInput lang="fr" label="Votre e-mail" name="email" type="email" autocomplete="email" required />
      <CrButton type="submit" variant="secondary" size="l">
        S&apos;inscrire
      </CrButton>
      <CrToaster lang="fr">
        {sent > 0 && (
          <CrAlert key={sent} variant="success" duration={5000} onCrClose={() => setSent(0)}>
            Merci ! Cette démo n&apos;envoie pas encore d&apos;e-mails.
          </CrAlert>
        )}
      </CrToaster>
    </form>
  );
}
