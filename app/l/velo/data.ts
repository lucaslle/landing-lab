// Range of "Kairn", a fictional bike brand. Photos: unsplash.com (Unsplash license), served by their CDN.
export const photo = (id: string, width: number, height?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}${height ? `&h=${height}` : ""}&q=75`;

// Shown at 16:10 so the hotspots (in % of that frame) land on the same parts of the bike at every width.
export const sidePhoto = (id: string, width: number) => photo(id, width, Math.round((width * 10) / 16));

export type Hotspot = { x: number; y: number; title: string; text: string };

export type Bike = {
  slug: string;
  name: string;
  family: string;
  tagline: string;
  groupset: string;
  price: number; // €
  weight: number; // kg, size 54
  photo: string;
  alt: string;
  colors: { name: string; hex: string }[];
  summary: string;
  hotspots: Hotspot[];
  specs: { label: string; value: string }[];
};

export const bikes: Bike[] = [
  {
    slug: "vortex",
    name: "Vortex",
    family: "Route aéro",
    tagline: "Plus vite, partout",
    groupset: "Dura-Ace Di2",
    price: 9_999,
    weight: 7.4,
    photo: "1532298229144-0ec0c57515c7",
    alt: "Vélo de route aéro noir sur fond sombre",
    colors: [
      { name: "Noir carbone", hex: "#1b1d22" },
      { name: "Gris orage", hex: "#5d636d" },
    ],
    summary:
      "Le cadre le plus profilé de la gamme, pensé pour le vent de face et les longues échappées. Câbles intégrés, roues hautes de 60 mm et freins à disque.",
    hotspots: [
      { x: 52, y: 42, title: "Cadre aéro", text: "Tubes profilés en carbone haut module, 8 watts gagnés à 45 km/h." },
      { x: 74, y: 26, title: "Cockpit intégré", text: "Cintre et potence d'une pièce, câbles entièrement cachés." },
      { x: 44, y: 75, title: "Transmission", text: "Shimano Dura-Ace Di2 12 vitesses, passages électroniques." },
      { x: 86, y: 52, title: "Roues de 60 mm", text: "Jantes carbone tubeless, 1 420 g la paire." },
    ],
    specs: [
      { label: "Cadre", value: "Carbone haut module, 890 g" },
      { label: "Fourche", value: "Carbone, pivot conique" },
      { label: "Groupe", value: "Shimano Dura-Ace Di2, 2 × 12" },
      { label: "Freins", value: "Disques hydrauliques 160/140 mm" },
      { label: "Roues", value: "Carbone 60 mm, tubeless" },
      { label: "Pneus", value: "28 mm tubeless" },
    ],
  },
  {
    slug: "strada",
    name: "Strada",
    family: "Route endurance",
    tagline: "Rouler plus loin",
    groupset: "Ultegra Di2",
    price: 5_499,
    weight: 8.1,
    photo: "1576435728678-68d0fbf94e91",
    alt: "Vélo de route brun appuyé contre un mur en bois",
    colors: [
      { name: "Brun cuivré", hex: "#5a3a2c" },
      { name: "Vert sapin", hex: "#2f4a3c" },
    ],
    summary:
      "Une position un peu plus redressée et un cadre qui filtre les vibrations, pour les sorties de 150 km comme pour le vélotaf. Passage pour pneus de 35 mm.",
    hotspots: [
      { x: 52, y: 38, title: "Cadre confort", text: "Haubans fins et tige de selle flexible pour filtrer les routes abîmées." },
      { x: 70, y: 22, title: "Cockpit", text: "Cintre évasé de 10°, plus de contrôle en descente." },
      { x: 44, y: 73, title: "Transmission", text: "Shimano Ultegra Di2 12 vitesses, cassette 11-34." },
      { x: 84, y: 52, title: "Pneus de 32 mm", text: "Tubeless, passage jusqu'à 35 mm et garde-boue en option." },
    ],
    specs: [
      { label: "Cadre", value: "Carbone, 980 g" },
      { label: "Fourche", value: "Carbone, œillets pour garde-boue" },
      { label: "Groupe", value: "Shimano Ultegra Di2, 2 × 12" },
      { label: "Freins", value: "Disques hydrauliques 160 mm" },
      { label: "Roues", value: "Carbone 40 mm, tubeless" },
      { label: "Pneus", value: "32 mm tubeless, jusqu'à 35 mm" },
    ],
  },
  {
    slug: "sentier",
    name: "Sentier",
    family: "Gravel",
    tagline: "Hors des routes",
    groupset: "GRX 1 × 12",
    price: 3_799,
    weight: 9.2,
    photo: "1707211748502-e10006030f13",
    alt: "Vélo gravel équipé de sacoches contre un mur en pierre",
    colors: [
      { name: "Vert olive", hex: "#5b6131" },
      { name: "Sable", hex: "#bfa77d" },
    ],
    summary:
      "Le vélo des chemins et des voyages : pneus larges, géométrie stable et fixations partout pour les sacoches. Il avale aussi bien le bitume que les pistes.",
    hotspots: [
      { x: 28, y: 23, title: "Bikepacking", text: "Fixations pour sacoche de selle, de cadre et trois porte-bidons." },
      { x: 70, y: 23, title: "Cintre évasé", text: "16° d'évasement pour garder le contrôle dans les descentes de chemin." },
      { x: 46, y: 68, title: "Transmission 1 × 12", text: "Shimano GRX mono-plateau, simple et sans saut de chaîne." },
      { x: 88, y: 62, title: "Pneus de 45 mm", text: "Passage jusqu'à 50 mm en 700C ou 2,1 pouces en 650B." },
    ],
    specs: [
      { label: "Cadre", value: "Carbone, 1 050 g" },
      { label: "Fourche", value: "Carbone, fixations pour cages" },
      { label: "Groupe", value: "Shimano GRX, 1 × 12" },
      { label: "Freins", value: "Disques hydrauliques 160 mm" },
      { label: "Roues", value: "Aluminium 25 mm interne, tubeless" },
      { label: "Pneus", value: "45 mm tubeless, jusqu'à 50 mm" },
    ],
  },
];

export const findBike = (slug: string | null) => bikes.find((bike) => bike.slug === slug);

// Frame sizes with the rider heights they fit.
export const sizes = [
  { label: "XS (49)", min: 155, max: 165 },
  { label: "S (52)", min: 165, max: 172 },
  { label: "M (54)", min: 172, max: 179 },
  { label: "L (56)", min: 179, max: 186 },
  { label: "XL (58)", min: 186, max: 195 },
];

export const sizeFor = (height: number) =>
  sizes.find((size) => height >= size.min && height < size.max) ?? (height < sizes[0].min ? sizes[0] : sizes.at(-1)!);

export const euros = (value: number) => `${value.toLocaleString("fr-FR")} €`;

export const details = {
  frame: { id: "1496147433903-1e62fdb6f4be", alt: "Cadre de vélo noir dans la pénombre" },
  cockpit: { id: "1503669678209-c68d00b3765d", alt: "Cintre de route sur fond noir" },
  brake: { id: "1618762098304-38e6b03db348", alt: "Frein à disque et rayons" },
};

export const ridePhotos = [
  { id: "1695808403945-2eae5f50b486", alt: "Cycliste sur une route au coucher du soleil" },
  { id: "1629056528325-f328b5f27ae7", alt: "Deux cyclistes sur un chemin de montagne" },
  { id: "1486425091969-f62210f08a26", alt: "Peloton de cyclistes à pleine vitesse" },
];
