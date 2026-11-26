"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import {
  CrAlert,
  CrButton,
  CrCard,
  CrDatePicker,
  CrImage,
  CrInput,
  CrRadioGroup,
  CrSegmented,
  CrSelect,
  CrTextarea,
} from "@cristal-ui/react";
import { findProperty, formatPrice, photo, properties } from "../data";
import { Specs } from "../Specs";
import styles from "../immobilier.module.css";

const reasons = {
  visite: "Visiter un bien",
  conseil: "Être conseillé pour un achat",
  estimation: "Faire estimer mon bien",
};
type Reason = keyof typeof reasons;

const places = { agence: "À l'agence ou sur place", visio: "En visio" };
const slots = ["9 h 30", "11 h", "14 h 30", "17 h"];

// Appointment request prefilled from the URL. Demo: nothing is sent.
export function AppointmentForm() {
  const params = useSearchParams();
  const motif = params.get("motif");
  const [reason, setReason] = useState<Reason>(motif && motif in reasons ? (motif as Reason) : "visite");
  const [slug, setSlug] = useState(findProperty(params.get("bien"))?.slug ?? "");
  const [place, setPlace] = useState<keyof typeof places>("agence");
  const [slot, setSlot] = useState(slots[0]);
  const [date, setDate] = useState("");
  const [reference, setReference] = useState("");
  const property = reason === "visite" ? findProperty(slug) : undefined;

  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setReference(`HVN-${Date.now().toString(36).toUpperCase().slice(-6)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (reference) {
    return (
      <div className={styles.confirmation}>
        <CrAlert lang="fr" variant="success" heading="Demande de rendez-vous envoyée">
          Référence {reference} : {reasons[reason].toLowerCase()}
          {property ? ` (${property.name})` : ""}, {places[place].toLowerCase()}, le{" "}
          {new Date(date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })} à {slot}.
          Cette agence est fictive : aucun rendez-vous n&apos;est pris.
        </CrAlert>
        <div className={styles.confirmationActions}>
          <CrButton href="/l/immobilier/biens">Continuer la visite des biens</CrButton>
          <CrButton variant="outline" onClick={() => setReference("")}>
            Modifier la demande
          </CrButton>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.appointment} onSubmit={send}>
      <div>
        <fieldset className={styles.fieldset}>
          <legend>Votre projet</legend>
          <CrRadioGroup lang="fr" label="Motif" name="motif" value={reason} onCrChange={(event) => setReason(event.detail as Reason)}>
            {Object.entries(reasons).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </CrRadioGroup>
          {reason === "visite" && (
            <CrSelect
              lang="fr"
              label="Bien à visiter"
              name="bien"
              value={slug}
              placeholder="Choisissez un bien"
              searchable
              required
              onCrChange={(event) => setSlug(String(event.detail ?? ""))}
            >
              {properties.map((option) => (
                <option key={option.slug} value={option.slug}>
                  {option.name}, {option.city}
                </option>
              ))}
            </CrSelect>
          )}
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>Le créneau</legend>
          <CrSegmented lang="fr" label="Lieu" value={place} onCrChange={(event) => setPlace(event.detail as keyof typeof places)}>
            {Object.entries(places).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </CrSegmented>
          <div className={styles.twoColumns}>
            <CrDatePicker lang="fr" label="Date" name="date" required onCrChange={(event) => setDate(event.detail)} />
            <CrSegmented lang="fr" label="Heure" variant="outline" value={slot} onCrChange={(event) => setSlot(event.detail)}>
              {slots.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </CrSegmented>
          </div>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>Vos coordonnées</legend>
          <CrInput lang="fr" label="Nom complet" name="nom" autocomplete="name" required />
          <div className={styles.twoColumns}>
            <CrInput lang="fr" label="E-mail" name="email" type="email" autocomplete="email" required />
            <CrInput lang="fr" label="Téléphone" name="telephone" type="tel" autocomplete="tel" />
          </div>
          <CrTextarea lang="fr" label="Votre message" name="message" placeholder="Budget, délai, questions sur le bien…" />
        </fieldset>
      </div>

      <aside className={styles.aside} aria-labelledby="recap-titre">
        <CrCard>
          {property ? (
            <div slot="header">
              <CrImage src={photo(property.photo, 600)} alt="" className={styles.summaryPhoto} />
              <h2 id="recap-titre" className={styles.summaryName}>
                {property.name}
                <span className={styles.place}>
                  {property.city} · {formatPrice(property)}
                </span>
              </h2>
            </div>
          ) : (
            <h2 id="recap-titre" slot="header" className={styles.summaryName}>
              {reasons[reason]}
            </h2>
          )}
          {property ? (
            <Specs property={property} />
          ) : (
            <p className={styles.muted}>Un conseiller de votre région prépare le rendez-vous à partir de votre message.</p>
          )}
          <CrButton slot="footer" type="submit" size="l" fullWidth>
            Demander le rendez-vous
          </CrButton>
        </CrCard>
      </aside>
    </form>
  );
}
