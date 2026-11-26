"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CrSegmented } from "@cristal-ui/react";
import { categories, products, type Category } from "../data";
import { ProductCard } from "../ProductCard";
import styles from "../fast-food.module.css";

// Starts on the category from the URL (?categorie=pizzas), then filters in place.
export function MenuList() {
  const requested = useSearchParams().get("categorie");
  const [category, setCategory] = useState<Category | "all">(
    requested && requested in categories ? (requested as Category) : "all",
  );
  const shown = (Object.keys(categories) as Category[]).filter((key) => category === "all" || key === category);

  return (
    <>
      <div className={styles.toolbar}>
        <CrSegmented lang="fr" label="Catégorie" value={category} onCrChange={(event) => setCategory(event.detail as Category | "all")}>
          <option value="all">Tout</option>
          {Object.entries(categories).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </CrSegmented>
        <p className={styles.muted}>Livraison offerte dès 25 € de commande.</p>
      </div>

      {shown.map((key) => (
        <section key={key} className={styles.group} aria-labelledby={`categorie-${key}`}>
          <h2 id={`categorie-${key}`} className={styles.groupTitle}>
            {categories[key]}
          </h2>
          <ul className={styles.cards}>
            {products
              .filter((product) => product.category === key)
              .map((product, index) => (
                <ProductCard key={product.slug} product={product} index={index} />
              ))}
          </ul>
        </section>
      ))}
    </>
  );
}
