import { useEffect, useState } from 'react'
import { api } from '../lib/api.js'
import ImageUploader from './ImageUploader.jsx'

const blank = () => ({ name: '', description: '', image: '', sort: 0 })

export default function SchoolsManager() {
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    try { setItems(await api.getSchools()) } catch (e) { setError(e.message) } finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  const save = async (e) => {
    e.preventDefault()
    if (!editing.name.trim()) { setError('Name is required'); return }
    setSaving(true); setError('')
    try {
      if (editing.id) await api.updateSchool(editing.id, editing)
      else await api.createSchool(editing)
      setEditing(null); await load()
    } catch (err) { setError(err.message) } finally { setSaving(false) }
  }

  const remove = async (id) => {
    if (!confirm('Delete this school?')) return
    try { await api.deleteSchool(id); await load() } catch (err) { setError(err.message) }
  }

  if (editing) {
    return (
      <form className="panel" onSubmit={save}>
        <h2>{editing.id ? 'Edit school' : 'New school'}</h2>
        {error && <p className="field-error">{error}</p>}
        <label>School name
          <input type="text" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} required />
        </label>
        <label>Description
          <textarea rows={3} value={editing.description || ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
        </label>
        <label>Logo / image</label>
        <ImageUploader
          images={editing.image ? [editing.image] : []}
          onChange={(imgs) => setEditing({ ...editing, image: imgs[imgs.length - 1] || '' })}
        />
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
          <h2>Partner Schools</h2>
          <p>Institutions shown on the Partner Schools page.</p>
        </div>
        <button className="btn-solid" onClick={() => setEditing(blank())}>+ New school</button>
      </div>
      {error && <p className="field-error">{error}</p>}
      {loading ? <p className="muted">Loading…</p> : (
        <div className="list">
          {items.length === 0 && <p className="muted">No schools yet.</p>}
          {items.map((s) => (
            <div className="list-row" key={s.id}>
              <div className="list-row__thumb">
                {s.image ? <img src={s.image} alt="" /> : <span>🏫</span>}
              </div>
              <div className="list-row__body">
                <div className="list-row__title">{s.name}</div>
                <div className="list-row__meta">{s.description}</div>
              </div>
              <div className="list-row__actions">
                <button className="btn-sm" onClick={() => setEditing({ ...s })}>Edit</button>
                <button className="btn-sm danger" onClick={() => remove(s.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
