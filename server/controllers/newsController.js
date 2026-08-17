export const news = [
  {
    slug: 'industrie-agricole-en-mutation',
    title: 'Industrie agricole en mutation',
    category: 'Agriculture',
    date: 'Juillet 2026',
    excerpt: 'Retour sur un atelier de sensibilisation aux pratiques agroforestières avec les communautés locales. À compléter.',
    content: 'Contenu éditorial à compléter. Cette actualité présente les enjeux de l’agriculture durable, les actions menées et les perspectives de CIAPAFED pour accompagner les familles rurales.',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true
  },
  {
    slug: 'atelier-sur-la-conservation',
    title: 'Atelier sur la conservation',
    category: 'Environnement',
    date: 'Juin 2026',
    excerpt: 'Session d’échanges sur la protection des forêts et le climat. À compléter.',
    content: 'Contenu éditorial à compléter. Cet article présente un atelier organisé par CIAPAFED sur la conservation des forêts et l’adaptation climatique.',
    image: 'https://images.unsplash.com/photo-1504198266280-5ca943991a3d?auto=format&fit=crop&w=1400&q=80',
    gallery: [],
    featured: true
  },
  {
    slug: 'formation-communautaire',
    title: 'Formation communautaire',
    category: 'Formation',
    date: 'Mai 2026',
    excerpt: 'Programme de formation pour les acteurs locaux. À compléter.',
    content: 'Contenu éditorial à compléter. Il s’agit d’une initiative de formation axée sur les compétences locales pour soutenir des projets durables en RDC.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1400&q=80',
    gallery: ['https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80'],
    featured: false
  },
  {
    slug: 'projet-de-cartographie-participative',
    title: 'Projet de cartographie participative',
    category: 'Cartographie',
    date: 'Avril 2026',
    excerpt: 'Cartographie des territoires pour mieux protéger les espaces naturels. À compléter.',
    content: 'Contenu éditorial à compléter. Ce projet documente la cartographie participative dans les communautés rurales, au service de la gestion durable des forêts.',
    image: 'https://images.unsplash.com/photo-1451186859696-371d9477be93?auto=format&fit=crop&w=1400&q=80',
    gallery: [],
    featured: false
  },
  {
    slug: 'suivi-des-activites-forestières',
    title: 'Suivi des activités forestières',
    category: 'Forêts',
    date: 'Mars 2026',
    excerpt: 'Analyse des efforts de protection des forêts par CIAPAFED. À compléter.',
    content: 'Contenu éditorial à compléter. Article consacré au suivi des interventions forestières et à la relation avec les communautés locales.',
    image: 'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?auto=format&fit=crop&w=1400&q=80',
    gallery: ['https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80'],
    featured: false
  }
];

export function getNews(req, res) {
  res.json(news);
}

export function getNewsBySlug(req, res) {
  const { slug } = req.params;
  const article = news.find((item) => item.slug === slug);

  if (!article) {
    return res.status(404).json({ message: 'Article introuvable' });
  }

  res.json(article);
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
}

export function createNews(req, res) {
  const { title, category, date, excerpt, content, image, featured } = req.body || {};

  if (!title || !category || !excerpt) {
    return res.status(400).json({ message: 'Titre, catégorie et résumé requis.' });
  }

  const slug = slugify(title);
  if (news.some((item) => item.slug === slug)) {
    return res.status(400).json({ message: 'Une actualité avec ce titre existe déjà.' });
  }

  const article = {
    slug,
    title,
    category,
    date: date || new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
    excerpt,
    content: content || excerpt,
    image: image || 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=80',
    gallery: [],
    featured: Boolean(featured)
  };

  news.unshift(article);
  res.status(201).json(article);
}

export function updateNews(req, res) {
  const { slug } = req.params;
  const index = news.findIndex((item) => item.slug === slug);

  if (index === -1) return res.status(404).json({ message: 'Article introuvable' });

  news[index] = {
    ...news[index],
    ...req.body,
    slug
  };

  res.json(news[index]);
}

export function deleteNews(req, res) {
  const { slug } = req.params;
  const index = news.findIndex((item) => item.slug === slug);

  if (index === -1) return res.status(404).json({ message: 'Article introuvable' });

  const [removed] = news.splice(index, 1);
  res.json(removed);
}
