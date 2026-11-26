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
  CrSegmented,
  CrSelect,
  CrTextarea,
} from "@cristal-ui/react";
import { euros, findVehicle, photo, vehicles } from "../data";
import styles from "../concession.module.css";

const places = { showroom: "Au showroom", domicile: "Livrée chez vous" };
const slots = ["10 h", "11 h 30", "14 h", "15 h 30", "17 h"];

// Test drive request prefilled from a vehicle page. Demo: nothing is sent.
export function TestDriveForm() {
  const params = useSearchParams();
  const [slug, setSlug] = useState(findVehicle(params.get("vehicule"))?.slug ?? "");
  const [place, setPlace] = useState<keyof typeof places>("showroom");
  const [slot, setSlot] = useState(slots[0]);
  const [date, setDate] = useState("");
  const [reference, setReference] = useState("");
  const vehicle = findVehicle(slug);

  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setReference(`RENC-${Date.now().toString(36).toUpperCase().slice(-5)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (reference && vehicle) {
    return (
      <div className={styles.confirmation}>
        <CrAlert lang="fr" variant="success" heading="Demande d'essai envoyée">
          Référence {reference} : {vehicle.brand} {vehicle.model}, {places[place].toLowerCase()}, le{" "}
          {new Date(date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })} à {slot}. Ce
          concessionnaire est fictif : aucun essai n&apos;est réservé.
        </CrAlert>
        <div className={styles.actions}>
          <CrButton href="/l/concession/vehicules" className={styles.peach}>
            Revoir le stock
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
          <legend>Le véhicule</legend>
          <CrSelect lang="fr" label="Véhicule à essayer" value={slug} placeholder="Choisissez un véhicule" searchable required onCrChange={(event) => setSlug(String(event.detail ?? ""))}>
            {vehicles.map((option) => (
              <option key={option.slug} value={option.slug}>
                {option.brand} {option.model}, {option.year}
              </option>
            ))}
          </CrSelect>
          <CrSegmented lang="fr" label="Lieu de l'essai" value={place} onCrChange={(event) => setPlace(event.detail as keyof typeof places)}>
            {Object.entries(places).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </CrSegmented>
          {place === "domicile" && <CrInput lang="fr" label="Adresse de livraison" name="adresse" autocomplete="street-address" required />}
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
            <CrInput lang="fr" label="Téléphone" name="telephone" type="tel" autocomplete="tel" required />
          </div>
          <CrTextarea lang="fr" label="Votre projet" name="message" placeholder="Reprise, financement, délai…" />
          <CrCheckbox lang="fr" label="J'ai un permis B valide depuis plus de 3 ans" name="permis" required />
        </fieldset>
      </div>

      <aside className={styles.aside} aria-labelledby="recap-titre">
        <CrCard>
          {vehicle ? (
            <div slot="header">
              <CrImage src={photo(vehicle.photo, 600)} alt="" className={styles.summaryPhoto} />
              <h2 id="recap-titre" className={styles.summaryName}>
                {vehicle.brand} {vehicle.model}
                <span>
                  {vehicle.year} · {euros(vehicle.price)}
                </span>
              </h2>
            </div>
          ) : (
            <h2 id="recap-titre" slot="header" className={styles.summaryName}>
              Choisissez un véhicule
            </h2>
          )}
          <p className={styles.muted}>Essai de 45 minutes avec un conseiller, sur route et autoroute.</p>
          <CrButton slot="footer" type="submit" size="l" fullWidth className={styles.peach}>
            Demander l&apos;essai
          </CrButton>
        </CrCard>
      </aside>
    </form>
  );
}
