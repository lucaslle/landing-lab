import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CrBadge, CrBreadcrumb, CrButton, CrCard, CrImage } from "@cristal-ui/react/ssr";
import { bodies, conditions, euros, findVehicle, kilometers, photo, vehicles } from "../../data";
import { Icon } from "../../Icon";
import { VehicleCard } from "../../VehicleCard";
import { Financing } from "./Financing";
import styles from "../../concession.module.css";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => vehicles.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const vehicle = findVehicle((await params).slug);
  return vehicle ? { title: `${vehicle.brand} ${vehicle.model} ${vehicle.year} · Renc`, description: vehicle.summary } : {};
}

export default async function VehiclePage({ params }: Props) {
  const vehicle = findVehicle((await params).slug);
  if (!vehicle) notFound();
  const others = vehicles.filter((other) => other !== vehicle && other.body === vehicle.body).slice(0, 3);
  const specs = [
    { icon: "calendar", label: "Année", value: String(vehicle.year) },
    { icon: "road", label: "Kilométrage", value: kilometers(vehicle.mileage) },
    { icon: "bolt", label: "Puissance", value: `${vehicle.power} ch` },
    { icon: "gauge", label: "0 à 100 km/h", value: `${vehicle.acceleration.toLocaleString("fr-FR")} s` },
  ] as const;

  return (
    <main className={styles.inner}>
      <CrBreadcrumb lang="fr">
        <Link href="/l/concession">Accueil</Link>
        <Link href="/l/concession/vehicules">Véhicules</Link>
        <span>
          {vehicle.brand} {vehicle.model}
        </span>
      </CrBreadcrumb>

      <div className={styles.detail}>
        <div className={styles.detailBody}>
          <CrImage src={photo(vehicle.photo, 1600)} alt={vehicle.alt} className={styles.detailPhoto} />
          <div className={styles.actions}>
            <CrBadge variant={vehicle.condition === "neuf" ? "primary" : "neutral"}>{conditions[vehicle.condition]}</CrBadge>
            <CrBadge>{bodies[vehicle.body]}</CrBadge>
          </div>
          <h1 className={styles.headingLarge}>
            {vehicle.brand} {vehicle.model}
          </h1>
          <dl className={styles.specs}>
            {specs.map((spec) => (
              <div key={spec.label}>
                <dt>
                  <Icon name={spec.icon} /> {spec.label}
                </dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
          <p className={styles.prose}>{vehicle.summary}</p>
          <p className={styles.muted}>
            {vehicle.engine} · boîte automatique · {vehicle.color}
          </p>
          <h2 className={styles.subheading}>Équipements</h2>
          <ul className={styles.equipment}>
            {vehicle.equipment.map((item) => (
              <li key={item}>
                <Icon name="check" /> {item}
              </li>
            ))}
          </ul>
        </div>

        <aside className={styles.aside} aria-labelledby="prix-titre">
          <CrCard>
            <h2 id="prix-titre" slot="header" className={styles.asideTitle}>
              <small>Prix TTC</small>
              {euros(vehicle.price)}
            </h2>
            <p className={styles.muted}>
              {vehicle.condition === "neuf" ? "Garantie constructeur de 3 ans." : "Contrôlée en 150 points, garantie 12 mois."}{" "}
              Reprise de votre véhicule possible.
            </p>
            <CrButton slot="footer" href={`/l/concession/essai?vehicule=${vehicle.slug}`} fullWidth className={styles.peach}>
              Réserver un essai
            </CrButton>
          </CrCard>
          <CrCard>
            <h2 slot="header" className={styles.asideTitle}>
              <small>Financement</small>
              Votre mensualité
            </h2>
            <Financing price={vehicle.price} />
          </CrCard>
        </aside>
      </div>

      {others.length > 0 && (
        <section className={styles.section} aria-labelledby="autres-titre">
          <h2 id="autres-titre" className={styles.heading}>
            Dans le même esprit
          </h2>
          <ul className={styles.grid} style={{ marginTop: 32 }}>
            {others.map((other) => (
              <li key={other.slug}>
                <VehicleCard vehicle={other} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
