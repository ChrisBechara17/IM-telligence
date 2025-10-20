
import { Code2, Bot, Trophy, MapPin, Users, Lightbulb } from "lucide-react";
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <main>
        {/* Hero Section */}
        <div className="about-container">
          <div className="about-hero">
            <h1 className="about-hero__title animate-fade-in">
              Empowering Young Minds Through Technology
            </h1>
            <p className="about-hero__subtitle">
              We're passionate educators bringing coding and robotics education to schools across Lebanon
            </p>
            <div className="about-hero__location">
              <MapPin className="about-hero__location-icon" />
              <span className="about-hero__location-text">Based in Zgharta, Lebanon</span>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="about-container">
          <div className="about-section">
            <div className="about-card mission-card">
              <div className="about-card__title">
                <Lightbulb className="about-card__title-icon" />
                Our Mission
              </div>
              <div className="about-card__content">
                <p>
                  We believe every child deserves the opportunity to learn the skills that will shape their future.
                  Through hands-on coding and robotics education, we inspire creativity, problem-solving, and
                  innovation in young minds. Our goal is to prepare the next generation of Lebanese tech leaders
                  and innovators.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What We Do */}
        <div className="about-container">
          <h2 className="about-section__title">What We Do</h2>
          <div className="what-we-do-grid">
            <div className="about-card">
              <h3 className="about-card__title">
                <Code2 className="about-card__title-icon" />
                Coding Education
              </h3>
              <div className="about-card__content">
                <p>
                  We teach programming fundamentals through interactive lessons and real-world projects.
                  Students learn to think logically, solve problems creatively, and build their own applications
                  from scratch.
                </p>
              </div>
            </div>

            <div className="about-card">
              <h3 className="about-card__title">
                <Bot className="about-card__title-icon" />
                Robotics Programs
              </h3>
              <div className="about-card__content">
                <p>
                  Our robotics curriculum combines engineering, electronics, and programming. Students design,
                  build, and program robots while learning teamwork, persistence, and creative problem-solving.
                </p>
              </div>
            </div>

            <div className="about-card">
              <h3 className="about-card__title">
                <Trophy className="about-card__title-icon" />
                Competition Preparation
              </h3>
              <div className="about-card__content">
                <p>
                  We prepare students for national robotics competitions, guiding them through project development,
                  testing, and presentation. Our teams consistently represent Lebanese schools with pride and excellence.
                </p>
              </div>
            </div>

            <div className="about-card">
              <h3 className="about-card__title">
                <Users className="about-card__title-icon" />
                School Partnerships
              </h3>
              <div className="about-card__content">
                <p>
                  We collaborate directly with schools to integrate our programs into their curriculum, providing
                  resources, training, and ongoing support to make technology education accessible to all students.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Who We Serve */}
        <div className="about-container">
          <div className="about-section">
            <div className="about-card mission-card who-we-serve-card">
              <h3 className="about-card__title">
                <Users className="about-card__title-icon" />
                Who We Serve
              </h3>
              <div className="about-card__content">
                <p>
                  Our programs are designed for students aged <strong>5 to 15 years old</strong>,
                  with age-appropriate curricula that grow with each student's abilities.
                </p>
                <div className="who-we-serve-grid">
                  <div className="age-group-box">
                    <div className="age-group-box__years">5-8</div>
                    <div className="age-group-box__label">Early Learners</div>
                  </div>
                  <div className="age-group-box">
                    <div className="age-group-box__years">9-12</div>
                    <div className="age-group-box__label">Intermediate</div>
                  </div>
                  <div className="age-group-box">
                    <div className="age-group-box__years">13-15</div>
                    <div className="age-group-box__label">Advanced</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="about-container" style={{ marginBottom: 0 }}>
          <div className="about-section location-section">
            <div className="about-card location-card">
              <MapPin className="location-card__icon" />
              <h3>Visit Us in Zgharta</h3>
              <p>
                Located in the heart of Zgharta, Lebanon, we're proud to serve our local community and schools
                across the region. Together, we're building a brighter technological future for Lebanese youth.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;


