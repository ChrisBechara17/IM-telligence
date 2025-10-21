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
import STEM from './pages/STEM.jsx'
import ArtsDesign from './pages/ArtsDesign.jsx'
import CodingBootcamps from './pages/CodingBootcamps.jsx'

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
          <Route path="/programs/stem" element={<STEM />} />
          <Route path="/programs/arts-design" element={<ArtsDesign />} />
          <Route path="/programs/coding-bootcamps" element={<CodingBootcamps />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
