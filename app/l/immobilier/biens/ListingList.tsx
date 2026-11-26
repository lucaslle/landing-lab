"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CrButton, CrEmptyState, CrSegmented, CrSelect } from "@cristal-ui/react";
import { budgets, kinds, properties, types, type Budget, type Kind, type PropertyType } from "../data";
import { PropertyCard } from "../PropertyCard";
import styles from "../immobilier.module.css";

const sorts = { recent: "Plus récents", cheap: "Prix croissant", expensive: "Prix décroissant", large: "Plus grands" };
type Sort = keyof typeof sorts;

const pick = <T extends string>(value: string | null, allowed: Record<T, unknown>) =>
  value && value in allowed ? (value as T) : "";

// Starts from the home search (?offre=vente&type=villa&region=Var&budget=3-6) and lets the visitor refine it.
export function ListingList() {
  const params = useSearchParams();
  const [kind, setKind] = useState<Kind | "">(pick(params.get("offre"), kinds));
  const [type, setType] = useState<PropertyType | "">(pick(params.get("type"), types));
  const [budget, setBudget] = useState<Budget | "">(pick(params.get("budget"), budgets));
  const [region, setRegion] = useState(params.get("region") ?? "");
  const [sort, setSort] = useState<Sort>("recent");

  const shown = properties
    .filter(
      (property) =>
        (!kind || property.kind === kind) &&
        (!type || property.type === type) &&
        (!region || property.region === region) &&
        // A budget is a sale price: rentals stay out of it.
        (!budget ||
          (property.kind === "vente" && property.price >= budgets[budget].min && property.price < budgets[budget].max)),
    )
    .toSorted((a, b) =>
      sort === "cheap" ? a.price - b.price : sort === "expensive" ? b.price - a.price : sort === "large" ? b.area - a.area : b.year - a.year,
    );

  const reset = () => {
    setKind("");
    setType("");
    setBudget("");
    setRegion("");
  };

  return (
    <>
      <div className={styles.toolbar}>
        <CrSegmented lang="fr" label="Offre" value={kind || "all"} onCrChange={(event) => setKind(event.detail === "all" ? "" : (event.detail as Kind))}>
          <option value="all">Tout</option>
          {Object.entries(kinds).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </CrSegmented>
        <CrSelect lang="fr" label="Type de bien" value={type} placeholder="Tous les types" onCrChange={(event) => setType(String(event.detail ?? "") as PropertyType)}>
          {Object.entries(types).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </CrSelect>
        <CrSelect lang="fr" label="Budget d'achat" value={budget} placeholder="Tous les budgets" onCrChange={(event) => setBudget(String(event.detail ?? "") as Budget)}>
          {Object.entries(budgets).map(([value, { label }]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </CrSelect>
        <CrSelect lang="fr" label="Trier" value={sort} onCrChange={(event) => setSort(String(event.detail) as Sort)}>
          {Object.entries(sorts).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </CrSelect>
      </div>

      <p className={styles.count} aria-live="polite">
        {shown.length} bien{shown.length > 1 ? "s" : ""}
        {region && ` en ${region}`}
        {(kind || type || budget || region) && (
          <>
            {" · "}
            <CrButton variant="link" size="s" onClick={reset}>
              Effacer les filtres
            </CrButton>
          </>
        )}
      </p>

      {shown.length === 0 ? (
        <CrEmptyState lang="fr" heading="Aucun bien ne correspond" illustration="search">
          Élargissez le budget ou le type de bien, ou parlez-en à un conseiller : une partie de nos biens est vendue hors
          catalogue.
          <CrButton slot="actions" variant="outline" onClick={reset}>
            Voir tous les biens
          </CrButton>
        </CrEmptyState>
      ) : (
        <ul className={styles.cards}>
          {shown.map((property, index) => (
            <PropertyCard key={property.slug} property={property} index={index} />
          ))}
        </ul>
      )}
    </>
  );
}
