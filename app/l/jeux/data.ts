// Catalogue of "Pulse", a fictional game store. Every game, studio and player here is invented.
// Artwork: atmosphere photos from unsplash.com (Unsplash license), served by their CDN.
export const photo = (id: string, width: number, height?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}${height ? `&h=${height}` : ""}&q=75`;

export type Game = {
  slug: string;
  title: string;
  studio: string;
  genre: string;
  price: number; // €
  previousPrice?: number; // € before the current discount
  release: string; // shown as is
  upcoming?: boolean;
  cover: string;
  shots: string[];
  alt: string;
  pitch: string;
  description: string;
  features: string[];
  rating: number; // out of 5, from players
};

export const games: Game[] = [
  {
    slug: "neon-riviera",
    title: "Néon Riviera",
    studio: "Studio Marée",
    genre: "Action, monde ouvert",
    price: 79.99,
    release: "Printemps 2027",
    upcoming: true,
    cover: "1533106497176-45ae19e68ba2",
    shots: ["1794698667659-6de33e49d5cf", "1601042879364-f3947d3f9c16"],
    alt: "Boulevard éclairé au néon la nuit",
    pitch: "Bienvenue sur la Riviera : une ville côtière, ses néons et ses ambitions.",
    description:
      "Une ville balnéaire entière à parcourir de jour comme de nuit, deux héros aux destins liés et une bande-son des années 80. Précommandez pour recevoir le pack de véhicules Coucher de soleil.",
    features: ["Ville ouverte de 40 km²", "Deux personnages jouables", "Mode coopératif en ligne"],
    rating: 0,
  },
  {
    slug: "chrome-saints",
    title: "Chrome Saints",
    studio: "Kintsugi Works",
    genre: "RPG",
    price: 29.99,
    previousPrice: 59.99,
    release: "2025",
    cover: "1602136773736-34d445b989cb",
    shots: ["1564836663277-c4aa761b9882", "1600998837340-4887228e311f"],
    alt: "Ruelle couverte d'enseignes lumineuses",
    pitch: "Un RPG urbain où chaque implant change votre façon de jouer.",
    description:
      "Mercenaire dans une mégapole saturée de néons, vous améliorez votre corps pièce par pièce et choisissez à quel clan vous fier. Plus de 60 heures d'histoire principale.",
    features: ["Arbre de compétences sans classe", "Trois fins principales", "Mode photo"],
    rating: 4.6,
  },
  {
    slug: "hollow-monastery",
    title: "Hollow Monastery",
    studio: "Cendre & Fer",
    genre: "Action, souls-like",
    price: 49.99,
    previousPrice: 69.99,
    release: "2026",
    cover: "1642137837405-8a80225314b1",
    shots: ["1492693859998-63ccf2ddafd2", "1610025074349-692706795cc9"],
    alt: "Ruines de pierre dans le brouillard",
    pitch: "Un monastère perdu dans la brume, et rien qui ne veuille vous y voir.",
    description:
      "Des combats exigeants au rythme lent, un monde interconnecté sans carte et des boss qui récompensent la patience. Chaque mort vous apprend quelque chose.",
    features: ["Monde interconnecté", "Vingt boss", "Invocation d'alliés en ligne"],
    rating: 4.4,
  },
  {
    slug: "outbreak-archive",
    title: "Outbreak Archive",
    studio: "Night Shift",
    genre: "Survival horror",
    price: 39.99,
    previousPrice: 49.99,
    release: "2026",
    cover: "1571065497914-38c5d3cde715",
    shots: ["1719261795510-1c224598f897", "1789009839397-2f2d3b02173a"],
    alt: "Couloir sombre éclairé par un panneau de sortie",
    pitch: "Un hôpital fermé depuis vingt ans, et ses archives qui n'auraient jamais dû être ouvertes.",
    description:
      "Gestion des munitions, énigmes et couloirs qu'on hésite à traverser. Jouable au casque pour une immersion totale.",
    features: ["Son binaural", "Mode difficile sans sauvegarde", "Compatible réalité virtuelle"],
    rating: 4.2,
  },
  {
    slug: "crimson-steppe",
    title: "Crimson Steppe",
    studio: "Horizon Nomade",
    genre: "Aventure, monde ouvert",
    price: 49.99,
    previousPrice: 59.99,
    release: "2026",
    cover: "1624125278860-381b6acd3b44",
    shots: ["1508582925718-12be0cf69559", "1664714405560-286aa33bfaa2"],
    alt: "Cavalier sur un cheval blanc face aux montagnes",
    pitch: "À cheval à travers une steppe immense, avec pour seule boussole le vent.",
    description:
      "Traversez des plaines sans fin, apprivoisez votre monture et défendez les caravanes. Le monde évolue au fil des saisons.",
    features: ["Cycle des saisons", "Combat à cheval", "Campements à construire"],
    rating: 4.5,
  },
  {
    slug: "ashen-crown",
    title: "Ashen Crown",
    studio: "Cendre & Fer",
    genre: "RPG, fantasy",
    price: 29.99,
    previousPrice: 39.99,
    release: "2024",
    cover: "1514539079130-25950c84af65",
    shots: ["1563786785330-2ad8162ef53a", "1664714240695-9d90ab0394fd"],
    alt: "Château dans la brume",
    pitch: "La couronne est tombée en cendres. Qui la ramassera ?",
    description:
      "Un RPG tactique au tour par tour dans un royaume en guerre civile. Recrutez, négociez et trahissez : chaque choix redessine la carte.",
    features: ["Combats tactiques", "Quarante compagnons", "Nouvelle partie plus"],
    rating: 4.3,
  },
  {
    slug: "orbit-drift",
    title: "Orbit Drift",
    studio: "Petit Cosmos",
    genre: "Course, arcade",
    price: 19.99,
    release: "2025",
    cover: "1608178398319-48f814d0750c",
    shots: ["1610296669228-602fa827fc1f", "1594683734152-0eccf2501041"],
    alt: "Nébuleuse rose dans l'espace",
    pitch: "Des courses en apesanteur autour des nébuleuses.",
    description: "Pilotez des vaisseaux légers sur des circuits suspendus dans l'espace, en solo ou jusqu'à huit en ligne.",
    features: ["Écran partagé à quatre", "Éditeur de circuits", "Classements hebdomadaires"],
    rating: 4.1,
  },
  {
    slug: "tidebound",
    title: "Tidebound",
    studio: "Studio Marée",
    genre: "Aventure, navigation",
    price: 24.99,
    release: "2025",
    cover: "1437385545573-fcf5b4b7fb57",
    shots: ["1776739835684-4078f7419f74", "1700142787007-8d8450a9ef22"],
    alt: "Cargo au coucher du soleil sous un ciel d'orage",
    pitch: "Votre navire, votre équipage et l'océan qui ne pardonne rien.",
    description: "Naviguez au vent, cartographiez des archipels inconnus et survivez aux tempêtes en gérant votre équipage.",
    features: ["Physique des vagues réaliste", "Carte à dessiner soi-même", "Coopération à quatre"],
    rating: 4.0,
  },
  {
    slug: "pixel-garden",
    title: "Pixel Garden",
    studio: "Petit Cosmos",
    genre: "Simulation, détente",
    price: 14.99,
    release: "2024",
    cover: "1569736957322-b5e515f249b0",
    shots: ["1696454596847-dda5f2dc0555", "1713305298073-0c5d481bf381"],
    alt: "Serre remplie de plantes",
    pitch: "Une serre à remettre en état, une plante à la fois.",
    description: "Cultivez, croisez les espèces et décorez votre serre à votre rythme. Aucun chronomètre, aucune pression.",
    features: ["Plus de 200 plantes", "Sans chronomètre", "Jouable à la manette"],
    rating: 4.8,
  },
  {
    slug: "polar-signal",
    title: "Polar Signal",
    studio: "Night Shift",
    genre: "Enquête, narration",
    price: 34.99,
    release: "2026",
    cover: "1766699623469-32a2c3b17a17",
    shots: ["1516410529446-2c777cb7366d", "1765204073899-a528abe839dd"],
    alt: "Côte arctique enneigée sous un ciel bleu",
    pitch: "Une station polaire a cessé d'émettre. Vous êtes la relève.",
    description: "Un jeu d'enquête à la première personne : écoutez les enregistrements, recoupez les indices et comprenez ce qui s'est passé.",
    features: ["Doublage intégral en français", "Environ 8 heures", "Choix qui changent la fin"],
    rating: 4.7,
  },
];

export const findGame = (slug: string | null) => games.find((game) => game.slug === slug);

export const euros = (value: number) =>
  value.toLocaleString("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });

export const discount = (game: Game) =>
  game.previousPrice ? Math.round((1 - game.price / game.previousPrice) * 100) : 0;

// Hero slides, in order.
export const featured = ["neon-riviera", "hollow-monastery", "polar-signal"];

export const friends = [
  { name: "Lunaire_67", status: "online", activity: "Joue à Crimson Steppe" },
  { name: "DragonDeGlace", status: "online", activity: "Joue à Orbit Drift" },
  { name: "Bibi", status: "online", activity: "En ligne" },
  { name: "NeonNova", status: "online", activity: "En ligne" },
  { name: "Phénix", status: "online", activity: "Joue à Pixel Garden" },
  { name: "Annyy", status: "away", activity: "Absente" },
] as const;

export const activity = [
  { player: "Lunaire_67", achievement: "Maître des caravanes", game: "Crimson Steppe", when: "il y a 2 min" },
  { player: "Phénix", achievement: "Main verte", game: "Pixel Garden", when: "il y a 5 min" },
  { player: "NeonNova", achievement: "Sans une égratignure", game: "Hollow Monastery", when: "il y a 6 h" },
  { player: "Bibi", achievement: "Le dernier message", game: "Polar Signal", when: "il y a 8 h" },
];
