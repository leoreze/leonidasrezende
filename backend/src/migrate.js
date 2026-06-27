import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;
const url = process.env.DATABASE_URL;

if (!url) {
  console.log('[db] DATABASE_URL não configurada. Migração ignorada para modo mock/local sem banco.');
  process.exit(0);
}

const pool = new Pool({ connectionString: url, ssl: url.includes('render.com') ? { rejectUnauthorized: false } : false });

await pool.query(`
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  service TEXT,
  message TEXT,
  locale TEXT DEFAULT 'pt',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
`);

await pool.end();
console.log('[db] Migração concluída: tabela leads pronta.');
