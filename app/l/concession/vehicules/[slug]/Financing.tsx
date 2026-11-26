"use client";

import { useState } from "react";
import { CrNumber, CrSlider } from "@cristal-ui/react";
import styles from "../../concession.module.css";

const RATE = 0.059; // yearly rate shown to the visitor, fixed for the demo

// Fixed-rate monthly payment: loan × r / (1 − (1 + r)^−n), with r the monthly rate and n the number of months.
export const monthlyPayment = (loan: number, months: number, rate = RATE) => {
  const r = rate / 12;
  return loan <= 0 ? 0 : Math.round((loan * r) / (1 - (1 + r) ** -months));
};

export function Financing({ price }: { price: number }) {
  const [deposit, setDeposit] = useState(30);
  const [months, setMonths] = useState(48);
  const loan = Math.round(price * (1 - deposit / 100));

  return (
    <div className={styles.calculator}>
      <CrSlider lang="fr" label={`Apport : ${deposit} %`} min={10} max={70} step={5} value={deposit} onCrInput={(event) => setDeposit(event.detail)} />
      <CrSlider lang="fr" label={`Durée : ${months} mois`} min={24} max={72} step={12} value={months} onCrInput={(event) => setMonths(event.detail)} />
      <p className={styles.monthly}>
        <span className={styles.muted}>
          {loan.toLocaleString("fr-FR")} € empruntés
          <br />à {(RATE * 100).toLocaleString("fr-FR")} % par an
        </span>
        <strong>
          <CrNumber lang="fr" value={monthlyPayment(loan, months)} animation="roll" /> €/mois
        </strong>
      </p>
      <p className={styles.legal}>
        Exemple indicatif de crédit classique, hors assurance. Un crédit vous engage et doit être remboursé : vérifiez vos
        capacités de remboursement avant de vous engager.
      </p>
    </div>
  );
}
