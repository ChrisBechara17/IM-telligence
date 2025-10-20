import { Link } from 'react-router-dom'
import './Hero.css'

function Hero({ imageSrc }) {
  return (
    <section className="hero hero--split">
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__grid">
        <div className="hero__image">
          {imageSrc ? <img src={imageSrc} alt="Hero" /> : <div className="placeholder" />}
        </div>
        <div className="hero__content">
          <p className="headline">Headline Placeholder</p>
          <p className="sub">Short intro placeholder describing the academy and community.</p>
          <div className="hero__cta">
            <Link to="/contact" className="btn btn--primary">Join Now</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero








