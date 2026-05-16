import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />

      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(13, 27, 62, 0.88) 0%, rgba(21, 101, 192, 0.82) 100%), url('https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80')`,
        }}
      >
        <div className="hero-content">

          {/* SNDT Logo + Badge */}
          <div className="hero-affiliation">
            <img
              src="/sndt-logo.png"
              alt="SNDT Logo"
              className="affiliation-logo"
            />
            <span className="hero-badge">
              ✨ Affiliated to SNDT Women's University, Mumbai
            </span>
          </div>

          <h1>
            Late Kalpana Chawala Women's
            <br />
            <span className="hero-highlight">Senior College</span>
          </h1>

          <h2>Empowering Women Through Excellence in Education</h2>

          <p>Senior Science & Arts College, Gangakhed, Parbhani</p>

          <div className="hero-buttons">
            <Link to="/admissions" className="btn btn-hero-primary">
              Apply for Admission →
            </Link>

            <Link to="/about" className="btn btn-hero-primary">
              Discover More
            </Link>
          </div>

          <div className="hero-trust">
            <div className="trust-item">
              <strong>500+</strong>
              <span>Students</span>
            </div>

            <div className="trust-divider"></div>

            <div className="trust-item">
              <strong>26+</strong>
              <span>Faculty</span>
            </div>

            <div className="trust-divider"></div>

            <div className="trust-item">
              <strong>10+</strong>
              <span>Years</span>
            </div>
          </div>
        </div>
      </section>

      {/* Inspiration Quote Section */}
      <section className="inspiration">
        <div className="container">
          <div className="inspiration-grid">

            <div className="inspiration-image">
              <img src="/kalpna-chawla.png" alt="Kalpana Chawla" />

              <div className="inspiration-name">
                <strong>Kalpana Chawla</strong>
                <span>1962 — 2003 • First Indian Woman in Space</span>
              </div>
           

            <div className="inspiration-text">
              <span className="section-tag">Our Inspiration</span>

              <h2>
                "The path from dreams to success does exist. May you have the
                vision to find it."
              </h2>

              <p>
                Our college proudly bears the name of{' '}
                <strong>Kalpana Chawla</strong> — the first Indian-born woman to
                journey into space. Her courage, dedication, and pursuit of
                knowledge inspires every student who walks through our doors. We
                strive to nurture the same spirit of curiosity and ambition in
                the women of Marathwada.
              </p>

              <Link to="/about" className="link-arrow">
                Read Our Story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="stat-card">
          <h2>500+</h2>
          <p>Students Enrolled</p>
        </div>

        <div className="stat-card">
          <h2>30+</h2>
          <p>Expert Faculty</p>
        </div>

        <div className="stat-card">
          <h2>2+</h2>
          <p>Courses Offered</p>
        </div>

        <div className="stat-card">
          <h2>10+</h2>
          <p>Years of Excellence</p>
        </div>
      </section>

      {/* About Preview */}
<section className="about-preview container">
  <div className="about-text">
    <h2 className="section-title">About Our College</h2>

    <p className="section-subtitle">
      Dedicated to empowering women with quality education
    </p>

    <p>
      Late Kalpana Chawla Mahila Senior Science and Arts College,
      Gangakhed is committed to providing excellent education to women in
      the Marathwada region.
    </p>

    <br />

    <p>
      Affiliated to SNDT Women's University and run by Vidyaniketan
      Sevabhavi Sanstha.
    </p>

    <br />

    <Link to="/about" className="btn btn-primary">
      Read More
    </Link>
  </div>

  <div className="about-image">
    <div className="image-placeholder">🏫</div>
  </div>
</section>

      {/* Why Choose Us */}
      <section className="features">
        <div className="container">

          <div className="section-header text-center">
            <span className="section-tag">Why Choose Us</span>

            <h2 className="section-title">
              A Foundation Built on Excellence
            </h2>

            <p className="section-subtitle">
              Everything your daughter needs to thrive academically and
              personally
            </p>
          </div>

          <div className="features-grid">

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
                </svg>
              </div>

              <h3>Quality Education</h3>

              <p>
                Affiliated to SNDT Women's University with rigorous,
                industry-relevant curriculum in Arts and Sciences.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>

              <h3>Experienced Faculty</h3>

              <p>
                30+ qualified educators dedicated to mentoring students and
                unlocking their full potential.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.11 0-2 .89-2 2v14c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>

              <h3>Modern Facilities</h3>

              <p>
                Well-equipped laboratories, library, and classrooms designed
                for collaborative learning.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.06 13.54L7.4 12l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.64 5.66z"/>
                </svg>
              </div>

              <h3>Safe Environment</h3>

              <p>
                A secure, supportive campus exclusively for women, fostering
                confidence and growth.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-bg-pattern"></div>

        <div className="cta-content">
          <span className="cta-tag">Begin Your Journey</span>

          <h2>
            Your future starts here.
            <br />
            Apply for Admission Today.
          </h2>

          <p>
            Join 500+ ambitious women who are writing their own success stories
            at LKCWSC.
          </p>

          <div className="hero-buttons">
            <Link to="/admissions" className="btn btn-hero-primary">
              Apply Now →
            </Link>

            <Link to="/contact" className="btn btn-hero-secondary">
              Talk to Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
