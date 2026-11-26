import Link from "next/link";
import { CrImage } from "@cristal-ui/react";
import { discount, euros, photo, type Game } from "./data";
import styles from "./jeux.module.css";

// Portrait cover with title and price, as in the mockup's "Recommandé pour vous" row.
export function GameCard({ game, owned = false }: { game: Game; owned?: boolean }) {
  const off = owned ? 0 : discount(game);
  return (
    <Link href={`/l/jeux/jeu/${game.slug}`} className={styles.game}>
      <CrImage src={photo(game.cover, 400, 520)} alt={game.alt} className={styles.gameCover} />
      {off > 0 && <span className={styles.off}>−{off} %</span>}
      <span className={styles.gameInfo}>
        <strong>{game.title}</strong>
        {owned ? (
          <span className={styles.prices}>{game.upcoming ? `Disponible ${game.release}` : "Prêt à installer"}</span>
        ) : (
          <span className={styles.prices}>
            {game.upcoming ? "Précommande " : ""}
            {euros(game.price)}
            {game.previousPrice && <s>{euros(game.previousPrice)}</s>}
          </span>
        )}
      </span>
    </Link>
  );
}
