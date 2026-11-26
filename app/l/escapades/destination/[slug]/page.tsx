import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CrAccordion, CrAccordionItem, CrBadge, CrBreadcrumb, CrButton, CrCard, CrImage } from "@cristal-ui/react/ssr";
import { DestinationCard } from "../../DestinationCard";
import { destinations, euros, findDestination, photo, tripTypes } from "../../data";
import styles from "../../escapades.module.css";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => destinations.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const destination = findDestination((await params).slug);
  return destination ? { title: `${destination.place}, ${destination.country} · Horizons`, description: destination.summary } : {};
}

export default async function DestinationPage({ params }: Props) {
  const destination = findDestination((await params).slug);
  if (!destination) notFound();
  const others = destinations
    .filter((other) => other !== destination && other.types.some((type) => destination.types.includes(type)))
    .slice(0, 4);

  return (
    <>
      <section className={styles.cover} aria-labelledby="destination-titre">
        <CrImage src={photo(destination.photo, 2000, 1100)} alt={destination.alt} className={styles.coverPhoto} />
        <div className={styles.coverText}>
          <CrBreadcrumb lang="fr">
            <Link href="/l/escapades">Destinations</Link>
            <span>{destination.place}</span>
          </CrBreadcrumb>
          <div className={styles.actions}>
            {destination.types.map((type) => (
              <CrBadge key={type}>{tripTypes[type]}</CrBadge>
            ))}
          </div>
          <h1 id="destination-titre" className={styles.title}>
            {destination.place}
            <span>– {destination.country}</span>
          </h1>
          <p className={styles.tagline}>{destination.tagline}</p>
        </div>
      </section>

      <main className={styles.main}>
        <div className={styles.detail}>
          <div className={styles.detailBody}>
            <p className={styles.prose}>{destination.summary}</p>
            <div className={styles.gallery}>
              {destination.gallery.map((id) => (
                <CrImage key={id} src={photo(id, 800, 600)} alt="" className={styles.galleryPhoto} />
              ))}
            </div>
            <h2 className={styles.heading}>Le voyage</h2>
            <CrAccordion lang="fr" headingLevel={3} numbered>
              {destination.steps.map((step, index) => (
                <CrAccordionItem key={step.title} label={step.title} open={index === 0}>
                  {step.text}
                </CrAccordionItem>
              ))}
            </CrAccordion>
          </div>

          <aside className={styles.aside} aria-labelledby="prix-titre">
            <CrCard>
              <h2 id="prix-titre" slot="header" className={styles.price}>
                <small>Par personne, vols compris</small>
                {euros(destination.offer ?? destination.price)}
                {destination.offer && <s>{euros(destination.price)}</s>}
              </h2>
              <dl className={styles.facts}>
                <div>
                  <dt>Durée</dt>
                  <dd>{destination.days} jours</dd>
                </div>
                <div>
                  <dt>Meilleure saison</dt>
                  <dd>{destination.season}</dd>
                </div>
                <div>
                  <dt>Groupe</dt>
                  <dd>12 voyageurs au plus</dd>
                </div>
              </dl>
              <CrButton slot="footer" href={`/l/escapades/reserver?destination=${destination.slug}`} fullWidth className={styles.book}>
                Réserver ce voyage
              </CrButton>
            </CrCard>
          </aside>
        </div>

        {others.length > 0 && (
          <section className={styles.section} aria-labelledby="autres-titre">
            <h2 id="autres-titre" className={styles.heading}>
              Dans le même esprit
            </h2>
            <ul className={styles.tiles}>
              {others.map((other) => (
                <li key={other.slug}>
                  <DestinationCard destination={other} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </>
  );
}
