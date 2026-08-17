import pool from '../db/pool.js';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function postContact(req, res) {
  const { name, email, organisation, subject, message, category } = req.body || {};

  if (!name || !email || !subject || !message || !category) {
    return res.status(400).json({ message: 'Tous les champs obligatoires doivent être remplis.' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "L'adresse e-mail n'est pas valide." });
  }

  try {
    await pool.query(
      `INSERT INTO contacts (name, email, organisation, subject, message, category, status) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [name, email, organisation || null, subject, message, category, 'Nouveau']
    );

    return res.status(201).json({ message: 'Votre message a bien été envoyé.' });
  } catch (err) {
    console.error('Erreur insertion contact', err);
    return res.status(500).json({ message: "Une erreur serveur est survenue." });
  }
}

export async function getContacts(req, res) {
  try {
    const result = await pool.query('SELECT id, name, email, organisation, subject, message, category, status, received_at FROM contacts ORDER BY received_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur lecture contacts', err);
    res.status(500).json({ message: 'Impossible de récupérer les messages.' });
  }
}

export async function updateContactStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body || {};

  if (!id || !status) return res.status(400).json({ message: 'id et status requis.' });

  try {
    const result = await pool.query('UPDATE contacts SET status = $1 WHERE id = $2 RETURNING id, status', [status, id]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Message introuvable.' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erreur update contact', err);
    res.status(500).json({ message: 'Impossible de mettre à jour le message.' });
  }
}
