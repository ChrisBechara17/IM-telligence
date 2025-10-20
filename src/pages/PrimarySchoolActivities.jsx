import './ProgramsCommon.css'
import EventCard from '../components/EventCard.jsx'
import img1 from '../Images/Logo4.png'
import img2 from '../Images/Balamand.jpg'
import img3 from '../Images/Logo5.png'

const events = [
  {
    title: 'Scratch Coding Fun Day',
    date: '4/1/2025',
    description: 'Introductory coding with blocks, storytelling, and games for young learners.',
    images: [img1, img3],
  },
  {
    title: 'Robotics Discovery',
    date: '5/1/2025',
    description: 'Hands-on robotics basics: sensors, movement, and collaboration.',
    images: [img2, img1],
  },
]

function PrimarySchoolActivities() {
  return (
    <main className="page programs-list">
      <div className="container">
        <h1>Primary School Activities</h1>
        <p className="subtitle">Engaging activities tailored for younger students</p>
        <div className="programs-list__stack">
          {events.map((e) => (
            <EventCard key={e.title} {...e} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default PrimarySchoolActivities


