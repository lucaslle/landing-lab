"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CrAlert, CrButton, CrProgress, CrSegmented, CrToaster } from "@cristal-ui/react";
import { clock, days, disciplines, findDiscipline, sessions, type Session } from "../data";
import styles from "../salle-de-sport.module.css";

// Week grid filtered by discipline (?discipline=…). Booking only lives in this page: demo, nothing is sent.
export function Schedule() {
  const params = useSearchParams();
  const [filter, setFilter] = useState(findDiscipline(params.get("discipline"))?.slug ?? "all");
  const [booked, setBooked] = useState<string[]>([]);
  const [notice, setNotice] = useState<{ text: string; at: number } | null>(null);

  const toggle = (session: Session) => {
    const isBooked = booked.includes(session.id);
    setBooked(isBooked ? booked.filter((id) => id !== session.id) : [...booked, session.id]);
    setNotice({
      text: `${session.discipline.name}, ${days[session.day].toLowerCase()} à ${clock(session.time)} : ${isBooked ? "réservation annulée" : "place réservée"}.`,
      at: (notice?.at ?? 0) + 1,
    });
  };

  return (
    <div className={styles.schedule}>
      <CrSegmented lang="fr" label="Discipline" value={filter} onCrChange={(event) => setFilter(event.detail)}>
        <option value="all">Toutes</option>
        {disciplines.map((discipline) => (
          <option key={discipline.slug} value={discipline.slug}>
            {discipline.name}
          </option>
        ))}
      </CrSegmented>

      <div className={styles.week}>
        {days.map((day, index) => {
          const list = sessions.filter((session) => session.day === index && (filter === "all" || session.discipline.slug === filter));
          return (
            <section key={day} className={styles.day} aria-labelledby={`jour-${index}`}>
              <h2 id={`jour-${index}`} className={styles.dayName}>
                {day}
              </h2>
              {list.length === 0 && <p className={styles.empty}>Pas de cours</p>}
              {list.map((session) => {
                const mine = booked.includes(session.id);
                const taken = session.booked + (mine ? 1 : 0);
                const left = session.discipline.capacity - taken;
                return (
                  <article key={session.id} className={mine ? `${styles.slot} ${styles.mine}` : styles.slot}>
                    <p className={styles.slotTime}>{clock(session.time)}</p>
                    <h3 className={styles.slotName}>{session.discipline.name}</h3>
                    <p className={styles.slotMeta}>
                      {session.coach} · {session.discipline.duration} min
                    </p>
                    <CrProgress lang="fr" value={(taken / session.discipline.capacity) * 100} label="Places réservées" />
                    <p className={styles.slotMeta}>
                      {mine ? "Votre place est réservée" : left > 0 ? `${left} place${left > 1 ? "s" : ""} sur ${session.discipline.capacity}` : "Complet"}
                    </p>
                    <CrButton size="s" variant={mine ? "outline" : "primary"} disabled={left <= 0 && !mine} className={mine ? undefined : styles.cta} onClick={() => toggle(session)}>
                      {mine ? "Annuler" : left > 0 ? "Réserver" : "Complet"}
                    </CrButton>
                  </article>
                );
              })}
            </section>
          );
        })}
      </div>

      <CrToaster lang="fr">
        {notice && (
          <CrAlert key={notice.at} lang="fr" variant="success" duration={4000} onCrClose={() => setNotice(null)}>
            {notice.text}
          </CrAlert>
        )}
      </CrToaster>
    </div>
  );
}
