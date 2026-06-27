import { pool } from './pool.js';
if (!pool) { console.error('DATABASE_URL não configurada. Copie backend/.env.example para backend/.env e configure.'); process.exit(1); }
await pool.query(`
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT,
  service TEXT,
  budget TEXT,
  message TEXT NOT NULL,
  language TEXT DEFAULT 'pt',
  source TEXT DEFAULT 'landing',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
`);
console.log('Migração concluída: tabela leads pronta.');
await pool.end();
