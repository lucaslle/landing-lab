import type { Property } from "./data";
import { Icon } from "./Icon";
import styles from "./immobilier.module.css";

// Bedrooms, bathrooms and living area: the three figures every listing leads with.
export function Specs({ property }: { property: Property }) {
  return (
    <dl className={styles.specs}>
      <div>
        <dt>Chambres</dt>
        <dd>
          <Icon name="bed" /> {property.bedrooms}
        </dd>
      </div>
      <div>
        <dt>Salles de bains</dt>
        <dd>
          <Icon name="bath" /> {property.bathrooms}
        </dd>
      </div>
      <div>
        <dt>Surface</dt>
        <dd>
          <Icon name="area" /> {property.area} m²
        </dd>
      </div>
    </dl>
  );
}
