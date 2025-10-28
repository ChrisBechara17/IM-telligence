import './ProgramsCommon.css'
import EventCard from '../components/EventCard.jsx'
import a1 from '../Images/6 to 8/1.png'
import a2 from '../Images/6 to 8/2.png'
import a3 from '../Images/6 to 8/3.png'
import a4 from '../Images/6 to 8/4.png'

const events = [
  {
    title:'Lego Building and Robotics Learning with WeDo',
    description:
      'For ages 6–8 we introduce robotics using LEGO Education WeDo kits. Children build simple machines and program them with block-based coding to learn sequencing, problem solving, and teamwork in a fun, age-appropriate way.',
    images: [a1, a2, a3, a4],
  },
  
]

function Ages6to8() {
  return (
    <main className="page programs-list">
      <div className="container">
        <h1>Ages 6 to 8</h1>
        <p className="subtitle">Creative projects that build foundations</p>
        <div className="programs-list__stack">
          {events.map((e, idx) => (
            <EventCard key={e.title || `event-${idx}`} {...e} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default Ages6to8
