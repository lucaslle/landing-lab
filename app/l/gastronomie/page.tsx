import type { Metadata } from "next";
import Link from "next/link";
import { CrAccordion, CrAccordionItem, CrButton, CrImage } from "@cristal-ui/react/ssr";
import { euros, hours, menus, photo, photos, producers, signatures } from "./data";
import styles from "./gastronomie.module.css";

export const metadata: Metadata = {
  title: "Ardoise, restaurant gastronomique · landing-lab",
  description: "La cuisine de saison de Margaux Ferrand, sur les quais de Saône à Lyon. 24 couverts, menus de 65 à 145 €.",
};

const questions = [
  { question: "Faut-il réserver ?", answer: "Oui, la salle ne compte que 24 couverts. Les réservations ouvrent deux mois à l'avance, le 1er de chaque mois à 10 h." },
  { question: "Pouvez-vous adapter le menu à une allergie ?", answer: "Oui, si vous nous la signalez à la réservation. Le Menu Jardin existe aussi sans gluten ni lactose." },
  { question: "Les enfants sont-ils les bienvenus ?", answer: "À partir de 8 ans, avec un menu en quatre temps à 45 € servi au même rythme que la table." },
  { question: "Proposez-vous des bons cadeaux ?", answer: "Oui, pour un menu ou un montant libre, valables un an. Demandez-les par téléphone ou à la réservation." },
];

export default function GastronomyLanding() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="hero-titre">
        <CrImage src={photo(photos.hero, 2200, 1300)} alt="" className={styles.heroPhoto} />
        <div className={styles.heroText}>
          <p className={styles.kicker}>Restaurant gastronomique · Lyon 5e</p>
          <h1 id="hero-titre" className={styles.heroTitle}>
            Ardoise
          </h1>
          <p className={styles.heroLead}>
            La cuisine de saison de Margaux Ferrand, sur les quais de Saône. Ce que les producteurs ont récolté le matin, servi le
            soir même.
          </p>
          <div className={styles.actions}>
            <CrButton href="/l/gastronomie/reserver" size="l" className={styles.book}>
              Réserver une table
            </CrButton>
            <CrButton href="/l/gastronomie/menus" size="l" variant="outline" className={styles.light}>
              Voir les menus
            </CrButton>
          </div>
        </div>
        <dl className={styles.heroFacts}>
          <div>
            <dt>Couverts</dt>
            <dd>24</dd>
          </div>
          <div>
            <dt>Menus</dt>
            <dd>
              {euros(Math.min(...menus.map((menu) => menu.price)))} à {euros(Math.max(...menus.map((menu) => menu.price)))}
            </dd>
          </div>
          <div>
            <dt>Ouvert</dt>
            <dd>Du mardi au samedi</dd>
          </div>
        </dl>
      </section>

      <main>
        <section className={styles.section} aria-labelledby="cuisine-titre">
          <div className={styles.split}>
            <div className={styles.intro}>
              <p className={styles.kicker}>La cuisine</p>
              <h2 id="cuisine-titre" className={styles.heading}>
                Peu d&apos;ingrédients, tous venus de moins de 50 km
              </h2>
              <p className={styles.muted}>
                Margaux Ferrand cuisine ce que ses quatre producteurs lui apportent chaque mardi et vendredi. Les sauces sont
                montées au dernier moment, les poissons viennent de la Dombes et des criées de Méditerranée, et rien ne part à la
                poubelle : les épluchures finissent en bouillon, les fanes en pesto.
              </p>
              <CrButton href="/l/gastronomie/maison" variant="link">
                Rencontrer l&apos;équipe
              </CrButton>
            </div>
            <ul className={styles.dishes}>
              {signatures.map((dish) => (
                <li key={dish.name}>
                  <CrImage src={photo(dish.photo, 600, 750)} alt={dish.alt} className={styles.dishPhoto} />
                  <p className={styles.dishName}>{dish.name}</p>
                  <p className={styles.dishMenu}>{dish.menu}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`${styles.section} ${styles.slate}`} aria-labelledby="menus-titre">
          <div className={styles.sectionHead}>
            <div>
              <p className={styles.kicker}>Les menus</p>
              <h2 id="menus-titre" className={styles.heading}>
                Trois façons de passer à table
              </h2>
            </div>
            <CrButton href="/l/gastronomie/menus" variant="outline" className={styles.light}>
              Lire les menus en entier
            </CrButton>
          </div>
          <ul className={styles.menuCards}>
            {menus.map((menu) => (
              <li key={menu.slug}>
                <Link href={`/l/gastronomie/menus?menu=${menu.slug}`} className={styles.menuCard}>
                  <CrImage src={photo(menu.photo, 800, 600)} alt={menu.alt} className={styles.menuPhoto} />
                  <span className={styles.menuName}>{menu.name}</span>
                  <span className={styles.menuMeta}>
                    {menu.courses} temps · {euros(menu.price)}
                  </span>
                  <span className={styles.menuServed}>{menu.served}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="producteurs-titre">
          <div className={styles.sectionHead}>
            <div>
              <p className={styles.kicker}>Nos producteurs</p>
              <h2 id="producteurs-titre" className={styles.heading}>
                Ceux qui remplissent la cuisine
              </h2>
            </div>
          </div>
          <ul className={styles.producers}>
            {producers.map((producer) => (
              <li key={producer.name}>
                <CrImage src={photo(producer.photo, 600, 450)} alt={producer.alt} className={styles.producerPhoto} />
                <p className={styles.producerName}>{producer.name}</p>
                <p className={styles.muted}>{producer.what}</p>
                <p className={styles.distance}>
                  {producer.where} · {producer.km} km
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section id="infos" className={styles.section} aria-labelledby="infos-titre">
          <div className={styles.split}>
            <div className={styles.intro}>
              <p className={styles.kicker}>Infos pratiques</p>
              <h2 id="infos-titre" className={styles.heading}>
                12 quai des Tanneurs, Lyon
              </h2>
              <dl className={styles.hours}>
                {hours.map((line) => (
                  <div key={line.days}>
                    <dt>{line.days}</dt>
                    <dd>{line.times}</dd>
                  </div>
                ))}
              </dl>
              <p className={styles.muted}>Métro Vieux Lyon, à 4 minutes à pied. Téléphone : 04 78 00 00 00.</p>
              <div className={styles.actions}>
                <CrButton href="/l/gastronomie/reserver" className={styles.book}>
                  Réserver une table
                </CrButton>
              </div>
            </div>
            <CrAccordion lang="fr" headingLevel={3}>
              {questions.map((item, index) => (
                <CrAccordionItem key={item.question} label={item.question} open={index === 0}>
                  <p className={styles.muted}>{item.answer}</p>
                </CrAccordionItem>
              ))}
            </CrAccordion>
          </div>
        </section>
      </main>
    </>
  );
}
