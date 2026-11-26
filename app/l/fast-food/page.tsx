import type { Metadata } from "next";
import { CrButton, CrImage } from "@cristal-ui/react/ssr";
import { bannerPhoto, heroPhoto, photo, products } from "./data";
import { Icon } from "./Icon";
import { ProductCard } from "./ProductCard";
import styles from "./fast-food.module.css";

export const metadata: Metadata = {
  title: "Tasty Bites, burgers et pizzas · landing-lab",
  description: "Burgers, pizzas et frites maison, à emporter ou livrés en 30 minutes.",
};

const features = [
  { icon: "leaf", label: "Produits frais" },
  { icon: "scooter", label: "Livraison rapide" },
  { icon: "shield", label: "Hygiène contrôlée" },
] as const;

const popular = ["margherita", "classic-burger", "frites-maison", "milkshake-chocolat"].map(
  (slug) => products.find((product) => product.slug === slug)!,
);

export default function FastFoodLanding() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="hero-titre">
        <CrImage src={photo(heroPhoto, 2000)} alt="" className={styles.heroPhoto} />
        <div className={styles.heroInner}>
          <p className={styles.kicker}>Frais · Généreux · Fait maison</p>
          <h1 id="hero-titre" className={styles.title}>
            Préparé
            <span>
              avec <em>amour</em>
            </span>
          </h1>
          <p className={styles.lead}>
            Des pizzas qui filent aux burgers bien juteux, on cuisine chaque jour des produits frais et beaucoup de bonne
            humeur.
          </p>
          <CrButton href="/l/fast-food/carte" size="l" className={styles.cta}>
            Commander <Icon name="arrow" />
          </CrButton>
          <ul className={styles.features}>
            {features.map((feature) => (
              <li key={feature.label}>
                <Icon name={feature.icon} className={styles.featureIcon} />
                {feature.label}
              </li>
            ))}
          </ul>
        </div>
        <p className={styles.sticker} aria-hidden="true">
          Le meilleur burger du quartier
        </p>
      </section>

      <main className={styles.main}>
        <section className={styles.section} aria-labelledby="populaires-titre">
          <div className={styles.sectionHead}>
            <div>
              <p className={styles.eyebrow}>Nos incontournables</p>
              <h2 id="populaires-titre" className={styles.heading}>
                Les plus commandés
              </h2>
              <p className={styles.muted}>Ceux que nos clients reprennent encore et encore.</p>
            </div>
            <CrButton href="/l/fast-food/carte" variant="outline" className={styles.outline}>
              Toute la carte <Icon name="arrow" />
            </CrButton>
          </div>
          <ul className={styles.cards}>
            {popular.map((product, index) => (
              <ProductCard key={product.slug} product={product} index={index} />
            ))}
          </ul>
        </section>
      </main>

      <section id="livraison" className={styles.banner} aria-labelledby="livraison-titre">
        <CrImage src={photo(bannerPhoto, 1600)} alt="" className={styles.bannerPhoto} />
        <div className={styles.bannerText}>
          <p className={styles.kicker}>Toujours du bon</p>
          <h2 id="livraison-titre" className={styles.bannerTitle}>
            <em>Une envie ?</em>
            On vous livre
          </h2>
          <p>Commandez avant 22 h 30 : livraison offerte dès 25 €, ou à emporter en 15 minutes.</p>
          <CrButton href="/l/fast-food/commande" size="l" className={styles.cta}>
            Passer commande <Icon name="arrow" />
          </CrButton>
        </div>
        <p className={styles.stickerLight} aria-hidden="true">
          Bonne bouffe, bonnes ondes
        </p>
      </section>
    </>
  );
}
