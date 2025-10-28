import './ProgramsCommon.css'
import EventCard from '../components/EventCard.jsx'

import u1 from '../Images/U6/1.png'
import u2 from '../Images/U6/2.png'
import u3 from '../Images/U6/3.png'
import u4 from '../Images/U6/4.png'

const events = [
  {
    title:'Early Robotics Learning with MTiny',
    description:'A hands-on workshop introducing 4–5-year-old children to the basics of robotics and coding using the MTiny robot. Through interactive play, students learned logical thinking, sequencing, and problem-solving while developing curiosity and confidence in technology from an early age.',
    images: [u1, u2, u3, u4],
  },
 
]

function Ages4to5() {
  return (
    <main className="page programs-list">
      <div className="container">
        <h1>Ages 4 to 5</h1>
        <p className="subtitle">Early exploration through play and making</p>
        <div className="programs-list__stack">
          {events.map((e, idx) => (
            <EventCard key={e.title || `event-${idx}`} {...e} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default Ages4to5
