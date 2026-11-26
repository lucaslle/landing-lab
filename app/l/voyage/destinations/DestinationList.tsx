"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CrAlert, CrButton, CrEmptyState, CrSegmented } from "@cristal-ui/react";
import { continents, destinations, findDestination, type Continent } from "../data";
import { DestinationCard } from "../DestinationCard";
import styles from "../voyage.module.css";

const sorts = { popular: "Populaires", cheap: "Prix croissant", long: "Plus longs" };

// Reads the home search from the URL (?destination=bali&voyageurs=2…) and lets the visitor refine it.
export function DestinationList() {
  const params = useSearchParams();
  const router = useRouter();
  const searched = findDestination(params.get("destination"));
  const travelers = Math.min(9, Math.max(1, Number(params.get("voyageurs")) || 1));
  const [continent, setContinent] = useState<Continent | "all">(searched?.continent ?? "all");
  const [sort, setSort] = useState<keyof typeof sorts>("popular");

  const shown = destinations
    .filter((destination) => continent === "all" || destination.continent === continent)
    .toSorted((a, b) =>
      sort === "cheap" ? a.price - b.price : sort === "long" ? b.nights - a.nights : Number(!!b.tag) - Number(!!a.tag),
    )
    // The searched destination comes first.
    .toSorted((a, b) => Number(b === searched) - Number(a === searched));

  return (
    <>
      {params.size > 0 && (
        <CrAlert lang="fr" variant="info" heading="Votre recherche">
          {searched ? `${searched.city}, ${searched.country}` : "Toutes les destinations"} · {travelers} voyageur
          {travelers > 1 ? "s" : ""}
          {params.get("aller") ? ` · départ le ${new Date(params.get("aller")!).toLocaleDateString("fr-FR")}` : ""}. Les
          prix affichés sont pour l&apos;ensemble des voyageurs.
        </CrAlert>
      )}
      {params.size > 0 && (
        <CrButton variant="link" size="s" onClick={() => router.push("/l/voyage/destinations")}>
          Effacer la recherche
        </CrButton>
      )}

      <div className={styles.toolbar}>
        <CrSegmented
          lang="fr"
          label="Continent"
          value={continent}
          onCrChange={(event) => setContinent(event.detail as Continent | "all")}
        >
          <option value="all">Tous</option>
          {Object.entries(continents).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </CrSegmented>
        <CrSegmented
          lang="fr"
          label="Trier"
          variant="underline"
          value={sort}
          onCrChange={(event) => setSort(event.detail as keyof typeof sorts)}
        >
          {Object.entries(sorts).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </CrSegmented>
      </div>

      {shown.length === 0 ? (
        <CrEmptyState lang="fr" heading="Aucune destination sur ce continent" illustration="search">
          Essayez un autre continent ou affichez toutes les destinations.
          <CrButton slot="actions" variant="outline" onClick={() => setContinent("all")}>
            Voir tout
          </CrButton>
        </CrEmptyState>
      ) : (
        <ul className={styles.destinations} aria-live="polite">
          {shown.map((destination, index) => (
            <DestinationCard key={destination.slug} destination={destination} index={index} travelers={travelers} />
          ))}
        </ul>
      )}
    </>
  );
}
