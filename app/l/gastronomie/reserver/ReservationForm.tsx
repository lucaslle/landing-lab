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
  CrNumber,
  CrQuantity,
  CrRadioGroup,
  CrSegmented,
  CrSelect,
  CrSwitch,
  CrTextarea,
} from "@cristal-ui/react";
import { closedReason, euros, findMenu, menus, photo, services, slots, type Service } from "../data";
import styles from "../gastronomie.module.css";

const occasions = ["Aucune en particulier", "Anniversaire", "Demande en mariage", "Repas d'affaires", "Autre"];

const longDate = (date: string) =>
  new Date(`${date}T12:00:00`).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

// Table request prefilled from a menu (?menu=…). Demo: nothing is sent and no card is asked for.
export function ReservationForm() {
  const params = useSearchParams();
  const preset = findMenu(params.get("menu"));
  const [service, setService] = useState<Service>(preset?.services.includes("diner") ? "diner" : (preset?.services[0] ?? "diner"));
  const [slot, setSlot] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [chosen, setChosen] = useState(preset?.slug ?? menus[0].slug);
  const [pairing, setPairing] = useState(false);
  const [reference, setReference] = useState("");

  // A menu not served at this service falls back to the first one that is.
  const available = menus.filter((menu) => menu.services.includes(service));
  const menu = available.find((candidate) => candidate.slug === chosen) ?? available[0];
  const time = slots[service].includes(slot) ? slot : slots[service][0];
  const closed = closedReason(date, service);
  const total = (menu.price + (pairing ? menu.pairing : 0)) * guests;

  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (closed) return;
    setReference(`ARD-${Date.now().toString(36).toUpperCase().slice(-5)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (reference) {
    return (
      <div className={styles.confirmation}>
        <CrAlert lang="fr" variant="success" heading="Demande de réservation envoyée">
          Référence {reference} : table pour {guests} le {longDate(date)} à {time}, {menu.name}
          {pairing ? " avec accord mets et vins" : ""}. Léa Garnier vous rappellera pour confirmer. Ce restaurant est fictif :
          aucune table n&apos;est réservée.
        </CrAlert>
        <div className={styles.actions}>
          <CrButton href="/l/gastronomie/cave" className={styles.book}>
            Découvrir la cave
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
          <legend>La table</legend>
          <div className={styles.twoColumns}>
            <CrDatePicker lang="fr" label="Date" name="date" required onCrChange={(event) => setDate(event.detail)} />
            <CrQuantity lang="fr" label="Convives" value={guests} min={1} max={8} onCrChange={(event) => setGuests(event.detail ?? 1)} />
          </div>
          {closed && (
            <CrAlert lang="fr" variant="warning" heading="Pas de service ce jour-là">
              {closed} Choisissez une autre date ou un autre service.
            </CrAlert>
          )}
          <CrSegmented lang="fr" label="Service" value={service} onCrChange={(event) => setService(event.detail as Service)}>
            {Object.entries(services).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </CrSegmented>
          <CrSegmented key={service} lang="fr" label="Heure d'arrivée" variant="outline" value={time} onCrChange={(event) => setSlot(event.detail)}>
            {slots[service].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </CrSegmented>
          <p className={styles.muted}>Au-delà de 8 convives, demandez le salon privé dans la cave.</p>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>Le menu</legend>
          <CrRadioGroup key={service} lang="fr" label="Menu" name="menu" value={menu.slug} onCrChange={(event) => setChosen(String(event.detail))}>
            {available.map((option) => (
              <option key={option.slug} value={option.slug}>
                {option.name}, {option.courses} temps, {euros(option.price)}
              </option>
            ))}
          </CrRadioGroup>
          <CrSwitch lang="fr" label={`Accord mets et vins (+${euros(menu.pairing)} par personne)`} checked={pairing} onCrChange={(event) => setPairing(event.detail)} />
          <CrSelect lang="fr" label="Occasion" name="occasion" value={occasions[0]}>
            {occasions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </CrSelect>
          <CrTextarea lang="fr" label="Allergies et régimes" name="allergies" placeholder="Fruits à coque, sans lactose, femme enceinte…" />
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

      <aside className={styles.aside} aria-labelledby="recap-titre">
        <CrCard>
          <div slot="header">
            <CrImage src={photo(menu.photo, 600, 450)} alt="" className={styles.summaryPhoto} />
            <h2 id="recap-titre" className={styles.summaryName}>
              {menu.name}
              <span>{date ? `${longDate(date)} à ${time}` : `${services[service]} à ${time}`}</span>
            </h2>
          </div>
          <dl className={styles.lines}>
            <div>
              <dt>Menu × {guests}</dt>
              <dd>{euros(menu.price * guests)}</dd>
            </div>
            {pairing && (
              <div>
                <dt>Accord mets et vins</dt>
                <dd>{euros(menu.pairing * guests)}</dd>
              </div>
            )}
            <div className={styles.total}>
              <dt>Estimation</dt>
              <dd>
                <CrNumber lang="fr" value={total} animation="roll" /> €
              </dd>
            </div>
          </dl>
          <p className={styles.note}>Réglé sur place. Annulation gratuite jusqu&apos;à 48 h avant.</p>
          <CrButton slot="footer" type="submit" size="l" fullWidth disabled={Boolean(closed)} className={styles.book}>
            Demander la table
          </CrButton>
        </CrCard>
      </aside>
    </form>
  );
}
