// To add a landing: create app/l/<slug>/page.tsx, then list it here.
export type Landing = {
  slug: string;
  title: string;
  description: string;
  status: "live" | "draft";
  hue: number; // accent of the card glow, 0-360
  pages?: { label: string; href: string }[]; // sub-pages worth a shortcut on the card
};

export const landings: Landing[] = [
  {
    slug: "immobilier",
    title: "Agence immobilière",
    description: "Haven, agence fictive : 16 maisons et appartements, fiches avec simulation de prêt, estimation en ligne et prise de rendez-vous.",
    status: "draft",
    hue: 40,
    pages: [
      { label: "Nos biens", href: "/l/immobilier/biens" },
      { label: "Fiche Villefranche", href: "/l/immobilier/biens/villa-azur" },
      { label: "Vendre", href: "/l/immobilier/vendre" },
      { label: "L'agence", href: "/l/immobilier/agence" },
      { label: "Conseils", href: "/l/immobilier/conseils" },
    ],
  },
  {
    slug: "voyage",
    title: "Agence de voyage",
    description: "Ailleurs, agence fictive : recherche, 8 destinations avec leur programme et réservation en ligne.",
    status: "draft",
    hue: 230,
    pages: [
      { label: "Destinations", href: "/l/voyage/destinations" },
      { label: "Fiche Bali", href: "/l/voyage/destinations/bali" },
      { label: "Réservation", href: "/l/voyage/reservation" },
    ],
  },
  {
    slug: "apex",
    title: "Apex Legends",
    description: "Page de fan : les 28 légendes, leurs classes et leurs capacités.",
    status: "draft",
    hue: 25,
    pages: [
      { label: "Légendes", href: "/l/apex#legendes" },
      { label: "Classes", href: "/l/apex#classes" },
    ],
  },
  {
    slug: "starter",
    title: "Starter",
    description: "Point de départ : un hero et deux boutons Cristal.",
    status: "draft",
    hue: 265,
  },
];
