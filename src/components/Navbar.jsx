import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../Images/original.svg'
import './Navbar.css'

function Navbar() {
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 720)
  const location = useLocation()

  useEffect(() => { setProjectsOpen(false); setMobileOpen(false) }, [location.pathname])
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 720)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header className="nav">
      <div className="nav__inner">
        <div className="nav__logo">
          <Link to="/" className="brand">
            <img src={logo} alt="IMTelligence Academy" />
          </Link>
        </div>
        <button
          className="nav__toggle"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="nav__toggle-bar" />
          <span className="nav__toggle-bar" />
          <span className="nav__toggle-bar" />
        </button>
        <nav className={`nav__links ${mobileOpen ? 'open' : ''}`}>
          <NavLink to="/" end onClick={() => setMobileOpen(false)}>Home</NavLink>
          <div
            className={`nav__dropdown nav__dropdown--programs ${projectsOpen ? 'open' : ''}`}
            onMouseEnter={!isMobile ? () => setProjectsOpen(true) : undefined}
            onMouseLeave={!isMobile ? () => setProjectsOpen(false) : undefined}
          >
            <button
              className="dropdown__trigger"
              type="button"
              aria-haspopup="true"
              aria-expanded={projectsOpen}
              onClick={() => setProjectsOpen((v) => !v)}
            >
              Programs
              <span className="caret">▾</span>
            </button>
            <div className="dropdown__panel dropdown__panel--programs" role="menu">
              <div className="dropdown__header">Explore</div>
              <div className="dropdown__grid dropdown__grid--programs">
                <div className="dropdown__section">
                  <div className="dropdown__title">Events</div>
                  <Link to="/programs/workshops" role="menuitem" onClick={() => { setProjectsOpen(false); setMobileOpen(false) }}>Workshops</Link>
                  <Link to="/programs/previous-events" role="menuitem" onClick={() => { setProjectsOpen(false); setMobileOpen(false) }}>Previous Events</Link>
                </div>
                <div className="dropdown__section">
                  <div className="dropdown__title">Schools</div>
                  <Link to="/programs/partner-schools" role="menuitem" onClick={() => { setProjectsOpen(false); setMobileOpen(false) }}>Partner Schools</Link>
                  <Link to="/programs/primary-school-activities" role="menuitem" onClick={() => { setProjectsOpen(false); setMobileOpen(false) }}>Primary School Activities</Link>
                  <Link to="/programs/secondary-school-activities" role="menuitem" onClick={() => { setProjectsOpen(false); setMobileOpen(false) }}>Secondary School Activities</Link>
                  
                </div>
                <div className="dropdown__section">
                  <div className="dropdown__title">Academy</div>
                  <Link to="/programs/academy/ages-4-5" role="menuitem" onClick={() => { setProjectsOpen(false); setMobileOpen(false) }}>Ages 4 to 5</Link>
                  <Link to="/programs/academy/ages-6-8" role="menuitem" onClick={() => { setProjectsOpen(false); setMobileOpen(false) }}>Ages 6 to 8</Link>
                  <Link to="/programs/academy/ages-9-11" role="menuitem" onClick={() => { setProjectsOpen(false); setMobileOpen(false) }}>Ages 9 to 11</Link>
                  <Link to="/programs/academy/ages-12-15" role="menuitem" onClick={() => { setProjectsOpen(false); setMobileOpen(false) }}>Ages 12 to 15</Link>
                </div>
              </div>
            </div>
          </div>
         
          <NavLink to="/about" onClick={() => setMobileOpen(false)}>About Us</NavLink>
          <NavLink to="/contact" onClick={() => setMobileOpen(false)}>Contact Us</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar

