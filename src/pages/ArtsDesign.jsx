import './ProgramsCommon.css'
import EventCard from '../components/EventCard.jsx'
import img1 from '../Images/Logo4.png'
import img2 from '../Images/Logo5.png'

const events = [
  {
    title: 'Digital Art Workshop',
    date: '10/1/2025',
    description: 'Explore visual design basics and create digital artwork with simple tools.',
    images: [img1, img2],
  },
  {
    title: '3D Design Starter',
    date: '11/1/2025',
    description: 'Intro to 3D modeling and printing concepts for creative projects.',
    images: [img2, img1],
  },
]

function ArtsDesign() {
  return (
    <main className="page programs-list">
      <div className="container">
        <h1>Arts & Design</h1>
        <p className="subtitle">Creativity meets technology</p>
        <div className="programs-list__stack">
          {events.map((e) => (
            <EventCard key={e.title} {...e} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default ArtsDesign


