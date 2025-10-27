import './ProgramsCommon.css'
import EventCard from '../components/EventCard.jsx'
import img1 from '../Images/Logo4.png'
import img2 from '../Images/Logo5.png'

const events = [
  {
    title: 'Junior Coders & Makers',
    date: '4/10/2025',
    description: 'Build games, circuits, and stories while learning core skills.',
    images: [img1, img2],
  },
]

function Ages9to11() {
  return (
    <main className="page programs-list">
      <div className="container">
        <h1>Ages 9 to 11</h1>
        <p className="subtitle">Deeper skills with fun challenges</p>
        <div className="programs-list__stack">
          {events.map((e) => (
            <EventCard key={e.title} {...e} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default Ages9to11

