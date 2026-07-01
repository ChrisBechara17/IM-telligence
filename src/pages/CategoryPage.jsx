import './ProgramsCommon.css'
import EventCard from '../components/EventCard.jsx'
import { useEvents } from '../lib/useApi.js'

// One component drives every DB-backed listing page (events, workshops,
// school activities, and academy age groups) — just a different category.
function CategoryPage({ category, title, subtitle }) {
  const { data: events, loading, error } = useEvents({ category })

  return (
    <main className="page programs-list">
      <div className="container">
        <div className="page-head">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>

        {loading && <div className="empty-state">Loading…</div>}
        {error && <div className="empty-state">Couldn’t load content. Is the API running?</div>}
        {!loading && !error && events?.length === 0 && (
          <div className="empty-state">Nothing here yet — check back soon!</div>
        )}

        <div className="programs-list__stack">
          {events?.map((e) => (
            <EventCard key={e.id} title={e.title} date={e.date} description={e.description} images={e.images} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default CategoryPage
