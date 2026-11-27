// "Fonte", a fictional strength and cross-training gym in Nantes. Coaches, prices and schedule are invented.
// Photos: one shoot by Victor Freitas on unsplash.com (Unsplash license), shown in black and white so they match.
export const photo = (id: string, width: number, height?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}${height ? `&h=${height}` : ""}&q=75`;

export const photos = {
  hero: "1556817781-77671f3fe3c7",
  openGym: "1521805103424-d8f8430e8933",
  deadlift: "1517836357463-d25dfeac3438",
  grip: "1517963879433-6ad2b056d712",
};

export type Discipline = {
  slug: string;
  name: string;
  duration: number; // minutes
  capacity: number;
  level: string;
  photo: string;
  alt: string;
  pitch: string;
};

export const disciplines: Discipline[] = [
  {
    slug: "halterophilie",
    name: "Haltérophilie",
    duration: 60,
    capacity: 6,
    level: "Tous niveaux",
    photo: "1521804906057-1df8fdb718b7",
    alt: "Athlète qui saisit une barre chargée au sol",
    pitch: "Arraché et épaulé-jeté, un coach pour six athlètes et une plateforme chacun.",
  },
  {
    slug: "cross-training",
    name: "Cross-training",
    duration: 45,
    capacity: 12,
    level: "Tous niveaux",
    photo: "1556817411-92f5ec899a55",
    alt: "Deux athlètes allongés au sol à côté d'une barre après l'effort",
    pitch: "Le WOD du jour en groupe de douze, adapté à chacun, du premier cours au niveau compétition.",
  },
  {
    slug: "force",
    name: "Force",
    duration: 75,
    capacity: 8,
    level: "Intermédiaire",
    photo: "1556817411-58c45dd94e8c",
    alt: "Athlète en position de soulevé de terre face à une barre",
    pitch: "Squat, développé couché et soulevé de terre, sur des cycles de huit semaines avec tests de charge.",
  },
  {
    slug: "cardio",
    name: "Cardio",
    duration: 45,
    capacity: 10,
    level: "Tous niveaux",
    photo: "1519505907962-0a6cb0167c73",
    alt: "Athlète qui tire sur la poignée d'un rameur",
    pitch: "Intervalles sur rameur, vélo à air et ski erg. Court, intense, et la musique un peu trop forte.",
  },
  {
    slug: "gymnastique",
    name: "Gymnastique",
    duration: 60,
    capacity: 10,
    level: "Intermédiaire",
    photo: "1556817411-e27a2f370c0c",
    alt: "Mains gantées accrochées à une barre de traction",
    pitch: "Tractions, dips, gainage et appuis renversés, pour enfin réussir son premier muscle-up.",
  },
];

export const findDiscipline = (slug: string | null) => disciplines.find((discipline) => discipline.slug === slug);

export const coaches = [
  { name: "Nadia Benali", role: "Haltérophilie", disciplines: ["halterophilie"], since: 2017, text: "Ancienne athlète de niveau national, elle corrige un arraché en une phrase.", diplomas: ["BPJEPS AF", "Brevet fédéral haltérophilie"] },
  { name: "Thomas Leroux", role: "Force", disciplines: ["force"], since: 2018, text: "Il programme vos cycles au kilo près et note chaque record au tableau.", diplomas: ["STAPS entraînement", "Powerlifting niveau 2"] },
  { name: "Awa Diop", role: "Cross-training", disciplines: ["cross-training", "cardio"], since: 2019, text: "Ses WOD ont des noms de chansons. Personne n'ose demander pourquoi.", diplomas: ["BPJEPS AF", "Cross-training niveau 2"] },
  { name: "Julien Marchand", role: "Gymnastique", disciplines: ["gymnastique"], since: 2020, text: "Ex-gymnaste, il fait des progressions pour tout le monde, même ceux qui n'ont jamais fait une traction.", diplomas: ["Licence STAPS", "Gymnastique niveau 1"] },
  { name: "Clara Petit", role: "Cardio et mobilité", disciplines: ["cardio"], since: 2021, text: "Elle commence chaque séance par dix minutes de mobilité, et vous la remercierez plus tard.", diplomas: ["BPJEPS AF", "Yoga 200 h"] },
  { name: "Mehdi Rahmani", role: "Coaching individuel", disciplines: ["force", "halterophilie"], since: 2016, text: "Cofondateur de Fonte, il suit les abonnés coaching et leur bilan mensuel.", diplomas: ["Master STAPS", "Diplôme universitaire de nutrition"] },
];

export const coachesOf = (slug: string) => coaches.filter((coach) => coach.disciplines.includes(slug));

export const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

type Template = [time: string, discipline: string, coach: string];

const template: Template[][] = [
  [["07:00", "cardio", "Clara Petit"], ["12:15", "cross-training", "Awa Diop"], ["18:00", "halterophilie", "Nadia Benali"], ["19:00", "cross-training", "Awa Diop"], ["20:00", "force", "Thomas Leroux"]],
  [["07:00", "cross-training", "Awa Diop"], ["12:15", "cardio", "Clara Petit"], ["18:00", "gymnastique", "Julien Marchand"], ["19:00", "force", "Thomas Leroux"], ["20:00", "cross-training", "Awa Diop"]],
  [["07:00", "cardio", "Clara Petit"], ["12:15", "halterophilie", "Nadia Benali"], ["18:00", "cross-training", "Awa Diop"], ["19:00", "halterophilie", "Mehdi Rahmani"], ["20:00", "gymnastique", "Julien Marchand"]],
  [["07:00", "cross-training", "Awa Diop"], ["12:15", "gymnastique", "Julien Marchand"], ["18:00", "force", "Thomas Leroux"], ["19:00", "cross-training", "Awa Diop"], ["20:00", "cardio", "Clara Petit"]],
  [["07:00", "cardio", "Clara Petit"], ["12:15", "cross-training", "Awa Diop"], ["18:00", "halterophilie", "Nadia Benali"], ["19:00", "force", "Mehdi Rahmani"]],
  [["09:00", "cross-training", "Awa Diop"], ["10:00", "halterophilie", "Nadia Benali"], ["11:00", "gymnastique", "Julien Marchand"], ["12:00", "cardio", "Clara Petit"]],
  [["10:00", "cross-training", "Awa Diop"], ["11:00", "force", "Thomas Leroux"]],
];

export type Session = { id: string; day: number; time: string; discipline: Discipline; coach: string; booked: number };

// Places already taken vary from session to session but stay the same on every render.
export const sessions: Session[] = template.flatMap((list, day) =>
  list.map(([time, slug, coach], index) => {
    const discipline = findDiscipline(slug)!;
    return { id: `${day}-${time}`, day, time, discipline, coach, booked: (day * 5 + index * 7 + 3) % (discipline.capacity + 1) };
  }),
);

export const clock = (time: string) => time.replace(/^0/, "").replace(":", " h ").replace(" h 00", " h");

// Typical attendance in % of the room, from 6 h to 22 h.
export const crowd = {
  semaine: [20, 45, 55, 30, 20, 25, 70, 85, 40, 25, 30, 45, 80, 100, 90, 60, 30],
  weekend: [5, 10, 25, 55, 75, 70, 50, 35, 30, 25, 25, 30, 25, 20, 15, 10, 5],
};
export const firstHour = 6;

export type Plan = { slug: string; name: string; monthly: number; pitch: string; includes?: string; perks: string[]; highlight?: boolean };

export const plans: Plan[] = [
  {
    slug: "libre",
    name: "Libre",
    monthly: 34,
    pitch: "Pour s'entraîner en autonomie",
    includes: "Inclus :",
    perks: ["Accès de 6 h à 23 h, 7 jours sur 7", "Plateformes, racks et zone cardio", "Séance d'accueil avec un coach", "Vestiaires, douches et casier"],
  },
  {
    slug: "club",
    name: "Club",
    monthly: 54,
    pitch: "Pour progresser en groupe",
    includes: "Tout l'abonnement Libre, plus :",
    perks: ["Cours collectifs illimités", "Les 5 disciplines encadrées", "Réservation 7 jours à l'avance", "2 invitations par mois pour un ami"],
    highlight: true,
  },
  {
    slug: "coaching",
    name: "Coaching",
    monthly: 119,
    pitch: "Pour un suivi sur mesure",
    includes: "Tout l'abonnement Club, plus :",
    perks: ["4 séances individuelles par mois", "Bilan et programme chaque mois", "Réservation 14 jours à l'avance", "Échanges par message avec votre coach"],
  },
];

export const REGISTRATION_FEE = 30; // €, waived on yearly plans

// true: included, false: not included, string: included with this detail. One value per plan, in plan order.
export const comparison: { group: string; rows: { label: string; values: (boolean | string)[] }[] }[] = [
  {
    group: "Accès",
    rows: [
      { label: "Salle de 6 h à 23 h, 7 jours sur 7", values: [true, true, true] },
      { label: "Plateformes, racks et zone cardio", values: [true, true, true] },
      { label: "Vestiaires, douches et casier", values: [true, true, true] },
    ],
  },
  {
    group: "Cours collectifs",
    rows: [
      { label: "Haltérophilie, cross-training, force, cardio, gymnastique", values: [false, "Illimités", "Illimités"] },
      { label: "Réservation à l'avance", values: [false, "7 jours", "14 jours"] },
    ],
  },
  {
    group: "Accompagnement",
    rows: [
      { label: "Séance d'accueil avec un coach", values: [true, true, true] },
      { label: "Séances individuelles", values: [false, false, "4 par mois"] },
      { label: "Bilan et programme personnalisés", values: [false, false, "Chaque mois"] },
      { label: "Échanges par message avec votre coach", values: [false, false, true] },
    ],
  },
  {
    group: "Avantages",
    rows: [
      { label: "Invitations pour un ami", values: ["1 par mois", "2 par mois", "4 par mois"] },
      { label: "Suspension pour blessure ou vacances", values: ["2 mois par an", "2 mois par an", "2 mois par an"] },
    ],
  },
];

export const findPlan = (slug: string | null) => plans.find((plan) => plan.slug === slug);

// Paid yearly, two months are free.
export const yearly = (monthly: number) => monthly * 10;

export const euros = (value: number) => `${value.toLocaleString("fr-FR")} €`;
