"use client";

import { useState } from "react";
import { CrButton, CrSegmented } from "@cristal-ui/react";
import { comparison, euros, plans, REGISTRATION_FEE, yearly } from "../data";
import styles from "../salle-de-sport.module.css";

type Billing = "mois" | "annee";

const Check = () => (
  <svg viewBox="0 0 16 16" className={styles.check} aria-hidden>
    <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Value = ({ value }: { value: boolean | string }) => {
  if (value === true)
    return (
      <>
        <Check />
        <span className={styles.srOnly}>Inclus</span>
      </>
    );
  if (value === false)
    return (
      <>
        <span className={styles.dash} aria-hidden>
          —
        </span>
        <span className={styles.srOnly}>Non inclus</span>
      </>
    );
  return <>{value}</>;
};

// Monthly or yearly billing; paying for the year gives two free months and waives the registration fee.
export function Plans() {
  const [billing, setBilling] = useState<Billing>("mois");
  const price = (monthly: number) => (billing === "mois" ? monthly : yearly(monthly));
  const period = billing === "mois" ? "/mois" : "/an";

  return (
    <>
      <CrSegmented lang="fr" label="Paiement" value={billing} className={styles.billing} onCrChange={(event) => setBilling(event.detail as Billing)}>
        <option value="mois">Au mois</option>
        <option value="annee">À l&apos;année · 2 mois offerts</option>
      </CrSegmented>

      <ul className={`${styles.plans} ${styles.plansDetailed}`}>
        {plans.map((plan) => (
          <li key={plan.slug} className={plan.highlight ? styles.planHighlight : undefined}>
            <div className={styles.planTop}>
              <p className={styles.planName}>{plan.name}</p>
              {plan.highlight && <span className={styles.recommended}>Recommandé</span>}
            </div>
            <p className={styles.muted}>{plan.pitch}</p>
            <p className={styles.planPrice}>
              {euros(price(plan.monthly))}
              <small>{period}</small>
            </p>
            <p className={styles.planNote}>
              {billing === "mois" ? (
                `Sans engagement · ${euros(REGISTRATION_FEE)} de frais d'inscription`
              ) : (
                <>
                  <s>{euros(plan.monthly * 12)}</s> · {euros(plan.monthly * 2)} d&apos;économie, inscription offerte
                </>
              )}
            </p>
            <CrButton
              href={`/l/salle-de-sport/essai?abonnement=${plan.slug}`}
              variant={plan.highlight ? "primary" : "outline"}
              fullWidth
              className={plan.highlight ? styles.cta : undefined}
            >
              Choisir {plan.name}
            </CrButton>
            <div className={styles.perks}>
              {plan.includes && <p className={styles.includes}>{plan.includes}</p>}
              <ul>
                {plan.perks.map((perk) => (
                  <li key={perk}>
                    <Check />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
      <p className={styles.plansNote}>
        Chaque abonnement commence par une séance d&apos;essai offerte avec un coach. Étudiants : 20 % de réduction sur
        présentation de la carte.
      </p>

      <section className={styles.block} aria-labelledby="comparatif-titre">
        <h2 id="comparatif-titre" className={styles.heading}>
          Comparer en détail
        </h2>
        <div className={styles.compareWrap}>
          <table className={styles.compare}>
            <thead>
              <tr>
                <td />
                {plans.map((plan) => (
                  <th key={plan.slug} scope="col" className={plan.highlight ? styles.compareHighlight : undefined}>
                    <span className={styles.compareName}>{plan.name}</span>
                    <span className={styles.comparePrice}>
                      {euros(price(plan.monthly))}
                      {period}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            {comparison.map((section) => (
              <tbody key={section.group}>
                <tr>
                  <th scope="colgroup" colSpan={plans.length + 1} className={styles.compareGroup}>
                    {section.group}
                  </th>
                </tr>
                {section.rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    {row.values.map((value, index) => (
                      <td key={plans[index].slug} className={plans[index].highlight ? styles.compareHighlight : undefined}>
                        <Value value={value} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </section>
    </>
  );
}
