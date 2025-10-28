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
import ev1_1 from '../Images/Event 1/1.png'
import ev1_2 from '../Images/Event 1/2.jpg'
import ev1_3 from '../Images/Event 1/3.jpg'
import ev1_4 from '../Images/Event 1/4.png'


const events = [
  {
    title: 'Humanizing Artificial Intelligence and Robotics',
    date: '9/11/2025',
    description: `In collaboration with IM-Telligence Academy and several key partners — including MP Tony Sleiman Frangieh, USEK, Beirut Arab University, and the Order of Engineers in North Lebanon — a conference on Artificial Intelligence was held. The event continued the project between Al-Kalima School and MP Frangieh, supporting students’ digital skills and preparing them to lead in an increasingly tech-driven world.`,
    images: [main1, main2, main3, main4, main5],
  },
  {
      title:'Robotics Event with Safadi Foundation',
      date: '8/22/2025',
      description:'In collaboration with the Safadi Foundation and Mrs. Violette Safadi, our team guided students in exploring robotics and programming through interactive activities. The event highlighted our educational initiatives and showcased the innovative projects developed by our students using smart robots.',
      images: [ev1_1, ev1_2, ev1_3, ev1_4],
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
