import pool from '../db/pool.js';

export async function findUserByEmail(email) {
  const res = await pool.query('SELECT * FROM users WHERE email = $1 LIMIT 1', [email]);
  return res.rows[0] || null;
}

export async function createUser({ email, name, passwordHash, role = 'admin' }) {
  const res = await pool.query(
    'INSERT INTO users (email, name, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *',
    [email, name || null, passwordHash, role]
  );
  return res.rows[0];
}

export async function getUserByEmail(email) {
  const result = await pool.query('SELECT id, email, password_hash FROM users WHERE email = $1', [email]);
  return result.rows[0] || null;
}

export async function listUsers() {
  const result = await pool.query('SELECT id, email, name, role, created_at FROM users ORDER BY created_at DESC');
  return result.rows;
}

export async function deleteUserById(id) {
  const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id, email, name, role', [id]);
  return result.rows[0] || null;
}
