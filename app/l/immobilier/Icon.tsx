import styles from "./immobilier.module.css";

// Line icons on a 24×24 grid, one stroke for the whole landing.
export const icons = {
  bed: "M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7 M3 14h18 M3 18v2 M21 18v2 M7 9V6h10v3",
  bath: "M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z M6 12V6a2 2 0 0 1 4 0 M7 19l-1 2 M17 19l1 2",
  area: "M4 20 20 4 M14 4h6v6 M10 20H4v-6",
  pin: "M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  heart: "M12 20s-7-4.4-9-9a4.5 4.5 0 0 1 9-3 4.5 4.5 0 0 1 9 3c-2 4.6-9 9-9 9z",
  arrow: "M5 12h14 M13 6l6 6-6 6",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z M20 20l-4-4",
  diamond: "M6 4h12l3 5-9 11L3 9z M3 9h18 M9 4l3 5 3-5 M12 9v11",
  house: "M4 11 12 4l8 7 M6 10v10h12V10 M10 20v-5h4v5",
  key: "M15 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10z M11.5 11.5 4 19 M6.5 16.5l2 2 M4 19l2 2",
  chart: "M5 20v-7 M10 20V9 M15 20v-5 M20 20V5 M3 20h18",
  check: "M5 12l4 4 10-10",
  calendar: "M4 6h16v14H4z M4 10h16 M8 3v4 M16 3v4",
  land: "M3 20h18 M5 20c1-5 4-8 7-8s6 3 7 8 M12 12V5 M12 5l4 2-4 2",
};

export function Icon({ name, className = styles.icon }: { name: keyof typeof icons; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={icons[name]} />
    </svg>
  );
}
