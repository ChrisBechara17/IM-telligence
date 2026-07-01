import { useEffect, useState } from 'react'
import { api, CATEGORIES } from '../lib/api.js'
import ImageUploader from './ImageUploader.jsx'

const blank = () => ({ category: 'previous', title: '', date: '', description: '', images: [], featured: 0, sort: 0 })
const labelFor = (v) => CATEGORIES.find((c) => c.value === v)?.label || v

export default function EventsManager() {
  const [events, setEvents] = useState([])
  const [editing, setEditing] = useState(null) // event object or null
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    try { setEvents(await api.getEvents()) } catch (e) { setError(e.message) } finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  const save = async (e) => {
    e.preventDefault()
    if (!editing.title.trim()) { setError('Title is required'); return }
    setSaving(true); setError('')
    try {
      if (editing.id) await api.updateEvent(editing.id, editing)
      else await api.createEvent(editing)
      setEditing(null)
      await load()
    } catch (err) { setError(err.message) } finally { setSaving(false) }
  }

  const remove = async (id) => {
    if (!confirm('Delete this event?')) return
    try { await api.deleteEvent(id); await load() } catch (err) { setError(err.message) }
  }

  if (editing) {
    return (
      <form className="panel" onSubmit={save}>
        <h2>{editing.id ? 'Edit event' : 'New event'}</h2>
        {error && <p className="field-error">{error}</p>}

        <div className="form-row">
          <label>Category
            <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
              {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </label>
          <label>Date (optional)
            <input type="text" placeholder="e.g. 9/11/2025" value={editing.date || ''} onChange={(e) => setEditing({ ...editing, date: e.target.value })} />
          </label>
        </div>

        <label>Title
          <input type="text" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} required />
        </label>

        <label>Description
          <textarea rows={5} value={editing.description || ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
        </label>

        <label>Images</label>
        <ImageUploader images={editing.images} onChange={(images) => setEditing({ ...editing, images })} />

        <div className="form-row form-row--between">
          <label className="checkbox">
            <input type="checkbox" checked={!!editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked ? 1 : 0 })} />
            Feature on Home page
          </label>
          <label className="sort-field">Sort
            <input type="number" value={editing.sort ?? 0} onChange={(e) => setEditing({ ...editing, sort: Number(e.target.value) })} />
          </label>
        </div>

        <div className="panel__actions">
          <button type="button" className="btn-ghost" onClick={() => setEditing(null)}>Cancel</button>
          <button type="submit" className="btn-solid" disabled={saving}>{saving ? 'Saving…' : 'Save event'}</button>
        </div>
      </form>
    )
  }

  return (
    <div>
      <div className="section-head">
        <div>
          <h2>Events</h2>
          <p>Previous events, workshops, school activities and academy age groups.</p>
        </div>
        <button className="btn-solid" onClick={() => setEditing(blank())}>+ New event</button>
      </div>
      {error && <p className="field-error">{error}</p>}
      {loading ? <p className="muted">Loading…</p> : (
        <div className="list">
          {events.length === 0 && <p className="muted">No events yet.</p>}
          {events.map((ev) => (
            <div className="list-row" key={ev.id}>
              <div className="list-row__thumb">
                {ev.images?.[0] ? <img src={ev.images[0]} alt="" /> : <span>🤖</span>}
              </div>
              <div className="list-row__body">
                <div className="list-row__title">
                  {ev.title}
                  {!!ev.featured && <span className="tag tag--accent">Featured</span>}
                </div>
                <div className="list-row__meta">
                  <span className="tag">{labelFor(ev.category)}</span>
                  {ev.date && <span>{ev.date}</span>}
                  <span>{ev.images?.length || 0} image(s)</span>
                </div>
              </div>
              <div className="list-row__actions">
                <button className="btn-sm" onClick={() => setEditing({ ...ev })}>Edit</button>
                <button className="btn-sm danger" onClick={() => remove(ev.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
