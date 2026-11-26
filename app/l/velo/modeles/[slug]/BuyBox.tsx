"use client";

import { useState } from "react";
import { CrButton, CrSegmented, CrSelect } from "@cristal-ui/react";
import { addToCart } from "../../Cart";
import { euros, sizes, type Bike } from "../../data";
import { Icon } from "../../Icon";
import styles from "../../velo.module.css";

// Color and size for the model page; the size list shows the rider heights it fits.
export function BuyBox({ bike }: { bike: Bike }) {
  const [color, setColor] = useState(bike.colors[0].name);
  const [size, setSize] = useState("");

  return (
    <>
      <p className={styles.price}>{euros(bike.price)}</p>
      <CrSegmented lang="fr" label="Couleur" value={color} onCrChange={(event) => setColor(event.detail)}>
        {bike.colors.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
      </CrSegmented>
      <CrSelect lang="fr" label="Taille" value={size} placeholder="Choisir une taille" onCrChange={(event) => setSize(String(event.detail ?? ""))}>
        {sizes.map((option) => (
          <option key={option.label} value={option.label}>
            {option.label}, {option.min} à {option.max} cm
          </option>
        ))}
      </CrSelect>
      <CrButton
        size="l"
        className={styles.green}
        disabled={!size}
        onClick={() =>
          addToCart({
            key: `${bike.slug}|${color}|${size}`,
            slug: bike.slug,
            name: `Kairn ${bike.name}`,
            photo: bike.photo,
            options: `${color}, taille ${size}`,
            unitPrice: bike.price,
          })
        }
      >
        <Icon name="bag" /> Ajouter au panier
      </CrButton>
      {!size && <p className={styles.hint}>Choisissez une taille pour l&apos;ajouter au panier.</p>}
    </>
  );
}
