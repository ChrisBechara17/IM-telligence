import './ProgramsCommon.css'
import EventCard from '../components/EventCard.jsx'

import w1 from '../Images/Workshop Main/1.jpg'
import w2 from '../Images/Workshop Main/2.jpg'
import w3 from '../Images/Workshop Main/3.jpg'
import w4 from '../Images/Workshop Main/4.jpg'
import w5 from '../Images/Workshop Main/5.jpg'

const events = [
  {
        title: 'Smart Recycling System – Moubarat Al Ouloum 2025',
        date: '9/12/2025',
        description:'Nazareth School students won third place in the 2025 Moubarat Al Ouloum competition with an innovative smart recycling system. Using Arduino and Raspberry Pi, the project detects and sorts waste like plastic, glass, and metal through integrated sensors, promoting sustainability and technological creativity.',
      
    images: [w1, w2, w3, w4, w5],
  },
]

function Workshops() {
  return (
    <main className="page programs-list">
      <div className="container">
        <h1>Workshops</h1>
        <p className="subtitle">Hands-on sessions for schools and communities</p>
        <div className="programs-list__stack">
          {events.map((e, idx) => (
            <EventCard key={e.title || `event-${idx}`} {...e} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default Workshops


