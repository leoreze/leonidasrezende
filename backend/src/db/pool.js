import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pg;
export const pool = process.env.DATABASE_URL ? new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.DATABASE_URL.includes('render.com') ? { rejectUnauthorized: false } : false }) : null;
