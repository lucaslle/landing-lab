"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CrButton, CrImage, CrSegmented, CrTabPanel } from "@cristal-ui/react";
import { euros, findMenu, menus, photo } from "../data";
import styles from "../gastronomie.module.css";

// One tab per menu, opened on ?menu=… when coming from the home page.
export function MenuTabs() {
  const params = useSearchParams();
  const [slug, setSlug] = useState(findMenu(params.get("menu"))?.slug ?? menus[0].slug);

  return (
    <CrSegmented lang="fr" label="Menus" variant="underline" value={slug} onCrChange={(event) => setSlug(event.detail)} className={styles.tabs}>
      {menus.map((menu) => (
        <CrTabPanel key={menu.slug} label={menu.name} value={menu.slug}>
          <article className={styles.menu}>
            <CrImage src={photo(menu.photo, 900, 1100)} alt={menu.alt} className={styles.menuCover} />
            <div className={styles.menuBody}>
              <p className={styles.kicker}>
                {menu.courses} temps · {menu.served}
              </p>
              <h2 className={styles.heading}>{menu.name}</h2>
              <p className={styles.muted}>{menu.pitch}</p>
              <ol className={styles.courses}>
                {menu.dishes.map((dish) => (
                  <li key={dish.name}>
                    <span className={styles.courseName}>{dish.name}</span>
                    <span className={styles.muted}>{dish.detail}</span>
                  </li>
                ))}
              </ol>
              <dl className={styles.prices}>
                <div>
                  <dt>Le menu</dt>
                  <dd>{euros(menu.price)}</dd>
                </div>
                <div>
                  <dt>Accord mets et vins</dt>
                  <dd>+ {euros(menu.pairing)}</dd>
                </div>
              </dl>
              <div className={styles.actions}>
                <CrButton href={`/l/gastronomie/reserver?menu=${menu.slug}`} className={styles.book}>
                  Réserver ce menu
                </CrButton>
              </div>
            </div>
          </article>
        </CrTabPanel>
      ))}
    </CrSegmented>
  );
}
