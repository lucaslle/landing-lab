// Destinations of "Horizons", a fictional nature travel agency. Photos: unsplash.com (Unsplash license), served by their CDN.
export const photo = (id: string, width: number, height?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}${height ? `&h=${height}` : ""}&q=75`;

export const tripTypes = {
  randonnee: "Randonnée",
  "road-trip": "Road trip",
  "nature-sauvage": "Nature sauvage",
  culture: "Culture et histoire",
};
export type TripType = keyof typeof tripTypes;

export type Destination = {
  slug: string;
  place: string;
  country: string;
  tagline: string;
  types: TripType[];
  days: number;
  price: number; // € per person, flights included
  offer?: number; // € per person, special offer price
  season: string;
  photo: string;
  gallery: string[];
  alt: string;
  summary: string;
  steps: { title: string; text: string }[];
};

export const destinations: Destination[] = [
  {
    slug: "mimosa-rocks",
    place: "Mimosa Rocks",
    country: "Australie",
    tagline: "Un coin de paradis",
    types: ["nature-sauvage", "road-trip"],
    days: 14,
    price: 3_490,
    season: "Octobre à avril",
    photo: "1553510102-c8aeb4db678f",
    gallery: ["1668744703511-9a736f2c20d2", "1473861851350-942b9d1e6ff8"],
    alt: "Rochers et eau turquoise sur la côte australienne",
    summary:
      "La côte sud de la Nouvelle-Galles du Sud, entre criques désertes, forêts d'eucalyptus et baleines au large. Un road trip de Sydney à Melbourne par la route du littoral.",
    steps: [
      { title: "Sydney", text: "Arrivée, traversée en ferry et première baignade à Bondi." },
      { title: "Côte Sapphire", text: "Criques de Mimosa Rocks, kayak et observation des baleines." },
      { title: "Wilsons Promontory", text: "Randonnées dans le parc national et nuit en lodge." },
      { title: "Melbourne", text: "Ruelles, cafés et marché avant le vol retour." },
    ],
  },
  {
    slug: "machu-picchu",
    place: "Machu Picchu",
    country: "Pérou",
    tagline: "La cité dans les nuages",
    types: ["randonnee", "culture"],
    days: 12,
    price: 2_890,
    offer: 2_590,
    season: "Mai à octobre",
    photo: "1526392060635-9d6019884377",
    gallery: ["1580619305218-8423a7ef79b4", "1723134084358-20a2dc177ff1"],
    alt: "Le Machu Picchu entouré de nuages",
    summary:
      "La Vallée sacrée, Cusco et le chemin des Incas sur quatre jours, jusqu'à la Porte du Soleil au lever du jour. Acclimatation à l'altitude prévue dans le programme.",
    steps: [
      { title: "Cusco", text: "Deux jours d'acclimatation entre églises coloniales et murs incas." },
      { title: "Vallée sacrée", text: "Marchés de Pisac et terrasses de Moray." },
      { title: "Chemin des Incas", text: "Quatre jours de marche avec porteurs, 42 km en tout." },
      { title: "Machu Picchu", text: "Lever du soleil sur la cité, puis retour en train panoramique." },
    ],
  },
  {
    slug: "dolomites",
    place: "Dolomites",
    country: "Italie",
    tagline: "Les montagnes pâles",
    types: ["randonnee"],
    days: 8,
    price: 1_290,
    season: "Juin à septembre",
    photo: "1534106474077-f9e9c6f5a47c",
    gallery: ["1604998103924-89e012e5265a", "1677741447337-48aba59a8f61"],
    alt: "Sommets des Dolomites au-dessus des prairies",
    summary:
      "De refuge en refuge sur l'Alta Via 1, entre aiguilles calcaires, lacs émeraude et polenta du soir. Bagages transportés d'une étape à l'autre.",
    steps: [
      { title: "Lac de Braies", text: "Départ au bord du lac et première montée vers le refuge." },
      { title: "Fanes", text: "Hauts plateaux, marmottes et vue sur les Tofane." },
      { title: "Cinque Torri", text: "Les tours de calcaire et les vestiges de la Grande Guerre." },
      { title: "Cortina", text: "Descente vers la ville et nuit à l'hôtel." },
    ],
  },
  {
    slug: "iles-feroe",
    place: "Îles Féroé",
    country: "Danemark",
    tagline: "Au bout de l'Atlantique",
    types: ["nature-sauvage", "randonnee"],
    days: 7,
    price: 1_890,
    offer: 1_690,
    season: "Mai à septembre",
    photo: "1539634936668-036d13a9cc3b",
    gallery: ["1506457469115-39b5cced7b7a", "1517751243320-0cc45ec82da7"],
    alt: "Cascade tombant d'une falaise dans l'océan aux Féroé",
    summary:
      "Dix-huit îles entre l'Écosse et l'Islande, des falaises vertes, des macareux et des villages aux toits d'herbe. Voiture et ferries réservés.",
    steps: [
      { title: "Tórshavn", text: "La plus petite capitale du nord et ses maisons au toit d'herbe." },
      { title: "Gásadalur", text: "La cascade qui tombe dans l'océan." },
      { title: "Mykines", text: "Ferry vers l'île des macareux et son phare." },
      { title: "Kalsoy", text: "Randonnée jusqu'au phare de Kallur." },
    ],
  },
  {
    slug: "mont-bromo",
    place: "Mont Bromo",
    country: "Indonésie",
    tagline: "Volcans au-dessus des nuages",
    types: ["nature-sauvage", "culture"],
    days: 13,
    price: 2_190,
    season: "Avril à octobre",
    photo: "1588668214407-6ea9a6d8c272",
    gallery: ["1602154663343-89fe0bf541ab", "1778491598565-7d4b197c92ea"],
    alt: "Volcans du Bromo émergeant d'une mer de nuages",
    summary:
      "Java au lever du soleil : le Bromo fumant dans sa caldeira, le lac acide de l'Ijen, puis les rizières et temples avant quelques jours à Bali.",
    steps: [
      { title: "Yogyakarta", text: "Temples de Borobudur et Prambanan." },
      { title: "Bromo", text: "Lever du soleil sur la caldeira depuis Penanjakan." },
      { title: "Ijen", text: "Marche nocturne jusqu'au lac turquoise du cratère." },
      { title: "Bali", text: "Trois jours de repos entre rizières et plages." },
    ],
  },
  {
    slug: "fjords-norvege",
    place: "Lofoten et fjords",
    country: "Norvège",
    tagline: "Le nord en grand format",
    types: ["road-trip", "nature-sauvage"],
    days: 10,
    price: 1_990,
    offer: 1_790,
    season: "Juin à août, ou février pour les aurores",
    photo: "1663428520845-056989f8a664",
    gallery: ["1664825381616-5cb8397fd9b1", "1698307781486-7c63dadf5fb7"],
    alt: "Village de pêcheurs au pied des montagnes des Lofoten",
    summary:
      "Des fjords de l'ouest aux îles Lofoten, en voiture et en ferry, avec des nuits en rorbu, ces anciennes cabanes de pêcheurs sur pilotis.",
    steps: [
      { title: "Bergen", text: "Le port hanséatique et le funiculaire du Fløyen." },
      { title: "Geiranger", text: "Croisière sur le fjord et ses cascades." },
      { title: "Lofoten", text: "Plages blanches, sommets et nuits en rorbu." },
      { title: "Tromsø", text: "Dernier soir, et aurores boréales en hiver." },
    ],
  },
  {
    slug: "patagonie",
    place: "Patagonie",
    country: "Argentine et Chili",
    tagline: "Le vent du bout du monde",
    types: ["randonnee", "nature-sauvage"],
    days: 15,
    price: 3_890,
    season: "Novembre à mars",
    photo: "1772171838855-96e0e49438fc",
    gallery: ["1546569397-ab326af881f5", "1600211906168-fbc6df476b1c"],
    alt: "Le Fitz Roy au-dessus d'une rivière en Patagonie",
    summary:
      "Le Fitz Roy depuis El Chaltén, le glacier Perito Moreno et les tours du Paine : la Patagonie des deux côtés de la frontière, en randonnées à la journée.",
    steps: [
      { title: "El Calafate", text: "Passerelles face au front du glacier Perito Moreno." },
      { title: "El Chaltén", text: "Randonnée jusqu'à la Laguna de los Tres, au pied du Fitz Roy." },
      { title: "Torres del Paine", text: "Trois jours de marche dans le parc national." },
      { title: "Puerto Natales", text: "Navigation dans les fjords avant le retour." },
    ],
  },
  {
    slug: "nouvelle-zelande",
    place: "Fjordland",
    country: "Nouvelle-Zélande",
    tagline: "Des lacs comme des miroirs",
    types: ["road-trip", "randonnee"],
    days: 18,
    price: 4_290,
    season: "Novembre à avril",
    photo: "1591640040362-f55d95a6b2bc",
    gallery: ["1557589747-a830b99db298", "1494783329112-4a6795291178"],
    alt: "Montagnes enneigées se reflétant dans un lac",
    summary:
      "L'île du Sud en van aménagé : Milford Sound, les lacs de Wanaka et de Tekapo, et les glaciers de la côte ouest. Itinéraire et campings réservés.",
    steps: [
      { title: "Queenstown", text: "Prise du van et premiers lacs." },
      { title: "Milford Sound", text: "Croisière entre les falaises du fjord." },
      { title: "Wanaka", text: "L'arbre du lac et la randonnée du Roys Peak." },
      { title: "Côte ouest", text: "Glaciers Franz Josef et forêt pluviale." },
    ],
  },
];

export const findDestination = (slug: string | null) => destinations.find((destination) => destination.slug === slug);

export const euros = (value: number) => `${value.toLocaleString("fr-FR")} €`;

export const clouds = "1504253163759-c23fccaebb55";
