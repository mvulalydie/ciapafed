export const documents = [
  {
    slug: 'statuts',
    title: 'Statuts',
    category: 'Documents institutionnels',
    date: '2014',
    size: '120 KB',
    fileType: 'PDF',
    summary: 'Statuts de CIAPAFED décrivant l’organisation et son fonctionnement.',
    url: '/documents/statuts.pdf'
  },
  {
    slug: 'roi',
    title: 'ROI',
    category: 'Documents juridiques',
    date: '2019',
    size: '95 KB',
    fileType: 'PDF',
    summary: 'Règlement d’Ordre Intérieur de CIAPAFED.',
    url: '/documents/roi.pdf'
  },
  {
    slug: 'f92',
    title: 'F92',
    category: 'Documents juridiques',
    date: '2020',
    size: '130 KB',
    fileType: 'PDF',
    summary: 'Formulaire administratif F92 relatif à l’enregistrement de l’organisation.',
    url: '/documents/f92.pdf'
  },
  {
    slug: 'acte-notarie',
    title: 'Acte notarié',
    category: 'Documents juridiques',
    date: '2015',
    size: '230 KB',
    fileType: 'PDF',
    summary: 'Acte notarié attestant la création et la reconnaissance de CIAPAFED.',
    url: '/documents/acte-notarie.pdf'
  },
  {
    slug: 'arrete-ministeriel',
    title: 'Arrêté ministériel',
    category: 'Documents juridiques',
    date: '2021',
    size: '110 KB',
    fileType: 'PDF',
    summary: 'Arrêté ministériel reconnaissant les activités de CIAPAFED.',
    url: '/documents/arrete-ministeriel.pdf'
  },
  {
    slug: 'certificats-enregistrement',
    title: 'Certificats d’enregistrement',
    category: 'Documents institutionnels',
    date: '2024',
    size: '145 KB',
    fileType: 'PDF',
    summary: 'Certificats officiels d’enregistrement de l’organisation.',
    url: '/documents/certificats-enregistrement.pdf'
  },
  {
    slug: 'notifications',
    title: 'Notifications',
    category: 'Documents institutionnels',
    date: '2022',
    size: '102 KB',
    fileType: 'PDF',
    summary: 'Notifications formelles adressées aux autorités et partenaires.',
    url: '/documents/notifications.pdf'
  },
  {
    slug: 'certificat-ministere-plan',
    title: 'Certificat du Ministère du Plan',
    category: 'Attestations',
    date: '2023',
    size: '85 KB',
    fileType: 'PDF',
    summary: 'Certificat délivré par le Ministère du Plan pour les activités institutionnelles.',
    url: '/documents/certificat-ministere-plan.pdf'
  },
  {
    slug: 'avis-favorable-ministere-environnement',
    title: 'Avis favorable du Ministère de l’Environnement',
    category: 'Attestations',
    date: '2023',
    size: '98 KB',
    fileType: 'PDF',
    summary: 'Avis favorable autorisant les actions de CIAPAFED dans l’environnement.',
    url: '/documents/avis-favorable-ministere-environnement.pdf'
  },
  {
    slug: 'arrete-provincial',
    title: 'Arrêté provincial',
    category: 'Documents juridiques',
    date: '2022',
    size: '108 KB',
    fileType: 'PDF',
    summary: 'Arrêté provincial relatif à la reconnaissance des activités locales.',
    url: '/documents/arrete-provincial.pdf'
  },
  {
    slug: 'numero-impot',
    title: 'Numéro d’impôt',
    category: 'Documents institutionnels',
    date: '2018',
    size: '90 KB',
    fileType: 'PDF',
    summary: 'Document officiel de numéro d’identification fiscale pour CIAPAFED.',
    url: '/documents/numero-impot.pdf'
  },
  {
    slug: 'quitus-fiscal',
    title: 'Quitus fiscal',
    category: 'Documents institutionnels',
    date: '2024',
    size: '112 KB',
    fileType: 'PDF',
    summary: 'Quitus fiscal attestant la conformité des obligations fiscales.',
    url: '/documents/quitus-fiscal.pdf'
  },
  {
    slug: 'attestations-bonne-fin-services',
    title: 'Attestations de bonne fin de services',
    category: 'Attestations',
    date: '2024',
    size: '162 KB',
    fileType: 'PDF',
    summary: 'Attestations confirmant la bonne exécution des services par CIAPAFED.',
    url: '/documents/attestations-bonne-fin-services.pdf'
  }
];

export function getDocuments(req, res) {
  res.json(documents);
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

export function createDocument(req, res) {
  const { title, category, date, size, fileType, summary, url } = req.body || {};

  if (!title || !category || !summary || !url) {
    return res.status(400).json({ message: 'Titre, catégorie, résumé et URL requis.' });
  }

  const slug = slugify(title);
  if (documents.some((item) => item.slug === slug)) {
    return res.status(400).json({ message: 'Un document avec ce titre existe déjà.' });
  }

  const document = {
    slug,
    title,
    category,
    date: date || String(new Date().getFullYear()),
    size: size || '',
    fileType: fileType || 'PDF',
    summary,
    url
  };

  documents.unshift(document);
  res.status(201).json(document);
}

export function updateDocument(req, res) {
  const { slug } = req.params;
  const index = documents.findIndex((item) => item.slug === slug);

  if (index === -1) return res.status(404).json({ message: 'Document introuvable' });

  documents[index] = {
    ...documents[index],
    ...req.body,
    slug
  };

  res.json(documents[index]);
}

export function deleteDocument(req, res) {
  const { slug } = req.params;
  const index = documents.findIndex((item) => item.slug === slug);

  if (index === -1) return res.status(404).json({ message: 'Document introuvable' });

  const [removed] = documents.splice(index, 1);
  res.json(removed);
}
