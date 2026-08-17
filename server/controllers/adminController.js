import { news } from './newsController.js';
import { documents } from './documentController.js';
import { gallery } from './galleryController.js';
import { partners } from './partnersController.js';
import pool from '../db/pool.js';

export async function getDashboardStats(req, res) {
  const defaults = {
    projets: 0,
    actualites: news.length,
    documents: documents.length,
    photos: gallery.length,
    partenaires: partners.length,
    messages: 0
  };

  try {
    const [projectsResult, contactsResult] = await Promise.all([
      pool.query('SELECT COUNT(*)::int AS count FROM projects'),
      pool.query('SELECT COUNT(*)::int AS count FROM contacts')
    ]);

    res.json({
      ...defaults,
      projets: projectsResult.rows[0]?.count ?? defaults.projets,
      messages: contactsResult.rows[0]?.count ?? defaults.messages
    });
  } catch (err) {
    res.json(defaults);
  }
}
