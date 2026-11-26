"use client";

import { useState } from "react";
import Link from "next/link";
import { CrButton, CrCheckbox, CrNumber, CrQuantity, CrRadioGroup } from "@cristal-ui/react";
import { addToCart } from "../../Cart";
import { euros, optionsByCategory, type Product } from "../../data";
import { Icon } from "../../Icon";
import styles from "../../fast-food.module.css";

// Size, extras and quantity, with the price updated as the visitor chooses.
export function ProductOptions({ product }: { product: Product }) {
  const { sizes, extras } = optionsByCategory[product.category];
  const [sizeIndex, setSizeIndex] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const size = sizes?.[sizeIndex];
  const chosenExtras = extras.filter((extra) => picked.includes(extra.id));
  const unitPrice = product.price + (size?.price ?? 0) + chosenExtras.reduce((sum, extra) => sum + extra.price, 0);

  const add = () => {
    addToCart(
      {
        key: `${product.slug}|${size?.label ?? ""}|${picked.toSorted().join(",")}`,
        slug: product.slug,
        name: product.name,
        photo: product.photo,
        options: [size?.label, ...chosenExtras.map((extra) => extra.label)].filter(Boolean).join(", "),
        unitPrice,
      },
      quantity,
    );
    setAdded(true);
  };

  return (
    <div className={styles.options}>
      {sizes && (
        <CrRadioGroup lang="fr" label="Format" value={String(sizeIndex)} onCrChange={(event) => setSizeIndex(Number(event.detail))}>
          {sizes.map((option, index) => (
            <option key={option.label} value={String(index)}>
              {option.label}
              {option.price ? ` (+${euros(option.price)})` : ""}
            </option>
          ))}
        </CrRadioGroup>
      )}
      <fieldset className={styles.extras}>
        <legend>Suppléments</legend>
        {extras.map((extra) => (
          <CrCheckbox
            key={extra.id}
            lang="fr"
            label={`${extra.label} (+${euros(extra.price)})`}
            checked={picked.includes(extra.id)}
            onCrChange={(event) =>
              setPicked((current) => (event.detail ? [...current, extra.id] : current.filter((id) => id !== extra.id)))
            }
          />
        ))}
      </fieldset>
      <div className={styles.buy}>
        <CrQuantity lang="fr" label="Quantité" value={quantity} min={1} max={10} onCrChange={(event) => setQuantity(event.detail ?? 1)} />
        <p className={styles.total}>
          <CrNumber lang="fr" value={Math.round(unitPrice * quantity * 100) / 100} decimals={2} animation="roll" /> €
        </p>
      </div>
      <CrButton size="l" fullWidth className={styles.cta} onClick={add}>
        <Icon name="cart" /> Ajouter au panier
      </CrButton>
      {added && (
        <Link href="/l/fast-food/commande" className={styles.toastLink}>
          Voir le panier et commander
        </Link>
      )}
    </div>
  );
}
