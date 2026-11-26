"use client";

import { CrBadge, CrButton, CrCard } from "@cristal-ui/react";
import { discount, euros, type Game } from "../../data";
import { Icon } from "../../Icon";
import { addToCart, toggleWishlist, useStore } from "../../Store";
import styles from "../../jeux.module.css";

// Price, buy and wishlist buttons; they follow what is already in the cart, wishlist or library.
export function BuyBox({ game }: { game: Game }) {
  const { cart, wishlist, library } = useStore();
  const owned = library.includes(game.slug);
  const inCart = cart.includes(game.slug);
  const wished = wishlist.includes(game.slug);
  const off = discount(game);

  return (
    <CrCard className={styles.buyBox}>
      <div slot="header">
        {off > 0 && <CrBadge variant="primary">−{off} % cette semaine</CrBadge>}
        {game.upcoming && <CrBadge>Précommande, sortie {game.release}</CrBadge>}
      </div>
      <p className={styles.bigPrice}>
        {euros(game.price)}
        {game.previousPrice && <s>{euros(game.previousPrice)}</s>}
      </p>
      {owned ? (
        <CrButton href="/l/jeux/bibliotheque" fullWidth className={styles.cta}>
          Dans votre bibliothèque
        </CrButton>
      ) : inCart ? (
        <CrButton href="/l/jeux/panier" fullWidth className={styles.cta}>
          Voir le panier
        </CrButton>
      ) : (
        <CrButton fullWidth className={styles.cta} onClick={() => addToCart(game.slug)}>
          <Icon name="cart" /> {game.upcoming ? "Précommander" : "Ajouter au panier"}
        </CrButton>
      )}
      {!owned && (
        <CrButton variant="outline" fullWidth onClick={() => toggleWishlist(game.slug)}>
          <Icon name="heart" /> {wished ? "Retirer de la liste de souhaits" : "Ajouter à la liste de souhaits"}
        </CrButton>
      )}
      <dl className={styles.facts}>
        <div>
          <dt>Studio</dt>
          <dd>{game.studio}</dd>
        </div>
        <div>
          <dt>Genre</dt>
          <dd>{game.genre}</dd>
        </div>
        <div>
          <dt>Sortie</dt>
          <dd>{game.release}</dd>
        </div>
      </dl>
    </CrCard>
  );
}
