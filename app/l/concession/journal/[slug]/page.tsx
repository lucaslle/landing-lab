import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CrBreadcrumb, CrButton, CrImage } from "@cristal-ui/react/ssr";
import { findPost, longDate, photo, posts } from "../../data";
import styles from "../../concession.module.css";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => posts.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = findPost((await params).slug);
  return post ? { title: `${post.title} · Renc`, description: post.excerpt } : {};
}

export default async function PostPage({ params }: Props) {
  const post = findPost((await params).slug);
  if (!post) notFound();

  return (
    <main className={styles.inner}>
      <CrBreadcrumb lang="fr">
        <Link href="/l/concession">Accueil</Link>
        <Link href="/l/concession/journal">Journal</Link>
        <span>{post.title}</span>
      </CrBreadcrumb>
      <article className={styles.article}>
        <p className={styles.muted}>{longDate(post.date)}</p>
        <h1 className={styles.heading}>{post.title}</h1>
        <CrImage src={photo(post.photo, 1400)} alt={post.alt} className={styles.articleCover} />
        {post.body.map((paragraph) => (
          <p key={paragraph} className={styles.prose}>
            {paragraph}
          </p>
        ))}
        <div className={styles.actions}>
          <CrButton href="/l/concession/vehicules" className={styles.peach}>
            Voir le stock
          </CrButton>
          <CrButton href="/l/concession/journal" variant="outline">
            Tous les articles
          </CrButton>
        </div>
      </article>
    </main>
  );
}
