// ───────────────────────────────────────────────────────────────────────────
//  INFOS DU SITE — tout est centralisé ici. Modifie une fois, c'est répercuté
//  partout (header, hero, projets, apps iOS, à propos, contact, footer).
// ───────────────────────────────────────────────────────────────────────────

export const SITE = {
  name: 'Lamblin Studio',
  email: 'contact@lamblinstudio.fr',
  github: 'https://github.com/Pololego29',
  linkedin: 'https://www.linkedin.com/in/paul-lamblin',

  // Fond(s) du hero. (Plusieurs → diaporama en fondu ; un seul → fond fixe.)
  heroBackgrounds: ['/fond-2.webp'],

  // Section "hover reveal" : 2 images du MÊME cadrage (naturelle → futuriste).
  reveal: {
    base: '/reveal-classique.webp', // version classique, visible par défaut (dessus)
    futur: '/reveal-modif.webp',    // version modifiée, révélée autour du curseur (dessous)
  },

  // Phrases qui se morphent (effet flou) dans le titre du hero.
  heroPhrases: [
    { lead: 'Lamblin', accent: 'Studio' },
    { lead: 'Studio', accent: 'indépendant' },
  ],

  // Ta photo : dépose le fichier dans  public/photo.jpg  (ou change le chemin).
  // Si le fichier est absent, un visuel de secours s'affiche automatiquement.
  photo: '/photo.jpg',

  // ── Formulaire de contact (Web3Forms — gratuit, sans compte) ──────────────
  // Pour l'activer :
  //   1. Va sur  https://web3forms.com
  //   2. Entre l'email où tu veux recevoir les messages (ex. contact@lamblinstudio.fr)
  //   3. Copie l'« Access Key » reçue et colle-la ci-dessous (entre les guillemets)
  // Tant que la clé n'est pas mise, le formulaire affiche un message d'erreur.
  formAccessKey: 'VOTRE_ACCESS_KEY_WEB3FORMS',
}

// ───────────────────────────────────────────────────────────────────────────
//  PROJETS
//  status: 'live' → pastille verte « En ligne » + bouton vers le site
//          'wip'  → pastille ambre « En développement », pas de lien (url absente)
//  cover  : si l'image est renseignée, le projet s'affiche en bandeau pleine
//           largeur ; sinon en ligne classique (aperçu navigateur + texte).
// ───────────────────────────────────────────────────────────────────────────

export const PROJECTS = [
  {
    id: 'ekip-game',
    title: 'Ekip Game',
    tagline: 'Plateforme de jeux en ligne',
    description:
      'Un hub moderne de jeux en ligne pensé comme une plateforme évolutive : plusieurs expériences de jeu, profils joueurs et une interface soignée.',
    tags: ['Web App', 'Gaming', 'React'],
    status: 'live',
    url: 'https://ekipgame.com/',
    display: 'ekipgame.com',        // texte affiché sur la card
    cover: '/ekip-game-cover.webp', // image de fond du hero (dépose la tienne ici pour la remplacer)
    logo: '/ekip-logo.png',         // logo badge en haut à gauche (dépose-le dans public/)
    cardImage: '/ekip-card.webp',   // icône dans la card "Voir le site"
    accent: '#22d3ee',
    glow: 'rgba(6,182,212,0.30)',
    bg: 'radial-gradient(ellipse at 30% 0%, rgba(6,182,212,0.22) 0%, rgba(59,130,246,0.10) 45%, rgba(3,7,18,0) 100%)',
    icon: '🎮',
  },
  {
    id: 'classor',
    title: 'Classor',
    tagline: 'Création de sites web sur-mesure',
    description:
      "Ma marque de création web : sites vitrines, e-commerce et applications sur-mesure, du design à la mise en ligne — avec le SEO et les performances soignés dès le départ.",
    tags: ['Site vitrine', 'E-commerce', 'React', 'SEO'],
    status: 'live',
    url: 'https://classor.fr',
    display: 'classor.fr',
    cover: '/classor-cover.webp',
    cardImage: '/classor-logo.webp',
    accent: '#c084fc',
    glow: 'rgba(192,132,252,0.30)',
    bg: 'radial-gradient(ellipse at 70% 0%, rgba(192,132,252,0.22) 0%, rgba(99,102,241,0.10) 45%, rgba(3,7,18,0) 100%)',
    icon: '🪐',
  },
  {
    id: 'horizon-2050',
    title: 'Horizon 2050',
    tagline: 'Prospective des métiers',
    description:
      "À quoi ressemblera votre métier en 2050 ? À partir d'un métier et d'un âge, une simulation Monte-Carlo projette l'évolution des tâches et de la demande de travail face à l'IA, aux agents autonomes et à l'automatisation.",
    tags: ['Simulation', 'Next.js', 'FastAPI', 'Data'],
    status: 'wip',
    // Pas d'url tant que le site n'est pas en ligne : la card reste non cliquable.
    display: 'bientôt en ligne',
    accent: '#fbbf24',
    glow: 'rgba(251,191,36,0.28)',
    bg: 'radial-gradient(ellipse at 30% 0%, rgba(251,191,36,0.18) 0%, rgba(99,102,241,0.10) 45%, rgba(3,7,18,0) 100%)',
    icon: '🛰️',
  },
]

// ───────────────────────────────────────────────────────────────────────────
//  APPS iOS À VENIR — bloc d'annonce affiché entre les projets et « À propos ».
//  Tout le texte de la section se modifie ici.
// ───────────────────────────────────────────────────────────────────────────

export const IOS_APPS = {
  tag: 'Prochainement',
  title: 'Des applications',
  titleAccent: 'iOS arrivent.',
  intro:
    "Après le web, Lamblin Studio passe au mobile : de premières applications iOS sont en cours de développement et arriveront sur l'App Store.",
  badge: "Bientôt sur l'App Store",
  features: [
    {
      title: 'Expérience native',
      desc: "Pensées pour iOS : gestes fluides, animations soignées, thème clair et sombre.",
    },
    {
      title: 'Confidentialité par défaut',
      desc: 'Les données sensibles restent chiffrées sur votre appareil, sans compte obligatoire.',
    },
    {
      title: 'Première app : santé & nutrition',
      desc: 'Un suivi nutritionnel complet, en cours de finalisation avant les tests.',
    },
  ],
  note: 'Envie d’être prévenu de la sortie ? Écris-moi, je te tiens au courant.',
}
