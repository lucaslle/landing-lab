import type { Metadata } from "next";
import Link from "next/link";
import { Coverflow } from "./Coverflow";
import { DestinationCard } from "./DestinationCard";
import { destinations, tripTypes, type TripType } from "./data";
import styles from "./escapades.module.css";

export const metadata: Metadata = {
  title: "Horizons, voyages nature · landing-lab",
  description: "Huit voyages au plus près des paysages : randonnées, road trips et nature sauvage.",
};

const inspiration = [
  { slug: "mont-bromo", text: "Se lever à 3 h pour voir un volcan sortir des nuages : le réveil le plus utile de votre vie." },
  { slug: "iles-feroe", text: "Dix-huit îles, plus de moutons que d'habitants, et une météo qui change toutes les dix minutes." },
  { slug: "patagonie", text: "Le vent souffle à 100 km/h et le Fitz Roy se dévoile une heure par jour : c'est pour ça qu'on y va." },
];

export default function EscapesLanding() {
  return (
    <>
      <Coverflow />

      <main className={styles.main}>
        <section id="types" className={styles.section} aria-labelledby="types-titre">
          <h2 id="types-titre" className={styles.heading}>
            Types de voyage
          </h2>
          {(Object.keys(tripTypes) as TripType[]).map((type) => (
            <div key={type} className={styles.group}>
              <h3 className={styles.groupTitle}>{tripTypes[type]}</h3>
              <ul className={styles.tiles}>
                {destinations
                  .filter((destination) => destination.types.includes(type))
                  .map((destination) => (
                    <li key={destination.slug}>
                      <DestinationCard destination={destination} />
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </section>

        <section id="inspiration" className={styles.section} aria-labelledby="inspiration-titre">
          <h2 id="inspiration-titre" className={styles.heading}>
            S&apos;inspirer
          </h2>
          <ul className={styles.quotes}>
            {inspiration.map((item) => {
              const destination = destinations.find((candidate) => candidate.slug === item.slug)!;
              return (
                <li key={item.slug}>
                  <p>{item.text}</p>
                  <Link href={`/l/escapades/destination/${destination.slug}`}>
                    {destination.place}, {destination.country}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
}
