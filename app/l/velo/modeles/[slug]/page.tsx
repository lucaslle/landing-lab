import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CrBreadcrumb, CrImage } from "@cristal-ui/react/ssr";
import { BikeFigure } from "../../BikeFigure";
import { bikes, details, findBike, photo } from "../../data";
import { SizeFinder } from "../../SizeFinder";
import { BuyBox } from "./BuyBox";
import styles from "../../velo.module.css";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => bikes.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const bike = findBike((await params).slug);
  return bike ? { title: `Kairn ${bike.name} · ${bike.family}`, description: bike.summary } : {};
}

export default async function BikePage({ params }: Props) {
  const bike = findBike((await params).slug);
  if (!bike) notFound();

  return (
    <main className={styles.inner}>
      <CrBreadcrumb lang="fr">
        <Link href="/l/velo">Accueil</Link>
        <span>{bike.name}</span>
      </CrBreadcrumb>

      <div className={styles.product}>
        <div className={styles.detailBody}>
          <BikeFigure bike={bike} priority />
          <div className={styles.gallery}>
            {Object.values(details).map((detail) => (
              <CrImage key={detail.id} src={photo(detail.id, 600, 450)} alt={detail.alt} className={styles.galleryPhoto} />
            ))}
          </div>
          <dl className={styles.facts}>
            {[...bike.specs, { label: "Poids", value: `${bike.weight.toLocaleString("fr-FR")} kg en taille M` }].map((spec) => (
              <div key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={styles.productInfo}>
          <p className={styles.family}>{bike.family}</p>
          <h1 className={styles.model}>
            {bike.name}
            <span>{bike.groupset}</span>
          </h1>
          <p className={styles.prose}>{bike.summary}</p>
          <BuyBox bike={bike} />
          <SizeFinder />
          <p className={styles.muted}>Livré monté et réglé, retours offerts sous 30 jours.</p>
        </div>
      </div>
    </main>
  );
}
