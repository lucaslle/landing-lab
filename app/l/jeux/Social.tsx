import { CrAvatar } from "@cristal-ui/react/ssr";
import { activity, friends } from "./data";
import { Icon } from "./Icon";
import styles from "./jeux.module.css";

// Right column of the store: who is online and what they unlocked.
export function Social() {
  const online = friends.filter((friend) => friend.status === "online").length;

  return (
    <aside className={styles.social} aria-label="Communauté">
      <section aria-labelledby="amis-titre">
        <h2 id="amis-titre" className={styles.socialTitle}>
          Amis en ligne <span>{online}</span>
        </h2>
        <ul className={styles.people}>
          {friends.map((friend) => (
            <li key={friend.name}>
              <CrAvatar name={friend.name} size="s" status={friend.status === "online" ? "online" : "away"} />
              <span>
                {friend.name}
                <small className={friend.activity.startsWith("Joue") ? styles.playing : undefined}>{friend.activity}</small>
              </span>
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="activite-titre">
        <h2 id="activite-titre" className={styles.socialTitle}>
          Activité
        </h2>
        <ul className={styles.people}>
          {activity.map((item) => (
            <li key={item.achievement}>
              <span className={styles.trophy}>
                <Icon name="trophy" />
              </span>
              <span>
                <small className={styles.playing}>Succès débloqué</small>
                {item.achievement}
                <small>
                  {item.player} · {item.game} · {item.when}
                </small>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
