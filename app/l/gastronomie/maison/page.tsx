import type { Metadata } from "next";
import Link from "next/link";
import { CrAvatar, CrBreadcrumb, CrButton, CrImage } from "@cristal-ui/react/ssr";
import { photo, photos, team } from "../data";
import styles from "../gastronomie.module.css";

export const metadata: Metadata = {
  title: "La maison · Ardoise",
  description: "L'histoire d'Ardoise, la cheffe Margaux Ferrand, son équipe, la salle sur les quais et le salon privé dans la cave.",
};

export default function HousePage() {
  return (
    <main className={styles.inner}>
      <CrBreadcrumb lang="fr">
        <Link href="/l/gastronomie">Ardoise</Link>
        <span>La maison</span>
      </CrBreadcrumb>

      <div className={styles.split}>
        <div className={styles.intro}>
          <h1 className={styles.title}>Une ancienne tannerie sur les quais</h1>
          <p className={styles.muted}>
            Margaux Ferrand a ouvert Ardoise en 2019 dans un atelier de tanneur du XIXe siècle, au bord de la Saône. Le nom vient
            du tableau noir où, chaque matin, elle écrit les produits arrivés : c&apos;est encore lui qui décide du menu.
          </p>
          <p className={styles.muted}>
            La cuisine est ouverte sur la salle. Vingt-quatre couverts, pas un de plus, pour que chaque assiette parte du passe
            au bon moment.
          </p>
        </div>
        <CrImage src={photo(photos.plating, 1000, 800)} alt="Une cuisinière dresse une assiette au passe" className={styles.wide} />
      </div>

      <section className={styles.block} aria-labelledby="equipe-titre">
        <h2 id="equipe-titre" className={styles.heading}>
          L&apos;équipe
        </h2>
        <ul className={styles.team}>
          {team.map((member) => (
            <li key={member.name}>
              <CrAvatar name={member.name} size="l" />
              <div>
                <p className={styles.memberName}>{member.name}</p>
                <p className={styles.memberRole}>{member.role}</p>
                <p className={styles.muted}>{member.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.block} aria-labelledby="salle-titre">
        <h2 id="salle-titre" className={styles.heading}>
          La salle
        </h2>
        <div className={styles.gallery}>
          <CrImage src={photo(photos.room, 1000, 700)} alt="Salle à manger tamisée aux nappes blanches" className={styles.galleryPhoto} />
          <CrImage src={photo(photos.window, 1000, 700)} alt="Table dressée près d'une fenêtre" className={styles.galleryPhoto} />
          <CrImage src={photo(photos.pass, 1000, 700)} alt="Dressage d'une assiette à la pince" className={styles.galleryPhoto} />
        </div>
      </section>

      <section className={`${styles.block} ${styles.private}`} aria-labelledby="salon-titre">
        <CrImage src={photo(photos.cellar, 1200, 800)} alt="Table en bois au milieu des bouteilles de la cave" className={styles.privatePhoto} />
        <div className={styles.intro}>
          <p className={styles.kicker}>Salon privé</p>
          <h2 id="salon-titre" className={styles.heading}>
            Une table de 12 dans la cave
          </h2>
          <p className={styles.muted}>
            Pour un anniversaire, un repas d&apos;affaires ou une demande en mariage : la cave voûtée accueille de 8 à 12 convives,
            avec le Menu Saison et un accord choisi avec Samuel.
          </p>
          <div className={styles.actions}>
            <CrButton href="/l/gastronomie/reserver" className={styles.book}>
              Demander le salon
            </CrButton>
          </div>
        </div>
      </section>
    </main>
  );
}
