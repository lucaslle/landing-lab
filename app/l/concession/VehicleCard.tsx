import Link from "next/link";
import { CrBadge, CrImage } from "@cristal-ui/react";
import { conditions, euros, kilometers, photo, type Vehicle } from "./data";
import { Icon } from "./Icon";
import styles from "./concession.module.css";

// Stock card, as in the mockup: name and price on top, the car below, the whole card is a link.
export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link href={`/l/concession/vehicules/${vehicle.slug}`} className={styles.vehicle}>
      <span className={styles.vehicleHead}>
        <strong>
          {vehicle.brand} {vehicle.model}
        </strong>
        <span className={styles.vehiclePrice}>{euros(vehicle.price)}</span>
        <span className={styles.vehicleMeta}>
          {vehicle.year} · {kilometers(vehicle.mileage)}
        </span>
      </span>
      <CrImage src={photo(vehicle.photo, 700)} alt={vehicle.alt} className={styles.vehiclePhoto} />
      <span className={styles.vehicleFoot}>
        <CrBadge variant={vehicle.condition === "neuf" ? "primary" : "neutral"}>{conditions[vehicle.condition]}</CrBadge>
        <Icon name="arrow" className={styles.vehicleArrow} />
      </span>
    </Link>
  );
}
