import './ProgramsCommon.css'
import EventCard from '../components/EventCard.jsx'
import main1 from '../Images/Main/1.jpg'
import main2 from '../Images/Main/2.jpg'
import main3 from '../Images/Main/3.jpg'
import main4 from '../Images/Main/4.jpg'
import main5 from '../Images/Main/5.jpg'
import ev2_1 from '../Images/Event 2/1.jpg'
import ev2_2 from '../Images/Event 2/2.jpg'
import ev2_3 from '../Images/Event 2/3.jpg'
import ev2_4 from '../Images/Event 2/4.jpg'


const events = [
  {
    title: 'Education for Innovation: Humanizing Artificial Intelligence and Robotics',
    date: '9/12/2025',
    description: `In collaboration with IM-Telligence Academy, and with the participation of MP Tony Sleiman Frangieh, Head of the Parliamentary Committee for Information Technology; the General Directorate of Lebanese Maronite Order Schools; Holy Spirit University of Kaslik (USEK); the Lebanese Educational Technology Syndicate; Beirut Arab University; and the Order of Engineers in Tripoli and North Lebanon, a conference on Artificial Intelligence was held. This event comes as a continuation of the project launched between Al-Kalima School and MP Frangieh, aiming to support students’ abilities and empower them to become future leaders by enhancing their digital skills, especially in light of the rapid technological development shaping our world today.`,
    images: [main1, main2, main3, main4, main5],
  },
  {
      images: [ev2_1, ev2_2, ev2_3, ev2_4],
  },

]

function PreviousEvents() {
  return (
    <main className="page programs-list">
      <div className="container">
        <h1>Previous Events</h1>
        <p className="subtitle">Highlights from our recent activities</p>
        <div className="programs-list__stack">
          {events.map((e, idx) => (
            <EventCard key={e.title || `event-${idx}`} {...e} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default PreviousEvents
