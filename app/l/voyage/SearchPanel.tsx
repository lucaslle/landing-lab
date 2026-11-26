"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CrButton, CrDatePicker, CrInput, CrQuantity, CrSegmented, CrSelect } from "@cristal-ui/react";
import { destinations } from "./data";
import styles from "./voyage.module.css";

const kinds = { vols: "Vols", hotels: "Hôtels", circuits: "Circuits", sejours: "Séjours" };

// Sends the search to the destinations page, which filters and prices the offers from the URL.
export function SearchPanel() {
  const [kind, setKind] = useState("vols");
  // Kept in state: the select and date pickers are read from their change events, not from FormData.
  const [picked, setPicked] = useState({ destination: "", aller: "", retour: "" });
  const router = useRouter();

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams({ type: kind });
    for (const field of ["depart", "voyageurs"]) {
      const value = data.get(field);
      if (typeof value === "string" && value) params.set(field, value);
    }
    for (const [field, value] of Object.entries(picked)) if (value) params.set(field, value);
    router.push(`/l/voyage/destinations?${params}`);
  };

  return (
    <div className={styles.search}>
      <CrSegmented lang="fr" label="Type de recherche" value={kind} onCrChange={(event) => setKind(event.detail)}>
        {Object.entries(kinds).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </CrSegmented>
      <form className={styles.searchForm} onSubmit={search}>
        <CrInput lang="fr" label="Départ" name="depart" value="Paris" autocomplete="off" />
        <CrSelect
          lang="fr"
          label="Destination"
          name="destination"
          placeholder="Où allez-vous ?"
          searchable
          onCrChange={(event) => setPicked((current) => ({ ...current, destination: String(event.detail) }))}
        >
          {destinations.map((destination) => (
            <option key={destination.slug} value={destination.slug}>
              {destination.city}, {destination.country}
            </option>
          ))}
        </CrSelect>
        <CrDatePicker
          lang="fr"
          label="Aller"
          name="aller"
          onCrChange={(event) => setPicked((current) => ({ ...current, aller: event.detail }))}
        />
        <CrDatePicker
          lang="fr"
          label="Retour"
          name="retour"
          onCrChange={(event) => setPicked((current) => ({ ...current, retour: event.detail }))}
        />
        <CrQuantity lang="fr" label="Voyageurs" name="voyageurs" value={2} min={1} max={9} />
        <CrButton type="submit" size="l" className={styles.searchButton}>
          Rechercher
        </CrButton>
      </form>
    </div>
  );
}
