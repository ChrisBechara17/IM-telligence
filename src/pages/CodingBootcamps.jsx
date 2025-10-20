import './ProgramsCommon.css'
import EventCard from '../components/EventCard.jsx'
import img1 from '../Images/Logo4.png'
import img2 from '../Images/Balamand.jpg'
import img3 from '../Images/Logo5.png'

const events = [
  {
    title: 'Web Dev Bootcamp',
    date: '12/1/2025',
    description: 'From HTML/CSS to interactive JS projects in an intensive format.',
    images: [img1, img3, img2],
  },
  {
    title: 'Python Fundamentals',
    date: '1/1/2026',
    description: 'Core Python syntax, problem solving, and small applications.',
    images: [img2, img1, img3],
  },
]

function CodingBootcamps() {
  return (
    <main className="page programs-list">
      <div className="container">
        <h1>Coding Bootcamps</h1>
        <p className="subtitle">Accelerated learning tracks</p>
        <div className="programs-list__stack">
          {events.map((e) => (
            <EventCard key={e.title} {...e} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default CodingBootcamps


