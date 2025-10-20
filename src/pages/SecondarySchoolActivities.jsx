import './ProgramsCommon.css'
import EventCard from '../components/EventCard.jsx'
import img1 from '../Images/Logo4.png'
import img2 from '../Images/Balamand.jpg'
import img3 from '../Images/Logo5.png'

const events = [
  {
    title: 'AI & Data Basics',
    date: '6/1/2025',
    description: 'Intro to AI concepts, datasets, and model intuition with guided labs.',
    images: [img3, img2, img1],
  },
  {
    title: 'Competition Prep Bootcamp',
    date: '7/1/2025',
    description: 'Advanced robotics strategy, teamwork, and presentation practice.',
    images: [img2, img1, img3],
  },
]

function SecondarySchoolActivities() {
  return (
    <main className="page programs-list">
      <div className="container">
        <h1>Secondary School Activities</h1>
        <p className="subtitle">Challenging tracks for older students</p>
        <div className="programs-list__stack">
          {events.map((e) => (
            <EventCard key={e.title} {...e} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default SecondarySchoolActivities


