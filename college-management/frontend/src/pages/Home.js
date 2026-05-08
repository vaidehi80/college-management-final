import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import API from '../api/axios';
import './Home.css';

const Home = () => {
  const [notices, setNotices] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get('/notices').then(res => setNotices(res.data.notices?.slice(0, 3) || [])).catch(() => {});
    API.get('/courses').then(res => setCourses(res.data.courses?.slice(0, 3) || [])).catch(() => {});
  }, []);

  return (
    <div className="home-page">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-badge">✨ Affiliated to SNDT Women's University</span>
          <h1>Late Kalpana Chawala Women's<br /><span className="hero-highlight">Senior College</span></h1>
          <h2>Empowering Women Through Excellence in Education</h2>
          <p>Senior Science & Arts College, Gangakhed, Parbhani — Inspiring future leaders, scientists, and changemakers since our inception.</p>
          <div className="hero-buttons">
            <Link to="/admissions" className="btn btn-hero-primary">Apply for Admission →</Link>
            <Link to="/about" className="btn btn-hero-secondary">Discover More</Link>
          </div>
          <div className="hero-trust">
            <div className="trust-item">
              <strong>500+</strong>
              <span>Students</span>
            </div>
            <div className="trust-divider"></div>
            <div className="trust-item">
              <strong>30+</strong>
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
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Kalpana_Chawla%2C_NASA_photo_portrait_in_orange_suit.jpg/440px-Kalpana_Chawla%2C_NASA_photo_portrait_in_orange_suit.jpg" alt="Kalpana Chawla" />
              <div className="inspiration-name">
                <strong>Kalpana Chawla</strong>
                <span>1962 — 2003 • First Indian Woman in Space</span>
              </div>
            </div>
            <div className="inspiration-text">
              <span className="section-tag">Our Inspiration</span>
              <h2>"The path from dreams to success does exist. May you have the vision to find it."</h2>
              <p>Our college proudly bears the name of <strong>Kalpana Chawla</strong> — the first Indian-born woman to journey into space. Her courage, dedication, and pursuit of knowledge inspires every student who walks through our doors. We strive to nurture the same spirit of curiosity and ambition in the women of Marathwada.</p>
              <Link to="/about" className="link-arrow">Read Our Story →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="features">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Why Choose Us</span>
            <h2 className="section-title">A Foundation Built on Excellence</h2>
            <p className="section-subtitle">Everything your daughter needs to thrive academically and personally</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
