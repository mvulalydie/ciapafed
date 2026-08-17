export function getHomeData(req, res) {
  res.json({
    organisation: {
      name: 'CIAPAFED',
      fullName: 'Centre d’Initiative et d’Appui Participatif à l’Agriculture Familiale et l’Environnement Durable',
      established: 2014,
      email: 'ongdciapafed@gmail.com',
      phones: ['+243 813 393 919', '+243 896 577 258']
    },
    domaines: [
      { title: 'Agroforesterie', description: 'Soutien à des systèmes agricoles durables intégrant arbres et cultures.' },
      { title: 'Conservation, REDD+ et climat', description: 'Actions pour la protection des forêts et l’adaptation climatique.' },
      { title: 'Aménagement durable du territoire', description: 'Planification locale respectueuse des ressources naturelles.' },
      { title: 'Éducation et formation', description: 'Renforcement des capacités des communautés rurales.' }
    ]
  });
}
