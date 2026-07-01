import './PartnerSchools.css'
import { useSchools } from '../lib/useApi.js'

function PartnerSchools() {
  const { data: schools, loading, error } = useSchools()

  return (
    <main className="page partner-schools">
      <div className="container">
        <h1>Partner Schools</h1>
        <p className="subtitle">Our growing network of partner institutions</p>

        {loading && <div className="empty-state">Loading…</div>}
        {error && <div className="empty-state">Couldn’t load schools. Is the API running?</div>}

        <div className="schools-grid">
          {schools?.map((school) => (
            <div key={school.id} className="school-card">
              {school.image && <img className="school-card__image" src={school.image} alt={school.name} />}
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
