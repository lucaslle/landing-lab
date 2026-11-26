"use client";

import { useSyncExternalStore } from "react";
import { CrNumber } from "@cristal-ui/react";
import { classes, legends } from "./legends";
import styles from "./apex.module.css";

const stats = [
  { label: "Légendes", value: legends.length },
  { label: "Classes", value: Object.keys(classes).length },
  { label: "Joueurs par partie", value: 60 },
  { label: "Par escouade", value: 3 },
];

const noop = () => () => {};

// CrNumber only animates on change: 0 on the server and at hydration, then the real values roll in.
export function Stats() {
  const ready = useSyncExternalStore(noop, () => true, () => false);

  return (
    <dl className={styles.stats}>
      {stats.map(({ label, value }) => (
        <div key={label} className={styles.stat}>
          <dt>{label}</dt>
          <dd>
            <CrNumber lang="fr" value={ready ? value : 0} animation="roll" />
          </dd>
        </div>
      ))}
    </dl>
  );
}
