import pool from '../db/pool.js';

export async function getProjectsAdmin(req, res) {
  try {
    const result = await pool.query('SELECT slug, title, status, created_at FROM projects ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur getProjectsAdmin', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}

export async function createProject(req, res) {
  const { slug, title, excerpt, content } = req.body || {};
  if (!slug || !title) return res.status(400).json({ message: 'slug et title requis' });

  try {
    await pool.query('INSERT INTO projects (slug, title, excerpt, content, status) VALUES ($1,$2,$3,$4,$5)', [slug, title, excerpt || null, content || null, 'draft']);
    res.status(201).json({ message: 'Projet créé' });
  } catch (err) {
    console.error('Erreur createProject', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}

export async function updateProject(req, res) {
  const { slug } = req.params;
  const { title, excerpt, content } = req.body || {};
  if (!slug) return res.status(400).json({ message: 'slug requis' });

  try {
    const result = await pool.query('UPDATE projects SET title=$1, excerpt=$2, content=$3 WHERE slug=$4 RETURNING slug, title', [title, excerpt, content, slug]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Projet introuvable' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erreur updateProject', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}

export async function deleteProject(req, res) {
  const { slug } = req.params;
  try {
    const result = await pool.query('DELETE FROM projects WHERE slug = $1', [slug]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Projet introuvable' });
    res.json({ message: 'Projet supprimé' });
  } catch (err) {
    console.error('Erreur deleteProject', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}

export async function publishProject(req, res) {
  const { slug } = req.params;
  try {
    const result = await pool.query("UPDATE projects SET status='published' WHERE slug = $1 RETURNING slug, status", [slug]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Projet introuvable' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erreur publishProject', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}
