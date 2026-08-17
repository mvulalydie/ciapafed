const projects = [
  {
    slug: 'programme-foret-restauration',
    title: 'Programme d’Investissement pour la Forêt et la Restauration des Savanes',
    location: 'Masimanimba',
    period: '2023 - 2026',
    funder: 'UC-PIF / Banque mondiale',
    status: 'En cours',
    categories: ['Forêts', 'Climat', 'Communautés'],
    summary: 'Programme de restauration et de protection des savanes et forêts, en partenariat avec les communautés locales.',
    description: 'Le programme vise la restauration des savanes et des forêts, la valorisation des ressources locales et la protection des territoires communautaires en s’appuyant sur les savoirs des acteurs locaux.',
    goals: [
      'Renforcer le dialogue avec les communautés pour un Consentement Libre, Informé et Préalable',
      'Reconstituer des espaces forestiers et agroforestiers durables',
      'Valoriser les savanes et sécuriser les zones de mise en défens'
    ],
    activities: [
      'Consentement Libre, Informé et Préalable',
      'Pépinières',
      'Valorisation des savanes',
      'Mise en défens',
      'Suivi participatif des plantations'
    ],
    keyResults: [
      'Plus de 50 hectares de savanes protégées',
      'Création de pépinières communautaires',
      'Mise en place de comités de gestion locale'
    ],
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'piredd-plateaux-2',
    title: 'PIREDD Plateaux 2',
    location: 'Bolobo & Yumbi',
    period: '2022 - 2025',
    funder: 'UC-PIF / Banque mondiale',
    status: 'En cours',
    categories: ['Forêts', 'Communautés', 'Climat'],
    summary: 'Programme de plantation et de protection forestière, appui à la valorisation durable du bois et structuration des pêcheurs.',
    description: 'PRISEDD Plateaux 2 combine protection des forêts, plantations d’acacia et développement de filières durables pour offrir des alternatives économiques aux communautés locales.',
    goals: [
      'Restaurer des paysages forestiers et agroforestiers',
      'Améliorer les filières locales de bois-énergie',
      'Renforcer les capacités des pêcheurs et des communautés rurales'
    ],
    activities: [
      'Plantations d’acacia',
      'Protection des forêts',
      'Parcs à bois de manioc',
      'Production durable de charbon de bois',
      'Structuration des pêcheurs'
    ],
    keyResults: [
      'Parcs à bois de manioc structurés',
      'Meilleure gouvernance des forêts locales',
      'Appui aux coopératives de pêche durable'
    ],
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1467620429111-d3b9a39e0a34?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518186284536-31a4d6b8d0b2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'microprojets-autochtone',
    title: 'Microprojets en faveur des peuples autochtones',
    location: 'Kiri & Oshwe',
    period: '2024 - 2026',
    funder: 'CIAPAFED / Partenaires locaux',
    status: 'En cours',
    categories: ['Communautés', 'Agroforesterie'],
    summary: 'Appui aux peuples autochtones pour le développement de microprojets durables respectueux des savoirs locaux.',
    description: 'Ce projet accompagne les peuples autochtones dans la mise en œuvre de microprojets agricoles et forestiers, en préservant leurs usages traditionnels et en renforçant la sécurité alimentaire.',
    goals: [
      'Soutenir les dynamiques économiques autochtones',
      'Préserver les savoirs locaux et la biodiversité',
      'Renforcer l’autonomie des familles rurales'
    ],
    activities: [
      'Appui à l’agriculture traditionnelle',
      'Gestes agroforestiers',
      'Sensibilisation à la gestion des ressources',
      'Accompagnement collectif'
    ],
    keyResults: [
      'Accès renforcé aux ressources alimentaires',
      'Projets économiques locaux lancés',
      'Communautés mobilisées pour la gestion durable'
    ],
    image: 'https://images.unsplash.com/photo-1465311440653-6e8c8a3f0b23?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1552083375-144e7c15f38d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'jardins-agroforestiers',
    title: 'Jardins agroforestiers communautaires',
    location: 'Maï-Ndombe',
    period: '2021 - 2023',
    funder: 'Partenaires locaux',
    status: 'Terminés',
    categories: ['Agroforesterie', 'Communautés'],
    summary: 'Installation et accompagnement de jardins agroforestiers pour consolider la sécurité alimentaire des familles rurales.',
    description: 'Ce projet a permis de développer des jardins agroforestiers intégrés, de partager des techniques de production durable et de renforcer les capacités des familles rurales.',
    goals: [
      'Améliorer la sécurité alimentaire locale',
      'Renforcer les pratiques agroforestières',
      'Soutenir l’autonomie des ménages'
    ],
    activities: [
      'Création de jardins agroforestiers',
      'Formation des familles',
      'Suivi technique',
      'Consolidation des systèmes de production'
    ],
    keyResults: [
      '120 familles accompagnées',
      'Taux de production supérieur de 30%',
      'Adoption de pratiques durables en agriculture'
    ],
    image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503393613893-8db2f63d7b6f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517242024364-5f4de11ecb09?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'protection-forets-mai-ndombe',
    title: 'Protection des forêts de Maï-Ndombe',
    location: 'Maï-Ndombe',
    period: '2020 - 2022',
    funder: 'WWF / Partenaires',
    status: 'Terminés',
    categories: ['Forêts', 'Climat'],
    summary: 'Programme de conservation forestière et de renforcement des capacités locales pour mieux protéger la biodiversité.',
    description: 'Le projet a soutenu des actions de protection des forêts de Maï-Ndombe, en mobilisant les communautés autour de la gestion durable et de la surveillance des zones sensibles.',
    goals: [
      'Renforcer la protection des forêts',
      'Mobiliser les communautés dans la conservation',
      'Améliorer la gouvernance locale des ressources naturelles'
    ],
    activities: [
      'Patrouilles de protection',
      'Cartographie participative',
      'Sensibilisation des communautés',
      'Suivi écologique'
    ],
    keyResults: [
      'Forêts mieux protégées face au déboisement',
      'Réduction des pressions sur les zones sensibles',
      'Acteurs locaux formés à la conservation'
    ],
    image: 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1439123671755-2f0b63bcc926?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80'
    ]
  }
];

export function getProjects(req, res) {
  res.json(projects);
}

export function getProjectBySlug(req, res) {
  const { slug } = req.params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return res.status(404).json({ message: 'Projet introuvable' });
  }

  res.json(project);
}
