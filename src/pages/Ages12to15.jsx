import './ProgramsCommon.css'
import EventCard from '../components/EventCard.jsx'
import img1 from '../Images/Balamand.jpg'
import img2 from '../Images/Logo4.png'
import img3 from '../Images/Logo5.png'

const events = [
  {
    title: 'Teen Tech & Design',
    date: '5/20/2025',
    description: 'Projects blending coding, robotics, and digital design for real impact.',
    images: [img1, img2, img3],
  },
]

function Ages12to15() {
  return (
    <main className="page programs-list">
      <div className="container">
        <h1>Ages 12 to 15</h1>
        <p className="subtitle">Advanced tracks to grow mastery</p>
        <div className="programs-list__stack">
          {events.map((e) => (
            <EventCard key={e.title} {...e} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default Ages12to15

