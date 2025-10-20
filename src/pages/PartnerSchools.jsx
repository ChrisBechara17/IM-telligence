import './PartnerSchools.css'
import placeholderImg from '../Images/OLM.jpg'
import placeholderImg2 from '../Images/Balamand.jpg'
import placeholderImg3 from '../Images/Balamand2.jpg'
import placeholderImg4 from '../Images/nazareth.jpg'
import placeholderImg5 from '../Images/stta.webp'


const schools = [
  {
    name: 'Al Kalima School-St-Anthony',
    description: 'A valued partner in our STEM and robotics initiatives.',
    image: placeholderImg,
  },
  {
    name: 'Balamand French',
    description: 'Supporting innovation through French curriculum partnerships.',
    image: placeholderImg2,
  },
  {
    name: 'Balamand English',
    description: 'Empowering students with hands-on tech and coding education.',
    image: placeholderImg3,
  },
  {
    name: 'Nazareth',
    description: 'Collaborating to bring robotics and coding to the classroom.',
    image: placeholderImg4,
  },
  {
    name: 'Ecole des Saint therese Aminoun',
    description: 'Partnering to inspire creativity and problem-solving skills.',
    image: placeholderImg5,
  },
  {
    name: 'Ecole des Saint Therese Dar-Baachtar',
    description: 'Driving STEM education and competitive robotics programs.',
    image: placeholderImg5,
  },
]

function PartnerSchools() {
  return (
    <main className="page partner-schools">
      <div className="container">
        <h1>Partner Schools</h1>
        <p className="subtitle">Our growing network of partner institutions</p>
        <div className="schools-grid">
          {schools.map((school) => (
            <div key={school.name} className="school-card">
              <img className="school-card__image" src={school.image} alt={school.name} />
              <div className="school-card__badge">School</div>
              <h3 className="school-card__name">{school.name}</h3>
              <p className="school-card__desc">{school.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default PartnerSchools


