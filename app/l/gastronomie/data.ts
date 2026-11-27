// "Ardoise", a fictional fine dining restaurant in Lyon. Chef, team, producers and wines are invented.
// Photos: unsplash.com (Unsplash license), served by their CDN.
export const photo = (id: string, width: number, height?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}${height ? `&h=${height}` : ""}&q=75`;

export const photos = {
  hero: "1695555438641-7ccdace35d78",
  room: "1687648431656-da99da578d50",
  window: "1743793055911-52e19beba5d8",
  plating: "1577106263724-2c8e03bfe9cf",
  pass: "1681270496598-13c5365730c8",
  cellar: "1609238000857-303bf54099b1",
  bottles: "1724882207681-9e7e8c3dd45c",
  pouring: "1762454016515-f29750071257",
};

export type Service = "dejeuner" | "diner";
export const services: Record<Service, string> = { dejeuner: "Déjeuner", diner: "Dîner" };

export type Menu = {
  slug: string;
  name: string;
  courses: number;
  price: number; // € per guest
  pairing: number; // € per guest, wine pairing
  services: Service[];
  served: string;
  photo: string;
  alt: string;
  pitch: string;
  dishes: { name: string; detail: string }[];
};

export const menus: Menu[] = [
  {
    slug: "saison",
    name: "Menu Saison",
    courses: 7,
    price: 145,
    pairing: 85,
    services: ["diner"],
    served: "Le soir, du mardi au samedi",
    photo: "1499715217757-2aa48ed7e593",
    alt: "Assiette dressée sur une céramique noire",
    pitch: "Sept temps qui suivent le marché du matin. La carte change à chaque saison, quelques plats chaque semaine.",
    dishes: [
      { name: "Tartelette de betterave", detail: "Chèvre frais de la ferme Brunet, raifort" },
      { name: "Truite de la Dombes", detail: "Beurre blanc à l'oseille, perles de truite" },
      { name: "Cèpes rôtis", detail: "Jaune d'œuf confit, noisettes torréfiées" },
      { name: "Saint-Pierre", detail: "Fenouil braisé, bouillon de crustacés" },
      { name: "Pigeon de Bresse", detail: "Carottes glacées, jus au cassis" },
      { name: "Comté 24 mois", detail: "Poire pochée au vin de Syrah" },
      { name: "Sphère pistache", detail: "Fleurs du jardin, sorbet à l'oseille" },
    ],
  },
  {
    slug: "jardin",
    name: "Menu Jardin",
    courses: 6,
    price: 120,
    pairing: 70,
    services: ["dejeuner", "diner"],
    served: "Midi et soir, du mardi au samedi",
    photo: "1519077336050-4ca5cac9d64f",
    alt: "Artichauts rôtis dans une assiette blanche",
    pitch: "Entièrement végétal, construit autour des récoltes de nos maraîchers. Sans viande ni poisson, jamais sans gourmandise.",
    dishes: [
      { name: "Tomates anciennes", detail: "Eau de tomate glacée, basilic pourpre" },
      { name: "Petits pois", detail: "Lait d'amande, menthe, fleurs de bourrache" },
      { name: "Artichaut poivrade", detail: "Barigoule, huile de citron confit" },
      { name: "Céleri en croûte de sel", detail: "Beurre noisette, truffe d'été" },
      { name: "Courge rôtie", detail: "Épeautre, sauge, graines torréfiées" },
      { name: "Pêche de vigne", detail: "Sorbet, caramel au sarrasin" },
    ],
  },
  {
    slug: "dejeuner",
    name: "Déjeuner",
    courses: 3,
    price: 65,
    pairing: 35,
    services: ["dejeuner"],
    served: "Le midi, du mardi au vendredi",
    photo: "1660652377925-d615178531db",
    alt: "Poisson et légumes dans une assiette creuse bleue",
    pitch: "Entrée, plat et dessert du moment, servis en une heure et quart pour qui doit repartir travailler.",
    dishes: [
      { name: "Entrée du marché", detail: "Selon la récolte du jour" },
      { name: "Bar de ligne", detail: "Risotto d'épeautre, beurre blanc" },
      { name: "Crème brûlée à la verveine", detail: "Sablé au beurre demi-sel" },
    ],
  },
];

export const findMenu = (slug: string | null) => menus.find((menu) => menu.slug === slug);

export const signatures = [
  { name: "Saint-Pierre, bouillon de crustacés", menu: "Menu Saison", photo: "1464093515883-ec948246accb", alt: "Poisson et crustacés dans une assiette creuse" },
  { name: "Pigeon de Bresse, carottes glacées", menu: "Menu Saison", photo: "1616669944447-d65d41a222bd", alt: "Pigeon rôti et carotte sur une assiette en céramique" },
  { name: "Sphère pistache, fleurs du jardin", menu: "Menu Saison", photo: "1759277513204-b432a70af08f", alt: "Dessert vert couvert de fleurs comestibles" },
];

export const producers = [
  { name: "Ferme Brunet", what: "Chèvre frais et légumes racines", where: "Monts du Lyonnais", km: 35, photo: "1687199126330-556bb3c85b2f", alt: "Bottes de carottes et de radis" },
  { name: "Maraîchage Corbet", what: "Tomates anciennes et poivrons", where: "Sainte-Foy", km: 8, photo: "1634428867393-6312c2d9fcc8", alt: "Paniers de tomates de toutes les couleurs" },
  { name: "Ferme de la Combe", what: "Courges et potimarrons", where: "Brindas", km: 17, photo: "1668120083626-46841d08134e", alt: "Courges de formes et de couleurs variées" },
  { name: "Jardin des Simples", what: "Herbes, fleurs et artichauts", where: "Vourles", km: 14, photo: "1589937401375-f91afb09c1a2", alt: "Artichauts dans des caisses au marché" },
];

export const team = [
  { name: "Margaux Ferrand", role: "Cheffe", text: "Douze ans chez les autres, de Lyon à Copenhague, avant d'ouvrir Ardoise en 2019." },
  { name: "Hugo Lambert", role: "Second de cuisine", text: "Il tient le passe et les cuissons, et fume lui-même les truites." },
  { name: "Inès Morel", role: "Cheffe pâtissière", text: "Ses desserts partent du jardin : herbes, fleurs et fruits à peine sucrés." },
  { name: "Samuel Okafor", role: "Sommelier", text: "Six cents références, dont beaucoup de vignerons du Beaujolais et du Rhône nord." },
  { name: "Léa Garnier", role: "Directrice de salle", text: "Elle connaît le prénom de presque tous les habitués, et leur table préférée." },
];

export type WineColor = "rouge" | "blanc" | "bulles" | "doux";
export const wineColors: Record<WineColor, string> = { rouge: "Rouges", blanc: "Blancs", bulles: "Bulles", doux: "Doux" };

export type Wine = { name: string; producer: string; appellation: string; color: WineColor; vintage: number | "NM"; glass?: number; bottle: number };

export const wines: Wine[] = [
  { name: "Les Grandes Terrasses", producer: "Domaine du Vieux Pressoir", appellation: "Côte-Rôtie", color: "rouge", vintage: 2019, bottle: 140 },
  { name: "Coteau de Chavanay", producer: "Maison Allard", appellation: "Saint-Joseph", color: "rouge", vintage: 2021, glass: 16, bottle: 78 },
  { name: "Vieilles Vignes", producer: "Domaine des Tilleuls", appellation: "Morgon", color: "rouge", vintage: 2022, glass: 11, bottle: 52 },
  { name: "Les Pierres Rouges", producer: "Clos Bertrand", appellation: "Fleurie", color: "rouge", vintage: 2022, glass: 10, bottle: 48 },
  { name: "Cuvée du Clocher", producer: "Domaine Faure", appellation: "Crozes-Hermitage", color: "rouge", vintage: 2020, bottle: 64 },
  { name: "Les Chaumes", producer: "Domaine Rivière", appellation: "Gevrey-Chambertin", color: "rouge", vintage: 2018, bottle: 165 },
  { name: "Chéry", producer: "Domaine du Vieux Pressoir", appellation: "Condrieu", color: "blanc", vintage: 2022, bottle: 110 },
  { name: "Les Narvaux", producer: "Domaine Rivière", appellation: "Meursault", color: "blanc", vintage: 2020, bottle: 150 },
  { name: "Roussanne", producer: "Maison Allard", appellation: "Saint-Joseph", color: "blanc", vintage: 2022, glass: 14, bottle: 68 },
  { name: "Jacquère", producer: "Domaine des Abymes", appellation: "Vin de Savoie", color: "blanc", vintage: 2023, glass: 9, bottle: 42 },
  { name: "Blanc de blancs", producer: "Maison Delorme", appellation: "Champagne", color: "bulles", vintage: "NM", glass: 18, bottle: 95 },
  { name: "Méthode ancestrale", producer: "Domaine Gerbet", appellation: "Bugey-Cerdon", color: "bulles", vintage: "NM", glass: 9, bottle: 44 },
  { name: "Grains nobles", producer: "Clos Saint-Aubin", appellation: "Jurançon", color: "doux", vintage: 2017, glass: 14, bottle: 72 },
  { name: "Paille", producer: "Domaine Rolet", appellation: "Côtes du Jura", color: "doux", vintage: 2016, glass: 16, bottle: 88 },
];

// Tuesday to Saturday; lunch from Tuesday to Friday only.
export const slots: Record<Service, string[]> = {
  dejeuner: ["12 h", "12 h 30", "13 h", "13 h 30"],
  diner: ["19 h 30", "20 h", "20 h 30", "21 h", "21 h 30"],
};

export const hours = [
  { days: "Mardi au vendredi", times: "12 h à 13 h 30 et 19 h 30 à 21 h 30" },
  { days: "Samedi", times: "19 h 30 à 21 h 30" },
  { days: "Dimanche et lundi", times: "Fermé" },
];

// Why a service is closed on a date (YYYY-MM-DD), or undefined if it is open.
export const closedReason = (date: string, service: Service) => {
  if (!date) return undefined;
  const day = new Date(`${date}T12:00:00`).getDay();
  if (day === 0 || day === 1) return "Le restaurant est fermé le dimanche et le lundi.";
  if (day === 6 && service === "dejeuner") return "Le samedi, nous ne servons que le dîner.";
  return undefined;
};

export const euros = (value: number) => `${value.toLocaleString("fr-FR")} €`;
