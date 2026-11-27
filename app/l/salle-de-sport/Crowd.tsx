"use client";

import { useState } from "react";
import { CrSegmented } from "@cristal-ui/react";
import { crowd, firstHour } from "./data";
import styles from "./salle-de-sport.module.css";

type Period = keyof typeof crowd;
const labels: Record<Period, string> = { semaine: "En semaine", weekend: "Le week-end" };

// Typical attendance per hour, with calm hours and the peak marked so people can plan around the rush.
export function Crowd() {
  const [period, setPeriod] = useState<Period>("semaine");
  const values = crowd[period];
  const peak = Math.max(...values);

  return (
    <div className={styles.crowd}>
      <CrSegmented lang="fr" label="Période" value={period} onCrChange={(event) => setPeriod(event.detail as Period)}>
        {Object.entries(labels).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </CrSegmented>
      <ol className={styles.bars} aria-label={`Affluence habituelle ${labels[period].toLowerCase()}, de ${firstHour} h à ${firstHour + values.length - 1} h`}>
        {values.map((value, index) => (
          <li key={index} className={value === peak ? styles.peak : value <= 30 ? styles.calm : undefined}>
            <span className={styles.crowdBar} style={{ height: `${value}%` }} />
            <span className={styles.hour} aria-hidden>
              {firstHour + index} h
            </span>
            <span className={styles.srOnly}>
              {firstHour + index} h : {value === peak ? "pic d'affluence" : value <= 30 ? "calme" : `${value} % de la salle`}
            </span>
          </li>
        ))}
      </ol>
      <p className={styles.legend}>
        <span className={styles.dotCalm} /> Calme
        <span className={styles.dotPeak} /> Pic d&apos;affluence
      </p>
    </div>
  );
}
