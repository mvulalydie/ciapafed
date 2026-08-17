export const partners = [
  { slug: 'banque-mondiale', name: 'Banque mondiale', logo: null, description: '', projects: ['Projet de restauration forestière'] },
  { slug: 'wwf', name: 'WWF', logo: null, description: '', projects: ['Soutien communautaire'] },
  { slug: 'fao', name: 'FAO', logo: null, description: '', projects: ['Appui technique en agriculture'] },
  { slug: 'fa-fem', name: 'FA-FEM', logo: null, description: '', projects: ['Financement de projets locaux'] },
  { slug: 'jica', name: 'JICA', logo: null, description: '', projects: ['Coopération technique'] },
  { slug: 'uc-pif', name: 'UC-PIF', logo: null, description: '', projects: ['Initiatives régionales'] }
];

export function getPartners(req, res) {
  res.json(partners);
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

export function createPartner(req, res) {
  const { name, logo, description, projects } = req.body || {};

  if (!name) return res.status(400).json({ message: 'Nom du partenaire requis.' });

  const slug = slugify(name);
  if (partners.some((item) => item.slug === slug)) {
    return res.status(400).json({ message: 'Un partenaire avec ce nom existe déjà.' });
  }

  const partner = {
    slug,
    name,
    logo: logo || null,
    description: description || '',
    projects: Array.isArray(projects) ? projects : String(projects || '').split(',').map((item) => item.trim()).filter(Boolean)
  };

  partners.unshift(partner);
  res.status(201).json(partner);
}

export function updatePartner(req, res) {
  const { slug } = req.params;
  const index = partners.findIndex((item) => item.slug === slug);

  if (index === -1) return res.status(404).json({ message: 'Partenaire introuvable' });

  partners[index] = {
    ...partners[index],
    ...req.body,
    slug,
    projects: Array.isArray(req.body?.projects)
      ? req.body.projects
      : String(req.body?.projects || partners[index].projects.join(',')).split(',').map((item) => item.trim()).filter(Boolean)
  };

  res.json(partners[index]);
}

export function deletePartner(req, res) {
  const { slug } = req.params;
  const index = partners.findIndex((item) => item.slug === slug);

  if (index === -1) return res.status(404).json({ message: 'Partenaire introuvable' });

  const [removed] = partners.splice(index, 1);
  res.json(removed);
}
