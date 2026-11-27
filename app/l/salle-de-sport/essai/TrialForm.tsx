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
  CrRadioGroup,
  CrSegmented,
  CrSelect,
  CrTextarea,
} from "@cristal-ui/react";
import { coachesOf, disciplines, findDiscipline, findPlan, photo } from "../data";
import styles from "../salle-de-sport.module.css";

const levels = { debutant: "Je débute", regulier: "Je m'entraîne déjà", confirme: "Je fais de la compétition" };
const slots = ["7 h", "12 h", "17 h", "18 h 30", "20 h"];

const longDate = (date: string) =>
  new Date(`${date}T12:00:00`).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

// Free trial session request, prefilled from a plan (?abonnement=…). Demo: nothing is sent.
export function TrialForm() {
  const params = useSearchParams();
  const plan = findPlan(params.get("abonnement"));
  const [slug, setSlug] = useState(disciplines[0].slug);
  const [level, setLevel] = useState<keyof typeof levels>("debutant");
  const [slot, setSlot] = useState(slots[3]);
  const [date, setDate] = useState("");
  const [reference, setReference] = useState("");
  const discipline = findDiscipline(slug)!;
  const coach = coachesOf(slug)[0];

  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setReference(`FNT-${Date.now().toString(36).toUpperCase().slice(-5)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (reference) {
    return (
      <div className={styles.confirmation}>
        <CrAlert lang="fr" variant="success" heading="Séance d'essai réservée">
          Référence {reference} : {discipline.name.toLowerCase()} avec {coach.name}, le {longDate(date)} à {slot}. Venez 10
          minutes avant en tenue de sport, on s&apos;occupe du reste. Cette salle est fictive : aucune séance n&apos;est réservée.
        </CrAlert>
        <div className={styles.actions}>
          <CrButton href="/l/salle-de-sport/planning" className={styles.cta}>
            Voir le planning
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
          <legend>Votre séance</legend>
          <CrSelect lang="fr" label="Discipline à essayer" value={slug} required onCrChange={(event) => setSlug(String(event.detail))}>
            {disciplines.map((option) => (
              <option key={option.slug} value={option.slug}>
                {option.name}
              </option>
            ))}
          </CrSelect>
          <CrDatePicker lang="fr" label="Date" name="date" required onCrChange={(event) => setDate(event.detail)} />
          <CrSegmented lang="fr" label="Heure" variant="outline" value={slot} onCrChange={(event) => setSlot(event.detail)}>
            {slots.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </CrSegmented>
          <CrRadioGroup lang="fr" label="Votre niveau" name="niveau" value={level} onCrChange={(event) => setLevel(event.detail as keyof typeof levels)}>
            {Object.entries(levels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </CrRadioGroup>
          <CrTextarea lang="fr" label="Votre objectif" name="objectif" placeholder="Premier muscle-up, reprendre après une blessure, préparer un trail…" />
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>Vos coordonnées</legend>
          <CrInput lang="fr" label="Nom complet" name="nom" autocomplete="name" required />
          <div className={styles.twoColumns}>
            <CrInput lang="fr" label="E-mail" name="email" type="email" autocomplete="email" required />
            <CrInput lang="fr" label="Téléphone" name="telephone" type="tel" autocomplete="tel" required />
          </div>
          <CrCheckbox lang="fr" label="Je n'ai pas de contre-indication médicale à la pratique sportive" name="sante" required />
        </fieldset>
      </div>

      <aside className={styles.aside} aria-labelledby="recap-titre">
        <CrCard>
          <div slot="header">
            <CrImage src={photo(discipline.photo, 600, 450)} alt="" className={styles.summaryPhoto} />
            <h2 id="recap-titre" className={styles.summaryName}>
              {discipline.name}
              <span>
                {discipline.duration} min avec {coach.name}
              </span>
            </h2>
          </div>
          <dl className={styles.lines}>
            <div>
              <dt>Quand</dt>
              <dd>{date ? `${longDate(date)}, ${slot}` : "Choisissez une date"}</dd>
            </div>
            <div>
              <dt>Niveau</dt>
              <dd>{levels[level]}</dd>
            </div>
            {plan && (
              <div>
                <dt>Abonnement visé</dt>
                <dd>{plan.name}</dd>
              </div>
            )}
            <div className={styles.total}>
              <dt>Séance</dt>
              <dd>Offerte</dd>
            </div>
          </dl>
          <CrButton slot="footer" type="submit" size="l" fullWidth className={styles.cta}>
            Réserver ma séance
          </CrButton>
        </CrCard>
      </aside>
    </form>
  );
}
