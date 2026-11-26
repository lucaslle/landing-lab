import type { Metadata } from "next";
import Link from "next/link";
import { CrImage } from "@cristal-ui/react/ssr";
import { bikes, details, euros, photo, sidePhoto } from "./data";
import { Icon } from "./Icon";
import { Showcase } from "./Showcase";
import { SizeFinder } from "./SizeFinder";
import styles from "./velo.module.css";

export const metadata: Metadata = {
  title: "Kairn, vélos de route et gravel · landing-lab",
  description: "Vortex, Strada et Sentier : trois vélos en carbone pour la vitesse, l'endurance et les chemins.",
};

const features = [
  { ...details.frame, title: "Carbone haut module", text: "Chaque cadre est moulé d'une pièce et contrôlé aux ultrasons avant montage." },
  { ...details.cockpit, title: "Câbles invisibles", text: "Durites et fils passent dans le cintre et la potence, pour la finesse comme pour l'entretien." },
  { ...details.brake, title: "Freins à disque partout", text: "Le même freinage sous la pluie qu'au sec, sur les trois modèles de la gamme." },
];

const promises = [
  { icon: "truck", title: "Livraison et retours offerts", text: "Livré monté et réglé, retour gratuit sous 30 jours." },
  { icon: "ruler", title: "Étude posturale incluse", text: "Un réglage de position en atelier avec chaque vélo." },
  { icon: "check", title: "Cadre garanti à vie", text: "Pour le premier propriétaire, avec remplacement à prix coûtant en cas de chute." },
] as const;

export default function BikeLanding() {
  return (
    <>
      <Showcase />

      <main className={styles.main}>
        <section className={styles.section} aria-labelledby="technique-titre">
          <h2 id="technique-titre" className={styles.heading}>
            Construits pour durer
          </h2>
          <ul className={styles.features}>
            {features.map((feature) => (
              <li key={feature.title}>
                <CrImage src={photo(feature.id, 800, 600)} alt={feature.alt} className={styles.featurePhoto} />
                <strong>{feature.title}</strong>
                <p className={styles.muted}>{feature.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="gamme-titre">
          <h2 id="gamme-titre" className={styles.heading}>
            La gamme
          </h2>
          <ul className={styles.range}>
            {bikes.map((bike) => (
              <li key={bike.slug}>
                <Link href={`/l/velo/modeles/${bike.slug}`} className={styles.rangeCard}>
                  <CrImage src={sidePhoto(bike.photo, 800)} alt={bike.alt} className={styles.rangePhoto} />
                  <span className={styles.family}>{bike.family}</span>
                  <strong className={styles.rangeName}>{bike.name}</strong>
                  <span className={styles.muted}>
                    {bike.groupset} · {bike.weight.toLocaleString("fr-FR")} kg
                  </span>
                  <span className={styles.rangePrice}>
                    {euros(bike.price)} <Icon name="arrow" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section id="tailles" className={`${styles.section} ${styles.sizing}`} aria-labelledby="tailles-titre">
          <div>
            <h2 id="tailles-titre" className={styles.heading}>
              Trouver sa taille
            </h2>
            <p className={styles.muted}>
              Indiquez votre taille : nous conseillons le cadre, puis l&apos;atelier affine la position lors de l&apos;étude
              posturale.
            </p>
          </div>
          <SizeFinder />
        </section>

        <ul className={styles.promises}>
          {promises.map((promise) => (
            <li key={promise.title}>
              <Icon name={promise.icon} className={styles.promiseIcon} />
              <strong>{promise.title}</strong>
              <span className={styles.muted}>{promise.text}</span>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
