import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CrBadge, CrBreadcrumb, CrImage } from "@cristal-ui/react/ssr";
import { categories, euros, findProduct, photo, products } from "../../data";
import { ProductCard } from "../../ProductCard";
import { ProductOptions } from "./ProductOptions";
import styles from "../../fast-food.module.css";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => products.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = findProduct((await params).slug);
  return product ? { title: `${product.name} · Tasty Bites`, description: product.description } : {};
}

export default async function ProductPage({ params }: Props) {
  const product = findProduct((await params).slug);
  if (!product) notFound();
  const others = products.filter((other) => other.category !== product.category && other.tag === "Populaire").slice(0, 4);

  return (
    <main className={styles.main}>
      <div className={styles.product}>
        <CrImage src={photo(product.photo, 1200)} alt={product.alt} className={styles.productPhoto} />
        <div className={styles.productBody}>
          <CrBreadcrumb lang="fr">
            <Link href="/l/fast-food">Accueil</Link>
            <Link href={`/l/fast-food/carte?categorie=${product.category}`}>{categories[product.category]}</Link>
            <span>{product.name}</span>
          </CrBreadcrumb>
          {product.tag && (
            <CrBadge variant={product.tag === "Épicé" ? "danger" : "primary"}>{product.tag}</CrBadge>
          )}
          <h1 className={styles.productTitle}>{product.name}</h1>
          <p className={styles.productText}>{product.details}</p>
          <p className={styles.allergens}>
            À partir de {euros(product.price)} ·{" "}
            {product.allergens.length ? `Allergènes : ${product.allergens.join(", ")}` : "Sans allergène majeur"}
          </p>
          <ProductOptions product={product} />
        </div>
      </div>

      <section className={styles.section} aria-labelledby="avec-titre">
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.eyebrow}>Pour aller avec</p>
            <h2 id="avec-titre" className={styles.heading}>
              Complétez votre commande
            </h2>
          </div>
        </div>
        <ul className={styles.cards}>
          {others.map((other, index) => (
            <ProductCard key={other.slug} product={other} index={index} />
          ))}
        </ul>
      </section>
    </main>
  );
}
