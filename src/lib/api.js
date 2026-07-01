// Tiny fetch client for the IM-Telligence backend.
// Dev: leave VITE_API_URL unset — Vite proxies /api and /uploads to localhost:4000.
// Prod: set VITE_API_URL to the deployed backend origin (e.g. https://imt-api.onrender.com).
const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
const TOKEN_KEY = 'imt_admin_token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || ''
}
export function setToken(t) {
  if (t) localStorage.setItem(TOKEN_KEY, t)
  else localStorage.removeItem(TOKEN_KEY)
}

async function request(path, { method = 'GET', body, auth = false, isForm = false } = {}) {
  const headers = {}
  if (!isForm) headers['Content-Type'] = 'application/json'
  if (auth) headers['Authorization'] = `Bearer ${getToken()}`
  const res = await fetch(`${API_BASE}/api${path}`, {
    method,
    headers,
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    let msg = `Request failed (${res.status})`
    try { msg = (await res.json()).error || msg } catch { /* ignore */ }
    const err = new Error(msg)
    err.status = res.status
    throw err
  }
  return res.status === 204 ? null : res.json()
}

export const api = {
  // Auth
  login: (password) => request('/login', { method: 'POST', body: { password } }),
  me: () => request('/me', { auth: true }),

  // Events
  getEvents: (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return request(`/events${qs ? `?${qs}` : ''}`)
  },
  createEvent: (data) => request('/events', { method: 'POST', body: data, auth: true }),
  updateEvent: (id, data) => request(`/events/${id}`, { method: 'PUT', body: data, auth: true }),
  deleteEvent: (id) => request(`/events/${id}`, { method: 'DELETE', auth: true }),

  // Testimonials
  getTestimonials: () => request('/testimonials'),
  createTestimonial: (data) => request('/testimonials', { method: 'POST', body: data, auth: true }),
  updateTestimonial: (id, data) => request(`/testimonials/${id}`, { method: 'PUT', body: data, auth: true }),
  deleteTestimonial: (id) => request(`/testimonials/${id}`, { method: 'DELETE', auth: true }),

  // Partner schools
  getSchools: () => request('/schools'),
  createSchool: (data) => request('/schools', { method: 'POST', body: data, auth: true }),
  updateSchool: (id, data) => request(`/schools/${id}`, { method: 'PUT', body: data, auth: true }),
  deleteSchool: (id) => request(`/schools/${id}`, { method: 'DELETE', auth: true }),

  // Uploads (multipart) -> { urls: [] }
  upload: async (files) => {
    const fd = new FormData()
    ;[...files].forEach((f) => fd.append('images', f))
    return request('/upload', { method: 'POST', body: fd, auth: true, isForm: true })
  },
}

export const CATEGORIES = [
  { value: 'previous', label: 'Previous Events' },
  { value: 'workshops', label: 'Workshops' },
  { value: 'primary', label: 'Primary School Activities' },
  { value: 'secondary', label: 'Secondary School Activities' },
  { value: 'age-4-5', label: 'Academy · Ages 4–5' },
  { value: 'age-6-8', label: 'Academy · Ages 6–8' },
  { value: 'age-9-11', label: 'Academy · Ages 9–11' },
  { value: 'age-12-15', label: 'Academy · Ages 12–15' },
]
