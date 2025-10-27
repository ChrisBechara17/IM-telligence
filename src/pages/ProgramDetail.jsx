import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

const SLUG_TO_TITLE = {
  'workshops': 'Workshops',
  'previous-events': 'Previous Events',
  'primary-school-activities': 'Primary School Activities',
  'secondary-school-activities': 'Secondary School Activities',
  'partner-schools': 'Partner Schools',
  'academy/ages-4-5': 'Ages 4 to 5',
  'academy/ages-6-8': 'Ages 6 to 8',
  'academy/ages-9-11': 'Ages 9 to 11',
  'academy/ages-12-15': 'Ages 12 to 15',
}

function normalizeSlug(raw) {
  if (!raw) return ''
  return String(raw)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
}

function ProgramDetail() {
  const params = useParams()
  const normalized = normalizeSlug(params.slug)
  const title = useMemo(() => SLUG_TO_TITLE[normalized] || 'Program', [normalized])

  return (
    <main className="pt-24 pb-16">
      <div className="container">
        <h1 className="text-foreground" style={{ marginBottom: '0.75rem' }}>{title}</h1>
        <p className="text-muted-foreground">This is a placeholder page for {title.toLowerCase()}.</p>
      </div>
    </main>
  )
}

export default ProgramDetail



