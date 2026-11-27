import type { Metadata } from "next";
import Link from "next/link";
import { CrAvatar, CrBadge, CrBreadcrumb, CrButton, CrImage } from "@cristal-ui/react/ssr";
import { coaches, findDiscipline, photo, photos } from "../data";
import styles from "../salle-de-sport.module.css";

export const metadata: Metadata = {
  title: "Les coachs · Fonte",
  description: "Six coachs diplômés en haltérophilie, force, cross-training, gymnastique et cardio.",
};

export default function CoachesPage() {
  return (
    <main className={styles.inner}>
      <CrBreadcrumb lang="fr">
        <Link href="/l/salle-de-sport">Fonte</Link>
        <span>Coachs</span>
      </CrBreadcrumb>

      <div className={styles.split}>
        <div className={styles.intro}>
          <h1 className={styles.title}>Six coachs, tous sur le plateau</h1>
          <p className={styles.muted}>
            Chez Fonte, un coach n&apos;est jamais derrière un comptoir : il est au milieu de la salle, pendant les cours comme
            pendant l&apos;accès libre. Posez-lui une question sur votre squat, il viendra regarder.
          </p>
          <div className={styles.actions}>
            <CrButton href="/l/salle-de-sport/essai" className={styles.cta}>
              Rencontrer un coach
            </CrButton>
          </div>
        </div>
        <CrImage src={photo(photos.grip, 1000, 700)} alt="Mains qui serrent une barre avant un mouvement" className={styles.wide} />
      </div>

      <ul className={styles.coaches}>
        {coaches.map((coach) => (
          <li key={coach.name}>
            <div className={styles.coachHead}>
              <CrAvatar name={coach.name} size="l" />
              <div>
                <h2 className={styles.coachName}>{coach.name}</h2>
                <p className={styles.coachRole}>
                  {coach.role} · chez Fonte depuis {coach.since}
                </p>
              </div>
            </div>
            <p className={styles.muted}>{coach.text}</p>
            <div className={styles.badges}>
              {coach.disciplines.map((slug) => (
                <CrBadge key={slug} variant="primary">
                  {findDiscipline(slug)?.name}
                </CrBadge>
              ))}
              {coach.diplomas.map((diploma) => (
                <CrBadge key={diploma}>{diploma}</CrBadge>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
