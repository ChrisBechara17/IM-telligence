import './ProgramsCommon.css'
import EventCard from '../components/EventCard.jsx'
import img1 from '../Images/Logo4.png'
import img2 from '../Images/Balamand.jpg'

const events = [
  {
    title: 'STEM Week: Robotics & Coding',
    date: '8/1/2025',
    description: 'Multi-day exploration of robotics, circuits, and beginner coding projects.',
    images: [img1, img2],
  },
  {
    title: 'Makers Day',
    date: '9/1/2025',
    description: 'Hands-on building with simple electronics and creative problem solving.',
    images: [img2, img1],
  },
]

function STEM() {
  return (
    <main className="page programs-list">
      <div className="container">
        <h1>STEM</h1>
        <p className="subtitle">Science, Technology, Engineering, and Mathematics experiences</p>
        <div className="programs-list__stack">
          {events.map((e) => (
            <EventCard key={e.title} {...e} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default STEM


