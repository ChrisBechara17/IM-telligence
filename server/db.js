// Postgres data layer (Neon / Vercel Postgres compatible).
// Uses the `pg` client with a DATABASE_URL connection string.
import pg from 'pg'
import { seedIfEmpty } from './seed.js'

const { Pool } = pg

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_PRISMA_URL

if (!connectionString) {
  console.warn('[db] No DATABASE_URL / POSTGRES_URL set. Set it in .env (local) or your host env (Render).')
}

// Neon and most hosted Postgres require SSL; local Postgres usually does not.
const isLocal = !!connectionString && /localhost|127\.0\.0\.1/.test(connectionString)

export const pool = new Pool({
  connectionString,
  ssl: connectionString && !isLocal ? { rejectUnauthorized: false } : false,
  max: 5,
})

export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS events (
      id          SERIAL PRIMARY KEY,
      category    TEXT NOT NULL,
      title       TEXT NOT NULL,
      date        TEXT,
      description TEXT,
      images      TEXT NOT NULL DEFAULT '[]',   -- JSON string array of image URLs
      featured    BOOLEAN NOT NULL DEFAULT false,
      sort        INTEGER NOT NULL DEFAULT 0,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id         SERIAL PRIMARY KEY,
      quote      TEXT NOT NULL,
      author     TEXT,
      role       TEXT,
      sort       INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS partner_schools (
      id          SERIAL PRIMARY KEY,
      name        TEXT NOT NULL,
      description TEXT,
      image       TEXT,
      sort        INTEGER NOT NULL DEFAULT 0,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `)

  await seedIfEmpty(pool)
}

// images is stored as a JSON string; expose it as a real array + boolean featured.
export function parseEvent(row) {
  if (!row) return row
  let images = []
  try { images = JSON.parse(row.images || '[]') } catch { images = [] }
  return { ...row, images, featured: !!row.featured }
}
