import type { CSSProperties } from "react";
import Link from "next/link";
import { CrBadge, CrIconButton, CrImage } from "@cristal-ui/react";
import { formatPrice, kinds, photo, type Property } from "./data";
import { Icon } from "./Icon";
import { Specs } from "./Specs";
import styles from "./immobilier.module.css";

// Listing card: the whole card opens the listing; the heart sits above that link.
export function PropertyCard({ property, index = 0 }: { property: Property; index?: number }) {
  return (
    <li className={styles.card} style={{ "--i": index } as CSSProperties}>
      <div className={styles.cardMedia}>
        <CrImage src={photo(property.photo, 700)} alt={property.alt} className={styles.cardPhoto} />
        <CrBadge className={styles.cardKind}>{kinds[property.kind]}</CrBadge>
        <CrIconButton label={`Ajouter ${property.name} aux favoris`} toggle shape="round" variant="ghost" size="s" className={styles.favorite}>
          <Icon name="heart" />
        </CrIconButton>
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardName}>
          <Link href={`/l/immobilier/biens/${property.slug}`} className={styles.cardLink}>
            {property.name}
          </Link>
        </h3>
        <p className={styles.place}>
          <Icon name="pin" /> {property.city}, {property.region}
        </p>
        <Specs property={property} />
        <p className={styles.cardPrice}>{formatPrice(property)}</p>
      </div>
    </li>
  );
}
