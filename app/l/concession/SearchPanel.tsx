"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CrButton, CrSegmented, CrSelect } from "@cristal-ui/react";
import { bodies, brands, budgets, conditions } from "./data";
import { Icon } from "./Icon";
import styles from "./concession.module.css";

// Sends the search to the stock page, which filters from the URL.
export function SearchPanel() {
  const [condition, setCondition] = useState("tout");
  // Kept in state: Cristal selects are read from their change events, not from FormData.
  const [picked, setPicked] = useState({ marque: "", carrosserie: "", budget: "" });
  const router = useRouter();
  const pick = (field: keyof typeof picked) => (event: CustomEvent<unknown>) =>
    setPicked((current) => ({ ...current, [field]: String(event.detail ?? "") }));

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams(Object.entries({ etat: condition === "tout" ? "" : condition, ...picked }).filter(([, value]) => value));
    router.push(`/l/concession/vehicules${params.size ? `?${params}` : ""}`);
  };

  return (
    <div className={styles.searchWrap}>
      <CrSegmented lang="fr" label="État" variant="outline" value={condition} onCrChange={(event) => setCondition(event.detail)} className={styles.searchTabs}>
        <option value="tout">Tout le stock</option>
        {Object.entries(conditions).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </CrSegmented>
      <form className={styles.search} onSubmit={search} aria-label="Rechercher un véhicule">
        <CrSelect lang="fr" label="Marque" placeholder="Toutes les marques" onCrChange={pick("marque")}>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </CrSelect>
        <CrSelect lang="fr" label="Carrosserie" placeholder="Toutes" onCrChange={pick("carrosserie")}>
          {Object.entries(bodies).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </CrSelect>
        <CrSelect lang="fr" label="Budget" placeholder="Tous les budgets" onCrChange={pick("budget")}>
          {Object.entries(budgets).map(([value, { label }]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </CrSelect>
        <CrButton type="submit" size="l" className={styles.peach}>
          <Icon name="arrow" /> Voir les véhicules
        </CrButton>
      </form>
    </div>
  );
}
