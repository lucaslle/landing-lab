// To add a landing: create app/l/<slug>/page.tsx, then list it here.
export type Landing = {
  slug: string;
  title: string;
  description: string;
  status: "live" | "draft";
  hue: number; // accent of the card preview, 0-360
};

export const landings: Landing[] = [
  {
    slug: "voyage",
    title: "Agence de voyage",
    description: "Ailleurs, agence fictive : recherche de vols, destinations et newsletter.",
    status: "draft",
    hue: 230,
  },
  {
    slug: "apex",
    title: "Apex Legends",
    description: "Page de fan : les 28 légendes, leurs classes et leurs capacités.",
    status: "draft",
    hue: 25,
  },
  {
    slug: "starter",
    title: "Starter",
    description: "Point de départ : un hero et deux boutons Cristal.",
    status: "draft",
    hue: 265,
  },
];
