import { useRef, useState } from 'react'
import { api } from '../lib/api.js'

// Manages a list of image URLs: upload files to the backend or paste a URL.
export default function ImageUploader({ images = [], onChange }) {
  const fileRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const [error, setError] = useState('')

  const handleFiles = async (e) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    setUploading(true)
    setError('')
    try {
      const { urls } = await api.upload(files)
      onChange([...images, ...urls])
    } catch (err) {
      setError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const addUrl = () => {
    const u = urlInput.trim()
    if (!u) return
    onChange([...images, u])
    setUrlInput('')
  }

  const remove = (i) => onChange(images.filter((_, idx) => idx !== i))
  const move = (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= images.length) return
    const next = images.slice()
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }

  return (
    <div className="uploader">
      <div className="uploader__thumbs">
        {images.map((src, i) => (
          <div className="uploader__thumb" key={`${src}-${i}`}>
            <img src={src} alt="" />
            <div className="uploader__thumb-actions">
              <button type="button" onClick={() => move(i, -1)} title="Move left">‹</button>
              <button type="button" onClick={() => remove(i)} title="Remove" className="danger">✕</button>
              <button type="button" onClick={() => move(i, 1)} title="Move right">›</button>
            </div>
          </div>
        ))}
        {images.length === 0 && <div className="uploader__empty">No images yet</div>}
      </div>

      <div className="uploader__controls">
        <button type="button" className="btn-sm" onClick={() => fileRef.current?.click()} disabled={uploading}>
          {uploading ? 'Uploading…' : '⬆ Upload images'}
        </button>
        <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={handleFiles} />
        <div className="uploader__url">
          <input
            type="text"
            placeholder="…or paste an image URL"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addUrl() } }}
          />
          <button type="button" className="btn-sm" onClick={addUrl}>Add</button>
        </div>
      </div>
      {error && <p className="field-error">{error}</p>}
    </div>
  )
}
