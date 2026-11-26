import type { Metadata } from "next";
import Link from "next/link";
import { CrAvatar, CrBreadcrumb, CrButton, CrCard, CrImage } from "@cristal-ui/react/ssr";
import { offices, photo, properties } from "../data";
import { Icon } from "../Icon";
import styles from "../immobilier.module.css";

export const metadata: Metadata = {
  title: "L'agence · Haven",
  description: "Cinq agences, un conseiller par secteur et des biens visités un par un.",
};

const founded = Math.min(...offices.map((office) => office.since));

const figures = [
  { value: String(founded), label: "Année de création" },
  { value: String(offices.length), label: "Agences en France" },
  { value: String(properties.length), label: "Biens en catalogue" },
  { value: "4 %", label: "Honoraires, à la charge de l'acquéreur" },
];

export default function AgencyPage() {
  return (
    <main className={`${styles.main} ${styles.inner}`}>
      <CrBreadcrumb lang="fr">
        <Link href="/l/immobilier">Accueil</Link>
        <span>L&apos;agence</span>
      </CrBreadcrumb>

      <div className={styles.story}>
        <div>
          <p className={styles.kicker}>L&apos;agence</p>
          <h1 className={styles.heading}>
            Peu de biens, <em>tous visités</em>
          </h1>
          <p className={styles.prose}>
            Haven est née en {founded} avenue Montaigne, avec une idée simple : ne proposer que des maisons que l&apos;on
            a visitées soi-même. Nous suivons aujourd&apos;hui {properties.length} biens depuis {offices.length} agences, et
            chaque client garde le même conseiller de la première visite à la remise des clés.
          </p>
          <CrButton href="/l/immobilier/rendez-vous?motif=conseil">Rencontrer un conseiller</CrButton>
        </div>
        <CrImage src={photo("1758565811176-ccd94357a844", 1000)} alt="Salon ouvert sur le paysage par une baie vitrée" className={styles.storyPhoto} />
      </div>

      <dl className={styles.figures}>
        {figures.map((figure) => (
          <div key={figure.label}>
            <dt>{figure.label}</dt>
            <dd>{figure.value}</dd>
          </div>
        ))}
      </dl>

      <section className={styles.section} aria-labelledby="bureaux-titre">
        <h2 id="bureaux-titre" className={styles.heading}>
          Nos agences <em>et ceux qui les dirigent</em>
        </h2>
        <ul className={styles.offices}>
          {offices.map((office) => {
            const count = properties.filter((property) => office.regions.includes(property.region)).length;
            return (
              <li key={office.slug}>
                <CrCard>
                  <div slot="header" className={styles.agent}>
                    <CrAvatar name={office.agent} size="l" />
                    <span>
                      <strong>{office.agent}</strong>
                      <span className={styles.muted}>{office.role}</span>
                    </span>
                  </div>
                  <p className={styles.officeArea}>{office.area}</p>
                  <p className={styles.place}>
                    <Icon name="pin" /> {office.address}
                  </p>
                  <p className={styles.place}>
                    <Icon name="calendar" /> Depuis {office.since} · {count} bien{count > 1 ? "s" : ""} en catalogue
                  </p>
                  <CrButton slot="footer" variant="outline" href={`tel:${office.phone.replaceAll(" ", "")}`} fullWidth>
                    {office.phone}
                  </CrButton>
                </CrCard>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
