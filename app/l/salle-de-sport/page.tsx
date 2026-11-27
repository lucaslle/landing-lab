import type { Metadata } from "next";
import Link from "next/link";
import { CrButton, CrImage } from "@cristal-ui/react/ssr";
import { Crowd } from "./Crowd";
import { disciplines, euros, photo, photos, plans, sessions } from "./data";
import styles from "./salle-de-sport.module.css";

export const metadata: Metadata = {
  title: "Fonte, salle de force et de cross-training · landing-lab",
  description: "Haltérophilie, force et cross-training à Nantes : 900 m², ouvert de 6 h à 23 h, cours encadrés par des coachs diplômés.",
};

const facts = [
  { value: "900 m²", label: "dont 12 plateformes" },
  { value: "6 h à 23 h", label: "7 jours sur 7" },
  { value: `${sessions.length} cours`, label: "chaque semaine" },
  { value: "6 coachs", label: "tous diplômés" },
];

export default function GymLanding() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="hero-titre">
        <CrImage src={photo(photos.hero, 2200, 1300)} alt="" className={styles.heroPhoto} />
        <div className={styles.heroText}>
          <p className={styles.kicker}>Salle de force · Nantes, île de Nantes</p>
          <h1 id="hero-titre" className={styles.heroTitle}>
            Soulevez plus lourd, sans vous blesser
          </h1>
          <p className={styles.heroLead}>
            Haltérophilie, force et cross-training, avec un coach qui regarde votre technique à chaque cours. La première séance
            est offerte.
          </p>
          <div className={styles.actions}>
            <CrButton href="/l/salle-de-sport/essai" size="l" className={styles.cta}>
              Réserver ma séance d&apos;essai
            </CrButton>
            <CrButton href="/l/salle-de-sport/abonnements" size="l" variant="outline">
              Voir les abonnements
            </CrButton>
          </div>
        </div>
        <dl className={styles.facts}>
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <main>
        <section id="disciplines" className={styles.section} aria-labelledby="disciplines-titre">
          <div className={styles.sectionHead}>
            <h2 id="disciplines-titre" className={styles.heading}>
              Cinq disciplines, un seul plateau
            </h2>
            <CrButton href="/l/salle-de-sport/planning" variant="outline">
              Voir le planning
            </CrButton>
          </div>
          <ul className={styles.disciplines}>
            {disciplines.map((discipline) => (
              <li key={discipline.slug}>
                <Link href={`/l/salle-de-sport/planning?discipline=${discipline.slug}`} className={styles.discipline}>
                  <CrImage src={photo(discipline.photo, 700, 900)} alt={discipline.alt} className={styles.disciplinePhoto} />
                  <span className={styles.disciplineName}>{discipline.name}</span>
                  <span className={styles.disciplineMeta}>
                    {discipline.duration} min · {discipline.capacity} places · {discipline.level}
                  </span>
                  <span className={styles.muted}>{discipline.pitch}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={`${styles.section} ${styles.split}`} aria-labelledby="affluence-titre">
          <div className={styles.intro}>
            <h2 id="affluence-titre" className={styles.heading}>
              Venir quand la salle respire
            </h2>
            <p className={styles.muted}>
              Le soir entre 18 h et 20 h, tout le monde veut le même rack. Avant 8 h, en milieu d&apos;après-midi ou après 21 h,
              vous avez la place de vous entraîner sans attendre.
            </p>
            <CrImage src={photo(photos.openGym, 900, 600)} alt="Barre et disques posés sur le sol en caoutchouc" className={styles.wide} />
          </div>
          <Crowd />
        </section>

        <section className={styles.section} aria-labelledby="abonnements-titre">
          <div className={styles.sectionHead}>
            <h2 id="abonnements-titre" className={styles.heading}>
              Sans engagement, ou deux mois offerts à l&apos;année
            </h2>
            <CrButton href="/l/salle-de-sport/abonnements" variant="outline">
              Comparer les abonnements
            </CrButton>
          </div>
          <ul className={styles.plans}>
            {plans.map((plan) => (
              <li key={plan.slug} className={plan.highlight ? styles.planHighlight : undefined}>
                <div className={styles.planTop}>
                  <p className={styles.planName}>{plan.name}</p>
                  {plan.highlight && <span className={styles.recommended}>Recommandé</span>}
                </div>
                <p className={styles.muted}>{plan.pitch}</p>
                <p className={styles.planPrice}>
                  {euros(plan.monthly)}
                  <small>/mois</small>
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.band} aria-labelledby="essai-titre">
          <CrImage src={photo(photos.deadlift, 2000, 800)} alt="" className={styles.bandPhoto} />
          <div className={styles.bandText}>
            <h2 id="essai-titre" className={styles.heading}>
              Votre première séance est offerte
            </h2>
            <p className={styles.muted}>Une heure avec un coach : un bilan de mobilité, les bons gestes, et un vrai entraînement.</p>
            <CrButton href="/l/salle-de-sport/essai" size="l" className={styles.cta}>
              Réserver ma séance d&apos;essai
            </CrButton>
          </div>
        </section>
      </main>
    </>
  );
}
