"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { CrAlert, CrToaster } from "@cristal-ui/react";
import { findGame } from "./data";
import styles from "./jeux.module.css";

type State = {
  cart: string[]; // game slugs
  wishlist: string[];
  library: string[];
  notice: { text: string; href: string; link: string; at: number } | null;
};

// Kept in sessionStorage: it survives the full reloads that Cristal buttons with href trigger.
const STORAGE_KEY = "pulse-store";
const EMPTY: State = { cart: [], wishlist: [], library: [], notice: null };
let state: State | null = null;
const listeners = new Set<() => void>();

const read = (): State => {
  if (!state) {
    let loaded = EMPTY;
    try {
      loaded = { ...EMPTY, ...JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}"), notice: null };
    } catch {
      // Unreadable or blocked storage: start empty.
    }
    state = loaded;
  }
  return state;
};

const write = (next: State) => {
  state = next;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ cart: next.cart, wishlist: next.wishlist, library: next.library }));
  } catch {
    // Private mode or storage full: the store still works for this page.
  }
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const title = (slug: string) => findGame(slug)?.title ?? slug;

export const addToCart = (slug: string) => {
  const current = read();
  if (current.library.includes(slug) || current.cart.includes(slug)) return;
  write({
    ...current,
    cart: [...current.cart, slug],
    notice: { text: `${title(slug)} est dans le panier.`, href: "/l/jeux/panier", link: "Voir le panier", at: Date.now() },
  });
};

export const removeFromCart = (slug: string) => {
  const current = read();
  write({ ...current, cart: current.cart.filter((item) => item !== slug), notice: null });
};

export const toggleWishlist = (slug: string) => {
  const current = read();
  const listed = current.wishlist.includes(slug);
  write({
    ...current,
    wishlist: listed ? current.wishlist.filter((item) => item !== slug) : [...current.wishlist, slug],
    notice: listed
      ? null
      : { text: `${title(slug)} ajouté à la liste de souhaits.`, href: "/l/jeux/souhaits", link: "Voir la liste", at: Date.now() },
  });
};

// Demo purchase: the cart's games move to the library, nothing is charged.
export const checkout = () => {
  const current = read();
  write({
    cart: [],
    wishlist: current.wishlist.filter((slug) => !current.cart.includes(slug)),
    library: [...current.library, ...current.cart],
    notice: null,
  });
};

// The server and the first browser render see an empty store, then the stored one.
export const useStore = () => useSyncExternalStore(subscribe, read, () => EMPTY);

export function StoreToaster() {
  const { notice } = useStore();
  return (
    <CrToaster lang="fr">
      {notice && (
        <CrAlert key={notice.at} lang="fr" variant="success" duration={4000} onCrClose={() => write({ ...read(), notice: null })}>
          {notice.text}{" "}
          <Link href={notice.href} className={styles.toastLink}>
            {notice.link}
          </Link>
        </CrAlert>
      )}
    </CrToaster>
  );
}
