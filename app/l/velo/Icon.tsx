import styles from "./velo.module.css";

// Line icons on a 24×24 grid, one stroke for the whole landing.
export const icons = {
  bag: "M5 8h14l-1 12H6z M9 8V6a3 3 0 0 1 6 0v2",
  arrow: "M5 12h14 M13 6l6 6-6 6",
  arrowLeft: "M19 12H5 M11 6l-6 6 6 6",
  play: "M8 5v14l11-7z",
  truck: "M3 6h11v10H3z M14 10h4l3 3v3h-7 M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  ruler: "M4 16 16 4l4 4L8 20z M8 12l2 2 M11 9l2 2 M14 6l2 2",
  check: "M5 12l4 4 10-10",
  weight: "M6 8h12l2 12H4z M9 8a3 3 0 0 1 6 0",
};

export function Icon({ name, className = styles.icon }: { name: keyof typeof icons; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={icons[name]} />
    </svg>
  );
}
