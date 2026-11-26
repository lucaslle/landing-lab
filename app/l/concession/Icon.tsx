import styles from "./concession.module.css";

// Line icons on a 24×24 grid, one stroke for the whole landing.
export const icons = {
  arrow: "M5 12h14 M13 6l6 6-6 6",
  arrowLeft: "M19 12H5 M11 6l-6 6 6 6",
  calendar: "M4 6h16v14H4z M4 10h16 M8 3v4 M16 3v4",
  gauge: "M4 18a8 8 0 1 1 16 0 M12 18l4-6",
  bolt: "M13 3 5 14h6l-1 7 8-11h-6z",
  road: "M8 3 5 21 M16 3l3 18 M12 5v2 M12 11v2 M12 17v2",
  check: "M5 12l4 4 10-10",
  pin: "M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M12 7v5l3 2",
};

export function Icon({ name, className = styles.icon }: { name: keyof typeof icons; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={icons[name]} />
    </svg>
  );
}
