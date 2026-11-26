"use client";

import { useState } from "react";
import { CrSlider } from "@cristal-ui/react";
import { sizeFor } from "./data";
import styles from "./velo.module.css";

// Rider height to frame size, from the size table.
export function SizeFinder() {
  const [height, setHeight] = useState(176);
  const size = sizeFor(height);

  return (
    <div className={styles.finder}>
      <CrSlider lang="fr" label={`Votre taille : ${height} cm`} min={150} max={200} step={1} value={height} onCrInput={(event) => setHeight(event.detail)} />
      <p className={styles.finderResult}>
        <span>Taille conseillée</span>
        <strong>{size.label}</strong>
        <span>
          pour {size.min} à {size.max} cm
        </span>
      </p>
    </div>
  );
}
