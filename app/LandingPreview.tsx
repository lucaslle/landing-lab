"use client";

import { useEffect, useRef } from "react";
import styles from "./page.module.css";

// Width the landing is rendered at inside the thumbnail, before scaling down to the card.
const FRAME_WIDTH = 1280;

// Live, scaled-down view of a landing: always up to date, no screenshot to maintain.
export function LandingPreview({ href, title }: { href: string; title: string }) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = box.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) =>
      element.style.setProperty("--scale", String(entry.contentRect.width / FRAME_WIDTH)),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.proof} aria-hidden="true">
      <div ref={box} className={styles.preview}>
        <iframe
          src={href}
          title={`Aperçu de ${title}`}
          className={styles.frame}
          style={{ width: FRAME_WIDTH }}
          loading="lazy"
          scrolling="no"
          tabIndex={-1}
          inert
        />
      </div>
    </div>
  );
}
