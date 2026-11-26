import type { Metadata } from "next";
import Link from "next/link";
import { CrButton, CrImage } from "@cristal-ui/react/ssr";
import { Carousel } from "./Carousel";
import { euros, findVehicle, heroPhoto, longDate, offer, photo, posts, vehicles } from "./data";
import { Icon } from "./Icon";
import { Newsletter } from "./Newsletter";
import { SearchPanel } from "./SearchPanel";
import { VehicleCard } from "./VehicleCard";
import styles from "./concession.module.css";

export const metadata: Metadata = {
  title: "Renc, concessionnaire de prestige · landing-lab",
  description: "Rolls-Royce, Bentley, Porsche, McLaren : voitures de prestige neuves et d'occasion, contrôlées et garanties, à Paris.",
};

export default function DealerLanding() {
  const featured = findVehicle(offer.slug)!;
  const highlight = findVehicle("rolls-royce-wraith")!;

  return (
    <>
      <section className={styles.hero} aria-labelledby="hero-titre">
        <CrImage src={photo(heroPhoto, 2000)} alt="" className={styles.heroPhoto} />
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <h1 id="hero-titre" className={styles.title}>
              L&apos;automobile d&apos;exception à Paris
            </h1>
            <CrButton href="/l/concession/vehicules" className={styles.peach}>
              Voir le stock
            </CrButton>
          </div>
          <Link href={`/l/concession/vehicules/${highlight.slug}`} className={styles.floating}>
            <span className={styles.floatingHead}>
              {euros(highlight.price)}
              <span className={styles.round}>
                <Icon name="arrow" />
              </span>
            </span>
            <CrImage src={photo(highlight.photo, 500)} alt={highlight.alt} className={styles.floatingPhoto} />
            <span className={styles.floatingName}>
              {highlight.brand} {highlight.model}, {highlight.year}
            </span>
          </Link>
          <p className={styles.heroNote}>
            Chaque voiture du stock est contrôlée en 150 points dans notre atelier et vendue avec 12 mois de garantie au
            minimum.
          </p>
        </div>
        <SearchPanel />
      </section>

      <main>
        <section id="a-propos" className={`${styles.wrap} ${styles.about}`} aria-labelledby="a-propos-titre">
          <div className={styles.aboutText}>
            <h2 id="a-propos-titre" className={styles.heading}>
              À propos
            </h2>
            <p>
              Renc vend des voitures de prestige neuves et d&apos;occasion depuis 2011, avenue de la Grande-Armée. Nous
              n&apos;achetons que des voitures à l&apos;historique complet, entretenues dans le réseau de leur marque.
            </p>
            <p>
              Reprise de votre véhicule, financement, livraison à domicile et gardiennage : un seul interlocuteur vous
              accompagne avant et après l&apos;achat.
            </p>
          </div>
          <CrImage src={photo("1584082411947-dfa856e714eb", 800)} alt="Voiture de sport exposée derrière une vitrine" className={styles.aboutTall} />
          <div className={styles.aboutSide}>
            <p className={styles.years}>
              <strong>15 ans</strong>
              d&apos;expérience
            </p>
            <CrImage src={photo("1649136378672-b965cb9935d5", 700)} alt="Intérieur en cuir cognac" className={styles.aboutSmall} />
          </div>
        </section>

        <section className={styles.offer} aria-labelledby="offre-titre">
          <div className={styles.offerText}>
            <h2 id="offre-titre" className={styles.heading}>
              Offre du moment
            </h2>
            <p className={styles.offerCar}>
              {featured.brand} {featured.model}
              <span>
                {euros(featured.price)} <s>{euros(offer.previousPrice)}</s>
              </span>
            </p>
            <CrButton href={`/l/concession/vehicules/${featured.slug}`} className={styles.peach}>
              Découvrir
            </CrButton>
          </div>
          <CrImage src={photo(featured.photo, 1200)} alt={featured.alt} className={styles.offerPhoto} />
        </section>

        <section className={styles.stock} aria-labelledby="vehicules-titre">
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <h2 id="vehicules-titre" className={styles.headingLarge}>
                Véhicules
              </h2>
              <p className={styles.muted}>
                {vehicles.length} voitures en stock, visibles au showroom.{" "}
                <Link href="/l/concession/vehicules">Tout voir</Link>
              </p>
            </div>
            <Carousel label="Véhicules en stock">
              {vehicles.map((vehicle) => (
                <li key={vehicle.slug}>
                  <VehicleCard vehicle={vehicle} />
                </li>
              ))}
            </Carousel>
          </div>
        </section>

        <section className={`${styles.wrap} ${styles.section}`} aria-labelledby="journal-titre">
          <div className={styles.sectionHead}>
            <h2 id="journal-titre" className={styles.headingLarge}>
              Journal
            </h2>
            <p className={styles.muted}>Conseils d&apos;achat et d&apos;entretien, par notre atelier.</p>
          </div>
          <ul className={styles.posts}>
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/l/concession/journal/${post.slug}`} className={styles.post}>
                  <span className={styles.postMedia}>
                    <CrImage src={photo(post.photo, 700)} alt={post.alt} className={styles.postPhoto} />
                    <span className={styles.postDate}>{longDate(post.date)}</span>
                    <span className={styles.roundLight}>
                      <Icon name="arrow" />
                    </span>
                  </span>
                  <strong>{post.title}</strong>
                  <span className={styles.muted}>{post.excerpt}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.newsletter} aria-labelledby="newsletter-titre">
          <h2 id="newsletter-titre">Les arrivages en avant-première, une fois par mois</h2>
          <Newsletter />
        </section>
      </main>
    </>
  );
}
