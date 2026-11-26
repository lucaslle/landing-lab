import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CrAvatar, CrBadge, CrBreadcrumb, CrButton, CrCard, CrImage } from "@cristal-ui/react/ssr";
import { findProperty, formatPrice, galleryOf, kinds, officeOf, photo, properties, types } from "../../data";
import { Icon } from "../../Icon";
import { PropertyCard } from "../../PropertyCard";
import { Specs } from "../../Specs";
import { MortgageCalculator } from "./MortgageCalculator";
import styles from "../../immobilier.module.css";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => properties.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = findProperty((await params).slug);
  return property ? { title: `${property.name}, ${property.city} · Haven`, description: property.summary } : {};
}

export default async function PropertyPage({ params }: Props) {
  const property = findProperty((await params).slug);
  if (!property) notFound();
  const office = officeOf(property.region);
  const others = properties.filter((other) => other !== property && other.kind === property.kind).slice(0, 3);

  return (
    <>
      <section className={styles.cover} aria-labelledby="bien-titre">
        <CrImage src={photo(property.photo, 2000)} alt={property.alt} className={styles.coverPhoto} />
        <div className={styles.coverText}>
          <CrBreadcrumb lang="fr">
            <Link href="/l/immobilier">Accueil</Link>
            <Link href="/l/immobilier/biens">Nos biens</Link>
            <span>{property.name}</span>
          </CrBreadcrumb>
          <CrBadge>
            {kinds[property.kind]} · {types[property.type]}
          </CrBadge>
          <h1 id="bien-titre" className={styles.coverTitle}>
            {property.name}
          </h1>
          <p className={styles.place}>
            <Icon name="pin" /> {property.city}, {property.region}
          </p>
          <p className={styles.coverPrice}>{formatPrice(property)}</p>
        </div>
      </section>

      <main className={styles.main}>
        <ul className={styles.gallery} aria-label="Photos de l'intérieur">
          {galleryOf(property).map((image) => (
            <li key={image.id}>
              <CrImage src={photo(image.id, 800)} alt={image.alt} />
            </li>
          ))}
        </ul>

        <div className={styles.detail}>
          <div className={styles.detailBody}>
            <Specs property={property} />
            <p className={styles.prose}>{property.summary}</p>

            <h2 className={styles.subheading}>Les points forts</h2>
            <ul className={styles.features}>
              {property.features.map((feature) => (
                <li key={feature}>
                  <Icon name="check" /> {feature}
                </li>
              ))}
            </ul>

            <h2 className={styles.subheading}>En bref</h2>
            <dl className={styles.facts}>
              <div>
                <dt>Type</dt>
                <dd>{types[property.type]}</dd>
              </div>
              <div>
                <dt>Construction</dt>
                <dd>{property.year}</dd>
              </div>
              {property.land && (
                <div>
                  <dt>Terrain</dt>
                  <dd>{property.land.toLocaleString("fr-FR")} m²</dd>
                </div>
              )}
              <div>
                <dt>Prix au m²</dt>
                <dd>
                  {Math.round(property.price / property.area).toLocaleString("fr-FR")} €
                  {property.kind === "location" ? " / mois" : ""}
                </dd>
              </div>
            </dl>
          </div>

          <aside className={styles.aside} aria-labelledby="visite-titre">
            <CrCard>
              <h2 id="visite-titre" slot="header" className={styles.asideTitle}>
                <small>{property.kind === "vente" ? "Prix de vente" : "Loyer mensuel"}</small>
                {formatPrice(property)}
              </h2>
              <div className={styles.agent}>
                <CrAvatar name={office.agent} />
                <span>
                  {office.agent}
                  <span className={styles.muted}>Agence Haven {office.city}, {office.phone}</span>
                </span>
              </div>
              <CrButton slot="footer" href={`/l/immobilier/rendez-vous?bien=${property.slug}`} fullWidth>
                Planifier une visite
              </CrButton>
            </CrCard>

            {property.kind === "vente" && (
              <CrCard>
                <h2 slot="header" className={styles.asideTitle}>
                  <small>Simulation de prêt</small>
                  Votre mensualité
                </h2>
                <MortgageCalculator price={property.price} />
              </CrCard>
            )}
          </aside>
        </div>

        {others.length > 0 && (
          <section className={styles.section} aria-labelledby="autres-titre">
            <div className={styles.sectionHead}>
              <h2 id="autres-titre" className={styles.heading}>
                Dans le même esprit
              </h2>
              <Link href={`/l/immobilier/biens?offre=${property.kind}`} className={styles.more}>
                Tous les biens {property.kind === "vente" ? "à vendre" : "à louer"} <Icon name="arrow" />
              </Link>
            </div>
            <ul className={styles.cards}>
              {others.map((other, index) => (
                <PropertyCard key={other.slug} property={other} index={index} />
              ))}
            </ul>
          </section>
        )}
      </main>
    </>
  );
}
