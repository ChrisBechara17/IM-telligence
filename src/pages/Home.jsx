import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import logoLarge from '../Images/Logo2.svg'
import heroImg from '../Images/Logo.png'

function Home() {
  return (
    <main>
      <Hero imageSrc={heroImg} logoSrc={logoLarge} />

      <section className="values">
        <h2>Why Choose Us</h2>
        <div className="values__grid">
          <article className="card">
           
            <h3>In‑School Programs</h3>
            <p>We partner with schools to run structured coding and robotics classes throughout the academic year, adapting to each school’s timetable and curriculum.</p>
          </article>
          <article className="card">
           
            <h3>Age‑Appropriate Learning (5–15)</h3>
            <p>From visual programming for younger learners to text‑based coding and electronics for older students, our pathways meet every learner where they are.</p>
          </article>
          <article className="card">
            
            <h3>Project‑Based Robotics</h3>
            <p>Students design, build, and program robots to solve real‑world challenges while learning teamwork, problem‑solving, and engineering thinking.</p>
          </article>
          <article className="card">
           
            <h3>Competition Readiness</h3>
            <p>We mentor school teams to prepare for national robotics competitions, guiding them through strategy, documentation, and presentation skills.</p>
          </article>
        </div>
      </section>

      <section className="featured">
        <div className="featured__head">
          <h2>Featured Event Title</h2>
          <p className="meta">Date Placeholder · Location Placeholder</p>
        </div>
        <p className="desc">Short description placeholder for the featured event.</p>
        <div className="carousel" role="region" aria-label="Featured images">
          <div className="carousel__track">
            <div className="carousel__item" aria-hidden="false">Image 1</div>
            <div className="carousel__item" aria-hidden="true">Image 2</div>
            <div className="carousel__item" aria-hidden="true">Image 3</div>
          </div>
        </div>
        <div className="featured__cta">
          <Link to="/events" className="btn btn--primary">View All Events</Link>
        </div>
      </section>

      <section className="testimonials">
        <h2>What People Say</h2>
        <div className="testimonials__grid">
          <blockquote>
            <p>“Amazing experience! Placeholder text for testimonial.”</p>
            <footer>— Author Name, Role</footer>
          </blockquote>
          <blockquote>
            <p>“Highly recommend. Placeholder text for testimonial.”</p>
            <footer>— Author Name, Role</footer>
          </blockquote>
          <blockquote>
            <p>“Great value. Placeholder text for testimonial.”</p>
            <footer>— Author Name, Role</footer>
          </blockquote>
        </div>
      </section>

      
    </main>
  )
}

export default Home


