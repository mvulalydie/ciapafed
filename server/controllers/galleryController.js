export const gallery = [
  {
    slug: 'agriculture-terrain',
    title: 'Agriculture durable sur le terrain',
    category: 'Agriculture',
    description: 'Visuel de démonstration : illustration d’une pratique agricole durable.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    placeholder: true
  },
  {
    slug: 'agroforesterie-plantations',
    title: 'Plantations agroforestières',
    category: 'Agroforesterie',
    description: 'Visuel de démonstration pour des plantations agroforestières.',
    image: 'https://images.unsplash.com/photo-1483710230905-1588afcca4d8?auto=format&fit=crop&w=1200&q=80',
    placeholder: true
  },
  {
    slug: 'foret-protection',
    title: 'Protection des forêts',
    category: 'Forêts',
    description: 'Visuel de démonstration sur des initiatives de protection forestière.',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
    placeholder: true
  },
  {
    slug: 'communaute-participation',
    title: 'Participation communautaire',
    category: 'Communautés',
    description: 'Visuel de démonstration pour des actions communautaires.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    placeholder: true
  },
  {
    slug: 'formation-terrain',
    title: 'Formation terrain',
    category: 'Formation',
    description: 'Visuel de démonstration pour une session de formation.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    placeholder: true
  },
  {
    slug: 'projets-interventions',
    title: 'Interventions de projets',
    category: 'Projets',
    description: 'Visuel de démonstration pour une initiative de projet sur le terrain.',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
    placeholder: true
  }
];

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
}

export function getGallery(req, res) {
  res.json(gallery);
}

export function addGalleryItem(req, res) {
  const { title, category, description, image } = req.body;

  if (!title || !category || !description) {
    return res.status(400).json({ message: 'Title, category and description are required.' });
  }

  const slug = slugify(title);
  const existing = gallery.find((item) => item.slug === slug);

  if (existing) {
    return res.status(400).json({ message: 'Une image avec ce titre existe déjà.' });
  }

  const newItem = {
    slug,
    title,
    category,
    description,
    image: image || 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
    placeholder: true
  };

  gallery.unshift(newItem);
  res.status(201).json(newItem);
}

export function deleteGalleryItem(req, res) {
  const { slug } = req.params;
  const index = gallery.findIndex((item) => item.slug === slug);

  if (index === -1) {
    return res.status(404).json({ message: 'Image introuvable' });
  }

  const [removed] = gallery.splice(index, 1);
  res.json(removed);
}
