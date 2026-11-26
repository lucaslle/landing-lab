"use client";

import Link from "next/link";
import { CrButton, CrEmptyState, CrIconButton, CrImage } from "@cristal-ui/react";
import { euros, findGame, photo } from "./data";
import { GameCard } from "./GameCard";
import { addToCart, removeFromCart, toggleWishlist, useStore } from "./Store";
import styles from "./jeux.module.css";

export function Wishlist() {
  const { wishlist, cart } = useStore();
  const items = wishlist.map((slug) => findGame(slug)!).filter(Boolean);

  if (items.length === 0) {
    return (
      <CrEmptyState lang="fr" heading="Votre liste de souhaits est vide" illustration="inbox">
        Ajoutez des jeux depuis leur fiche pour suivre leur prix.
        <CrButton slot="actions" href="/l/jeux" className={styles.cta}>
          Parcourir la boutique
        </CrButton>
      </CrEmptyState>
    );
  }

  return (
    <ul className={styles.lines}>
      {items.map((game) => (
        <li key={game.slug} className={styles.line}>
          <CrImage src={photo(game.cover, 160, 200)} alt="" className={styles.lineCover} />
          <span>
            <Link href={`/l/jeux/jeu/${game.slug}`}>{game.title}</Link>
            <small>{game.genre}</small>
          </span>
          <span className={styles.linePrice}>{euros(game.price)}</span>
          <span className={styles.topActions}>
            <CrButton size="s" className={styles.cta} disabled={cart.includes(game.slug)} onClick={() => addToCart(game.slug)}>
              {cart.includes(game.slug) ? "Dans le panier" : "Ajouter au panier"}
            </CrButton>
            <CrIconButton label={`Retirer ${game.title} de la liste`} variant="ghost" size="s" onClick={() => toggleWishlist(game.slug)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </CrIconButton>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Library() {
  const { library } = useStore();
  const items = library.map((slug) => findGame(slug)!).filter(Boolean);

  if (items.length === 0) {
    return (
      <CrEmptyState lang="fr" heading="Aucun jeu pour l'instant" illustration="inbox">
        Les jeux achetés apparaissent ici, prêts à être installés.
        <CrButton slot="actions" href="/l/jeux" className={styles.cta}>
          Parcourir la boutique
        </CrButton>
      </CrEmptyState>
    );
  }

  return (
    <ul className={styles.grid}>
      {items.map((game) => (
        <li key={game.slug}>
          <GameCard game={game} owned />
        </li>
      ))}
    </ul>
  );
}

// Digital order: no address, games land in the library. Demo: nothing is charged.
export function Cart({ onCheckout }: { onCheckout: () => void }) {
  const { cart } = useStore();
  const items = cart.map((slug) => findGame(slug)!).filter(Boolean);
  const total = items.reduce((sum, game) => sum + game.price, 0);
  const saving = items.reduce((sum, game) => sum + (game.previousPrice ? game.previousPrice - game.price : 0), 0);

  if (items.length === 0) {
    return (
      <CrEmptyState lang="fr" heading="Votre panier est vide" illustration="inbox">
        Ajoutez un jeu depuis la boutique ou votre liste de souhaits.
        <CrButton slot="actions" href="/l/jeux" className={styles.cta}>
          Parcourir la boutique
        </CrButton>
      </CrEmptyState>
    );
  }

  return (
    <div className={styles.checkout}>
      <ul className={styles.lines} aria-label="Jeux du panier">
        {items.map((game) => (
          <li key={game.slug} className={styles.line}>
            <CrImage src={photo(game.cover, 160, 200)} alt="" className={styles.lineCover} />
            <span>
              <Link href={`/l/jeux/jeu/${game.slug}`}>{game.title}</Link>
              <small>{game.upcoming ? `Précommande, disponible ${game.release}` : "Téléchargement immédiat"}</small>
            </span>
            <span className={styles.linePrice}>{euros(game.price)}</span>
            <CrIconButton label={`Retirer ${game.title} du panier`} variant="ghost" size="s" onClick={() => removeFromCart(game.slug)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </CrIconButton>
          </li>
        ))}
      </ul>
      <aside>
        <dl className={styles.summary}>
          <div>
            <dt>
              {items.length} jeu{items.length > 1 ? "x" : ""}
            </dt>
            <dd>{euros(total + saving)}</dd>
          </div>
          {saving > 0 && (
            <div className={styles.saving}>
              <dt>Promotions</dt>
              <dd>−{euros(saving)}</dd>
            </div>
          )}
          <div className={styles.total}>
            <dt>Total</dt>
            <dd>{euros(total)}</dd>
          </div>
        </dl>
        <CrButton size="l" fullWidth className={styles.cta} onClick={onCheckout} style={{ marginTop: 16 }}>
          Payer {euros(total)}
        </CrButton>
        <p className={styles.note}>Démo : aucun paiement n&apos;est demandé, les jeux vont directement dans la bibliothèque.</p>
      </aside>
    </div>
  );
}
