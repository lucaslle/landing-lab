import type { Metadata } from "next";
import Link from "next/link";
import { CrButton, CrImage } from "@cristal-ui/react/ssr";
import { findProperty, formatPrice, heroPhoto, photo, properties } from "./data";
import { Icon, type icons } from "./Icon";
import { PropertyCard } from "./PropertyCard";
import { SearchBar } from "./SearchBar";
import { Specs } from "./Specs";
import styles from "./immobilier.module.css";

export const metadata: Metadata = {
  title: "Haven, agence immobilière · landing-lab",
  description: "Villas, chalets et appartements d'exception, à vendre et à louer, avec un conseiller dédié.",
};

const services: { title: string; text: string; icon: keyof typeof icons; href: string }[] = [
  {
    title: "Conseil d'expert",
    text: "Des agents installés dans chaque région, qui connaissent les rues et les prix.",
    icon: "diamond",
    href: "/l/immobilier/agence",
  },
  {
    title: "Biens choisis",
    text: "Chaque maison est visitée par l'équipe avant d'entrer dans le catalogue.",
    icon: "house",
    href: "/l/immobilier/biens",
  },
  {
    title: "De la visite à la signature",
    text: "Un seul interlocuteur, du premier rendez-vous jusqu'à la remise des clés.",
    icon: "key",
    href: "/l/immobilier/vendre",
  },
  {
    title: "Investir",
    text: "Estimation, rendement locatif et fiscalité étudiés avant de vous engager.",
    icon: "chart",
    href: "/l/immobilier/conseils",
  },
];

const featured = ["villa-azur", "domaine-de-rochefort", "grand-chalet-chamonix", "villa-nocturne"].map(
  (slug) => findProperty(slug)!,
);

export default function RealEstateLanding() {
  const exclusive = findProperty("villa-des-pins")!;

  return (
    <>
      <section className={styles.hero} aria-labelledby="hero-titre">
        <CrImage src={photo(heroPhoto, 2000)} alt="" className={styles.heroPhoto} />
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <p className={styles.kicker}>Bien plus qu&apos;une adresse</p>
            <h1 id="hero-titre" className={styles.title}>
              Trouvez le lieu <em>où vous épanouir</em>
            </h1>
            <p className={styles.lead}>Des biens choisis, un conseiller dédié et une vie à la hauteur du lieu.</p>
            <div className={styles.heroActions}>
              <CrButton href="/l/immobilier/biens" size="l">
                Voir les biens <Icon name="arrow" />
              </CrButton>
              <CrButton href="/l/immobilier/rendez-vous" size="l" variant="outline" className={styles.ghost}>
                Prendre rendez-vous
              </CrButton>
            </div>
          </div>

          <Link href={`/l/immobilier/biens/${exclusive.slug}`} className={styles.exclusive}>
            <span className={styles.kicker}>Exclusivité</span>
            <strong className={styles.exclusiveName}>{exclusive.name}</strong>
            <span className={styles.place}>
              <Icon name="pin" /> {exclusive.city}
            </span>
            <Specs property={exclusive} />
            <span className={styles.exclusivePrice}>
              {formatPrice(exclusive)}
              <span className={styles.round}>
                <Icon name="arrow" />
              </span>
            </span>
            <span className={styles.muted}>Voir le bien</span>
          </Link>
        </div>
      </section>

      <div className={styles.searchWrap}>
        <SearchBar />
      </div>

      <main className={styles.main}>
        <section className={styles.section} aria-labelledby="selection-titre">
          <div className={styles.sectionHead}>
            <div>
              <p className={styles.kicker}>Sélection du moment</p>
              <h2 id="selection-titre" className={styles.heading}>
                Des maisons d&apos;exception
                <em>pour des vies qui le sont aussi</em>
              </h2>
            </div>
            <Link href="/l/immobilier/biens" className={styles.more}>
              Voir les {properties.length} biens <Icon name="arrow" />
            </Link>
          </div>
          <ul className={styles.cards}>
            {featured.map((property, index) => (
              <PropertyCard key={property.slug} property={property} index={index} />
            ))}
          </ul>
        </section>

        <section id="agence" className={styles.section} aria-labelledby="agence-titre">
          <h2 id="agence-titre" className={styles.visuallyHidden}>
            L&apos;agence
          </h2>
          <ul className={styles.services}>
            {services.map((service) => (
              <li key={service.title}>
                <Link href={service.href} className={styles.service}>
                  <Icon name={service.icon} className={styles.serviceIcon} />
                  <strong>{service.title}</strong>
                  <span className={styles.muted}>{service.text}</span>
                  <span className={styles.round}>
                    <Icon name="arrow" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
