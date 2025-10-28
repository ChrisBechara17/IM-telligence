import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import EventCard from '../components/EventCard.jsx'
import logoLarge from '../Images/Logo2.svg'
import hero1 from '../Images/hero2.jpg'
import main1 from '../Images/Main/1.jpg'
import main2 from '../Images/Main/2.jpg'
import main3 from '../Images/Main/3.jpg'
import main4 from '../Images/Main/4.jpg'
import main5 from '../Images/Main/5.jpg'

function Home() {
  return (
    <main>
      <Hero imageSrc={hero1} logoSrc={logoLarge} />

      <section className="values">
        <h2>Why Choose Us</h2>
        <div className="values__grid">
          <article className="card">
            <h3>In-School Programs</h3>
            <p>We partner with schools to run structured coding and robotics classes throughout the academic year, adapting to each school timetable and curriculum.</p>
          </article>
          <article className="card">
            <h3>Age-Appropriate Learning (4–15)</h3>
            <p>From visual programming for younger learners to text-based coding and electronics for older students, our pathways meet every learner where they are.</p>
          </article>
          <article className="card">
            <h3>Project-Based Robotics</h3>
            <p>Students design, build, and program robots to solve real-world challenges while learning teamwork, problem-solving, and engineering thinking.</p>
          </article>
          <article className="card">
            <h3>Competition Readiness</h3>
            <p>We mentor school teams to prepare for national robotics competitions, guiding them through strategy, documentation, and presentation skills.</p>
          </article>
        </div>
      </section>

      <section className="home-events">
        <div className="container">
          <h2 className="home-events__title">Featured Events</h2>
          <EventCard
            title="Humanizing Artificial Intelligence and Robotics"
            date="9/11/2025"
            description={`In collaboration with IM-Telligence Academy and several key partners — including MP Tony Sleiman Frangieh, USEK, Beirut Arab University, and the Order of Engineers in North Lebanon — a conference on Artificial Intelligence was held. The event continued the project between Al-Kalima School and MP Frangieh, supporting students’ digital skills and preparing them to lead in an increasingly tech-driven world.`}
            images={[main1, main2, main3, main4, main5]}
          />
          <div className="home-events__cta">
            <Link to="/programs/previous-events" className="btn btn--primary">View Previous Events</Link>
          </div>
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
