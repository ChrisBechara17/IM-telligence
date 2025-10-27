import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Programs from './pages/Programs.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import ProgramDetail from './pages/ProgramDetail.jsx'
import PartnerSchools from './pages/PartnerSchools.jsx'
import Workshops from './pages/Workshops.jsx'
import PreviousEvents from './pages/PreviousEvents.jsx'
import PrimarySchoolActivities from './pages/PrimarySchoolActivities.jsx'
import SecondarySchoolActivities from './pages/SecondarySchoolActivities.jsx'
import Ages4to5 from './pages/Ages4to5.jsx'
import Ages6to8 from './pages/Ages6to8.jsx'
import Ages9to11 from './pages/Ages9to11.jsx'
import Ages12to15 from './pages/Ages12to15.jsx'

function ScrollToTop() {
  const location = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])
  
  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Programs" element={<Programs />} />
          <Route path="/Programs/:slug" element={<ProgramDetail />} />
          <Route path="/programs/:slug" element={<ProgramDetail />} />
          <Route path="/programs/partner-schools" element={<PartnerSchools />} />
          <Route path="/programs/workshops" element={<Workshops />} />
          <Route path="/programs/previous-events" element={<PreviousEvents />} />
          <Route path="/programs/primary-school-activities" element={<PrimarySchoolActivities />} />
          <Route path="/programs/secondary-school-activities" element={<SecondarySchoolActivities />} />
          <Route path="/programs/academy/ages-4-5" element={<Ages4to5 />} />
          <Route path="/programs/academy/ages-6-8" element={<Ages6to8 />} />
          <Route path="/programs/academy/ages-9-11" element={<Ages9to11 />} />
          <Route path="/programs/academy/ages-12-15" element={<Ages12to15 />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
