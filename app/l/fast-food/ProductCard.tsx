import type { CSSProperties } from "react";
import Link from "next/link";
import { CrBadge, CrImage } from "@cristal-ui/react";
import { AddToCart } from "./Cart";
import { euros, photo, type Product } from "./data";
import styles from "./fast-food.module.css";

// Menu card: the photo and name open the product page, the button adds the default version to the cart.
export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <li className={styles.card} style={{ "--i": index } as CSSProperties}>
      <div className={styles.cardMedia}>
        <CrImage src={photo(product.photo, 600)} alt={product.alt} className={styles.cardPhoto} />
        {product.tag && (
          <CrBadge variant={product.tag === "Épicé" ? "danger" : "primary"} className={styles.cardTag}>
            {product.tag}
          </CrBadge>
        )}
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardName}>
          <Link href={`/l/fast-food/carte/${product.slug}`} className={styles.cardLink}>
            {product.name}
          </Link>
        </h3>
        <p className={styles.cardText}>{product.description}</p>
        <div className={styles.cardFoot}>
          <strong className={styles.price}>{euros(product.price)}</strong>
          <AddToCart product={product} />
        </div>
      </div>
    </li>
  );
}
