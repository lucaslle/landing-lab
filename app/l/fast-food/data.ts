// Menu of "Tasty Bites", a fictional fast food. Photos: unsplash.com (Unsplash license), served by their CDN.
export const photo = (id: string, width: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=75`;

export const categories = {
  burgers: "Burgers",
  pizzas: "Pizzas",
  accompagnements: "Accompagnements",
  "boissons-desserts": "Boissons et desserts",
};
export type Category = keyof typeof categories;

export type Extra = { id: string; label: string; price: number };

// Options offered for each category: a size choice and paid extras.
export const optionsByCategory: Record<Category, { sizes?: { label: string; price: number }[]; extras: Extra[] }> = {
  burgers: {
    sizes: [
      { label: "Burger seul", price: 0 },
      { label: "En menu, frites et boisson", price: 3.5 },
    ],
    extras: [
      { id: "bacon", label: "Bacon", price: 1.5 },
      { id: "cheddar", label: "Double cheddar", price: 1 },
      { id: "oeuf", label: "Œuf au plat", price: 1 },
    ],
  },
  pizzas: {
    sizes: [
      { label: "Moyenne, 29 cm", price: 0 },
      { label: "Grande, 34 cm", price: 3 },
    ],
    extras: [
      { id: "mozza", label: "Supplément mozzarella", price: 1.5 },
      { id: "piment", label: "Huile pimentée", price: 0.5 },
    ],
  },
  accompagnements: {
    sizes: [
      { label: "Normale", price: 0 },
      { label: "Grande", price: 1.5 },
    ],
    extras: [{ id: "sauce", label: "Sauce maison en plus", price: 0.5 }],
  },
  "boissons-desserts": { extras: [{ id: "chantilly", label: "Chantilly", price: 0.5 }] },
};

export type Product = {
  slug: string;
  name: string;
  category: Category;
  price: number; // €, base size
  tag?: "Populaire" | "Nouveau" | "Épicé" | "Végétarien";
  photo: string;
  alt: string;
  description: string;
  details: string;
  allergens: string[];
};

export const products: Product[] = [
  {
    slug: "classic-burger",
    name: "Classic Burger",
    category: "burgers",
    price: 9.9,
    tag: "Populaire",
    photo: "1603064752734-4c48eff53d05",
    alt: "Burger au bœuf, cheddar, salade et oignon rouge",
    description: "Steak haché frais, cheddar, salade, tomate et notre sauce maison.",
    details:
      "Un steak de bœuf français de 150 g haché chaque matin, saisi à la plancha, dans un pain brioché toasté. Cheddar affiné, salade, tomate, oignon rouge et sauce maison.",
    allergens: ["Gluten", "Lait", "Œuf", "Moutarde"],
  },
  {
    slug: "cheese-bacon",
    name: "Cheese Bacon",
    category: "burgers",
    price: 11.9,
    photo: "1572802419224-296b0aeee0d9",
    alt: "Double burger au cheddar fondu sur fond sombre",
    description: "Double steak, double cheddar et bacon grillé.",
    details:
      "Deux steaks de 100 g, deux tranches de cheddar fondu et du bacon fumé grillé, avec cornichons et sauce barbecue. Pour les grandes faims.",
    allergens: ["Gluten", "Lait", "Moutarde"],
  },
  {
    slug: "smash-burger",
    name: "Smash Burger",
    category: "burgers",
    price: 10.5,
    tag: "Nouveau",
    photo: "1607013251379-e6eecfffe234",
    alt: "Smash burger aux bords croustillants",
    description: "Steaks écrasés à la plancha, bords croustillants, oignons caramélisés.",
    details:
      "Deux boules de bœuf écrasées sur la plancha brûlante pour des bords bien caramélisés, cheddar, oignons confits et pickles maison.",
    allergens: ["Gluten", "Lait", "Moutarde"],
  },
  {
    slug: "crispy-chicken",
    name: "Crispy Chicken",
    category: "burgers",
    price: 10.9,
    photo: "1655895176036-bf1a11326e5c",
    alt: "Burger au poulet pané croustillant",
    description: "Filet de poulet pané, coleslaw et mayonnaise au citron.",
    details:
      "Un filet de poulet mariné au babeurre puis pané minute, coleslaw croquant, cornichons et mayonnaise au citron, dans un pain au sésame.",
    allergens: ["Gluten", "Œuf", "Lait", "Sésame"],
  },
  {
    slug: "pulled-pork",
    name: "Pulled Pork",
    category: "burgers",
    price: 11.5,
    tag: "Épicé",
    photo: "1760533536289-9e4106eaf62e",
    alt: "Burger d'effiloché de porc et chou rouge, avec des frites",
    description: "Porc effiloché cuit 12 heures, chou rouge et sauce chipotle.",
    details:
      "Épaule de porc fumée et cuite douze heures, effilochée et nappée de sauce barbecue au chipotle, chou rouge mariné et oignons frits.",
    allergens: ["Gluten", "Moutarde", "Céleri"],
  },
  {
    slug: "margherita",
    name: "Margherita",
    category: "pizzas",
    price: 10.5,
    tag: "Végétarien",
    photo: "1598023696416-0193a0bcd302",
    alt: "Pizza margherita au basilic frais",
    description: "Tomate, mozzarella fior di latte et basilic frais.",
    details:
      "Pâte maturée 48 heures, sauce tomate San Marzano, mozzarella fior di latte et basilic frais, cuite au four à bois.",
    allergens: ["Gluten", "Lait"],
  },
  {
    slug: "pepperoni",
    name: "Pepperoni",
    category: "pizzas",
    price: 12.5,
    tag: "Populaire",
    photo: "1628840042765-356cda07504e",
    alt: "Pizza au pepperoni vue de dessus",
    description: "Tomate, mozzarella et pepperoni légèrement piquant.",
    details: "Sauce tomate, mozzarella et généreuses tranches de pepperoni qui grillent au four, avec une pointe d'origan.",
    allergens: ["Gluten", "Lait"],
  },
  {
    slug: "quatre-fromages",
    name: "Quatre fromages",
    category: "pizzas",
    price: 13,
    tag: "Végétarien",
    photo: "1776810250102-7459c4e0edc9",
    alt: "Part de pizza au fromage qui file",
    description: "Mozzarella, gorgonzola, chèvre et parmesan.",
    details: "Base crème, mozzarella, gorgonzola, chèvre frais et parmesan affiné 24 mois, un filet de miel à la sortie du four.",
    allergens: ["Gluten", "Lait"],
  },
  {
    slug: "frites-maison",
    name: "Frites maison",
    category: "accompagnements",
    price: 3.9,
    tag: "Populaire",
    photo: "1768252452214-38f555002147",
    alt: "Frites dorées",
    description: "Pommes de terre fraîches, double cuisson, fleur de sel.",
    details: "Des pommes de terre françaises coupées chaque matin, cuites deux fois pour être croustillantes, avec une pincée de fleur de sel.",
    allergens: [],
  },
  {
    slug: "onion-rings",
    name: "Onion rings",
    category: "accompagnements",
    price: 4.5,
    photo: "1612487439058-0564e17f761b",
    alt: "Rondelles d'oignon panées",
    description: "Oignons doux en pâte à bière, sauce barbecue.",
    details: "Rondelles d'oignons doux trempées dans une pâte à la bière et frites minute, servies avec une sauce barbecue.",
    allergens: ["Gluten", "Lait"],
  },
  {
    slug: "chicken-wings",
    name: "Chicken wings",
    category: "accompagnements",
    price: 6.9,
    tag: "Épicé",
    photo: "1567620832903-9fc6debc209f",
    alt: "Ailes de poulet laquées avec une sauce blanche",
    description: "Six ailes de poulet laquées au miel et piment.",
    details: "Six ailes de poulet marinées, rôties puis laquées au miel et au piment, avec une sauce au fromage blanc et aux herbes.",
    allergens: ["Lait", "Céleri"],
  },
  {
    slug: "tenders",
    name: "Tenders",
    category: "accompagnements",
    price: 5.9,
    photo: "1585703900468-13c7a978ad86",
    alt: "Morceaux de poulet pané dans un panier",
    description: "Cinq aiguillettes de poulet panées, sauce au choix.",
    details: "Cinq aiguillettes de filet de poulet panées aux corn flakes, servies avec la sauce de votre choix.",
    allergens: ["Gluten", "Œuf"],
  },
  {
    slug: "milkshake-chocolat",
    name: "Milkshake chocolat",
    category: "boissons-desserts",
    price: 4.9,
    tag: "Populaire",
    photo: "1553787499-6f9133860278",
    alt: "Milkshake au chocolat nappé de sauce",
    description: "Glace vanille, chocolat noir et sauce chocolat.",
    details: "Glace à la vanille de Madagascar mixée avec du lait entier et du chocolat noir, nappage de sauce chocolat.",
    allergens: ["Lait"],
  },
  {
    slug: "milkshake-cookies",
    name: "Milkshake cookies",
    category: "boissons-desserts",
    price: 5.2,
    photo: "1572490122747-3968b75cc699",
    alt: "Milkshake aux biscuits chocolatés",
    description: "Glace vanille et éclats de biscuits au chocolat.",
    details: "Glace à la vanille, lait entier et éclats de biscuits au cacao, avec un biscuit entier sur le dessus.",
    allergens: ["Lait", "Gluten", "Soja"],
  },
  {
    slug: "citronnade",
    name: "Citronnade maison",
    category: "boissons-desserts",
    price: 3.5,
    photo: "1623084921164-4a8c5c37a912",
    alt: "Verre de citronnade avec des citrons coupés",
    description: "Citrons pressés, menthe fraîche, peu sucrée.",
    details: "Citrons pressés chaque jour, eau pétillante, menthe fraîche et un peu de sucre de canne. 40 cl.",
    allergens: [],
  },
  {
    slug: "brownie",
    name: "Brownie glacé",
    category: "boissons-desserts",
    price: 4.5,
    photo: "1624353365286-3f8d62daad51",
    alt: "Brownie au chocolat avec une boule de glace",
    description: "Brownie fondant aux noix de pécan, boule vanille.",
    details: "Un brownie au chocolat noir et aux noix de pécan servi tiède, avec une boule de glace vanille et un filet de caramel.",
    allergens: ["Gluten", "Œuf", "Lait", "Fruits à coque"],
  },
];

export const findProduct = (slug: string | null) => products.find((product) => product.slug === slug);

export const euros = (value: number) =>
  value.toLocaleString("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });

export const heroPhoto = "1586190848861-99aa4a171e90";
export const bannerPhoto = "1571757392712-7c1052de7ce5";

// Delivery is free from this cart total.
export const FREE_DELIVERY_FROM = 25;
export const DELIVERY_FEE = 2.9;
