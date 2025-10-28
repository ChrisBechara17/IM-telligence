import './ProgramsCommon.css'
import EventCard from '../components/EventCard.jsx'
import e1 from '../Images/9-11/1.png'
import e2 from '../Images/9-11/2.png'
import e3 from '../Images/9-11/3.png'
import e4 from '../Images/9-11/4.png'

const events = [
  {
    title: 'EV3 Robotics Explorers',
    description:
      'Students built and programmed LEGO MINDSTORMS EV3 robots, learning to use sensors and motors to solve challenges while strengthening logic, teamwork, and engineering thinking.',
    images: [e1, e2, e3, e4],
  },
]

function Ages9to11() {
  return (
    <main className="page programs-list">
      <div className="container">
        <h1>Ages 9 to 11</h1>
        <p className="subtitle">Deeper skills with fun challenges</p>
        <div className="programs-list__stack">
          {events.map((e, idx) => (
            <EventCard key={e.title || `event-${idx}`} {...e} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default Ages9to11
