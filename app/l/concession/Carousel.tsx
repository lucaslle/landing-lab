"use client";

import { useRef, type ReactNode } from "react";
import { CrIconButton } from "@cristal-ui/react";
import { Icon } from "./Icon";
import styles from "./concession.module.css";

// Horizontal scroll-snap row; the arrows scroll it by one card.
export function Carousel({ label, children }: { label: string; children: ReactNode }) {
  const track = useRef<HTMLUListElement>(null);
  const scroll = (direction: number) => {
    const list = track.current;
    const card = list?.firstElementChild;
    if (list && card) list.scrollBy({ left: direction * (card.clientWidth + 20), behavior: "smooth" });
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselButtons}>
        <CrIconButton label="Véhicule précédent" variant="primary" shape="round" onClick={() => scroll(-1)}>
          <Icon name="arrowLeft" />
        </CrIconButton>
        <CrIconButton label="Véhicule suivant" variant="outline" shape="round" onClick={() => scroll(1)}>
          <Icon name="arrow" />
        </CrIconButton>
      </div>
      <ul ref={track} className={styles.track} aria-label={label}>
        {children}
      </ul>
    </div>
  );
}
