"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CrAvatar, CrCommandPalette, CrIconButton, CrKbd } from "@cristal-ui/react";
import { games } from "./data";
import { Icon, type icons } from "./Icon";
import { useStore } from "./Store";
import styles from "./jeux.module.css";

const links: { href: string; label: string; icon: keyof typeof icons }[] = [
  { href: "/l/jeux", label: "Boutique", icon: "store" },
  { href: "/l/jeux/bibliotheque", label: "Bibliothèque", icon: "library" },
  { href: "/l/jeux/souhaits", label: "Liste de souhaits", icon: "heart" },
  { href: "/l/jeux/panier", label: "Panier", icon: "cart" },
];

export function SideNav() {
  const pathname = usePathname();
  const { cart, wishlist, library } = useStore();
  const counts: Record<string, number> = {
    "/l/jeux/bibliotheque": library.length,
    "/l/jeux/souhaits": wishlist.length,
    "/l/jeux/panier": cart.length,
  };

  return (
    <aside className={styles.side}>
      <Link href="/l/jeux" className={styles.logo}>
        <span className={styles.mark} aria-hidden="true" />
        Pulse
      </Link>
      <nav aria-label="Navigation de la boutique" className={styles.sideNav}>
        {links.map((link) => (
          <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>
            <Icon name={link.icon} />
            {link.label}
            {counts[link.href] ? <span className={styles.count}>{counts[link.href]}</span> : null}
          </Link>
        ))}
      </nav>
      <Link href="/" className={styles.sideBack}>
        <Icon name="grid" />
        Toutes les landings
      </Link>
      <div className={styles.me}>
        <CrAvatar name="Alex Mercier" status="online" />
        <span>
          Alex Mercier
          <small>En ligne</small>
        </span>
      </div>
    </aside>
  );
}

export function TopBar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { cart } = useStore();

  return (
    <header className={styles.top}>
      <button type="button" className={styles.search} onClick={() => setOpen(true)}>
        <Icon name="search" />
        Rechercher un jeu, un studio, un genre…
        <CrKbd keys="Mod+K" />
      </button>
      <CrCommandPalette
        lang="fr"
        label="Rechercher un jeu"
        placeholder="Nom du jeu…"
        open={open}
        onCrSelect={(event) => router.push(`/l/jeux/jeu/${event.detail}`)}
        onCrClose={() => setOpen(false)}
      >
        {games.map((game) => (
          <option key={game.slug} value={game.slug} data-group={game.upcoming ? "Bientôt" : game.genre.split(",")[0]}>
            {game.title}
          </option>
        ))}
      </CrCommandPalette>
      <div className={styles.topActions}>
        <CrIconButton label="Notifications, 2 nouvelles" variant="outline" badge={2}>
          <Icon name="bell" />
        </CrIconButton>
        <CrIconButton
          label={cart.length ? `Panier, ${cart.length} jeu${cart.length > 1 ? "x" : ""}` : "Panier vide"}
          href="/l/jeux/panier"
          variant="outline"
          badge={cart.length || undefined}
        >
          <Icon name="cart" />
        </CrIconButton>
      </div>
    </header>
  );
}
