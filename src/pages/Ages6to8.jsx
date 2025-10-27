import './ProgramsCommon.css'
import EventCard from '../components/EventCard.jsx'
import img1 from '../Images/Logo5.png'
import img2 from '../Images/Balamand.jpg'

const events = [
  {
    title: 'Inventors Club',
    date: '3/15/2025',
    description: 'Hands-on challenges in art, design, and simple coding concepts.',
    images: [img1, img2],
  },
]

function Ages6to8() {
  return (
    <main className="page programs-list">
      <div className="container">
        <h1>Ages 6 to 8</h1>
        <p className="subtitle">Creative projects that build foundations</p>
        <div className="programs-list__stack">
          {events.map((e) => (
            <EventCard key={e.title} {...e} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default Ages6to8

