// Stock and journal of "Renc", a fictional prestige car dealer. Photos: unsplash.com (Unsplash license), served by their CDN.
export const photo = (id: string, width: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=75`;

export const conditions = { neuf: "Neuf", occasion: "Occasion" };
export type Condition = keyof typeof conditions;

export const bodies = { coupe: "Coupé", berline: "Berline", suv: "SUV" };
export type Body = keyof typeof bodies;

export const budgets = {
  "200": { label: "Jusqu'à 200 000 €", max: 200_000 },
  "250": { label: "Jusqu'à 250 000 €", max: 250_000 },
  "400": { label: "Jusqu'à 400 000 €", max: 400_000 },
};
export type Budget = keyof typeof budgets;

export type Vehicle = {
  slug: string;
  brand: string;
  model: string;
  body: Body;
  condition: Condition;
  year: number;
  mileage: number; // km
  price: number; // € TTC
  power: number; // ch
  acceleration: number; // 0 to 100 km/h, s
  engine: string;
  color: string;
  photo: string;
  alt: string;
  summary: string;
  equipment: string[];
};

export const vehicles: Vehicle[] = [
  {
    slug: "bentley-flying-spur",
    brand: "Bentley",
    model: "Flying Spur V8",
    body: "berline",
    condition: "occasion",
    year: 2023,
    mileage: 8_200,
    price: 189_000,
    power: 550,
    acceleration: 4.1,
    engine: "V8 4.0 biturbo",
    color: "Vert British Racing",
    photo: "1729513393829-7cf086494232",
    alt: "Bentley Flying Spur verte garée dans un parc",
    summary:
      "Une berline de quatre places où l'on voyage aussi bien devant qu'à l'arrière. Première main, entretien Bentley à jour et garantie de 24 mois incluse.",
    equipment: ["Sièges arrière massants et ventilés", "Système audio Naim", "Toit panoramique", "Vision nocturne"],
  },
  {
    slug: "rolls-royce-wraith",
    brand: "Rolls-Royce",
    model: "Wraith",
    body: "coupe",
    condition: "occasion",
    year: 2019,
    mileage: 18_400,
    price: 239_000,
    power: 632,
    acceleration: 4.6,
    engine: "V12 6.6 biturbo",
    color: "Blanc Arctique, toit bleu",
    photo: "1631295868223-63265b40d9e4",
    alt: "Rolls-Royce Wraith blanche sous les palmiers",
    summary:
      "Le grand coupé de Rolls-Royce, avec ses portes antagonistes et son ciel étoilé. Deuxième main, carnet complet chez Rolls-Royce.",
    equipment: ["Ciel de toit étoilé", "Portes antagonistes", "Boiserie en eucalyptus", "Affichage tête haute"],
  },
  {
    slug: "rolls-royce-phantom",
    brand: "Rolls-Royce",
    model: "Phantom VIII",
    body: "berline",
    condition: "occasion",
    year: 2021,
    mileage: 12_100,
    price: 389_000,
    power: 571,
    acceleration: 5.3,
    engine: "V12 6.75 biturbo",
    color: "Noir Diamant",
    photo: "1740098160485-d098fbf42814",
    alt: "Rolls-Royce Phantom noire de face",
    summary:
      "La limousine de référence, dans une teinte noire et un intérieur crème. Galerie d'art dans la planche de bord et sièges arrière inclinables.",
    equipment: ["Galerie de planche de bord", "Sièges arrière inclinables", "Réfrigérateur et flûtes", "Ciel de toit étoilé"],
  },
  {
    slug: "bentley-continental-gt",
    brand: "Bentley",
    model: "Continental GT V8",
    body: "coupe",
    condition: "occasion",
    year: 2022,
    mileage: 15_300,
    price: 179_000,
    power: 550,
    acceleration: 4.0,
    engine: "V8 4.0 biturbo",
    color: "Bleu Sequin",
    photo: "1725181952127-93be5d418102",
    alt: "Bentley Continental GT bleue de face",
    summary: "Le grand tourisme par excellence, pour avaler les kilomètres à deux. Pack Mulliner et jantes 22 pouces.",
    equipment: ["Pack Mulliner", "Écran rotatif", "Jantes 22 pouces", "Sièges chauffants et massants"],
  },
  {
    slug: "mclaren-720s",
    brand: "McLaren",
    model: "720S",
    body: "coupe",
    condition: "occasion",
    year: 2020,
    mileage: 14_000,
    price: 219_000,
    power: 720,
    acceleration: 2.9,
    engine: "V8 4.0 biturbo central arrière",
    color: "Gris Silica",
    photo: "1689596323441-94fe62ac5f0c",
    alt: "McLaren 720S grise sur la route",
    summary: "Une supercar étonnamment utilisable au quotidien, grâce à sa visibilité et à sa suspension pilotée. Système de levage avant.",
    equipment: ["Levage du train avant", "Freins carbone-céramique", "Sièges baquets en carbone", "Caméra de recul"],
  },
  {
    slug: "porsche-911-gt3",
    brand: "Porsche",
    model: "911 GT3",
    body: "coupe",
    condition: "occasion",
    year: 2023,
    mileage: 6_100,
    price: 229_000,
    power: 510,
    acceleration: 3.4,
    engine: "Flat-6 4.0 atmosphérique",
    color: "Gris Agate",
    photo: "1634673970798-a15ae56f6c65",
    alt: "Porsche 911 GT3 grise",
    summary: "Le six cylindres atmosphérique qui monte à 9 000 tr/min, en boîte PDK. Pack Clubsport et garantie Porsche Approved.",
    equipment: ["Pack Clubsport", "Lift du train avant", "Sièges baquets", "Garantie Porsche Approved"],
  },
  {
    slug: "aston-martin-dbs",
    brand: "Aston Martin",
    model: "DBS Superleggera",
    body: "coupe",
    condition: "occasion",
    year: 2021,
    mileage: 11_200,
    price: 209_000,
    power: 725,
    acceleration: 3.4,
    engine: "V12 5.2 biturbo",
    color: "Rouge Hyper",
    photo: "1715621870807-9e587490502e",
    alt: "Aston Martin DBS rouge",
    summary: "Le V12 le plus puissant d'Aston Martin dans un coupé 2+2 élégant. Intérieur cuir noir et surpiqûres rouges.",
    equipment: ["Échappement sport", "Système audio Bang & Olufsen", "Toit carbone", "Caméras 360°"],
  },
  {
    slug: "lamborghini-huracan-evo",
    brand: "Lamborghini",
    model: "Huracán EVO",
    body: "coupe",
    condition: "occasion",
    year: 2021,
    mileage: 16_500,
    price: 219_000,
    power: 640,
    acceleration: 2.9,
    engine: "V10 5.2 atmosphérique",
    color: "Arancio Borealis",
    photo: "1612825173281-9a193378527e",
    alt: "Lamborghini Huracán orange",
    summary: "Le V10 atmosphérique dans sa version la plus aboutie, quatre roues motrices et directrices. Révision complète faite en atelier.",
    equipment: ["Quatre roues directrices", "Lift du train avant", "Échappement sport", "Apple CarPlay"],
  },
  {
    slug: "mercedes-amg-g63",
    brand: "Mercedes-AMG",
    model: "G 63",
    body: "suv",
    condition: "neuf",
    year: 2026,
    mileage: 0,
    price: 219_000,
    power: 585,
    acceleration: 4.4,
    engine: "V8 4.0 biturbo hybride léger",
    color: "Noir Obsidienne",
    photo: "1648413653819-7c0fd93e8e6a",
    alt: "Mercedes-AMG G 63 noir",
    summary: "Neuf et disponible tout de suite : le tout-terrain iconique, avec trois blocages de différentiel et un intérieur Manufaktur.",
    equipment: ["Intérieur Manufaktur", "Trois blocages de différentiel", "Système audio Burmester", "Pack AMG Night"],
  },
  {
    slug: "range-rover-autobiography",
    brand: "Land Rover",
    model: "Range Rover Autobiography",
    body: "suv",
    condition: "neuf",
    year: 2026,
    mileage: 0,
    price: 189_000,
    power: 530,
    acceleration: 4.6,
    engine: "V8 4.4 biturbo",
    color: "Gris Carpathian",
    photo: "1637859460045-ac3ae9ced99d",
    alt: "Range Rover sur un chemin forestier",
    summary: "Le SUV de luxe le plus confortable du marché, en finition Autobiography. Quatre roues directrices et suspension pneumatique.",
    equipment: ["Suspension pneumatique", "Quatre roues directrices", "Sièges arrière Executive", "Système audio Meridian"],
  },
];

export const findVehicle = (slug: string | null) => vehicles.find((vehicle) => vehicle.slug === slug);

export const brands = [...new Set(vehicles.map((vehicle) => vehicle.brand))].toSorted();

export const euros = (value: number) => `${value.toLocaleString("fr-FR")} €`;
export const kilometers = (value: number) => (value === 0 ? "0 km, neuve" : `${value.toLocaleString("fr-FR")} km`);

// The vehicle the home page and its banner put forward.
export const offer = { slug: "bentley-flying-spur", previousPrice: 199_000 };

export const heroPhoto = "1624804269473-828dcc30a210";

export const posts = [
  {
    slug: "choisir-sa-premiere-rolls-royce",
    title: "Wraith, Ghost ou Phantom : choisir sa première Rolls-Royce",
    excerpt: "Trois caractères très différents derrière la même calandre. Nos conseils selon l'usage.",
    date: "2026-10-14",
    photo: "1629820408206-e9fc918abf63",
    alt: "Planche de bord en bois d'une Rolls-Royce",
    body: [
      "La Wraith est un coupé pour celui qui conduit, la Ghost une berline qui se conduit encore soi-même, la Phantom une limousine où l'on préfère souvent l'arrière.",
      "En occasion, les Wraith de 2017 à 2020 offrent le meilleur rapport entre prix et équipement. Vérifiez l'historique complet chez Rolls-Royce et l'état des cuirs clairs.",
      "Pour une Phantom, comptez des frais d'entretien annuels de 3 000 à 5 000 € hors pneumatiques. Nous fournissons un devis d'entretien avec chaque véhicule.",
    ],
  },
  {
    slug: "porsche-911-gt3-hiver",
    title: "Rouler en 911 GT3 l'hiver, une bonne idée ?",
    excerpt: "Pneus, garde au sol et stockage : ce qu'il faut savoir avant de garder sa GT3 toute l'année.",
    date: "2026-11-02",
    photo: "1614162692292-7ac56d7f7f1e",
    alt: "Porsche 911 blanche sur une route enneigée",
    body: [
      "Une GT3 n'a pas peur du froid, à condition de l'équiper de vrais pneus hiver. Les dimensions d'origine existent en gommes hiver homologuées N0.",
      "Le lift du train avant devient indispensable avec la neige tassée. Rincez le soubassement après chaque sortie sur route salée.",
      "Si elle hiberne, un chargeur de maintien et une bâche respirante suffisent. Nous proposons un gardiennage chauffé dans notre atelier.",
    ],
  },
  {
    slug: "acheter-une-voiture-de-prestige-occasion",
    title: "Acheter une voiture de prestige d'occasion sans mauvaise surprise",
    excerpt: "Historique, contrôle en 150 points et garantie : notre méthode avant chaque vente.",
    date: "2026-11-18",
    photo: "1692406069831-0bb7ea297645",
    alt: "Showroom avec des voitures de sport exposées",
    body: [
      "Chaque voiture de notre stock passe un contrôle en 150 points dans notre atelier, avec passage au banc et lecture de la mémoire des calculateurs.",
      "Nous exigeons un historique d'entretien complet dans le réseau de la marque et vérifions le kilométrage auprès des bases constructeur.",
      "Toutes nos occasions sont vendues avec une garantie de 12 mois minimum, extensible à 36 mois.",
    ],
  },
];

export const findPost = (slug: string) => posts.find((post) => post.slug === slug);

export const longDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
