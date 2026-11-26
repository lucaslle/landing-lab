import type { Metadata } from "next";
import { CrBadge, CrButton, CrImage } from "@cristal-ui/react/ssr";
import { destinations, photo } from "./data";
import { DestinationCard } from "./DestinationCard";
import { Icon } from "./Icon";
import { Newsletter } from "./Newsletter";
import { SearchPanel } from "./SearchPanel";
import styles from "./voyage.module.css";

export const metadata: Metadata = {
  title: "Ailleurs, agence de voyage · landing-lab",
  description: "Vols, hôtels et circuits : préparez votre prochain voyage avec Ailleurs.",
};

const promises = [
  { title: "Meilleur prix garanti", text: "Un tarif plus bas ailleurs ? On vous rembourse la différence.", icon: "M20 12 12 20 4 12V4h8z M8 8h.01" },
  { title: "Conseillers 7j/7", text: "Une vraie personne répond avant, pendant et après le voyage.", icon: "M4 14v-2a8 8 0 0 1 16 0v2 M4 14h3v5H4z M17 14h3v5h-3z" },
  { title: "Paiement sécurisé", text: "Vos données et vos paiements sont chiffrés de bout en bout.", icon: "M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z M9 12l2 2 4-4" },
  { title: "Sélection sur place", text: "Chaque hôtel et circuit est testé par notre équipe.", icon: "M12 3l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.3 6.8 19.1l1-5.8L3.5 9.2l5.9-.8z" },
];

const reasons = [
  { title: "Le monde entier", text: "Des milliers de vols, hôtels et circuits sur tous les continents.", icon: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M3 12h18 M12 3c3 3.5 3 14.5 0 18 M12 3c-3 3.5-3 14.5 0 18" },
  { title: "Voyageurs conquis", text: "Plus de 50 000 clients repartent avec nous chaque année.", icon: "M7 11v9H4v-9z M7 11l4-8c1.5 0 2.5 1 2.5 2.5L13 9h6a2 2 0 0 1 2 2.3l-1.2 7A2 2 0 0 1 17.8 20H7" },
  { title: "Réservation souple", text: "Modifiez vos dates sans frais jusqu'à 14 jours avant le départ.", icon: "M4 6h16v14H4z M4 10h16 M8 3v4 M16 3v4" },
  { title: "Offres exclusives", text: "Des tarifs négociés réservés aux abonnés de la newsletter.", icon: "M4 10h16v10H4z M3 7h18v3H3z M12 7v13 M12 7c-2-4-6-3-5 0 M12 7c2-4 6-3 5 0" },
];

export default function TravelLanding() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="hero-titre">
        <CrImage src={photo("1783442828255-cd8ea1f13750", 1800)} alt="" className={styles.heroPhoto} />
        <div className={styles.heroText}>
          <CrBadge variant="primary">Explorer · Rêver · Partir</CrBadge>
          <h1 id="hero-titre" className={styles.title}>
            Des lieux qui vous
            <span>coupent le souffle</span>
          </h1>
          <p className={styles.lead}>Vols, hôtels et circuits réunis au même endroit pour préparer le voyage parfait.</p>
          <CrButton href="/l/voyage/destinations" size="l">
            Explorer les destinations →
          </CrButton>
        </div>
      </section>

      <div id="recherche" className={styles.searchWrap}>
        <SearchPanel />
      </div>

      <main className={styles.main}>
        <ul className={styles.promises} aria-label="Nos engagements">
          {promises.map((item) => (
            <li key={item.title}>
              <Icon path={item.icon} />
              <div>
                <strong>{item.title}</strong>
                <p className={styles.muted}>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <section className={styles.section} aria-labelledby="destinations-titre">
          <div className={styles.sectionHead}>
            <h2 id="destinations-titre" className={styles.heading}>
              Destinations <span>populaires</span>
            </h2>
            <CrButton href="/l/voyage/destinations" variant="outline" size="s">
              Toutes les destinations →
            </CrButton>
          </div>
          <ul className={styles.destinations}>
            {destinations
              .filter((destination) => destination.tag && destination.tag !== "Coup de cœur")
              .map((destination, index) => (
                <DestinationCard key={destination.slug} destination={destination} index={index} />
              ))}
          </ul>
        </section>

        <section id="pourquoi" className={`${styles.section} ${styles.why}`} aria-labelledby="pourquoi-titre">
          <div>
            <h2 id="pourquoi-titre" className={styles.heading}>
              Pourquoi choisir <span>Ailleurs ?</span>
            </h2>
            <ul className={styles.reasons}>
              {reasons.map((item) => (
                <li key={item.title}>
                  <Icon path={item.icon} />
                  <div>
                    <strong>{item.title}</strong>
                    <p className={styles.muted}>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <aside className={styles.promo} aria-labelledby="promo-titre">
            <CrImage src={photo("1506953823976-52e1fdc0149a", 1000)} alt="" className={styles.promoPhoto} />
            <div className={styles.promoText}>
              <span className={styles.kicker}>C&apos;est parti !</span>
              <h3 id="promo-titre">Votre prochaine aventure vous attend</h3>
              <p>Plages secrètes, villes lumière et temples cachés : on s&apos;occupe de tout.</p>
              <CrButton href="/l/voyage/reservation" variant="secondary">
                Préparer mon voyage →
              </CrButton>
            </div>
          </aside>
        </section>

        <section className={styles.newsletter} aria-labelledby="newsletter-titre">
          <div>
            <h2 id="newsletter-titre">Restez informé</h2>
            <p>Les meilleures offres et des idées de voyage, une fois par mois.</p>
          </div>
          <Newsletter />
        </section>
      </main>
    </>
  );
}
