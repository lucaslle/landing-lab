"use client";

import { useState } from "react";
import Link from "next/link";
import { CrButton, CrDialog, CrIconButton, CrImage, CrSelect } from "@cristal-ui/react";
import { BikeFigure } from "./BikeFigure";
import { addToCart } from "./Cart";
import { bikes, euros, photo, ridePhotos, sizes } from "./data";
import { Icon } from "./Icon";
import styles from "./velo.module.css";

// Hero of the landing, after the mockup: one bike at a time, its hotspots, color, size and the add-to-cart button.
export function Showcase() {
  const [index, setIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [size, setSize] = useState("");
  const [riding, setRiding] = useState(false);
  const bike = bikes[index];
  const color = bike.colors[colorIndex];

  const show = (step: number) => {
    setIndex((current) => (current + step + bikes.length) % bikes.length);
    setColorIndex(0);
  };

  const add = () => {
    if (!size) return;
    addToCart({
      key: `${bike.slug}|${color.name}|${size}`,
      slug: bike.slug,
      name: `Kairn ${bike.name}`,
      photo: bike.photo,
      options: `${color.name}, taille ${size}`,
      unitPrice: bike.price,
    });
  };

  return (
    <section className={styles.showcase} aria-labelledby="modele-titre" aria-roledescription="carrousel">
      <p className={styles.giant} aria-hidden="true">
        {bike.tagline}
      </p>

      <div className={styles.counter} aria-live="polite">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span className={styles.counterTrack}>
          <span style={{ height: `${((index + 1) / bikes.length) * 100}%` }} />
        </span>
        <span className={styles.visuallyHidden}>sur {bikes.length}</span>
      </div>

      <div key={bike.slug} className={styles.info}>
        <p className={styles.family}>{bike.family}</p>
        <h1 id="modele-titre" className={styles.model}>
          {bike.name}
          <span>{bike.groupset}</span>
        </h1>
        <p className={styles.price}>{euros(bike.price)}</p>
        <div className={styles.choices}>
          <CrSelect lang="fr" label="Couleur" value={String(colorIndex)} onCrChange={(event) => setColorIndex(Number(event.detail))}>
            {bike.colors.map((option, position) => (
              <option key={option.name} value={String(position)}>
                {option.name}
              </option>
            ))}
          </CrSelect>
          <CrSelect lang="fr" label="Taille" value={size} placeholder="Choisir" onCrChange={(event) => setSize(String(event.detail ?? ""))}>
            {sizes.map((option) => (
              <option key={option.label} value={option.label}>
                {option.label}, {option.min} à {option.max} cm
              </option>
            ))}
          </CrSelect>
        </div>
        <div className={styles.buy}>
          <CrButton className={styles.green} disabled={!size} onClick={add}>
            <Icon name="bag" /> Ajouter au panier
          </CrButton>
          <Link href={`/l/velo/modeles/${bike.slug}`} className={styles.more}>
            Fiche complète
          </Link>
        </div>
        {/* Kept in the layout once a size is chosen, so the centred block does not jump. */}
        <p className={styles.hint} hidden={!!size} style={{ display: "block", visibility: size ? "hidden" : "visible" }}>
          Choisissez une taille pour l&apos;ajouter au panier.
        </p>
      </div>

      <div key={`${bike.slug}-figure`} className={styles.stage}>
        <BikeFigure bike={bike} priority />
      </div>

      <div className={styles.arrows}>
        <CrIconButton label="Modèle suivant" variant="ghost" shape="round" onClick={() => show(1)}>
          <Icon name="arrow" />
        </CrIconButton>
        <CrIconButton label="Modèle précédent" variant="ghost" shape="round" onClick={() => show(-1)}>
          <Icon name="arrowLeft" />
        </CrIconButton>
      </div>

      <button type="button" className={styles.action} onClick={() => setRiding(true)}>
        <span className={styles.play}>
          <Icon name="play" />
        </span>
        Voir sur la route
      </button>
      <p className={styles.shipping}>
        <Icon name="truck" /> Livraison et retours offerts
      </p>

      <CrDialog lang="fr" label={`Le ${bike.name} sur la route`} open={riding} onCrClose={() => setRiding(false)}>
        <div className={styles.rides}>
          {ridePhotos.map((ride) => (
            <CrImage key={ride.id} src={photo(ride.id, 900)} alt={ride.alt} className={styles.ridePhoto} />
          ))}
        </div>
      </CrDialog>
    </section>
  );
}
