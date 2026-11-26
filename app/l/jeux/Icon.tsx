import styles from "./jeux.module.css";

// Line icons on a 24×24 grid, one stroke for the whole landing.
export const icons = {
  store: "M4 9h16l-1 11H5z M8 9V7a4 4 0 0 1 8 0v2",
  library: "M5 4h3v16H5z M10 4h3v16h-3z M15 5l3-1 3 15-3 1z",
  heart: "M12 20s-7-4.4-9-9a4.5 4.5 0 0 1 9-3 4.5 4.5 0 0 1 9 3c-2 4.6-9 9-9 9z",
  cart: "M3 4h2l2.4 11h11L21 8H6.2 M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M18 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  bell: "M6 16V11a6 6 0 0 1 12 0v5l2 2H4z M10 20h4",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z M20 20l-4-4",
  play: "M8 5v14l11-7z",
  arrow: "M5 12h14 M13 6l6 6-6 6",
  arrowLeft: "M19 12H5 M11 6l-6 6 6 6",
  trophy: "M8 4h8v5a4 4 0 0 1-8 0z M8 6H4v2a3 3 0 0 0 4 3 M16 6h4v2a3 3 0 0 1-4 3 M12 13v4 M8 20h8",
  grid: "M4 4h7v7H4z M13 4h7v7h-7z M4 13h7v7H4z M13 13h7v7h-7z",
  home: "M4 11 12 4l8 7 M6 10v10h12V10",
};

export function Icon({ name, className = styles.icon }: { name: keyof typeof icons; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={icons[name]} />
    </svg>
  );
}
