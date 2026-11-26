// Fictional offers of the "Ailleurs" agency. Photos: unsplash.com (Unsplash license), served by their CDN.
export const photo = (id: string, width: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=75`;

export const continents = { europe: "Europe", asie: "Asie", afrique: "Afrique", "moyen-orient": "Moyen-Orient" };
export type Continent = keyof typeof continents;

export type Destination = {
  slug: string;
  country: string;
  city: string;
  continent: Continent;
  price: number; // per person, flights and hotel included
  nights: number;
  tag?: string;
  photo: string;
  alt: string;
  summary: string;
  highlights: string[];
  days: { title: string; text: string }[];
};

export const destinations: Destination[] = [
  {
    slug: "thailande",
    country: "Thaïlande",
    city: "Phuket",
    continent: "asie",
    price: 699,
    nights: 9,
    tag: "Meilleure vente",
    photo: "1504214208698-ea1916a2195a",
    alt: "Bateaux en bois sur une mer turquoise",
    summary: "Eaux turquoise, falaises calcaires et cuisine de rue : l'Asie du Sud-Est dans ce qu'elle a de plus lumineux.",
    highlights: ["Excursion en bateau vers les îles Phi Phi", "Cours de cuisine thaïe", "Hôtel les pieds dans le sable"],
    days: [
      { title: "Arrivée à Phuket", text: "Accueil à l'aéroport, transfert et première soirée au marché de nuit." },
      { title: "Îles Phi Phi", text: "Journée en bateau, baignade dans les lagons et déjeuner sur la plage." },
      { title: "Vieille ville", text: "Maisons sino-portugaises, temples et cours de cuisine l'après-midi." },
      { title: "Temps libre", text: "Plage, massage ou plongée : la fin du séjour est à vous." },
    ],
  },
  {
    slug: "paris",
    country: "France",
    city: "Paris",
    continent: "europe",
    price: 399,
    nights: 3,
    tag: "Populaire",
    photo: "1502602898657-3e91760cbb34",
    alt: "La tour Eiffel au-dessus de Paris",
    summary: "Un long week-end entre musées, bistrots et balades sur les quais, à deux pas des monuments.",
    highlights: ["Croisière sur la Seine au coucher du soleil", "Coupe-file pour le Louvre", "Hôtel de charme dans le Marais"],
    days: [
      { title: "Rive droite", text: "Installation dans le Marais, puis promenade jusqu'à l'Hôtel de Ville." },
      { title: "Louvre et Tuileries", text: "Matinée au musée avec coupe-file, après-midi dans les jardins." },
      { title: "Montmartre", text: "Ruelles, ateliers d'artistes et vue sur tout Paris depuis la butte." },
    ],
  },
  {
    slug: "bali",
    country: "Indonésie",
    city: "Bali",
    continent: "asie",
    price: 599,
    nights: 10,
    tag: "Tendance",
    photo: "1524675053444-52c3ca294ad2",
    alt: "Temple balinais au bord d'un lac",
    summary: "Rizières en terrasses, temples au bord des lacs et plages de surf : l'île des dieux à votre rythme.",
    highlights: ["Lever de soleil sur un volcan", "Rizières de Tegallalang", "Villa avec piscine privée"],
    days: [
      { title: "Ubud", text: "Arrivée dans la jungle, forêt des singes et spectacle de danse le soir." },
      { title: "Rizières et temples", text: "Balade dans les terrasses, puis visite d'un temple au bord du lac." },
      { title: "Volcan", text: "Ascension de nuit pour voir le soleil se lever au-dessus des nuages." },
      { title: "Côte sud", text: "Fin du séjour entre plages, surf et couchers de soleil." },
    ],
  },
  {
    slug: "dubai",
    country: "Émirats arabes unis",
    city: "Dubaï",
    continent: "moyen-orient",
    price: 899,
    nights: 5,
    tag: "Meilleure vente",
    photo: "1512453979798-5ea266f8880c",
    alt: "Les gratte-ciel de Dubaï",
    summary: "Gratte-ciel record, souks aux épices et dunes au coucher du soleil, à six heures de vol.",
    highlights: ["Soirée dans le désert en 4x4", "Accès au sommet de la plus haute tour", "Hôtel avec plage privée"],
    days: [
      { title: "Downtown", text: "Montée au sommet de la tour, puis spectacle des fontaines." },
      { title: "Vieux Dubaï", text: "Traversée du creek en abra, souks de l'or et des épices." },
      { title: "Désert", text: "Dunes en 4x4, dîner sous les étoiles dans un camp bédouin." },
    ],
  },
  {
    slug: "grece",
    country: "Grèce",
    city: "Santorin",
    continent: "europe",
    price: 549,
    nights: 6,
    tag: "Coup de cœur",
    photo: "1580502304784-8985b7eb7260",
    alt: "Maisons blanches d'Oia au-dessus de la mer au soleil couchant",
    summary: "Villages blancs accrochés à la falaise, eau cristalline et couchers de soleil inoubliables.",
    highlights: ["Croisière autour de la caldeira", "Dégustation dans un domaine viticole", "Chambre avec vue sur la mer"],
    days: [
      { title: "Fira", text: "Arrivée sur l'île, installation et dîner face à la caldeira." },
      { title: "Caldeira", text: "Croisière en catamaran, baignade dans les sources chaudes." },
      { title: "Oia", text: "Ruelles blanches et coucher de soleil depuis le château." },
    ],
  },
  {
    slug: "japon",
    country: "Japon",
    city: "Kyoto",
    continent: "asie",
    price: 1249,
    nights: 12,
    photo: "1770387795112-e2b476b15f71",
    alt: "Pagode orange entourée de cerisiers en fleurs",
    summary: "Temples zen, ruelles en bois et jardins de mousse : le Japon traditionnel, de Tokyo à Kyoto.",
    highlights: ["Pass train à grande vitesse", "Nuit en ryokan avec bain chaud", "Cérémonie du thé"],
    days: [
      { title: "Tokyo", text: "Quartiers animés, sanctuaires et premier repas de sushis." },
      { title: "Train vers Kyoto", text: "Trajet en train à grande vitesse, vue sur le mont Fuji par beau temps." },
      { title: "Kyoto", text: "Pagodes, portiques rouges et quartier des geishas au crépuscule." },
      { title: "Ryokan", text: "Nuit traditionnelle, dîner raffiné et bain chaud." },
    ],
  },
  {
    slug: "maroc",
    country: "Maroc",
    city: "Marrakech",
    continent: "afrique",
    price: 449,
    nights: 5,
    photo: "1653323792487-6ecc6217040b",
    alt: "Calèche devant la mosquée Koutoubia à Marrakech",
    summary: "Souks colorés, riads paisibles et escapade dans l'Atlas, à trois heures de Paris.",
    highlights: ["Riad avec patio et hammam", "Journée dans les montagnes de l'Atlas", "Dîner sur une terrasse de la médina"],
    days: [
      { title: "Médina", text: "Installation au riad, puis place Jemaa el-Fna à la tombée de la nuit." },
      { title: "Jardins et palais", text: "Jardins luxuriants, palais sculptés et pause thé à la menthe." },
      { title: "Atlas", text: "Villages berbères, cascades et déjeuner chez l'habitant." },
    ],
  },
  {
    slug: "islande",
    country: "Islande",
    city: "Reykjavik",
    continent: "europe",
    price: 1099,
    nights: 7,
    photo: "1501908734255-16579c18c25f",
    alt: "Cascade islandaise à l'heure dorée",
    summary: "Cascades, glaciers et sources chaudes : un road trip au bout du monde, aurores boréales en option.",
    highlights: ["Voiture de location 4x4 incluse", "Bain dans un lagon géothermal", "Sortie aurores boréales (en hiver)"],
    days: [
      { title: "Reykjavik", text: "Récupération de la voiture et tour de la capitale colorée." },
      { title: "Cercle d'or", text: "Geysers, faille entre deux continents et cascade géante." },
      { title: "Côte sud", text: "Plages de sable noir, glacier et lagune aux icebergs." },
      { title: "Lagon", text: "Retour par un bain chaud au milieu des champs de lave." },
    ],
  },
];

export const findDestination = (slug: string | null) => destinations.find((destination) => destination.slug === slug);
