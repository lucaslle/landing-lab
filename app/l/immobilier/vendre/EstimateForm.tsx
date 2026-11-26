"use client";

import { useState } from "react";
import { CrButton, CrCard, CrNumber, CrRadioGroup, CrSelect, CrSlider, CrSwitch } from "@cristal-ui/react";
import { offices, pricePerSquareMeter } from "../data";
import styles from "../immobilier.module.css";

const conditions = {
  neuf: { label: "Neuf ou rénové il y a moins de 5 ans", factor: 1.1 },
  bon: { label: "Bon état", factor: 1 },
  travaux: { label: "Travaux à prévoir", factor: 0.82 },
};
type Condition = keyof typeof conditions;

const roundTo = (value: number, step: number) => Math.round(value / step) * step;

// Estimate = area × the office's average price per m², adjusted for condition, pool and view; shown as a ±8 % range.
export function estimate(perSquareMeter: number, area: number, condition: Condition, pool: boolean, view: boolean) {
  const value = perSquareMeter * area * conditions[condition].factor * (pool ? 1.06 : 1) * (view ? 1.12 : 1);
  return { low: roundTo(value * 0.92, 10_000), high: roundTo(value * 1.08, 10_000) };
}

export function EstimateForm() {
  const [officeSlug, setOfficeSlug] = useState(offices[0].slug);
  const [area, setArea] = useState(150);
  const [condition, setCondition] = useState<Condition>("bon");
  const [pool, setPool] = useState(true);
  const [view, setView] = useState(false);
  const office = offices.find((option) => option.slug === officeSlug)!;
  const perSquareMeter = pricePerSquareMeter(office);
  const { low, high } = estimate(perSquareMeter, area, condition, pool, view);

  return (
    <div className={styles.appointment}>
      <fieldset className={styles.fieldset}>
        <legend>Votre bien</legend>
        <CrSelect lang="fr" label="Secteur" value={officeSlug} onCrChange={(event) => setOfficeSlug(String(event.detail))}>
          {offices.map((option) => (
            <option key={option.slug} value={option.slug}>
              {option.area} ({option.regions.join(", ")})
            </option>
          ))}
        </CrSelect>
        <CrSlider lang="fr" label={`Surface habitable : ${area} m²`} min={50} max={400} step={10} value={area} onCrInput={(event) => setArea(event.detail)} />
        <CrRadioGroup lang="fr" label="État" value={condition} onCrChange={(event) => setCondition(event.detail as Condition)}>
          {Object.entries(conditions).map(([value, { label }]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </CrRadioGroup>
        <div className={styles.twoColumns}>
          <CrSwitch lang="fr" label="Piscine" checked={pool} onCrChange={(event) => setPool(event.detail)} />
          <CrSwitch lang="fr" label="Vue mer ou montagne" checked={view} onCrChange={(event) => setView(event.detail)} />
        </div>
      </fieldset>

      <aside className={styles.aside} aria-labelledby="estimation-titre">
        <CrCard>
          <h2 id="estimation-titre" slot="header" className={styles.asideTitle}>
            <small>Estimation indicative</small>
            <span>
              Entre <CrNumber lang="fr" value={low} animation="roll" /> €
            </span>
            <span>
              et <CrNumber lang="fr" value={high} animation="roll" /> €
            </span>
          </h2>
          <p className={styles.muted}>
            Calculée sur {perSquareMeter.toLocaleString("fr-FR")} € le m², la moyenne de nos ventes en {office.area}.{" "}
            {office.agent} affine ce chiffre lors d&apos;une visite gratuite.
          </p>
          <CrButton slot="footer" href="/l/immobilier/rendez-vous?motif=estimation" fullWidth>
            Demander une estimation sur place
          </CrButton>
        </CrCard>
      </aside>
    </div>
  );
}
