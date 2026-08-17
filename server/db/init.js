import pool from './pool.js';

export async function initDb() {
  // Create users table if not exists
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
  `);

  // Create contacts table for messages
  await pool.query(`
    CREATE TABLE IF NOT EXISTS contacts (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      organisation TEXT,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      category TEXT,
      status TEXT DEFAULT 'Nouveau',
      received_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
  `);

  // Create projects table for admin-managed projects
  await pool.query(`
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT,
      content TEXT,
      status TEXT DEFAULT 'draft',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
  `);
}

// auto-run if invoked directly
if (process.argv[1] && process.argv[1].endsWith('init.js')) {
  initDb()
    .then(() => {
      console.log('DB initialized');
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
