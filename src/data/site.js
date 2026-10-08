// ───────────────────────────────────────────────────────────────────────────
//  CONTENU DU SITE — tout le texte est centralisé ici.
//  Les informations manquantes sont signalées par « À COMPLÉTER » :
//  elles ne sont pas affichées (ou affichées comme « à venir ») tant
//  qu'elles restent vides.
// ───────────────────────────────────────────────────────────────────────────

export const SITE = {
  name: 'Lamblin Studio',
  // À CONFIRMER : domaine déduit de l'adresse email, non attesté ailleurs.
  // (Repris dans index.html, public/robots.txt et public/sitemap.xml.)
  url: 'https://lamblinstudio.fr',
  email: 'contact@lamblinstudio.fr',
  github: 'https://github.com/Pololego29',
  linkedin: 'https://www.linkedin.com/in/paul-lamblin',
  owner: 'Paul Lamblin',
  portfolio: 'https://paul-lamblin.com',

  // ── Formulaire de contact (Web3Forms) ────────────────────────────────────
  // À COMPLÉTER : créer une clé d'accès sur https://web3forms.com (adresse de
  // réception : contact@lamblinstudio.fr) et la coller ci-dessous.
  // Tant que la clé n'est pas renseignée, le formulaire propose l'envoi
  // par email (mailto:) au visiteur.
  formAccessKey: 'VOTRE_ACCESS_KEY_WEB3FORMS',
}

export const HERO = {
  title: 'Lamblin Studio',
  subtitle: 'Développement de jeux vidéo',
  intro: [
    'Lamblin Studio est mon studio indépendant de création de jeux vidéo, à travers lequel je conçois et développe mes propres expériences multijoueurs.',
    "Je travaille sur l'ensemble du cycle de développement : game design, programmation, architecture réseau, interfaces, modélisation 3D, infrastructure serveur et déploiement.",
  ],
  // Étapes reprises du texte ci-dessus (bandeau sous le hero).
  disciplines: [
    'Game design',
    'Programmation',
    'Architecture réseau',
    'Interfaces',
    'Modélisation 3D',
    'Infrastructure serveur',
    'Déploiement',
  ],
}

// ───────────────────────────────────────────────────────────────────────────
//  JEUX
// ───────────────────────────────────────────────────────────────────────────

export const SEVEN_FRONTS = {
  id: 'seven-fronts',
  title: 'Seven Fronts',
  genre: 'Jeu de stratégie multijoueur',
  status: 'En développement',
  // À COMPLÉTER : date de sortie et plateforme(s) — non communiquées.
  releaseDate: null,
  platforms: [],
  description: [
    "Seven Fronts est un jeu de stratégie militaire en temps réel, dans lequel plusieurs dizaines de joueurs s'affrontent pour prendre le contrôle de l'Europe au cours de parties pouvant durer jusqu'à sept jours.",
    'Chaque joueur dirige un pays, développe son économie, organise ses armées, négocie des alliances et mène des opérations militaires sur une carte divisée en centaines de régions terrestres et maritimes.',
  ],
  featuresTitle: 'Le projet comprend notamment :',
  features: [
    'Une carte stratégique interactive avec des centaines de territoires.',
    'Des déplacements et combats synchronisés en temps réel.',
    'Un système économique et de gestion des ressources.',
    'Des alliances, du brouillard de guerre et des stratégies diplomatiques.',
    'Une infrastructure serveur persistante permettant aux parties de continuer même lorsque les joueurs sont déconnectés.',
  ],
  technologies: ['C#', '.NET', 'SignalR', 'WebSockets', 'SQLite', 'Linux', 'Nginx', 'Hetzner Cloud', 'Blender'],
  mapCaption:
    "Illustration originale et stylisée de l'Europe découpée en régions — elle ne reproduit pas la carte du jeu.",
}

export const POLICE_VOLEURS = {
  id: 'police-voleurs',
  title: 'Police vs Voleurs',
  genre: 'Jeu multijoueur',
  status: 'En développement',
  description: [
    "Police vs Voleurs est un second projet de jeu multijoueur développé sous Lamblin Studio, reposant sur l'affrontement entre deux équipes aux objectifs opposés.",
    "Le concept s'articule autour des poursuites, de la coopération, de la stratégie et de l'action, avec une expérience conçue pour favoriser les interactions entre joueurs.",
    "Ce projet me permet d'explorer d'autres aspects du développement de jeux, notamment les mécaniques de gameplay, les interactions multijoueurs et la création d'environnements immersifs.",
  ],
  // À COMPLÉTER : mécaniques précises, plateforme(s) et technologies.
  // Tant que ces listes sont vides, le site affiche « à venir ».
  mechanics: [],
  platforms: [],
  technologies: [],
}

// ───────────────────────────────────────────────────────────────────────────
//  STUDIO
// ───────────────────────────────────────────────────────────────────────────

export const OBJECTIVE = {
  title: 'Mon objectif avec Lamblin Studio',
  // Le texte est découpé pour mettre en valeur les trois axes (rendu à l'identique).
  parts: [
    { text: 'Concevoir des jeux multijoueurs ambitieux, en développant aussi bien leur dimension créative que leur architecture technique, avec une attention particulière portée aux ' },
    { text: 'performances', em: true },
    { text: ', à la ' },
    { text: 'synchronisation réseau', em: true },
    { text: " et à l'" },
    { text: 'expérience utilisateur', em: true },
    { text: '.' },
  ],
}

export const CONTACT = {
  title: 'Contact',
  intro:
    'Pour un partenariat, une question sur les projets du studio ou toute demande professionnelle, écrivez-moi directement ou utilisez le formulaire.',
  subjects: ['Partenariat', 'Question sur un projet', 'Presse', 'Autre'],
}
