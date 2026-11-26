import type { Metadata } from "next";
import { discount, games } from "./data";
import { GameCard } from "./GameCard";
import { Hero } from "./Hero";
import { Row } from "./Row";
import styles from "./jeux.module.css";

export const metadata: Metadata = {
  title: "Pulse, boutique de jeux · landing-lab",
  description: "Boutique de jeux vidéo fictive : nouveautés, promotions, liste de souhaits et bibliothèque.",
};

const recommended = games.filter((game) => !game.upcoming);
const deals = games.filter((game) => discount(game) > 0).toSorted((a, b) => discount(b) - discount(a));

export default function StoreHome() {
  return (
    <main className={styles.main}>
      <Hero />

      <section aria-labelledby="recommandes-titre">
        <h2 id="recommandes-titre" className={styles.heading}>
          Recommandé pour vous
        </h2>
        <Row label="Jeux recommandés">
          {recommended.map((game) => (
            <li key={game.slug}>
              <GameCard game={game} />
            </li>
          ))}
        </Row>
      </section>

      <section aria-labelledby="promos-titre">
        <h2 id="promos-titre" className={styles.heading}>
          En promotion cette semaine
        </h2>
        <ul className={styles.grid}>
          {deals.map((game) => (
            <li key={game.slug}>
              <GameCard game={game} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
