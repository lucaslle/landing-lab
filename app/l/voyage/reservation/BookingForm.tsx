"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import {
  CrAlert,
  CrButton,
  CrCard,
  CrCheckbox,
  CrDatePicker,
  CrImage,
  CrInput,
  CrNumber,
  CrQuantity,
  CrRadioGroup,
  CrSelect,
} from "@cristal-ui/react";
import { destinations, findDestination, photo } from "../data";
import styles from "../voyage.module.css";

const formulas = {
  essentiel: { label: "Essentiel", detail: "Vols, hôtel et transferts", factor: 1 },
  confort: { label: "Confort", detail: "Hôtel supérieur et petits-déjeuners", factor: 1.2 },
  premium: { label: "Premium", detail: "Hôtel 5 étoiles et excursions guidées", factor: 1.45 },
};
type Formula = keyof typeof formulas;

const INSURANCE_PER_PERSON = 39;

// Booking form prefilled from the URL (?destination=bali&voyageurs=2…). Demo: nothing is sent or charged.
export function BookingForm() {
  const params = useSearchParams();
  const [slug, setSlug] = useState(findDestination(params.get("destination"))?.slug ?? destinations[0].slug);
  const [travelers, setTravelers] = useState(Math.min(9, Math.max(1, Number(params.get("voyageurs")) || 2)));
  const [formula, setFormula] = useState<Formula>("essentiel");
  const [insurance, setInsurance] = useState(false);
  const [reference, setReference] = useState("");

  const destination = findDestination(slug)!;
  const trip = Math.round(destination.price * formulas[formula].factor) * travelers;
  const total = trip + (insurance ? INSURANCE_PER_PERSON * travelers : 0);

  const book = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setReference(`AIL-${Date.now().toString(36).toUpperCase().slice(-6)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (reference) {
    return (
      <div className={styles.confirmation}>
        <CrAlert lang="fr" variant="success" heading="Demande de réservation enregistrée">
          Référence {reference} : {destination.city} pour {travelers} voyageur{travelers > 1 ? "s" : ""}, formule{" "}
          {formulas[formula].label}, {total.toLocaleString("fr-FR")} € au total. Cette agence est fictive : aucune
          réservation n&apos;est faite et rien n&apos;est payé.
        </CrAlert>
        <div className={styles.confirmationActions}>
          <CrButton href="/l/voyage/destinations">Voir d&apos;autres destinations</CrButton>
          <CrButton variant="outline" onClick={() => setReference("")}>
            Modifier la demande
          </CrButton>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.bookingForm} onSubmit={book}>
      <div className={styles.bookingFields}>
        <fieldset className={styles.fieldset}>
          <legend>Votre voyage</legend>
          <CrSelect
            lang="fr"
            label="Destination"
            name="destination"
            value={slug}
            required
            onCrChange={(event) => setSlug(String(event.detail))}
          >
            {destinations.map((option) => (
              <option key={option.slug} value={option.slug}>
                {option.city}, {option.country}
              </option>
            ))}
          </CrSelect>
          <div className={styles.twoColumns}>
            <CrDatePicker lang="fr" label="Aller" name="aller" value={params.get("aller") ?? ""} required />
            <CrDatePicker lang="fr" label="Retour" name="retour" value={params.get("retour") ?? ""} />
          </div>
          <CrQuantity
            lang="fr"
            label="Voyageurs"
            name="voyageurs"
            value={travelers}
            min={1}
            max={9}
            onCrChange={(event) => setTravelers(event.detail ?? 1)}
          />
          <CrRadioGroup
            lang="fr"
            label="Formule"
            name="formule"
            value={formula}
            onCrChange={(event) => setFormula(event.detail as Formula)}
          >
            {Object.entries(formulas).map(([value, { label, detail, factor }]) => (
              <option key={value} value={value}>
                {label} · {detail}
                {factor > 1 ? ` (+${Math.round((factor - 1) * 100)} %)` : ""}
              </option>
            ))}
          </CrRadioGroup>
          <CrCheckbox
            lang="fr"
            label={`Assurance annulation et bagages (+${INSURANCE_PER_PERSON} € par personne)`}
            name="assurance"
            checked={insurance}
            onCrChange={(event) => setInsurance(event.detail)}
          />
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>Vos coordonnées</legend>
          <CrInput lang="fr" label="Nom complet" name="nom" autocomplete="name" required />
          <div className={styles.twoColumns}>
            <CrInput lang="fr" label="E-mail" name="email" type="email" autocomplete="email" required />
            <CrInput lang="fr" label="Téléphone" name="telephone" type="tel" autocomplete="tel" />
          </div>
        </fieldset>
      </div>

      <aside className={styles.summary} aria-labelledby="recap-titre">
        <CrCard>
          <div slot="header" className={styles.summaryHead}>
            <CrImage src={photo(destination.photo, 600)} alt="" className={styles.summaryPhoto} />
            <h2 id="recap-titre">
              {destination.city}
              <span>
                {destination.country} · {destination.nights} nuits
              </span>
            </h2>
          </div>
          <dl className={styles.lines}>
            <div>
              <dt>
                Formule {formulas[formula].label} × {travelers}
              </dt>
              <dd>{trip.toLocaleString("fr-FR")} €</dd>
            </div>
            {insurance && (
              <div>
                <dt>Assurance × {travelers}</dt>
                <dd>{(INSURANCE_PER_PERSON * travelers).toLocaleString("fr-FR")} €</dd>
              </div>
            )}
            <div className={styles.total}>
              <dt>Total</dt>
              <dd>
                <CrNumber lang="fr" value={total} animation="roll" /> €
              </dd>
            </div>
          </dl>
          <CrButton slot="footer" type="submit" size="l" fullWidth>
            Demander la réservation
          </CrButton>
        </CrCard>
      </aside>
    </form>
  );
}
