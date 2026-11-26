"use client";

import { useState, type FormEvent } from "react";
import {
  CrAlert,
  CrButton,
  CrDatePicker,
  CrInput,
  CrQuantity,
  CrSegmented,
  CrSelect,
  CrToaster,
} from "@cristal-ui/react";
import styles from "./voyage.module.css";

const kinds = { vols: "Vols", hotels: "Hôtels", circuits: "Circuits", sejours: "Séjours" };

export function SearchPanel({ destinations }: { destinations: string[] }) {
  const [kind, setKind] = useState<keyof typeof kinds>("vols");
  const [toasts, setToasts] = useState<{ id: number; text: string }[]>([]);

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const to = data.get("destination") || "toutes destinations";
    const travelers = data.get("voyageurs") || 1;
    const text = `${kinds[kind]} ${data.get("depart") || "Paris"} → ${to}, ${travelers} voyageur(s) : la réservation n'est pas encore branchée sur cette démo.`;
    setToasts((list) => [...list, { id: Date.now(), text }]);
  };

  // The toaster sits outside the panel: its backdrop-filter would trap the fixed toasts inside it.
  return (
    <>
      <div className={styles.search}>
        <CrSegmented
          lang="fr"
          label="Type de recherche"
          value={kind}
          onCrChange={(event) => setKind(event.detail as keyof typeof kinds)}
        >
          {Object.entries(kinds).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </CrSegmented>
        <form className={styles.searchForm} onSubmit={search}>
          <CrInput lang="fr" label="Départ" name="depart" value="Paris" autocomplete="off" />
          <CrSelect lang="fr" label="Destination" name="destination" placeholder="Où allez-vous ?" searchable>
            {destinations.map((destination) => (
              <option key={destination} value={destination}>
                {destination}
              </option>
            ))}
          </CrSelect>
          <CrDatePicker lang="fr" label="Aller" name="aller" />
          <CrDatePicker lang="fr" label="Retour" name="retour" />
          <CrQuantity lang="fr" label="Voyageurs" name="voyageurs" value={2} min={1} max={9} />
          <CrButton type="submit" size="l" className={styles.searchButton}>
            Rechercher
          </CrButton>
        </form>
      </div>
      <CrToaster lang="fr">
        {toasts.map(({ id, text }) => (
          <CrAlert
            key={id}
            variant="info"
            duration={6000}
            onCrClose={() => setToasts((list) => list.filter((toast) => toast.id !== id))}
          >
            {text}
          </CrAlert>
        ))}
      </CrToaster>
    </>
  );
}
