import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import multer from 'multer'
import crypto from 'node:crypto'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { pool, parseEvent, initDb } from './db.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = process.env.PORT || 4000
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'imtelligence2025'
// Public origin of THIS backend, used to build absolute image URLs (e.g. https://api.onrender.com).
const PUBLIC_URL = (process.env.PUBLIC_URL || '').replace(/\/$/, '')
// Where uploaded images are stored (mount a Render disk here in production).
const UPLOADS_DIR = process.env.UPLOADS_DIR || path.join(__dirname, 'uploads')
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true })

// Allow the frontend origin(s). Comma-separated CORS_ORIGIN, or all if unset.
const corsOrigin = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((s) => s.trim())
  : true
app.use(cors({ origin: corsOrigin }))
app.use(express.json({ limit: '2mb' }))
app.use('/uploads', express.static(UPLOADS_DIR))

// --- Auth (simple shared-password gate) -------------------------------------
const sessions = new Set()

app.post('/api/login', (req, res) => {
  const { password } = req.body || {}
  if (password !== ADMIN_PASSWORD) return res.status(401).json({ error: 'Invalid password' })
  const token = crypto.randomBytes(24).toString('hex')
  sessions.add(token)
  res.json({ token })
})

function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  if (!sessions.has(token)) return res.status(401).json({ error: 'Unauthorized' })
  next()
}

app.get('/api/me', requireAuth, (_req, res) => res.json({ ok: true }))

// --- Image upload -----------------------------------------------------------
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    cb(null, crypto.randomBytes(8).toString('hex') + ext)
  },
})
const upload = multer({ storage, limits: { fileSize: 8 * 1024 * 1024 } })

app.post('/api/upload', requireAuth, upload.array('images', 12), (req, res) => {
  // Absolute URLs so they resolve from the frontend on a different origin.
  const urls = (req.files || []).map((f) => `${PUBLIC_URL}/uploads/${f.filename}`)
  res.json({ urls })
})

// Wrap async handlers so rejections become 500s.
const h = (fn) => (req, res) => Promise.resolve(fn(req, res)).catch((e) => {
  console.error(e)
  res.status(500).json({ error: 'Server error' })
})

// --- Events -----------------------------------------------------------------
app.get('/api/events', h(async (req, res) => {
  const { category, featured } = req.query
  let sql = 'SELECT * FROM events'
  const where = []
  const params = []
  if (category) { params.push(category); where.push(`category = $${params.length}`) }
  if (featured !== undefined) where.push('featured = true')
  if (where.length) sql += ' WHERE ' + where.join(' AND ')
  sql += ' ORDER BY sort ASC, id ASC'
  const { rows } = await pool.query(sql, params)
  res.json(rows.map(parseEvent))
}))

app.post('/api/events', requireAuth, h(async (req, res) => {
  const { category, title, date, description, images, featured, sort } = req.body || {}
  if (!category || !title) return res.status(400).json({ error: 'category and title are required' })
  const { rows } = await pool.query(
    `INSERT INTO events (category, title, date, description, images, featured, sort)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [category, title, date || null, description || '', JSON.stringify(images || []), !!featured, sort ?? 0],
  )
  res.status(201).json(parseEvent(rows[0]))
}))

app.put('/api/events/:id', requireAuth, h(async (req, res) => {
  const { rows: cur } = await pool.query('SELECT * FROM events WHERE id = $1', [req.params.id])
  if (!cur[0]) return res.status(404).json({ error: 'Not found' })
  const ex = cur[0]
  const { category, title, date, description, images, featured, sort } = req.body || {}
  const nextImages = images ?? JSON.parse(ex.images || '[]')
  const { rows } = await pool.query(
    `UPDATE events SET category = $1, title = $2, date = $3, description = $4, images = $5, featured = $6, sort = $7
     WHERE id = $8 RETURNING *`,
    [
      category ?? ex.category,
      title ?? ex.title,
      date ?? ex.date,
      description ?? ex.description,
      JSON.stringify(nextImages),
      featured === undefined ? ex.featured : !!featured,
      sort ?? ex.sort,
      req.params.id,
    ],
  )
  res.json(parseEvent(rows[0]))
}))

app.delete('/api/events/:id', requireAuth, h(async (req, res) => {
  await pool.query('DELETE FROM events WHERE id = $1', [req.params.id])
  res.json({ ok: true })
}))

// --- Testimonials -----------------------------------------------------------
app.get('/api/testimonials', h(async (_req, res) => {
  const { rows } = await pool.query('SELECT * FROM testimonials ORDER BY sort ASC, id ASC')
  res.json(rows)
}))

app.post('/api/testimonials', requireAuth, h(async (req, res) => {
  const { quote, author, role, sort } = req.body || {}
  if (!quote) return res.status(400).json({ error: 'quote is required' })
  const { rows } = await pool.query(
    'INSERT INTO testimonials (quote, author, role, sort) VALUES ($1, $2, $3, $4) RETURNING *',
    [quote, author || '', role || '', sort ?? 0],
  )
  res.status(201).json(rows[0])
}))

app.put('/api/testimonials/:id', requireAuth, h(async (req, res) => {
  const { rows: cur } = await pool.query('SELECT * FROM testimonials WHERE id = $1', [req.params.id])
  if (!cur[0]) return res.status(404).json({ error: 'Not found' })
  const ex = cur[0]
  const { quote, author, role, sort } = req.body || {}
  const { rows } = await pool.query(
    'UPDATE testimonials SET quote = $1, author = $2, role = $3, sort = $4 WHERE id = $5 RETURNING *',
    [quote ?? ex.quote, author ?? ex.author, role ?? ex.role, sort ?? ex.sort, req.params.id],
  )
  res.json(rows[0])
}))

app.delete('/api/testimonials/:id', requireAuth, h(async (req, res) => {
  await pool.query('DELETE FROM testimonials WHERE id = $1', [req.params.id])
  res.json({ ok: true })
}))

// --- Partner schools --------------------------------------------------------
app.get('/api/schools', h(async (_req, res) => {
  const { rows } = await pool.query('SELECT * FROM partner_schools ORDER BY sort ASC, id ASC')
  res.json(rows)
}))

app.post('/api/schools', requireAuth, h(async (req, res) => {
  const { name, description, image, sort } = req.body || {}
  if (!name) return res.status(400).json({ error: 'name is required' })
  const { rows } = await pool.query(
    'INSERT INTO partner_schools (name, description, image, sort) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, description || '', image || '', sort ?? 0],
  )
  res.status(201).json(rows[0])
}))

app.put('/api/schools/:id', requireAuth, h(async (req, res) => {
  const { rows: cur } = await pool.query('SELECT * FROM partner_schools WHERE id = $1', [req.params.id])
  if (!cur[0]) return res.status(404).json({ error: 'Not found' })
  const ex = cur[0]
  const { name, description, image, sort } = req.body || {}
  const { rows } = await pool.query(
    'UPDATE partner_schools SET name = $1, description = $2, image = $3, sort = $4 WHERE id = $5 RETURNING *',
    [name ?? ex.name, description ?? ex.description, image ?? ex.image, sort ?? ex.sort, req.params.id],
  )
  res.json(rows[0])
}))

app.delete('/api/schools/:id', requireAuth, h(async (req, res) => {
  await pool.query('DELETE FROM partner_schools WHERE id = $1', [req.params.id])
  res.json({ ok: true })
}))

app.get('/api/health', (_req, res) => res.json({ ok: true }))

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[server] IM-Telligence API running on http://localhost:${PORT}`)
      console.log(`[server] Admin password: ${ADMIN_PASSWORD}`)
    })
  })
  .catch((err) => {
    console.error('[server] Failed to initialise database:', err.message)
    process.exit(1)
  })
