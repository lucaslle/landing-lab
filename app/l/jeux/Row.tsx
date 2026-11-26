"use client";

import { useRef, type ReactNode } from "react";
import { CrIconButton } from "@cristal-ui/react";
import { Icon } from "./Icon";
import styles from "./jeux.module.css";

// Horizontal scroll-snap row with a "next" button, as in the mockup.
export function Row({ label, children }: { label: string; children: ReactNode }) {
  const track = useRef<HTMLUListElement>(null);
  const scroll = (direction: number) => track.current?.scrollBy({ left: direction * track.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <div className={styles.row}>
      <ul ref={track} className={styles.track} aria-label={label}>
        {children}
      </ul>
      <div className={styles.rowButtons}>
        <CrIconButton label="Jeux précédents" variant="secondary" shape="round" size="s" onClick={() => scroll(-1)}>
          <Icon name="arrowLeft" />
        </CrIconButton>
        <CrIconButton label="Jeux suivants" variant="secondary" shape="round" size="s" onClick={() => scroll(1)}>
          <Icon name="arrow" />
        </CrIconButton>
      </div>
    </div>
  );
}
