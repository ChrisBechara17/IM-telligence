import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, getToken, setToken } from '../lib/api.js'
import EventsManager from './EventsManager.jsx'
import TestimonialsManager from './TestimonialsManager.jsx'
import SchoolsManager from './SchoolsManager.jsx'
import './admin.css'

function Login({ onSuccess }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const { token } = await api.login(password)
      setToken(token)
      onSuccess()
    } catch {
      setError('Incorrect password')
    } finally { setLoading(false) }
  }

  return (
    <div className="admin admin--login">
      <form className="login-card" onSubmit={submit}>
        <div className="login-card__logo">🤖</div>
        <h1>Admin Dashboard</h1>
        <p className="muted">IM-Telligence Academy content manager</p>
        <label>Password
          <input type="password" value={password} autoFocus onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <p className="field-error">{error}</p>}
        <button className="btn-solid" type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button>
        <Link to="/" className="muted login-card__back">← Back to website</Link>
      </form>
    </div>
  )
}

const TABS = [
  { key: 'events', label: 'Events', icon: '📅' },
  { key: 'testimonials', label: 'Testimonials', icon: '💬' },
  { key: 'schools', label: 'Partner Schools', icon: '🏫' },
]

function Dashboard({ onLogout }) {
  const [tab, setTab] = useState('events')
  return (
    <div className="admin">
      <aside className="admin__sidebar">
        <div className="admin__brand"><span>🤖</span> IM-Telligence</div>
        <nav className="admin__nav">
          {TABS.map((t) => (
            <button key={t.key} className={tab === t.key ? 'active' : ''} onClick={() => setTab(t.key)}>
              <span className="admin__nav-icon">{t.icon}</span> {t.label}
            </button>
          ))}
        </nav>
        <div className="admin__sidebar-foot">
          <Link to="/" className="admin__link">↗ View website</Link>
          <button className="admin__logout" onClick={onLogout}>Sign out</button>
        </div>
      </aside>
      <main className="admin__main">
        {tab === 'events' && <EventsManager />}
        {tab === 'testimonials' && <TestimonialsManager />}
        {tab === 'schools' && <SchoolsManager />}
      </main>
    </div>
  )
}

export default function Admin() {
  const [authed, setAuthed] = useState(!!getToken())
  const [checking, setChecking] = useState(!!getToken())

  // Validate an existing token on load (server restarts invalidate sessions).
  useEffect(() => {
    if (!getToken()) return
    api.me().then(() => setAuthed(true)).catch(() => { setToken(''); setAuthed(false) }).finally(() => setChecking(false))
  }, [])

  const logout = () => { setToken(''); setAuthed(false) }

  if (checking) return <div className="admin admin--login"><p className="muted">Loading…</p></div>
  if (!authed) return <Login onSuccess={() => setAuthed(true)} />
  return <Dashboard onLogout={logout} />
}
