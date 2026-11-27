"use client";

import { useState } from "react";
import { CrSegmented, CrTable } from "@cristal-ui/react";
import { wineColors, wines, type WineColor } from "../data";
import styles from "../gastronomie.module.css";

const price = (value: unknown) => (value ? `${value} €` : "—");

// Wine list filtered by color, sortable by vintage and price.
export function WineList() {
  const [color, setColor] = useState<WineColor | "all">("all");
  const rows = wines
    .filter((wine) => color === "all" || wine.color === color)
    .map((wine) => ({ ...wine, id: `${wine.producer}-${wine.name}`, vintage: wine.vintage === "NM" ? "Sans année" : wine.vintage }));

  return (
    <div className={styles.wineList}>
      <CrSegmented lang="fr" label="Couleur" value={color} onCrChange={(event) => setColor(event.detail as WineColor | "all")}>
        <option value="all">Tous</option>
        {Object.entries(wineColors).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </CrSegmented>
      <CrTable
        lang="fr"
        label="Carte des vins"
        rowKey="id"
        variant="striped"
        rows={rows}
        columns={[
          { key: "appellation", label: "Appellation", sortable: true, width: 210 },
          { key: "name", label: "Cuvée", width: 220 },
          { key: "producer", label: "Domaine", width: 236 },
          { key: "vintage", label: "Millésime", sortable: true, width: 120 },
          { key: "glass", label: "Le verre", format: price, align: "end", width: 110 },
          { key: "bottle", label: "La bouteille", format: price, sortable: true, align: "end", width: 130 },
        ]}
      />
    </div>
  );
}
