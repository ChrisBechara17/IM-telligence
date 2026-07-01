import { Link } from 'react-router-dom'
import { School, Baby, Bot, Trophy } from 'lucide-react'
import Hero from '../components/Hero.jsx'
import EventCard from '../components/EventCard.jsx'
import { useEvents, useTestimonials } from '../lib/useApi.js'

const VALUES = [
  { icon: School, title: 'In-School Programs', text: 'We partner with schools to run structured coding and robotics classes throughout the year, adapting to each timetable and curriculum.' },
  { icon: Baby, title: 'Age-Appropriate (4–15)', text: 'From visual programming for younger learners to text-based coding and electronics for older students, our pathways meet every learner.' },
  { icon: Bot, title: 'Project-Based Robotics', text: 'Students design, build, and program robots to solve real-world challenges while learning teamwork and engineering thinking.' },
  { icon: Trophy, title: 'Competition Readiness', text: 'We mentor school teams for national robotics competitions — strategy, documentation, and presentation skills.' },
]

function Home() {
  const { data: featured } = useEvents({ featured: 1 })
  const { data: testimonials } = useTestimonials()

  return (
    <main>
      <Hero />

      <section className="values">
        <span className="section-eyebrow" style={{ display: 'block', textAlign: 'center' }}>Why Choose Us</span>
        <h2>Learning that actually sticks</h2>
        <p className="values__lead">Real hardware, real code, and mentors who make technology click for every age group.</p>
        <div className="values__grid">
          {VALUES.map(({ icon: Icon, title, text }) => (
            <article className="card" key={title}>
              <div className="card__icon"><Icon size={22} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-events">
        <div className="container">
          <span className="section-eyebrow" style={{ display: 'block', textAlign: 'center' }}>Featured</span>
          <h2 className="home-events__title">Featured Events</h2>
          <p className="home-events__lead">A look at what our students and partners have been building.</p>
          {featured?.map((e) => (
            <EventCard key={e.id} title={e.title} date={e.date} description={e.description} images={e.images} />
          ))}
          <div className="home-events__cta">
            <Link to="/programs/previous-events" className="btn btn--primary">View Previous Events</Link>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <span className="section-eyebrow" style={{ display: 'block', textAlign: 'center' }}>Testimonials</span>
        <h2>What People Say</h2>
        <p className="testimonials__lead">Voices from parents, students, and school partners.</p>
        <div className="testimonials__grid">
          {testimonials?.map((t) => (
            <blockquote key={t.id}>
              <p>{t.quote}</p>
              <footer>— {t.author}{t.role ? `, ${t.role}` : ''}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="cta-band-wrap" style={{ padding: '0 1rem' }}>
        <div className="cta-band">
          <span className="section-eyebrow">Ready to start?</span>
          <h2>Bring robotics to your classroom or child</h2>
          <p>Join a program, book a workshop, or partner your school with IM-Telligence Academy.</p>
          <Link to="/contact" className="btn btn--primary">Get in Touch</Link>
        </div>
      </section>
    </main>
  )
}

export default Home
