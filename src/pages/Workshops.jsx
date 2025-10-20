import { useState } from 'react'
import './Workshops.css'
import img1 from '../Images/Logo4.png'
import img2 from '../Images/Balamand.jpg'
import img3 from '../Images/Logo5.png'

const slides = [img1, img2, img3]

function Workshops() {
  const [current, setCurrent] = useState(0)

  const goTo = (index) => {
    const next = (index + slides.length) % slides.length
    setCurrent(next)
  }

  return (
    <main className="page workshops">
      <div className="container">
        <div className="workshops__grid">
          <section className="workshops__slider">
            <div className="slider__viewport">
              {slides.map((src, idx) => (
                <img
                  key={src}
                  src={src}
                  alt={`Workshop slide ${idx + 1}`}
                  className={`slider__slide ${idx === current ? 'is-active' : ''}`}
                />
              ))}
            </div>
            <div className="slider__controls">
              <button aria-label="Previous" onClick={() => goTo(current - 1)} className="slider__btn">‹</button>
              <div className="slider__dots">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`slider__dot ${idx === current ? 'active' : ''}`}
                    onClick={() => setCurrent(idx)}
                  />
                ))}
              </div>
              <button aria-label="Next" onClick={() => goTo(current + 1)} className="slider__btn">›</button>
            </div>
          </section>

          <section className="workshops__content">
            <h1>Workshops</h1>
            <p className="subtitle">Hands-on coding and robotics sessions for schools and communities.</p>
            <div className="workshops__details">
              <h3>What to expect</h3>
              <ul>
                <li>Beginner to advanced tracks tailored by age group</li>
                <li>Project-based learning with real outcomes</li>
                <li>Robotics kits, coding challenges, and team activities</li>
                <li>Flexible formats: in-school, after-school, or weekend camps</li>
              </ul>
              <h3>Upcoming</h3>
              <p>
                Check back soon for our next dates, or contact us to bring a
                custom workshop to your school.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default Workshops


