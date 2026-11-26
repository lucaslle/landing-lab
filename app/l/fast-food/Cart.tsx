"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { CrAlert, CrButton, CrIconButton, CrToaster } from "@cristal-ui/react";
import { optionsByCategory, type Product } from "./data";
import { Icon } from "./Icon";
import styles from "./fast-food.module.css";

export type CartLine = {
  key: string; // product + options, so the same burger with other extras is a separate line
  slug: string;
  name: string;
  photo: string;
  options: string;
  unitPrice: number;
  quantity: number;
};

type State = { lines: CartLine[]; added: { name: string; at: number } | null };

// Cart kept in sessionStorage: it survives the full reloads that Cristal buttons with href trigger.
const STORAGE_KEY = "tasty-bites-cart";
const EMPTY: State = { lines: [], added: null };
let state: State | null = null;
const listeners = new Set<() => void>();

const read = (): State => {
  if (!state) {
    try {
      state = { lines: JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]"), added: null };
    } catch {
      state = EMPTY;
    }
  }
  return state;
};

const write = (next: State) => {
  state = next;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next.lines));
  } catch {
    // Private mode or storage full: the cart still works for this page.
  }
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const addToCart = (line: Omit<CartLine, "quantity">, quantity = 1) => {
  const { lines } = read();
  write({
    lines: lines.some((existing) => existing.key === line.key)
      ? lines.map((existing) => (existing.key === line.key ? { ...existing, quantity: existing.quantity + quantity } : existing))
      : [...lines, { ...line, quantity }],
    added: { name: line.name, at: Date.now() },
  });
};

export const setQuantity = (key: string, quantity: number) => {
  const { lines } = read();
  write({
    lines: quantity <= 0 ? lines.filter((line) => line.key !== key) : lines.map((line) => (line.key === key ? { ...line, quantity } : line)),
    added: null,
  });
};

export const clearCart = () => write(EMPTY);

// The server and the first browser render see an empty cart, then the stored one.
export function useCart() {
  const { lines, added } = useSyncExternalStore(subscribe, read, () => EMPTY);
  return {
    lines,
    added,
    count: lines.reduce((sum, line) => sum + line.quantity, 0),
    subtotal: lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0),
  };
}

export function CartToaster() {
  const { added } = useCart();
  return (
    <CrToaster lang="fr">
      {added && (
        <CrAlert key={added.at} lang="fr" variant="success" duration={4000} onCrClose={() => write({ ...read(), added: null })}>
          {added.name} ajouté au panier.{" "}
          <Link href="/l/fast-food/commande" className={styles.toastLink}>
            Voir le panier
          </Link>
        </CrAlert>
      )}
    </CrToaster>
  );
}

// The product with its default size and no extra: what the card buttons add.
export const basicLine = (product: Product) => {
  const size = optionsByCategory[product.category].sizes?.[0];
  return {
    key: `${product.slug}|${size?.label ?? ""}|`,
    slug: product.slug,
    name: product.name,
    photo: product.photo,
    options: size?.label ?? "",
    unitPrice: product.price,
  };
};

export function AddToCart({ product, block = false }: { product: Product; block?: boolean }) {
  return (
    <CrButton size="s" fullWidth={block} className={styles.addButton} onClick={() => addToCart(basicLine(product))}>
      <Icon name="cart" /> Ajouter
    </CrButton>
  );
}

export function CartButton() {
  const { count } = useCart();
  return (
    <CrIconButton
      label={count ? `Panier, ${count} article${count > 1 ? "s" : ""}` : "Panier vide"}
      href="/l/fast-food/commande"
      variant="ghost"
      shape="round"
      badge={count || undefined}
      className={styles.cartButton}
    >
      <Icon name="cart" />
    </CrIconButton>
  );
}
