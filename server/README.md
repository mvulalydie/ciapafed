# CIAPAFED Backend

## Prérequis
- Node.js 20+ ou version compatible avec ES Modules
- PostgreSQL
- `pnpm`, `npm` ou `yarn`

## Installation
 
1. Se placer dans le dossier `server`
```bash
cd server
```

2. Installer les dépendances
```bash
npm install
```

3. Créer un fichier `.env`

```env
DATABASE_URL=postgres://postgres:motdepasse@localhost:5432/ciapafed
JWT_SECRET=une_cle_secrete_très_longue
PORT=5000
```

4. Démarrer PostgreSQL et créer la base si nécessaire
```sql
CREATE DATABASE ciapafed;
```
 
5. Lancer le serveur
```bash
npm run dev
```

## Endpoints principaux

- `POST /api/auth/login` : connexion admin
- `POST /api/auth/logout` : déconnexion
- `GET /api/auth/me` : utilisateur courant
- `POST /api/contact` : envoyer un message de contact
- `GET /api/partners` : récupérer la liste des partenaires
- `GET /api/admin/contacts` : lister les messages (admin)
- `GET /api/admin/projects` : lister les projets admin
- CRUD projets admin : `POST /api/admin/projects`, `PUT /api/admin/projects/:slug`, `DELETE /api/admin/projects/:slug`, `POST /api/admin/projects/:slug/publish`

## Notes
- Le backend utilise `cookie-parser` et place le JWT dans un cookie HttpOnly `token`.
- Les tables sont créées automatiquement au démarrage via `server/db/init.js`.
