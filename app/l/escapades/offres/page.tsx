import type { Metadata } from "next";
import Link from "next/link";
import { CrAlert, CrBreadcrumb } from "@cristal-ui/react/ssr";
import { DestinationCard } from "../DestinationCard";
import { destinations } from "../data";
import styles from "../escapades.module.css";

export const metadata: Metadata = {
  title: "Offres spéciales · Horizons",
  description: "Les départs à prix réduit de la saison.",
};

const offers = destinations.filter((destination) => destination.offer);

export default function OffersPage() {
  return (
    <main className={styles.inner}>
      <CrBreadcrumb lang="fr">
        <Link href="/l/escapades">Destinations</Link>
        <span>Offres spéciales</span>
      </CrBreadcrumb>
      <h1 className={styles.heading}>Offres spéciales</h1>
      <CrAlert lang="fr" variant="info" heading="Départs garantis">
        Ces prix valent pour les départs déjà confirmés de la saison, dans la limite des places restantes.
      </CrAlert>
      <ul className={styles.tiles}>
        {offers.map((destination) => (
          <li key={destination.slug}>
            <DestinationCard destination={destination} />
          </li>
        ))}
      </ul>
    </main>
  );
}
