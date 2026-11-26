"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CrButton, CrEmptyState, CrSegmented, CrSelect } from "@cristal-ui/react";
import { bodies, brands, budgets, conditions, vehicles, type Body, type Budget, type Condition } from "../data";
import { VehicleCard } from "../VehicleCard";
import styles from "../concession.module.css";

const sorts = { cheap: "Prix croissant", expensive: "Prix décroissant", recent: "Plus récentes", power: "Plus puissantes" };
type Sort = keyof typeof sorts;

const known = <T extends string>(value: string | null, allowed: Record<T, unknown>) =>
  value && value in allowed ? (value as T) : "";

// Starts from the home search (?etat=occasion&marque=Bentley&carrosserie=coupe&budget=250), then filters in place.
export function StockList() {
  const params = useSearchParams();
  const [condition, setCondition] = useState<Condition | "">(known(params.get("etat"), conditions));
  const [brand, setBrand] = useState(brands.includes(params.get("marque") ?? "") ? params.get("marque")! : "");
  const [body, setBody] = useState<Body | "">(known(params.get("carrosserie"), bodies));
  const [budget, setBudget] = useState<Budget | "">(known(params.get("budget"), budgets));
  const [sort, setSort] = useState<Sort>("cheap");

  const shown = vehicles
    .filter(
      (vehicle) =>
        (!condition || vehicle.condition === condition) &&
        (!brand || vehicle.brand === brand) &&
        (!body || vehicle.body === body) &&
        (!budget || vehicle.price <= budgets[budget].max),
    )
    .toSorted((a, b) =>
      sort === "expensive" ? b.price - a.price : sort === "recent" ? b.year - a.year : sort === "power" ? b.power - a.power : a.price - b.price,
    );

  const reset = () => {
    setCondition("");
    setBrand("");
    setBody("");
    setBudget("");
  };

  return (
    <>
      <div className={styles.toolbar}>
        <CrSegmented lang="fr" label="État" value={condition || "tout"} onCrChange={(event) => setCondition(event.detail === "tout" ? "" : (event.detail as Condition))}>
          <option value="tout">Tout</option>
          {Object.entries(conditions).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </CrSegmented>
        <CrSelect lang="fr" label="Marque" value={brand} placeholder="Toutes les marques" onCrChange={(event) => setBrand(String(event.detail ?? ""))}>
          {brands.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </CrSelect>
        <CrSelect lang="fr" label="Carrosserie" value={body} placeholder="Toutes" onCrChange={(event) => setBody(String(event.detail ?? "") as Body)}>
          {Object.entries(bodies).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </CrSelect>
        <CrSelect lang="fr" label="Budget" value={budget} placeholder="Tous les budgets" onCrChange={(event) => setBudget(String(event.detail ?? "") as Budget)}>
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
        {shown.length} véhicule{shown.length > 1 ? "s" : ""}
        {(condition || brand || body || budget) && (
          <>
            {" · "}
            <CrButton variant="link" size="s" onClick={reset}>
              Effacer les filtres
            </CrButton>
          </>
        )}
      </p>

      {shown.length === 0 ? (
        <CrEmptyState lang="fr" heading="Aucun véhicule ne correspond" illustration="search">
          Une partie de nos arrivages n&apos;est pas encore en ligne : décrivez-nous la voiture recherchée lors d&apos;un
          rendez-vous.
          <CrButton slot="actions" variant="outline" onClick={reset}>
            Voir tout le stock
          </CrButton>
        </CrEmptyState>
      ) : (
        <ul className={styles.grid}>
          {shown.map((vehicle) => (
            <li key={vehicle.slug}>
              <VehicleCard vehicle={vehicle} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
