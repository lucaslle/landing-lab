import styles from "./fast-food.module.css";

// Line icons on a 24×24 grid, one stroke for the whole landing.
export const icons = {
  cart: "M3 4h2l2.4 11h11L21 8H6.2 M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M18 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  arrow: "M5 12h14 M13 6l6 6-6 6",
  leaf: "M5 19c0-9 6-14 15-14 0 9-5 15-14 15 M5 19l7-7",
  scooter: "M5 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M18 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M7 15h9l2-6h-4 M14 9V6h-3 M3 11h6",
  shield: "M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z M9 12l2 2 4-4",
  star: "M12 3l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.3 6.8 19.1l1-5.8L3.5 9.2l5.9-.8z",
  lock: "M6 11h12v9H6z M8 11V8a4 4 0 0 1 8 0v3",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M12 7v5l3 2",
  pin: "M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  trash: "M4 7h16 M9 7V4h6v3 M6 7l1 13h10l1-13",
};

export function Icon({ name, className = styles.icon }: { name: keyof typeof icons; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={icons[name]} />
    </svg>
  );
}
