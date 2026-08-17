# CIAPAFED Frontend

## Prérequis
- Node.js 20+ ou version compatible
- `npm` ou `yarn`

## Installation

1. Se placer dans le dossier `client`
```bash
cd client
```

2. Installer les dépendances
```bash
npm install
```

3. Lancer le serveur de développement
```bash
npm run dev
```

4. Ouvrir le site
- `http://localhost:4173`

## Scripts utiles

- `npm run dev` : démarre Vite en mode développement
- `npm run build` : construit le site pour la production
- `npm run preview` : prévisualise la build de production
- `npm run typecheck` : lance TypeScript sans émettre de fichiers

## Remarques

- Le frontend attend le backend sur `http://localhost:5000` via les appels API.
- L’authentification admin est gérée avec un cookie HttpOnly `token`.
- Si le front ne se connecte pas au backend, vérifiez que le backend est démarré et que `server/README.md` est appliqué.
