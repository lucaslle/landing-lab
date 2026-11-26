import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CrAccordion,
  CrAccordionItem,
  CrBadge,
  CrBreadcrumb,
  CrButton,
  CrCard,
  CrImage,
} from "@cristal-ui/react/ssr";
import { continents, destinations, findDestination, photo } from "../../data";
import { DestinationCard } from "../../DestinationCard";
import { Icon } from "../../Icon";
import styles from "../../voyage.module.css";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => destinations.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const destination = findDestination((await params).slug);
  return destination
    ? { title: `${destination.city}, ${destination.country} · Ailleurs`, description: destination.summary }
    : {};
}

const included = ["Vols aller-retour", "Hôtel sélectionné par l'équipe", "Transferts sur place", "Assistance 7j/7"];

export default async function DestinationPage({ params }: Props) {
  const destination = findDestination((await params).slug);
  if (!destination) notFound();
  const others = destinations.filter((other) => other.slug !== destination.slug).slice(0, 4);

  return (
    <>
      <section className={styles.cover} aria-labelledby="destination-titre">
        <CrImage src={photo(destination.photo, 1800)} alt={destination.alt} className={styles.coverPhoto} />
        <div className={styles.coverText}>
          <CrBreadcrumb lang="fr" className={styles.coverCrumbs}>
            <Link href="/l/voyage">Accueil</Link>
            <Link href="/l/voyage/destinations">Destinations</Link>
            <span>{destination.city}</span>
          </CrBreadcrumb>
          <div className={styles.coverBadges}>
            <CrBadge>{continents[destination.continent]}</CrBadge>
            {destination.tag && <CrBadge variant="primary">{destination.tag}</CrBadge>}
          </div>
          <h1 id="destination-titre" className={styles.coverTitle}>
            {destination.city}
            <span>{destination.country}</span>
          </h1>
        </div>
      </section>

      <main className={`${styles.main} ${styles.detail}`}>
        <div className={styles.detailBody}>
          <p className={styles.lead}>{destination.summary}</p>

          <h2 className={styles.subheading}>Les temps forts</h2>
          <ul className={styles.highlights}>
            {destination.highlights.map((highlight) => (
              <li key={highlight}>
                <Icon path="M5 12l4 4 10-10" />
                {highlight}
              </li>
            ))}
          </ul>

          <h2 className={styles.subheading}>Le programme</h2>
          <CrAccordion lang="fr" headingLevel={3} numbered>
            {destination.days.map((day, index) => (
              <CrAccordionItem key={day.title} label={day.title} open={index === 0}>
                {day.text}
              </CrAccordionItem>
            ))}
          </CrAccordion>
        </div>

        <aside className={styles.booking} aria-labelledby="offre-titre">
          <CrCard>
            <h2 id="offre-titre" slot="header" className={styles.bookingTitle}>
              <small>À partir de</small>
              {destination.price.toLocaleString("fr-FR")} € <span>/ personne</span>
            </h2>
            <p className={styles.muted}>
              {destination.nights} nuits · départ de Paris · {destination.days.length} étapes
            </p>
            <ul className={styles.included}>
              {included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <CrButton slot="footer" href={`/l/voyage/reservation?destination=${destination.slug}`} fullWidth>
              Réserver ce voyage
            </CrButton>
          </CrCard>
          <p className={styles.muted}>Modification gratuite jusqu&apos;à 14 jours avant le départ.</p>
        </aside>
      </main>

      <section className={`${styles.main} ${styles.section}`} aria-labelledby="autres-titre">
        <div className={styles.sectionHead}>
          <h2 id="autres-titre" className={styles.heading}>
            Vous aimerez <span>aussi</span>
          </h2>
          <CrButton href="/l/voyage/destinations" variant="outline" size="s">
            Toutes les destinations →
          </CrButton>
        </div>
        <ul className={styles.destinations}>
          {others.map((other, index) => (
            <DestinationCard key={other.slug} destination={other} index={index} />
          ))}
        </ul>
      </section>
    </>
  );
}
