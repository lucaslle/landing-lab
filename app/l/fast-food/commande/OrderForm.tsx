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
  CrProgress,
  CrProgressSteps,
  CrQuantity,
  CrRadioGroup,
  CrSegmented,
  CrSelect,
  CrTextarea,
} from "@cristal-ui/react";
import { clearCart, setQuantity, useCart } from "../Cart";
import { DELIVERY_FEE, FREE_DELIVERY_FROM, euros, photo } from "../data";
import { Icon } from "../Icon";
import styles from "../fast-food.module.css";

const modes = { livraison: "Livraison", emporter: "À emporter" };
type Mode = keyof typeof modes;

const slots = ["Dès que possible", "19 h 00", "19 h 30", "20 h 00", "20 h 30", "21 h 00", "21 h 30", "22 h 00"];
const payments: Record<Mode, string[]> = {
  livraison: ["Carte bancaire à la livraison", "Espèces à la livraison", "Titres-restaurant"],
  emporter: ["Carte bancaire au comptoir", "Espèces au comptoir", "Titres-restaurant"],
};

// Delivery is charged under the free-delivery threshold, never for take-away.
export const deliveryFee = (mode: Mode, subtotal: number) =>
  mode === "emporter" || subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;

// Order form over the cart. Demo: nothing is sent or charged, the cart is emptied on confirmation.
export function OrderForm() {
  const { lines, count, subtotal } = useCart();
  const [mode, setMode] = useState<Mode>("livraison");
  const [slot, setSlot] = useState(slots[0]);
  const [placed, setPlaced] = useState<{ reference: string; total: number; mode: Mode; slot: string } | null>(null);

  const fee = deliveryFee(mode, subtotal);
  const total = subtotal + fee;
  const missing = FREE_DELIVERY_FROM - subtotal;

  const order = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPlaced({ reference: `TB-${Date.now().toString(36).toUpperCase().slice(-5)}`, total, mode, slot });
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (placed) {
    const delivery = placed.mode === "livraison";
    return (
      <div className={styles.confirmation}>
        <CrAlert lang="fr" variant="success" heading={`Commande ${placed.reference} reçue`}>
          {euros(placed.total)} à régler {delivery ? "à la livraison" : "au comptoir"},{" "}
          {placed.slot === slots[0] ? (delivery ? "livrée d'ici 30 minutes" : "prête d'ici 15 minutes") : `pour ${placed.slot}`}.
          Ce fast food est fictif : rien n&apos;est préparé ni payé.
        </CrAlert>
        <CrProgressSteps
          lang="fr"
          label="Suivi de la commande"
          steps={["Reçue", "En cuisine", delivery ? "En route" : "Prête", delivery ? "Livrée" : "Récupérée"]}
          current={1}
        />
        <div className={styles.confirmationActions}>
          <CrButton href="/l/fast-food/carte" className={styles.cta}>
            Revoir la carte
          </CrButton>
          <CrButton href="/l/fast-food" variant="outline" className={styles.outline}>
            Retour à l&apos;accueil
          </CrButton>
        </div>
      </div>
    );
  }

  if (count === 0) {
    return (
      <CrEmptyState lang="fr" heading="Votre panier est vide" illustration="inbox">
        Ajoutez un burger, une pizza ou un milkshake depuis la carte.
        <CrButton slot="actions" href="/l/fast-food/carte" className={styles.cta}>
          Voir la carte
        </CrButton>
      </CrEmptyState>
    );
  }

  return (
    <form className={styles.order} onSubmit={order}>
      <div>
        <ul className={styles.lines} aria-label="Articles du panier">
          {lines.map((line) => (
            <li key={line.key} className={styles.line}>
              <CrImage src={photo(line.photo, 200)} alt="" className={styles.linePhoto} />
              <span>
                <strong>{line.name}</strong>
                {line.options && <small>{line.options}</small>}
              </span>
              <CrQuantity
                lang="fr"
                label="Quantité"
                value={line.quantity}
                min={1}
                max={10}
                onCrChange={(event) => setQuantity(line.key, event.detail ?? 1)}
              />
              <span className={styles.linePrice}>
                {euros(line.unitPrice * line.quantity)}
                <CrIconButton label={`Retirer ${line.name}`} variant="ghost" size="s" onClick={() => setQuantity(line.key, 0)}>
                  <Icon name="trash" />
                </CrIconButton>
              </span>
            </li>
          ))}
        </ul>

        <fieldset className={styles.fieldset}>
          <legend>Livraison ou à emporter</legend>
          <CrSegmented lang="fr" label="Mode" value={mode} onCrChange={(event) => setMode(event.detail as Mode)}>
            {Object.entries(modes).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </CrSegmented>
          {mode === "livraison" ? (
            <>
              <CrInput lang="fr" label="Adresse" name="adresse" autocomplete="street-address" required />
              <div className={styles.twoColumns}>
                <CrInput lang="fr" label="Code postal" name="code-postal" autocomplete="postal-code" required />
                <CrInput lang="fr" label="Ville" name="ville" autocomplete="address-level2" required />
              </div>
              <CrTextarea lang="fr" label="Instructions pour le livreur" name="instructions" placeholder="Digicode, étage…" />
            </>
          ) : (
            <p className={styles.muted}>
              <Icon name="pin" /> 18 rue de la Roquette, 75011 Paris. Ouvert tous les jours de 11 h 30 à 23 h.
            </p>
          )}
          <CrSelect lang="fr" label="Horaire" value={slot} onCrChange={(event) => setSlot(String(event.detail))}>
            {slots.map((option) => (
              <option key={option} value={option}>
                {option === slots[0] ? `${option} (${mode === "livraison" ? "30" : "15"} min)` : option}
              </option>
            ))}
          </CrSelect>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>Vos coordonnées</legend>
          <div className={styles.twoColumns}>
            <CrInput lang="fr" label="Prénom et nom" name="nom" autocomplete="name" required />
            <CrInput lang="fr" label="Téléphone" name="telephone" type="tel" autocomplete="tel" required />
          </div>
          <CrRadioGroup key={mode} lang="fr" label="Paiement" name="paiement" value={payments[mode][0]}>
            {payments[mode].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </CrRadioGroup>
        </fieldset>
      </div>

      <aside className={styles.aside} aria-labelledby="total-titre">
        <CrCard>
          <h2 id="total-titre" slot="header" className={styles.groupTitle}>
            {count} article{count > 1 ? "s" : ""}
          </h2>
          <dl className={styles.summary}>
            <div>
              <dt>Sous-total</dt>
              <dd>{euros(subtotal)}</dd>
            </div>
            <div>
              <dt>Livraison</dt>
              <dd>{mode === "emporter" ? "Sans objet" : fee ? euros(fee) : "Offerte"}</dd>
            </div>
            <div className={styles.grandTotal}>
              <dt>Total</dt>
              <dd>{euros(total)}</dd>
            </div>
          </dl>
          {mode === "livraison" && missing > 0 && (
            <CrProgress
              lang="fr"
              label={`Plus que ${euros(missing)} pour la livraison offerte`}
              value={Math.round((subtotal / FREE_DELIVERY_FROM) * 100)}
            />
          )}
          <CrButton slot="footer" type="submit" size="l" fullWidth className={styles.cta}>
            Commander, {euros(total)}
          </CrButton>
        </CrCard>
      </aside>
    </form>
  );
}
