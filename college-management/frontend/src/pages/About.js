import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import API from '../api/axios';
import './About.css';

const About = () => {
  const [aboutData, setAboutData] = useState({
    history: '',
    historyPhoto: '',
    vision: '',
    visionPhoto: '',
    mission: '',
    missionPhoto: '',
    achievements: '',
    achievementsPhoto: '',
    principalName: '',
    principalMessage: '',
    principalPhoto: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/about')
      .then(res => {
        setAboutData(res.data.about);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="loading">Loading...</div>
        <Footer />
      </div>
    );
  }

  const cards = [
    {
      icon: '🏛️',
      title: 'Our History',
      text: aboutData.history,
      photo: aboutData.historyPhoto
    },
    {
      icon: '🎯',
      title: 'Our Vision',
      text: aboutData.vision,
      photo: aboutData.visionPhoto
    },
    {
      icon: '🚀',
      title: 'Our Mission',
      text: aboutData.mission,
      photo: aboutData.missionPhoto
    },
    {
      icon: '🏆',
      title: 'Our Achievements',
      text: aboutData.achievements,
      photo: aboutData.achievementsPhoto
    },
  ];

  return (
    <div>
      <Navbar />

      <div className="page-header">
        <h1>About Us</h1>
        <p>Learn about our history, vision, and mission</p>
      </div>

      <section className="about-section container">
        <div className="about-grid">
          {cards.map((card, i) => (
            <div className="about-info-card" key={i}>
              <div className="about-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              {card.photo && (
                <img
                  src={card.photo}
                  alt={card.title}
                  style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    marginBottom: '12px'
                  }}
                />
              )}
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="principal-section">
        <div className="container">
          <h2 className="section-title text-center">Principal's Message</h2>
          <div className="principal-card">
            <div className="principal-avatar">
              {aboutData.principalPhoto ? (
                <img
                  src={aboutData.principalPhoto}
                  alt="Principal"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%'
                  }}
                />
              ) : (
                <span style={{ fontSize: '4rem' }}>👩‍💼</span>
              )}
            </div>
            <div className="principal-message">
              <h3>From the Desk of the Principal</h3>
              <p>"{aboutData.principalMessage}"</p>
              <br />
              <p className="principal-name">
                — {aboutData.principalName}
              </p>
              <p style={{ fontSize: '13px', color: '#666' }}>
                Late Kalpana Chawla Mahila Senior Science & Arts College, Gangakhed
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section container">
        <h2 className="section-title text-center">Our Core Values</h2>
        <div className="values-grid">
          {[
            'Women Empowerment',
            'Accessibility',
            'Excellence & Quality',
            'Inclusivity & Dignity',
            'Social Justice',
            'Human Values',
            'Nation-Building',
            'Continuous Improvement'
          ].map((value, i) => (
            <div className="value-badge" key={i}>{value}</div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;