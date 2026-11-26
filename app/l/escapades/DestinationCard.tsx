import Link from "next/link";
import { CrImage } from "@cristal-ui/react";
import { euros, photo, type Destination } from "./data";
import styles from "./escapades.module.css";

// Portrait card with the place over the photo, the price below.
export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link href={`/l/escapades/destination/${destination.slug}`} className={styles.tile}>
      <CrImage src={photo(destination.photo, 500, 640)} alt={destination.alt} className={styles.tilePhoto} />
      <span className={styles.tileText}>
        <small>{destination.country}</small>
        <strong>{destination.place}</strong>
        <span>
          {destination.days} jours · dès {euros(destination.offer ?? destination.price)}
          {destination.offer && <s>{euros(destination.price)}</s>}
        </span>
      </span>
    </Link>
  );
}
