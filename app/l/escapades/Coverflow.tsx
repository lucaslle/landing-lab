"use client";

import { useState, type CSSProperties, type KeyboardEvent } from "react";
import Link from "next/link";
import { CrIconButton, CrImage } from "@cristal-ui/react";
import { clouds, destinations, photo } from "./data";
import styles from "./escapades.module.css";

const VISIBLE = 2; // cards shown on each side of the active one

// Signed distance from the active card, wrapped so the row loops.
const offsetOf = (position: number, active: number, count: number) => {
  let offset = position - active;
  if (offset > count / 2) offset -= count;
  if (offset < -count / 2) offset += count;
  return offset;
};

// 3D carousel after the mockup: tilted cards around the active one, its photo blurred behind, clouds below.
export function Coverflow() {
  const [active, setActive] = useState(0);
  const count = destinations.length;
  const current = destinations[active];
  const go = (step: number) => setActive((index) => (index + step + count) % count);

  const onKey = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") go(1);
    if (event.key === "ArrowLeft") go(-1);
  };

  return (
    <section className={styles.stage} aria-roledescription="carrousel" aria-label="Destinations" onKeyDown={onKey}>
      <CrImage key={`${current.slug}-backdrop`} src={photo(current.photo, 1200)} alt="" className={styles.backdrop} />
      <CrImage src={photo(clouds, 2000, 700)} alt="" className={styles.clouds} />

      <ul className={styles.cards}>
        {destinations.map((destination, position) => {
          const offset = offsetOf(position, active, count);
          const hidden = Math.abs(offset) > VISIBLE;
          return (
            <li
              key={destination.slug}
              className={styles.card}
              style={{ "--offset": offset, "--depth": Math.abs(offset) } as CSSProperties}
              data-active={offset === 0 || undefined}
              hidden={hidden}
            >
              {offset === 0 ? (
                <Link href={`/l/escapades/destination/${destination.slug}`} className={styles.cardLink}>
                  <CrImage src={photo(destination.photo, 700, 1000)} alt={destination.alt} className={styles.cardPhoto} />
                  <span className={styles.cardTag}>{destination.country}</span>
                </Link>
              ) : (
                <button type="button" className={styles.cardLink} onClick={() => setActive(position)} tabIndex={-1} aria-hidden="true">
                  <CrImage src={photo(destination.photo, 500, 720)} alt="" className={styles.cardPhoto} />
                </button>
              )}
            </li>
          );
        })}
      </ul>

      <div key={`${current.slug}-caption`} className={styles.caption} aria-live="polite">
        <h1 className={styles.title}>
          {current.place}
          <span>– {current.country}</span>
        </h1>
        <p className={styles.tagline}>{current.tagline}</p>
      </div>

      <CrIconButton label="Destination précédente" variant="ghost" shape="round" className={`${styles.arrow} ${styles.prev}`} onClick={() => go(-1)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </CrIconButton>
      <CrIconButton label="Destination suivante" variant="ghost" shape="round" className={`${styles.arrow} ${styles.next}`} onClick={() => go(1)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </CrIconButton>

      <p className={styles.position}>
        {String(active + 1).padStart(2, "0")} <span>/ {String(count).padStart(2, "0")}</span>
      </p>
    </section>
  );
}
