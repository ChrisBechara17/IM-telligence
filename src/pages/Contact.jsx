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
              href="mailto:imtelligenceacademy@gmail.com"
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
                  <p className="contact-card__text">imtelligenceacademy@gmail.com</p>
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

          {/* Facebook */}
          <li>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="contact-card"
            >
              <div className="contact-card__row">
                <span className="contact-card__icon">
                  {/* Facebook icon */}
                  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" width="24" height="24">
                    <path d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06C2 17.08 5.66 21.21 10.44 22v-7.02H7.9v-2.92h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.61.76-1.61 1.54v1.86h2.74l-.44 2.92h-2.3V22C18.34 21.21 22 17.08 22 12.06z" />
                  </svg>
                </span>
                <div className="min-w-0">
                  <p className="contact-card__title">Facebook</p>
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
