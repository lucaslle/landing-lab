// Fictional listings of the "Haven" agency. Photos: unsplash.com (Unsplash license), served by their CDN.
export const photo = (id: string, width: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=75`;

export const kinds = { vente: "À vendre", location: "À louer" };
export type Kind = keyof typeof kinds;

export const types = { villa: "Villa", maison: "Maison", appartement: "Appartement", chalet: "Chalet" };
export type PropertyType = keyof typeof types;

export const budgets = {
  "0-1": { label: "Moins de 1 M€", min: 0, max: 1_000_000 },
  "1-1.5": { label: "1 à 1,5 M€", min: 1_000_000, max: 1_500_000 },
  "1.5-2": { label: "1,5 à 2 M€", min: 1_500_000, max: 2_000_000 },
  "2+": { label: "Plus de 2 M€", min: 2_000_000, max: Infinity },
};
export type Budget = keyof typeof budgets;

export type Property = {
  slug: string;
  name: string;
  city: string;
  region: string;
  kind: Kind;
  type: PropertyType;
  price: number; // sale price, or monthly rent
  bedrooms: number;
  bathrooms: number;
  area: number; // m²
  land?: number; // m²
  year: number;
  photo: string;
  alt: string;
  summary: string;
  features: string[];
};

export const properties: Property[] = [
  {
    slug: "villa-des-pins",
    name: "Villa des Pins",
    city: "Cap d'Antibes",
    region: "Alpes-Maritimes",
    kind: "vente",
    type: "villa",
    price: 2_450_000,
    bedrooms: 4,
    bathrooms: 3,
    area: 210,
    land: 1200,
    year: 2021,
    photo: "1613490493576-7fde63acd811",
    alt: "Villa blanche contemporaine et sa piscine à débordement",
    summary:
      "À deux pas des criques du cap, une villa d'architecte ouverte sur la piscine et la pinède. Les volumes de plain-pied donnent sur une terrasse de 180 m², et la suite parentale occupe tout l'étage.",
    features: ["Piscine chauffée à débordement", "Suite parentale avec dressing", "Domotique et climatisation", "Garage deux voitures"],
  },
  {
    slug: "penthouse-mont-boron",
    name: "Penthouse du Mont Boron",
    city: "Nice",
    region: "Alpes-Maritimes",
    kind: "vente",
    type: "appartement",
    price: 1_280_000,
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    year: 2019,
    photo: "1776361964513-86fba5039617",
    alt: "Piscine sur un toit-terrasse au-dessus de la ville",
    summary:
      "Le dernier étage d'une résidence des années 1930 sur les pentes du Mont Boron. Le toit-terrasse avec piscine prolonge le séjour, et la vue porte du port Lympia jusqu'au cap d'Antibes.",
    features: ["Toit-terrasse de 80 m² avec piscine", "Ascenseur privatif", "Deux places de parking", "Port Lympia à dix minutes à pied"],
  },
  {
    slug: "pavillons-du-lac",
    name: "Pavillons du Lac",
    city: "Talloires",
    region: "Haute-Savoie",
    kind: "location",
    type: "maison",
    price: 3_900,
    bedrooms: 4,
    bathrooms: 2,
    area: 160,
    land: 900,
    year: 2018,
    photo: "1761549148430-85b7abf00f33",
    alt: "Deux maisons en bois sur pilotis au bord d'un lac",
    summary:
      "Deux pavillons en bois posés sur l'eau du lac d'Annecy, reliés par un ponton. Location meublée à l'année, ponton privé et accès direct à la baignade.",
    features: ["Ponton et accès au lac", "Location meublée", "Sauna en bord d'eau", "Bail d'un an renouvelable"],
  },
  {
    slug: "chalet-mont-arbois",
    name: "Chalet du Mont d'Arbois",
    city: "Megève",
    region: "Haute-Savoie",
    kind: "vente",
    type: "chalet",
    price: 1_950_000,
    bedrooms: 5,
    bathrooms: 4,
    area: 190,
    land: 800,
    year: 2008,
    photo: "1551876245-8d1faa2cb3ed",
    alt: "Chalet en bois face aux montagnes",
    summary:
      "Skis aux pieds au-dessus du village, un chalet de vieux bois rénové avec une vue dégagée sur le Mont-Blanc. Cinq chambres, un sauna et un local à skis chauffé.",
    features: ["Skis aux pieds", "Sauna et jacuzzi", "Cheminée centrale", "Local à skis chauffé"],
  },
  {
    slug: "mas-des-bories",
    name: "Mas des Bories",
    city: "Gordes",
    region: "Vaucluse",
    kind: "vente",
    type: "maison",
    price: 1_290_000,
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    land: 6000,
    year: 1820,
    photo: "1730131255658-c51e724003c2",
    alt: "Façade en pierre aux volets rouges",
    summary:
      "Un mas en pierre sèche restauré au milieu des oliviers, avec vue sur le Luberon. Les murs d'origine gardent la fraîcheur l'été, la piscine se cache derrière une haie de lavande.",
    features: ["Oliveraie de 6 000 m²", "Piscine en pierre", "Cuisine d'été", "Bergerie aménageable"],
  },
  {
    slug: "maison-cote-des-basques",
    name: "Maison Côte des Basques",
    city: "Biarritz",
    region: "Pyrénées-Atlantiques",
    kind: "vente",
    type: "maison",
    price: 1_350_000,
    bedrooms: 4,
    bathrooms: 2,
    area: 150,
    land: 450,
    year: 2023,
    photo: "1748063578185-3d68121b11ff",
    alt: "Maison contemporaine éclairée au crépuscule",
    summary:
      "Une maison neuve en béton et bois, à cinq minutes à pied de la plage. Les baies vitrées s'effacent sur le jardin, et le rooftop regarde l'océan au coucher du soleil.",
    features: ["Rooftop avec vue océan", "Construction 2023, RE2020", "Pompe à chaleur", "Douche extérieure pour le surf"],
  },
  {
    slug: "villa-pampelonne",
    name: "Villa Pampelonne",
    city: "Ramatuelle",
    region: "Var",
    kind: "location",
    type: "villa",
    price: 12_500,
    bedrooms: 4,
    bathrooms: 4,
    area: 220,
    land: 2500,
    year: 2016,
    photo: "1580587771525-78b9dba3b914",
    alt: "Villa blanche à étages devant sa piscine",
    summary:
      "Louée au mois de mai à octobre, une villa de quatre chambres au-dessus de la plage de Pampelonne. Ménage compris, piscine et grande terrasse ombragée.",
    features: ["Quatre chambres avec salle d'eau", "Ménage deux fois par semaine", "Piscine de 12 m", "Location au mois, de mai à octobre"],
  },
  {
    slug: "maison-des-dunes",
    name: "Maison des Dunes",
    city: "Lège-Cap-Ferret",
    region: "Gironde",
    kind: "vente",
    type: "maison",
    price: 1_690_000,
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    land: 800,
    year: 2012,
    photo: "1568605114967-8130f3a36994",
    alt: "Maison en bois éclairée à la nuit tombée",
    summary:
      "Une maison en bois sous les pins, côté bassin, à trois minutes à vélo de la jetée. Grand séjour cathédrale, terrasse couverte et cabane d'amis au fond du jardin.",
    features: ["Côté bassin, sous les pins", "Séjour cathédrale", "Cabane d'amis indépendante", "Abri pour bateau et vélos"],
  },
  {
    slug: "domaine-de-rochefort",
    name: "Domaine de Rochefort",
    city: "Saint-Nom-la-Bretèche",
    region: "Yvelines",
    kind: "vente",
    type: "villa",
    price: 2_850_000,
    bedrooms: 6,
    bathrooms: 4,
    area: 380,
    land: 6000,
    year: 2005,
    photo: "1505843513577-22bb7d21e455",
    alt: "Grande demeure illuminée au crépuscule devant sa pelouse",
    summary:
      "À trente minutes de Paris, une maison de maître au bout d'une allée privée, dans un parc de 6 000 m². Pièces de réception en enfilade, aile d'invités et golf à deux minutes.",
    features: ["Parc arboré de 6 000 m²", "Aile d'invités indépendante", "Cave voûtée", "Golf de Saint-Nom à deux minutes"],
  },
  {
    slug: "villa-azur",
    name: "Villa Azur",
    city: "Villefranche-sur-Mer",
    region: "Alpes-Maritimes",
    kind: "vente",
    type: "villa",
    price: 2_950_000,
    bedrooms: 4,
    bathrooms: 4,
    area: 230,
    land: 1500,
    year: 2022,
    photo: "1613977257363-707ba9348227",
    alt: "Villa blanche moderne et sa piscine bordée de transats",
    summary:
      "Au-dessus de la rade de Villefranche, une villa récente aux lignes blanches, entièrement ouverte sur la piscine. Chaque chambre a sa terrasse, et le port est à pied.",
    features: ["Quatre suites avec terrasse", "Piscine à débordement de 12 m", "Pool house et cuisine d'été", "Port de la Darse à pied"],
  },
  {
    slug: "villa-horizon",
    name: "Villa Horizon",
    city: "Cannes",
    region: "Alpes-Maritimes",
    kind: "vente",
    type: "villa",
    price: 1_890_000,
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    land: 900,
    year: 2020,
    photo: "1512917774080-9991f1c4c750",
    alt: "Villa contemporaine en béton blanc et gris près de sa piscine",
    summary:
      "Sur les hauteurs de la Californie, une villa contemporaine avec vue panoramique sur la baie et les îles de Lérins. La Croisette est à dix minutes.",
    features: ["Vue mer panoramique", "Salle de sport", "Ascenseur sur trois niveaux", "Résidence fermée et gardée"],
  },
  {
    slug: "villa-nocturne",
    name: "Villa Nocturne",
    city: "Saint-Paul-de-Vence",
    region: "Alpes-Maritimes",
    kind: "location",
    type: "villa",
    price: 6_800,
    bedrooms: 4,
    bathrooms: 3,
    area: 210,
    land: 2000,
    year: 2019,
    photo: "1674761785706-583edd697a97",
    alt: "Villa moderne éclairée la nuit, reflétée dans sa piscine",
    summary:
      "Louée au mois, une villa d'architecte face au village perché. Les terrasses en pierre descendent vers une piscine éclairée, et les galeries d'art sont à cinq minutes.",
    features: ["Location meublée au mois", "Chef à domicile sur demande", "Piscine chauffée éclairée", "Vue sur le village perché"],
  },
  {
    slug: "villa-solenne",
    name: "Villa Solenne",
    city: "Mougins",
    region: "Alpes-Maritimes",
    kind: "vente",
    type: "villa",
    price: 1_450_000,
    bedrooms: 4,
    bathrooms: 3,
    area: 190,
    land: 1800,
    year: 2017,
    photo: "1600596542815-ffad4c1539a9",
    alt: "Villa blanche à étages sous un ciel bleu",
    summary:
      "Dans un domaine fermé près du golf, une villa lumineuse aux volumes généreux. Les écoles internationales de Sophia Antipolis sont à un quart d'heure.",
    features: ["Domaine fermé et gardé", "Piscine et pool house", "Bureau indépendant", "Proche des écoles internationales"],
  },
  {
    slug: "pavillon-de-verre",
    name: "Pavillon de Verre",
    city: "Uzès",
    region: "Gard",
    kind: "vente",
    type: "maison",
    price: 980_000,
    bedrooms: 3,
    bathrooms: 2,
    area: 160,
    land: 5000,
    year: 2021,
    photo: "1582268611958-ebfd161ef9cf",
    alt: "Maison moderne aux murs vitrés à côté de sa piscine",
    summary:
      "Une maison d'architecte toute de verre posée au milieu des garrigues, face au duché d'Uzès. Les baies coulissent entièrement et le séjour devient terrasse.",
    features: ["Murs entièrement vitrés", "5 000 m² de garrigue", "Piscine miroir", "Panneaux solaires et récupération d'eau"],
  },
  {
    slug: "grand-chalet-chamonix",
    name: "Grand Chalet des Praz",
    city: "Chamonix",
    region: "Haute-Savoie",
    kind: "vente",
    type: "chalet",
    price: 2_300_000,
    bedrooms: 6,
    bathrooms: 4,
    area: 260,
    land: 900,
    year: 1912,
    photo: "1599225073747-21b040ff7af3",
    alt: "Grand chalet en bois au pied des montagnes",
    summary:
      "Un ancien hôtel de montagne de 1912 transformé en chalet familial, face à l'aiguille du Midi. Les boiseries d'origine côtoient un sauna et un grand séjour sous les poutres.",
    features: ["Vue sur le Mont-Blanc", "Sauna et jacuzzi", "Boiseries d'origine restaurées", "Navette pour les pistes"],
  },
  {
    slug: "refuge-des-neiges",
    name: "Refuge des Neiges",
    city: "Val d'Isère",
    region: "Savoie",
    kind: "location",
    type: "chalet",
    price: 8_500,
    bedrooms: 4,
    bathrooms: 3,
    area: 170,
    year: 2020,
    photo: "1771680968896-cfd9b8f7244e",
    alt: "Chalet contemporain avec terrasse en bois dans la neige",
    summary:
      "Un chalet contemporain posé dans la forêt, à skis jusqu'au télésiège. Loué au mois pendant la saison, ménage et linge compris.",
    features: ["Skis aux pieds", "Ménage et linge compris", "Bain nordique en terrasse", "Location de décembre à avril"],
  },
];

// Interior shots shared by the galleries: listings get three of them, offset by their position.
const interiors = [
  { id: "1618221195710-dd6b41faaea6", alt: "Séjour lumineux aux tons blanc et bois" },
  { id: "1502005097973-6a7082348e28", alt: "Cuisine avec îlot en bois" },
  { id: "1616594039964-ae9021a400a0", alt: "Chambre moderne au lit capitonné" },
  { id: "1598928506311-c55ded91a20c", alt: "Salon avec cheminée en marbre" },
  { id: "1758565811176-ccd94357a844", alt: "Salon ouvert sur le paysage par une baie vitrée" },
  { id: "1505693416388-ac5ce068fe85", alt: "Chambre avec tête de lit capitonnée" },
];

export const galleryOf = (property: Property) => {
  const start = properties.indexOf(property);
  return [0, 2, 4].map((step) => interiors[(start + step) % interiors.length]);
};

export const findProperty = (slug: string | null) => properties.find((property) => property.slug === slug);

export const formatPrice = (property: Property) =>
  `${property.price.toLocaleString("fr-FR")} €${property.kind === "location" ? " / mois" : ""}`;

export const heroPhoto = "1707189856923-46dd41ea2bdc";

// One office per area, each with the agent who handles its listings.
export const offices = [
  {
    slug: "cote-d-azur",
    area: "Côte d'Azur",
    city: "Cannes",
    address: "12 boulevard de la Croisette, 06400 Cannes",
    phone: "04 93 00 12 12",
    agent: "Claire Aubert",
    role: "Directrice, Côte d'Azur",
    since: 2009,
    regions: ["Alpes-Maritimes", "Var"],
  },
  {
    slug: "alpes",
    area: "Alpes",
    city: "Megève",
    address: "45 rue Charles Feige, 74120 Megève",
    phone: "04 50 00 21 21",
    agent: "Julien Favre",
    role: "Directeur, Alpes",
    since: 2012,
    regions: ["Haute-Savoie", "Savoie"],
  },
  {
    slug: "provence",
    area: "Provence",
    city: "Gordes",
    address: "3 place du Château, 84220 Gordes",
    phone: "04 90 00 34 34",
    agent: "Inès Roux",
    role: "Directrice, Provence et Gard",
    since: 2015,
    regions: ["Vaucluse", "Gard"],
  },
  {
    slug: "atlantique",
    area: "Atlantique",
    city: "Biarritz",
    address: "8 avenue Édouard VII, 64200 Biarritz",
    phone: "05 59 00 43 43",
    agent: "Marc Etcheverry",
    role: "Directeur, Côte basque et Bassin",
    since: 2014,
    regions: ["Pyrénées-Atlantiques", "Gironde"],
  },
  {
    slug: "ile-de-france",
    area: "Île-de-France",
    city: "Paris",
    address: "24 avenue Montaigne, 75008 Paris",
    phone: "01 40 00 56 56",
    agent: "Sophie Laurent",
    role: "Fondatrice, Paris et Île-de-France",
    since: 2006,
    regions: ["Yvelines"],
  },
];
export type Office = (typeof offices)[number];

export const officeOf = (region: string) => offices.find((office) => office.regions.includes(region)) ?? offices[0];

// Average sale price per m² of an office's listings: the base of the online estimate.
export const pricePerSquareMeter = (office: Office) => {
  const sales = properties.filter((property) => property.kind === "vente" && office.regions.includes(property.region));
  return Math.round(sales.reduce((sum, property) => sum + property.price / property.area, 0) / sales.length);
};
