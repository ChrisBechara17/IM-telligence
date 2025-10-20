import './ProgramsCommon.css'
import EventCard from '../components/EventCard.jsx'
import img1 from '../Images/Logo4.png'
import img2 from '../Images/Balamand.jpg'
import img3 from '../Images/Logo5.png'

const events = [
  {
    title: 'Spring Robotics Showcase',
    date: '3/1/2025',
    description: 'Students demonstrated autonomous robots and teamwork achievements.',
    images: [img1, img2, img3],
  },
  {
    title: 'Coding Hackday',
    date: '1/1/2025',
    description: 'A full-day sprint building web apps and games with mentors.',
    images: [img2, img3, img1],
  },
]

function PreviousEvents() {
  return (
    <main className="page programs-list">
      <div className="container">
        <h1>Previous Events</h1>
        <p className="subtitle">Highlights from our recent activities</p>
        <div className="programs-list__stack">
          {events.map((e) => (
            <EventCard key={e.title} {...e} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default PreviousEvents


