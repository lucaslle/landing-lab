"use client";

import { CrTable } from "@cristal-ui/react";

// Approximate notary fees in France: about 7.5 % of the price in older homes, 2.5 % in new builds.
const OLD_RATE = 0.075;
const NEW_RATE = 0.025;

const euros = (value: unknown) => `${Number(value).toLocaleString("fr-FR")} €`;

const rows = [300_000, 600_000, 1_000_000, 2_000_000].map((price) => ({
  price,
  old: Math.round(price * OLD_RATE),
  new: Math.round(price * NEW_RATE),
}));

export function FeesTable() {
  return (
    <CrTable
      lang="fr"
      label="Frais de notaire selon le prix"
      rowKey="price"
      variant="striped"
      rows={rows}
      columns={[
        { key: "price", label: "Prix du bien", format: euros, sortable: true, width: 220 },
        { key: "old", label: "Frais dans l'ancien (≈ 7,5 %)", format: euros, align: "end", width: 280 },
        { key: "new", label: "Frais dans le neuf (≈ 2,5 %)", format: euros, align: "end", width: 280 },
      ]}
    />
  );
}
