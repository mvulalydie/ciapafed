import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/ciapafed';

if (!process.env.DATABASE_URL) {
  console.warn('Warning: DATABASE_URL is not set. Using default postgres://postgres:postgres@localhost:5432/ciapafed. Create a server/.env file with DATABASE_URL to avoid this warning.');
}

const pool = new Pool({ connectionString });

export default pool;
