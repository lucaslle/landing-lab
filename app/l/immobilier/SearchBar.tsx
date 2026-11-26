"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CrButton, CrSelect } from "@cristal-ui/react";
import { budgets, properties, types } from "./data";
import { Icon } from "./Icon";
import styles from "./immobilier.module.css";

const regions = [...new Set(properties.map((property) => property.region))].toSorted();

// Sends the search to the listings page, which filters from the URL.
export function SearchBar() {
  // Kept in state: Cristal selects are read from their change events, not from FormData.
  const [picked, setPicked] = useState({ region: "", type: "", budget: "" });
  const router = useRouter();
  const pick = (field: keyof typeof picked) => (event: CustomEvent<unknown>) =>
    setPicked((current) => ({ ...current, [field]: String(event.detail ?? "") }));

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams(Object.entries(picked).filter(([, value]) => value));
    router.push(`/l/immobilier/biens${params.size ? `?${params}` : ""}`);
  };

  return (
    <form className={styles.search} onSubmit={search} aria-label="Rechercher un bien">
      <span className={styles.searchIcon}>
        <Icon name="search" />
      </span>
      <CrSelect lang="fr" label="Lieu" name="region" placeholder="Toutes les régions" onCrChange={pick("region")}>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </CrSelect>
      <CrSelect lang="fr" label="Type de bien" name="type" placeholder="Tous les types" onCrChange={pick("type")}>
        {Object.entries(types).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </CrSelect>
      <CrSelect lang="fr" label="Budget" name="budget" placeholder="Tous les budgets" onCrChange={pick("budget")}>
        {Object.entries(budgets).map(([value, { label }]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </CrSelect>
      <CrButton type="submit" size="l" className={styles.searchButton}>
        Rechercher
      </CrButton>
    </form>
  );
}
