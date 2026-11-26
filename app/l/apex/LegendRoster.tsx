"use client";

import { useState, type CSSProperties } from "react";
import { CrBadge, CrDialog, CrImage, CrSegmented } from "@cristal-ui/react";
import { classes, legends, type Legend, type LegendClass } from "./legends";
import styles from "./apex.module.css";

const slots = [
  ["passive", "Passif"],
  ["tactical", "Tactique"],
  ["ultimate", "Ultime"],
] as const;

export function LegendRoster({ images }: { images: Record<string, string> }) {
  const [filter, setFilter] = useState<LegendClass | "all">("all");
  const [picked, setPicked] = useState<Legend | null>(null);
  const shown = filter === "all" ? legends : legends.filter((legend) => legend.legendClass === filter);

  return (
    <>
      <CrSegmented
        lang="fr"
        label="Filtrer par classe"
        value={filter}
        className={styles.filter}
        onCrChange={(event) => setFilter(event.detail as LegendClass | "all")}
      >
        <option value="all">Toutes</option>
        {Object.entries(classes).map(([key, { label }]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </CrSegmented>

      <ul className={styles.roster} aria-live="polite">
        {shown.map((legend) => (
          <li key={legend.name} style={{ "--hue": classes[legend.legendClass].hue } as CSSProperties}>
            <button type="button" className={styles.legend} aria-haspopup="dialog" onClick={() => setPicked(legend)}>
              {images[legend.name] ? (
                <CrImage src={images[legend.name]} alt="" className={styles.portrait} />
              ) : (
                <span className={styles.initials} aria-hidden="true">
                  {legend.name.slice(0, 2)}
                </span>
              )}
              <span className={styles.legendName}>{legend.name}</span>
              <span className={styles.legendClass}>{classes[legend.legendClass].label}</span>
            </button>
          </li>
        ))}
      </ul>

      <CrDialog
        lang="fr"
        label={picked ? `${picked.name}, fiche de la légende` : "Fiche de la légende"}
        open={picked !== null}
        onCrClose={() => setPicked(null)}
      >
        {picked && (
          <div className={styles.sheet} style={{ "--hue": classes[picked.legendClass].hue } as CSSProperties}>
            <header className={styles.sheetHead}>
              <span className={styles.sheetInitials} aria-hidden="true">
                {images[picked.name] ? (
                  <CrImage src={images[picked.name]} alt="" className={styles.sheetPortrait} />
                ) : (
                  picked.name.slice(0, 2)
                )}
              </span>
              <div>
                <h3 className={styles.sheetName}>{picked.name}</h3>
                <p className={styles.muted}>
                  {picked.realName} · {picked.season === 0 ? "Depuis le lancement" : `Arrivée en saison ${picked.season}`}
                </p>
              </div>
              <CrBadge variant="primary">{classes[picked.legendClass].label}</CrBadge>
            </header>
            <dl className={styles.abilities}>
              {slots.map(([slot, label]) => (
                <div key={slot} className={styles.ability}>
                  <dt>
                    <span className={styles.slot}>{label}</span> {picked[slot].name}
                  </dt>
                  <dd>{picked[slot].fr}</dd>
                </div>
              ))}
            </dl>
            <p className={styles.perk}>
              <strong>Bonus de classe :</strong> {classes[picked.legendClass].perk}
            </p>
          </div>
        )}
      </CrDialog>
    </>
  );
}
