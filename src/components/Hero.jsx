import { Link } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import './Hero.css'

// Lazy-load the 3D robot so three.js is split into its own chunk.
const Robot = lazy(() => import('./Robot.jsx'))

function Hero() {
  return (
    <section className="hero">
      <div className="hero__grid-lines" aria-hidden="true" />
      <div className="hero__glow hero__glow--1" aria-hidden="true" />
      <div className="hero__glow hero__glow--2" aria-hidden="true" />

      <div className="hero__inner">
        <div className="hero__content">
          <span className="hero__eyebrow">Coding · Robotics · AI · Ages 4–15</span>
          <h1 className="hero__headline">
            Where Young Minds <span className="grad">Build the Future</span>
          </h1>
          <p className="hero__sub">
            Hands-on coding, robotics, and design that turn curiosity into real skills —
            through school programs, workshops, and our academy.
          </p>
          <div className="hero__cta">
            <Link to="/contact" className="btn btn--primary">Join Now</Link>
            <Link to="/programs/previous-events" className="btn btn--ghost">Explore Programs</Link>
          </div>
          <div className="hero__stats">
            <div><strong>10+</strong><span>Partner Schools</span></div>
            <div><strong>4–15</strong><span>Age Range</span></div>
            <div><strong>100%</strong><span>Hands-on</span></div>
          </div>
        </div>

        <div className="hero__robot">
          <Suspense fallback={<div className="robot-fallback"><div className="robot-fallback__emoji">🤖</div></div>}>
            <Robot className="hero__canvas" />
          </Suspense>
          <span className="hero__robot-hint">✦ Drag to spin · click me</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
