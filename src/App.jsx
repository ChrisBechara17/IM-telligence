import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, Suspense, lazy } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Programs from './pages/Programs.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import ProgramDetail from './pages/ProgramDetail.jsx'
import PartnerSchools from './pages/PartnerSchools.jsx'
import CategoryPage from './pages/CategoryPage.jsx'

const Admin = lazy(() => import('./admin/Admin.jsx'))

function ScrollToTop() {
  const location = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])
  return null
}

function PublicLayout() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Programs" element={<Programs />} />
        <Route path="/Programs/:slug" element={<ProgramDetail />} />
        <Route path="/programs/:slug" element={<ProgramDetail />} />
        <Route path="/programs/partner-schools" element={<PartnerSchools />} />
        <Route path="/programs/workshops" element={<CategoryPage category="workshops" title="Workshops" subtitle="Hands-on sessions for schools and communities" />} />
        <Route path="/programs/previous-events" element={<CategoryPage category="previous" title="Previous Events" subtitle="Highlights from our recent activities" />} />
        <Route path="/programs/primary-school-activities" element={<CategoryPage category="primary" title="Primary School Activities" subtitle="Engaging activities tailored for younger students" />} />
        <Route path="/programs/secondary-school-activities" element={<CategoryPage category="secondary" title="Secondary School Activities" subtitle="Challenging tracks for older students" />} />
        <Route path="/programs/academy/ages-4-5" element={<CategoryPage category="age-4-5" title="Ages 4 to 5" subtitle="Early exploration through play and making" />} />
        <Route path="/programs/academy/ages-6-8" element={<CategoryPage category="age-6-8" title="Ages 6 to 8" subtitle="Creative projects that build foundations" />} />
        <Route path="/programs/academy/ages-9-11" element={<CategoryPage category="age-9-11" title="Ages 9 to 11" subtitle="Deeper skills with fun challenges" />} />
        <Route path="/programs/academy/ages-12-15" element={<CategoryPage category="age-12-15" title="Ages 12 to 15" subtitle="Advanced tracks to grow mastery" />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/*" element={<PublicLayout />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
