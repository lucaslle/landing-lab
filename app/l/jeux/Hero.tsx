"use client";

import { useState } from "react";
import Link from "next/link";
import { CrButton, CrDialog, CrImage } from "@cristal-ui/react";
import { euros, featured, findGame, photo } from "./data";
import { Icon } from "./Icon";
import { addToCart, useStore } from "./Store";
import styles from "./jeux.module.css";

const slides = featured.map((slug) => findGame(slug)!);

// Featured games, one slide at a time, with the dots below as in the mockup.
export function Hero() {
  const [index, setIndex] = useState(0);
  const [trailer, setTrailer] = useState(false);
  const { cart, library } = useStore();
  const game = slides[index];
  const owned = library.includes(game.slug);
  const inCart = cart.includes(game.slug);

  return (
    <section className={styles.hero} aria-roledescription="carrousel" aria-label="À la une">
      <CrImage key={game.slug} src={photo(game.cover, 1600, 800)} alt="" className={styles.heroPhoto} />
      <div key={`${game.slug}-text`} className={styles.heroText}>
        <p className={styles.kicker}>{game.upcoming ? `Sortie ${game.release}` : game.genre}</p>
        <h1 className={styles.heroTitle}>{game.title}</h1>
        <p className={styles.heroPitch}>{game.pitch}</p>
        <div className={styles.heroActions}>
          {owned ? (
            <CrButton href="/l/jeux/bibliotheque" className={styles.cta}>
              Dans votre bibliothèque
            </CrButton>
          ) : inCart ? (
            <CrButton href="/l/jeux/panier" className={styles.cta}>
              Voir le panier
            </CrButton>
          ) : (
            <CrButton className={styles.cta} onClick={() => addToCart(game.slug)}>
              {game.upcoming ? "Précommander" : "Acheter"}, {euros(game.price)}
            </CrButton>
          )}
          <button type="button" className={styles.trailerButton} onClick={() => setTrailer(true)}>
            <span>
              <Icon name="play" />
            </span>
            Voir les images
          </button>
          <Link href={`/l/jeux/jeu/${game.slug}`} className={styles.heroLink}>
            Fiche du jeu
          </Link>
        </div>
      </div>
      <div className={styles.dots}>
        {slides.map((slide, position) => (
          <button
            key={slide.slug}
            type="button"
            aria-label={`Afficher ${slide.title}`}
            aria-current={position === index ? "true" : undefined}
            onClick={() => setIndex(position)}
          />
        ))}
      </div>
      <CrDialog lang="fr" label={`Images de ${game.title}`} open={trailer} onCrClose={() => setTrailer(false)}>
        <div className={styles.shots}>
          {[game.cover, ...game.shots].map((id) => (
            <CrImage key={id} src={photo(id, 900, 506)} alt="" className={styles.shot} />
          ))}
        </div>
      </CrDialog>
    </section>
  );
}
