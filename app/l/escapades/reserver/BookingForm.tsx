"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { CrAlert, CrButton, CrCard, CrDatePicker, CrImage, CrInput, CrNumber, CrQuantity, CrSelect, CrSwitch } from "@cristal-ui/react";
import { destinations, euros, findDestination, photo } from "../data";
import styles from "../escapades.module.css";

const SINGLE_ROOM = 390; // € supplement per solo traveler
const INSURANCE = 4; // % of the trip

// Booking request prefilled from a destination page. Demo: nothing is sent or charged.
export function BookingForm() {
  const params = useSearchParams();
  const [slug, setSlug] = useState(findDestination(params.get("destination"))?.slug ?? destinations[0].slug);
  const [travelers, setTravelers] = useState(2);
  const [single, setSingle] = useState(false);
  const [insurance, setInsurance] = useState(true);
  const [date, setDate] = useState("");
  const [reference, setReference] = useState("");
  const destination = findDestination(slug)!;

  const base = (destination.offer ?? destination.price) * travelers;
  const supplement = single ? SINGLE_ROOM * travelers : 0;
  const cover = insurance ? Math.round(((base + supplement) * INSURANCE) / 100) : 0;
  const total = base + supplement + cover;

  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setReference(`HRZ-${Date.now().toString(36).toUpperCase().slice(-5)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (reference) {
    return (
      <div className={styles.confirmation}>
        <CrAlert lang="fr" variant="success" heading="Demande de réservation envoyée">
          Référence {reference} : {destination.place} pour {travelers} voyageur{travelers > 1 ? "s" : ""}, départ le{" "}
          {new Date(date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}, {euros(total)} au total.
          Cette agence est fictive : rien n&apos;est réservé ni payé.
        </CrAlert>
        <div className={styles.actions}>
          <CrButton href="/l/escapades" className={styles.book}>
            Voir d&apos;autres destinations
          </CrButton>
          <CrButton variant="outline" onClick={() => setReference("")}>
            Modifier la demande
          </CrButton>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={send}>
      <div>
        <fieldset className={styles.fieldset}>
          <legend>Le voyage</legend>
          <CrSelect lang="fr" label="Destination" value={slug} searchable required onCrChange={(event) => setSlug(String(event.detail))}>
            {destinations.map((option) => (
              <option key={option.slug} value={option.slug}>
                {option.place}, {option.country}
              </option>
            ))}
          </CrSelect>
          <div className={styles.twoColumns}>
            <CrDatePicker lang="fr" label="Date de départ" name="depart" required onCrChange={(event) => setDate(event.detail)} />
            <CrQuantity lang="fr" label="Voyageurs" value={travelers} min={1} max={12} onCrChange={(event) => setTravelers(event.detail ?? 1)} />
          </div>
          <CrSwitch lang="fr" label={`Chambre individuelle (+${euros(SINGLE_ROOM)} par personne)`} checked={single} onCrChange={(event) => setSingle(event.detail)} />
          <CrSwitch lang="fr" label={`Assurance annulation (${INSURANCE} % du voyage)`} checked={insurance} onCrChange={(event) => setInsurance(event.detail)} />
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

      <aside className={styles.aside} aria-labelledby="recap-titre">
        <CrCard>
          <div slot="header">
            <CrImage src={photo(destination.photo, 600, 450)} alt="" className={styles.summaryPhoto} />
            <h2 id="recap-titre" className={styles.summaryName}>
              {destination.place}
              <span>
                {destination.country} · {destination.days} jours
              </span>
            </h2>
          </div>
          <dl className={styles.lines}>
            <div>
              <dt>Voyage × {travelers}</dt>
              <dd>{euros(base)}</dd>
            </div>
            {single && (
              <div>
                <dt>Chambre individuelle</dt>
                <dd>{euros(supplement)}</dd>
              </div>
            )}
            {insurance && (
              <div>
                <dt>Assurance</dt>
                <dd>{euros(cover)}</dd>
              </div>
            )}
            <div className={styles.total}>
              <dt>Total</dt>
              <dd>
                <CrNumber lang="fr" value={total} animation="roll" /> €
              </dd>
            </div>
          </dl>
          <CrButton slot="footer" type="submit" size="l" fullWidth className={styles.book}>
            Demander la réservation
          </CrButton>
        </CrCard>
      </aside>
    </form>
  );
}
