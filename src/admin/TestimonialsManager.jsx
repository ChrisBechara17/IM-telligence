import { useEffect, useState } from 'react'
import { api } from '../lib/api.js'

const blank = () => ({ quote: '', author: '', role: '', sort: 0 })

export default function TestimonialsManager() {
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    try { setItems(await api.getTestimonials()) } catch (e) { setError(e.message) } finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  const save = async (e) => {
    e.preventDefault()
    if (!editing.quote.trim()) { setError('Quote is required'); return }
    setSaving(true); setError('')
    try {
      if (editing.id) await api.updateTestimonial(editing.id, editing)
      else await api.createTestimonial(editing)
      setEditing(null); await load()
    } catch (err) { setError(err.message) } finally { setSaving(false) }
  }

  const remove = async (id) => {
    if (!confirm('Delete this testimonial?')) return
    try { await api.deleteTestimonial(id); await load() } catch (err) { setError(err.message) }
  }

  if (editing) {
    return (
      <form className="panel" onSubmit={save}>
        <h2>{editing.id ? 'Edit testimonial' : 'New testimonial'}</h2>
        {error && <p className="field-error">{error}</p>}
        <label>Quote
          <textarea rows={4} value={editing.quote} onChange={(e) => setEditing({ ...editing, quote: e.target.value })} required />
        </label>
        <div className="form-row">
          <label>Author
            <input type="text" value={editing.author || ''} onChange={(e) => setEditing({ ...editing, author: e.target.value })} />
          </label>
          <label>Role
            <input type="text" placeholder="Parent, Student…" value={editing.role || ''} onChange={(e) => setEditing({ ...editing, role: e.target.value })} />
          </label>
        </div>
        <div className="panel__actions">
          <button type="button" className="btn-ghost" onClick={() => setEditing(null)}>Cancel</button>
          <button type="submit" className="btn-solid" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
        </div>
      </form>
    )
  }

  return (
    <div>
      <div className="section-head">
        <div>
          <h2>Testimonials</h2>
          <p>Quotes shown in the “What People Say” section on the Home page.</p>
        </div>
        <button className="btn-solid" onClick={() => setEditing(blank())}>+ New testimonial</button>
      </div>
      {error && <p className="field-error">{error}</p>}
      {loading ? <p className="muted">Loading…</p> : (
        <div className="list">
          {items.length === 0 && <p className="muted">No testimonials yet.</p>}
          {items.map((t) => (
            <div className="list-row" key={t.id}>
              <div className="list-row__body">
                <div className="list-row__title">“{t.quote}”</div>
                <div className="list-row__meta">{t.author}{t.role ? ` · ${t.role}` : ''}</div>
              </div>
              <div className="list-row__actions">
                <button className="btn-sm" onClick={() => setEditing({ ...t })}>Edit</button>
                <button className="btn-sm danger" onClick={() => remove(t.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
