import type { Metadata } from "next";
import Link from "next/link";
import { CrBreadcrumb, CrImage } from "@cristal-ui/react/ssr";
import { photo, photos, wines } from "../data";
import { WineList } from "./WineList";
import styles from "../gastronomie.module.css";

export const metadata: Metadata = {
  title: "La cave · Ardoise",
  description: "Une sélection de la cave d'Ardoise : vins du Rhône nord, du Beaujolais, de Bourgogne et du Jura, au verre ou à la bouteille.",
};

export default function CellarPage() {
  return (
    <main className={styles.inner}>
      <CrBreadcrumb lang="fr">
        <Link href="/l/gastronomie">Ardoise</Link>
        <span>La cave</span>
      </CrBreadcrumb>
      <div className={styles.split}>
        <div className={styles.intro}>
          <h1 className={styles.title}>La cave</h1>
          <p className={styles.muted}>
            Samuel Okafor garde six cents références sous la salle, dans une ancienne cave voûtée des Tanneurs. Voici celles qu&apos;il
            ouvre le plus souvent : beaucoup de vignerons du Rhône nord et du Beaujolais, quelques grandes bouteilles de
            Bourgogne, et des vins doux pour finir.
          </p>
          <p className={styles.muted}>
            {wines.filter((wine) => wine.glass).length} vins sont servis au verre. Les autres se commandent à la bouteille, et
            Samuel vous conseille volontiers selon votre menu.
          </p>
        </div>
        <CrImage src={photo(photos.pouring, 1000, 700)} alt="Un sommelier verse du vin rouge dans un verre" className={styles.wide} />
      </div>
      <WineList />
    </main>
  );
}
