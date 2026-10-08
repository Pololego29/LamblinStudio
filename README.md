# Lamblin Studio

Site vitrine de **Lamblin Studio**, studio indépendant de développement de jeux vidéo
(Seven Fronts, Police vs Voleurs).

Stack : [Vite](https://vite.dev) · React 18 · Tailwind CSS 3 · three.js / @react-three/fiber
(pièce 3D de la loutre dans le hero).

## Démarrer

Prérequis : Node.js 18 ou plus récent.

```bash
npm install      # installe les dépendances
npm run dev      # serveur de développement (http://localhost:5173)
npm run build    # build de production dans dist/
npm run preview  # sert le build de production localement
```

## Contenu

Tous les textes, liens et projets sont centralisés dans `src/data/site.js`.
Les éléments encore manquants y sont signalés par des commentaires `À COMPLÉTER`.

### Formulaire de contact

Le formulaire utilise [Web3Forms](https://web3forms.com). Renseignez la clé d'accès
dans `formAccessKey` (`src/data/site.js`). Tant qu'elle n'est pas configurée,
le formulaire invite les visiteurs à écrire directement par email.

## Arborescence

```
public/          fichiers statiques (logos optimisés, favicon, og-image, robots.txt, sitemap.xml)
src/components/  sections du site
src/data/        contenu centralisé (site.js)
src/assets/      illustrations importées par les composants
```

`node_modules/` et `dist/` ne sont pas versionnés.
