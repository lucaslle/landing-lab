import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CrBreadcrumb, CrImage, CrRating } from "@cristal-ui/react/ssr";
import { findGame, friends, games, photo } from "../../data";
import { GameCard } from "../../GameCard";
import { BuyBox } from "./BuyBox";
import styles from "../../jeux.module.css";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => games.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const game = findGame((await params).slug);
  return game ? { title: `${game.title} · Pulse`, description: game.pitch } : {};
}

export default async function GamePage({ params }: Props) {
  const game = findGame((await params).slug);
  if (!game) notFound();
  const players = friends.filter((friend) => friend.activity.endsWith(game.title));
  const similar = games.filter((other) => other !== game && other.studio === game.studio).concat(games.filter((other) => other !== game && other.studio !== game.studio)).slice(0, 4);

  return (
    <main className={styles.main}>
      <CrBreadcrumb lang="fr">
        <Link href="/l/jeux">Boutique</Link>
        <span>{game.title}</span>
      </CrBreadcrumb>
      <div className={styles.banner}>
        <CrImage src={photo(game.cover, 1600, 600)} alt={game.alt} />
      </div>

      <div className={styles.detail}>
        <div className={styles.detailBody}>
          <p className={styles.kicker}>
            {game.studio} · {game.genre}
          </p>
          <h1 className={styles.gameTitle}>{game.title}</h1>
          {game.rating > 0 && (
            <CrRating lang="fr" label="Note des joueurs" value={game.rating} readonly />
          )}
          <p className={styles.prose}>{game.description}</p>
          <ul className={styles.features}>
            {game.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          {players.length > 0 && (
            <p className={styles.muted}>
              {players.map((player) => player.name).join(", ")} y joue en ce moment.
            </p>
          )}
          <div className={styles.gallery}>
            {game.shots.map((id) => (
              <CrImage key={id} src={photo(id, 800, 450)} alt="" className={styles.shot} />
            ))}
          </div>
        </div>
        <BuyBox game={game} />
      </div>

      <section aria-labelledby="similaires-titre">
        <h2 id="similaires-titre" className={styles.heading}>
          Vous aimerez aussi
        </h2>
        <ul className={styles.grid}>
          {similar.map((other) => (
            <li key={other.slug}>
              <GameCard game={other} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
