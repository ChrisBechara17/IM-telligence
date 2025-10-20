import './Contact.css'

function Contact() {
  return (
    <main className="contact">
      <section className="contact__container">
        <header className="contact__header">
          <h1 className="contact__title">Contact Us</h1>
          <p className="contact__subtitle">We'd love to hear from you.</p>
        </header>

        <ul className="contact__list">
          {/* Email */}
          <li>
            <a
              href="mailto:hello@imtelligence.org"
              className="contact-card"
            >
              <div className="contact-card__row">
                <span className="contact-card__icon">
                  {/* Mail icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm0 0 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div className="min-w-0">
                  <p className="contact-card__title">Email</p>
                  <p className="contact-card__text">hello@imtelligence.org</p>
                </div>
              </div>
            </a>
          </li>

          {/* Instagram */}
          <li>
            <a
              href="https://instagram.com/imtelligence"
              target="_blank"
              rel="noreferrer noopener"
              className="contact-card"
            >
              <div className="contact-card__row">
                <span className="contact-card__icon">
                  {/* Instagram icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                  </svg>
                </span>
                <div className="min-w-0">
                  <p className="contact-card__title">Instagram</p>
                  <p className="contact-card__text">@imtelligence</p>
                </div>
              </div>
            </a>
          </li>

          {/* LinkedIn */}
          <li>
            <a
              href="https://www.linkedin.com/company/imtelligence"
              target="_blank"
              rel="noreferrer noopener"
              className="contact-card"
            >
              <div className="contact-card__row">
                <span className="contact-card__icon">
                  {/* LinkedIn icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6.5 9.5v8M6.5 6.5v.01M10.5 17.5v-5.5a2.5 2.5 0 0 1 5 0v5.5M10.5 14h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
                <div className="min-w-0">
                  <p className="contact-card__title">LinkedIn</p>
                  <p className="contact-card__text">IMTelligence Academy</p>
                </div>
              </div>
            </a>
          </li>
        </ul>

        {/* Note */}
        <div className="contact-note">
          <p>
            Stay connected as we inspire young learners across our region. Follow our channels for updates and opportunities to collaborate.
          </p>
        </div>
      </section>
    </main>
  )
}

export default Contact

