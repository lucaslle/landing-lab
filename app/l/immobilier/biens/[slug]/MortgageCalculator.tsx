"use client";

import { useState } from "react";
import { CrNumber, CrSlider } from "@cristal-ui/react";
import styles from "../../immobilier.module.css";

const RATE = 0.034; // yearly rate shown to the visitor, fixed for the demo

// Fixed-rate monthly payment: loan × r / (1 − (1 + r)^−n), with r the monthly rate and n the number of months.
export const monthlyPayment = (loan: number, years: number, rate = RATE) => {
  const r = rate / 12;
  const n = years * 12;
  return loan <= 0 ? 0 : Math.round((loan * r) / (1 - (1 + r) ** -n));
};

export function MortgageCalculator({ price }: { price: number }) {
  const [deposit, setDeposit] = useState(30);
  const [years, setYears] = useState(20);
  const loan = Math.round(price * (1 - deposit / 100));

  return (
    <div className={styles.calculator}>
      <CrSlider lang="fr" label={`Apport : ${deposit} %`} min={10} max={80} step={5} value={deposit} onCrInput={(event) => setDeposit(event.detail)} />
      <CrSlider lang="fr" label={`Durée : ${years} ans`} min={10} max={25} step={1} value={years} onCrInput={(event) => setYears(event.detail)} />
      <p className={styles.monthly}>
        <span className={styles.muted}>
          Mensualité à {(RATE * 100).toLocaleString("fr-FR")} %
          <br />
          pour {loan.toLocaleString("fr-FR")} € empruntés
        </span>
        <strong>
          <CrNumber lang="fr" value={monthlyPayment(loan, years)} animation="roll" /> €
        </strong>
      </p>
    </div>
  );
}
