import { CrImage, CrPopover } from "@cristal-ui/react";
import { sidePhoto, type Bike } from "./data";
import styles from "./velo.module.css";

// The bike at 16:10 with its hotspots; each "+" opens a short note about that part.
export function BikeFigure({ bike, priority = false }: { bike: Bike; priority?: boolean }) {
  return (
    <figure className={styles.figure}>
      <CrImage src={sidePhoto(bike.photo, priority ? 1600 : 1000)} alt={bike.alt} className={styles.figurePhoto} />
      {bike.hotspots.map((spot) => (
        <CrPopover
          key={spot.title}
          lang="fr"
          label={spot.title}
          className={styles.hotspot}
          style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
        >
          <strong className={styles.hotspotTitle}>{spot.title}</strong>
          <p className={styles.hotspotText}>{spot.text}</p>
        </CrPopover>
      ))}
    </figure>
  );
}
