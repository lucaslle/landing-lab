import type { Metadata } from "next";
import Link from "next/link";
import { CrBreadcrumb, CrImage } from "@cristal-ui/react/ssr";
import { longDate, photo, posts } from "../data";
import { Icon } from "../Icon";
import styles from "../concession.module.css";

export const metadata: Metadata = {
  title: "Journal · Renc",
  description: "Conseils d'achat et d'entretien de voitures de prestige.",
};

export default function JournalPage() {
  return (
    <main className={styles.inner}>
      <CrBreadcrumb lang="fr">
        <Link href="/l/concession">Accueil</Link>
        <span>Journal</span>
      </CrBreadcrumb>
      <h1 className={styles.headingLarge}>Journal</h1>
      <p className={styles.muted}>Conseils d&apos;achat et d&apos;entretien, écrits par notre atelier.</p>
      <ul className={styles.posts}>
        {posts.toReversed().map((post) => (
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
    </main>
  );
}
