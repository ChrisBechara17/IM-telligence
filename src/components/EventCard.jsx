import { useRef, useState } from 'react'
import './EventCard.css'

function EventCard({ title, date, description, images = [] }) {
  const [current, setCurrent] = useState(0)
  const startXRef = useRef(null)
  const isDraggingRef = useRef(false)
  const lastXRef = useRef(0)
  const safeImages = images.length > 0 ? images : []

  const goTo = (index) => {
    if (safeImages.length === 0) return
    const next = (index + safeImages.length) % safeImages.length
    setCurrent(next)
  }

  const onPointerDown = (e) => {
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX
    startXRef.current = x
    lastXRef.current = x
    isDraggingRef.current = true
  }

  const onPointerMove = (e) => {
    if (!isDraggingRef.current) return
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX
    lastXRef.current = x
  }

  const onPointerUp = () => {
    if (!isDraggingRef.current || startXRef.current == null) return
    const delta = lastXRef.current - startXRef.current
    const threshold = 40
    if (Math.abs(delta) > threshold) {
      if (delta < 0) goTo(current + 1)
      else goTo(current - 1)
    }
    isDraggingRef.current = false
    startXRef.current = null
  }

  return (
    <article className="event-card">
      <div className="event-card__media">
        <div
          className="event-card__viewport"
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseUp={onPointerUp}
          onMouseLeave={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={onPointerUp}
        >
          {safeImages.map((src, idx) => (
            <img
              key={`${src}-${idx}`}
              src={src}
              alt={`${title} image ${idx + 1}`}
              className={`event-card__slide ${idx === current ? 'is-active' : ''}`}
              draggable={false}
            />
          ))}
        </div>
        {safeImages.length > 1 && (
          <>
            <button aria-label="Previous" onClick={() => goTo(current - 1)} className="event-card__arrow event-card__arrow--prev">‹</button>
            <button aria-label="Next" onClick={() => goTo(current + 1)} className="event-card__arrow event-card__arrow--next">›</button>
          </>
        )}
      </div>

      <div className="event-card__content">
        <div className="event-card__header">
          <h3 className="event-card__title">{title}</h3>
          {date && <div className="event-card__date">{date}</div>}
        </div>
        <p className="event-card__desc">{description}</p>
      </div>
    </article>
  )
}

export default EventCard


