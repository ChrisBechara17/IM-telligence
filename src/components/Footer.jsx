import './Footer.css'
import { Link } from 'react-router-dom'
import logo from '../Images/Logo3.png'

function Footer() {
  const year = new Date().getFullYear()

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' }
  ]

  const programLinks = [
    { label: 'Workshops', path: '/programs/workshops' },
    { label: 'Previous Events', path: '/programs/previous-events' },
    { label: 'Partner Schools', path: '/programs/partner-schools' },
    { label: 'Primary School Activities', path: '/programs/primary-school-activities' },
    { label: 'Secondary School Activities', path: '/programs/secondary-school-activities' },
    { label: 'STEM', path: '/programs/stem' },
    { label: 'Arts & Design', path: '/programs/arts-design' },
    { label: 'Coding Bootcamps', path: '/programs/coding-bootcamps' }
  ]
  const mid = Math.ceil(programLinks.length / 2)
  const programLinksA = programLinks.slice(0, mid)
  const programLinksB = programLinks.slice(mid)

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <img src={logo} alt="Rotaract Logo" />
          </Link>
          
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Quick Links</h4>
          <ul className="footer__links">
            {quickLinks.map(link => (
              <li key={link.path}>
                <Link to={link.path} className="footer__text-link">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Programs</h4>
          <ul className="footer__links">
            {programLinksA.map(link => (
              <li key={link.path}>
                <Link to={link.path} className="footer__text-link">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading"></h4>
          <ul className="footer__links">
            {programLinksB.map(link => (
              <li key={link.path}>
                <Link to={link.path} className="footer__text-link">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer__social-bottom" aria-label="Social links">
        <a href="https://www.instagram.com/im.telligence/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416 1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566.683.748-1.15.137-.353.3-.882.344 1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
          </svg>
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06C2 17.08 5.66 21.21 10.44 22v-7.02H7.9v-2.92h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.61.76-1.61 1.54v1.86h2.74l-.44 2.92h-2.3V22C18.34 21.21 22 17.08 22 12.06z" />
          </svg>
        </a>
      </div>
      <div className="footer__copyright">© {year} IMtelligence. All rights reserved. </div>
    </footer>
  )
}

export default Footer


