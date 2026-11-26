import type { CSSProperties } from "react";
import Link from "next/link";
import { CrBadge, CrImage } from "@cristal-ui/react";
import { photo, type Destination } from "./data";
import styles from "./voyage.module.css";

// One photo card, used on the home page, the destinations list and the detail page.
export function DestinationCard({
  destination,
  index = 0,
  travelers = 1,
}: {
  destination: Destination;
  index?: number;
  travelers?: number;
}) {
  return (
    <li style={{ "--i": index } as CSSProperties}>
      <Link href={`/l/voyage/destinations/${destination.slug}`} className={styles.destination}>
        <CrImage src={photo(destination.photo, 700)} alt={destination.alt} className={styles.destinationPhoto} />
        {destination.tag && <CrBadge className={styles.tag}>{destination.tag}</CrBadge>}
        <span className={styles.destinationInfo}>
          <span>
            <strong>{destination.country}</strong>
            <span className={styles.city}>
              {destination.city} · {destination.nights} nuits
            </span>
          </span>
          <span className={styles.price}>
            <small>{travelers > 1 ? `Pour ${travelers} voyageurs` : "À partir de"}</small>
            {(destination.price * travelers).toLocaleString("fr-FR")} €
          </span>
        </span>
      </Link>
    </li>
  );
}
