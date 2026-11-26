"use client";

import { useState, type FormEvent } from "react";
import {
  CrAlert,
  CrButton,
  CrCard,
  CrEmptyState,
  CrIconButton,
  CrImage,
  CrInput,
  CrRadioGroup,
  CrSegmented,
} from "@cristal-ui/react";
import { clearCart, setQuantity, useCart } from "../Cart";
import { euros, sidePhoto } from "../data";
import styles from "../velo.module.css";

const modes = { domicile: "Livraison à domicile", atelier: "Retrait en atelier" };
type Mode = keyof typeof modes;

const workshops = ["Paris 11e, 42 rue Oberkampf", "Lyon 2e, 8 quai Saint-Antoine", "Annecy, 15 avenue d'Albigny"];

// Checkout over the cart. Demo: nothing is sent or charged, the cart is emptied on confirmation.
export function OrderForm() {
  const { lines, count, total } = useCart();
  const [mode, setMode] = useState<Mode>("domicile");
  const [placed, setPlaced] = useState<{ reference: string; total: number; mode: Mode } | null>(null);

  const order = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPlaced({ reference: `KRN-${Date.now().toString(36).toUpperCase().slice(-5)}`, total, mode });
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (placed) {
    return (
      <div className={styles.confirmation}>
        <CrAlert lang="fr" variant="success" heading={`Commande ${placed.reference} enregistrée`}>
          {euros(placed.total)},{" "}
          {placed.mode === "domicile" ? "livraison sous 5 jours ouvrés, vélo monté et réglé" : "retrait en atelier sous 3 jours avec l'étude posturale"}.
          Cette marque est fictive : rien n&apos;est commandé ni payé.
        </CrAlert>
        <div className={styles.actions}>
          <CrButton href="/l/velo" className={styles.green}>
            Retour à la gamme
          </CrButton>
        </div>
      </div>
    );
  }

  if (count === 0) {
    return (
      <CrEmptyState lang="fr" heading="Votre panier est vide" illustration="inbox">
        Choisissez un modèle, sa couleur et sa taille pour l&apos;ajouter ici.
        <CrButton slot="actions" href="/l/velo" className={styles.green}>
          Voir la gamme
        </CrButton>
      </CrEmptyState>
    );
  }

  return (
    <form className={styles.order} onSubmit={order}>
      <div>
        <ul className={styles.lines} aria-label="Vélos du panier">
          {lines.map((line) => (
            <li key={line.key} className={styles.line}>
              <CrImage src={sidePhoto(line.photo, 300)} alt="" className={styles.linePhoto} />
              <span>
                <strong>{line.name}</strong>
                <small>{line.options}</small>
              </span>
              <span className={styles.linePrice}>{euros(line.unitPrice * line.quantity)}</span>
              <CrIconButton label={`Retirer ${line.name}`} variant="ghost" size="s" onClick={() => setQuantity(line.key, 0)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </CrIconButton>
            </li>
          ))}
        </ul>

        <fieldset className={styles.fieldset}>
          <legend>Livraison</legend>
          <CrSegmented lang="fr" label="Mode" value={mode} onCrChange={(event) => setMode(event.detail as Mode)}>
            {Object.entries(modes).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </CrSegmented>
          {mode === "domicile" ? (
            <>
              <CrInput lang="fr" label="Adresse" name="adresse" autocomplete="street-address" required />
              <div className={styles.twoColumns}>
                <CrInput lang="fr" label="Code postal" name="code-postal" autocomplete="postal-code" required />
                <CrInput lang="fr" label="Ville" name="ville" autocomplete="address-level2" required />
              </div>
            </>
          ) : (
            <CrRadioGroup lang="fr" label="Atelier" name="atelier" value={workshops[0]}>
              {workshops.map((workshop) => (
                <option key={workshop} value={workshop}>
                  {workshop}
                </option>
              ))}
            </CrRadioGroup>
          )}
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>Vos coordonnées</legend>
          <CrInput lang="fr" label="Nom complet" name="nom" autocomplete="name" required />
          <div className={styles.twoColumns}>
            <CrInput lang="fr" label="E-mail" name="email" type="email" autocomplete="email" required />
            <CrInput lang="fr" label="Téléphone" name="telephone" type="tel" autocomplete="tel" required />
          </div>
        </fieldset>
      </div>

      <aside className={styles.aside} aria-labelledby="total-titre">
        <CrCard>
          <h2 id="total-titre" slot="header" className={styles.family}>
            {count} vélo{count > 1 ? "s" : ""}
          </h2>
          <dl className={styles.summary}>
            <div>
              <dt>Vélos</dt>
              <dd>{euros(total)}</dd>
            </div>
            <div>
              <dt>{modes[mode]}</dt>
              <dd>Offerte</dd>
            </div>
            <div className={styles.grandTotal}>
              <dt>Total</dt>
              <dd>{euros(total)}</dd>
            </div>
          </dl>
          <CrButton slot="footer" type="submit" size="l" fullWidth className={styles.green}>
            Commander
          </CrButton>
        </CrCard>
        <p className={styles.hint} style={{ marginTop: 12 }}>
          Paiement en 3 ou 4 fois possible. Cette démo ne demande aucune donnée bancaire.
        </p>
      </aside>
    </form>
  );
}
