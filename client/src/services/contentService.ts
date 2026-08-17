export type Domaine = {
  title: string;
  description: string;
};

export type Projet = {
  title: string;
  summary: string;
  slug: string;
};

export type Actualite = {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
};

export type Ressource = {
  title: string;
  fileType: string;
  summary: string;
};

export const domaines: Domaine[] = [
  { title: 'Agroforesterie', description: 'Soutien à des systèmes agricoles durables intégrant arbres et cultures.' },
  { title: 'Conservation, REDD+ et climat', description: 'Actions pour la protection des forêts et l’adaptation au changement climatique.' },
  { title: 'Aménagement durable du territoire', description: 'Planification locale respectueuse des ressources naturelles.' },
  { title: 'Éducation et formation', description: 'Renforcement des capacités des communautés rurales.' }
];

export const projets: Projet[] = [
  { title: 'Jardins agroforestiers communautaires', summary: 'Accompagnement des familles rurales pour renforcer la sécurité alimentaire.', slug: 'jardins-agroforestiers' },
  { title: 'Protection des forêts de Maï-Ndombe', summary: 'Actions de conservation et REDD+ pour des paysages plus résilients.', slug: 'protection-forets-mai-ndombe' }
];

export const actualites: Actualite[] = [
  { title: 'Session de formation pour des jeunes agriculteurs', date: 'Mai 2026', excerpt: 'Appui à des formations pratiques pour des techniques agricoles durables.', slug: 'formation-jeunes-agriculteurs' },
  { title: 'Rencontre de suivi avec des partenaires locaux', date: 'Avril 2026', excerpt: 'Échange sur le déploiement des initiatives en Kwilu et Maï-Ndombe.', slug: 'rencontre-suivi-partenaires' }
];

export const ressources: Ressource[] = [
  { title: 'Document de présentation', fileType: 'PDF', summary: 'Information à compléter' },
  { title: 'Guide d’intervention', fileType: 'PDF', summary: 'Information à compléter' }
];
