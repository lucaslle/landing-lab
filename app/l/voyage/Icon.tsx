import styles from "./voyage.module.css";

// Line icon in a tinted circle; `path` is SVG path data on a 24×24 grid.
export function Icon({ path }: { path: string }) {
  return (
    <span className={styles.icon} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d={path} />
      </svg>
    </span>
  );
}
