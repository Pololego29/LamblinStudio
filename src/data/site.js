// ───────────────────────────────────────────────────────────────────────────
//  INFOS DU SITE — tout est centralisé ici. Modifie une fois, c'est répercuté
//  partout (header, hero, projets, à propos, contact, footer).
// ───────────────────────────────────────────────────────────────────────────

export const SITE = {
  name: 'Lamblin Studio',
  email: 'contact@lamblinstudio.fr',
  github: 'https://github.com/Pololego29',
  linkedin: 'https://www.linkedin.com/in/paul-lamblin',

  // Fond(s) du hero. (Plusieurs → diaporama en fondu ; un seul → fond fixe.)
  heroBackgrounds: ['/fond-2.webp'],

  // Section "hover reveal" : 2 images du MÊME cadrage (naturelle → futuriste).
  // Dépose tes 2 images dans public/ et mets leurs chemins ici.
  // (Par défaut : démo avec des images existantes, à remplacer.)
  reveal: {
    base: '/fond-3.webp',      // image naturelle, visible par défaut
    futur: '/background.avif', // image révélée autour du curseur
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
//  ⚠️ Remplace les URLs ci-dessous par les vrais liens en ligne de tes 2 sites.
// ───────────────────────────────────────────────────────────────────────────

export const PROJECTS = [
  {
    id: 'ekip-game',
    title: 'Ekip Game',
    tagline: 'Plateforme de jeux en ligne',
    description:
      'Un hub moderne de jeux en ligne pensé comme une plateforme évolutive : plusieurs expériences de jeu, profils joueurs et une interface soignée.',
    tags: ['Web App', 'Gaming', 'React'],
    url: 'https://ekipgame.com/',
    display: 'ekipgame.com',        // texte affiché sur la card
    cover: '/ekip-game-cover.webp', // image de fond du hero (dépose la tienne ici pour la remplacer)
    logo: '/ekip-logo.png',         // logo badge en haut à gauche (dépose-le dans public/)
    cardImage: '/ekip-card.png',    // image de la card "Voir le site" (dépose-la dans public/)
    accent: '#22d3ee',
    glow: 'rgba(6,182,212,0.30)',
    bg: 'radial-gradient(ellipse at 30% 0%, rgba(6,182,212,0.22) 0%, rgba(59,130,246,0.10) 45%, rgba(3,7,18,0) 100%)',
    icon: '🎮',
  },
  {
    id: 'verdict',
    title: 'Verdict',
    tagline: 'Procès immersifs en ligne',
    description:
      'Une application web immersive autour de procès en ligne : créez des parties, incarnez des rôles, débattez et vivez des procès interactifs en temps réel.',
    tags: ['Web App', 'Roleplay', 'Temps réel'],
    url: 'https://dev-ebon-pi.vercel.app/fr',
    accent: '#8b5cf6',
    glow: 'rgba(139,92,246,0.30)',
    bg: 'radial-gradient(ellipse at 70% 0%, rgba(139,92,246,0.22) 0%, rgba(99,102,241,0.10) 45%, rgba(3,7,18,0) 100%)',
    icon: '⚖️',
  },
]
