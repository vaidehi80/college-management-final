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
    API.get('/notices').then(res => setNotices(res.data.notices?.slice(0, 3) || []));
    API.get('/courses').then(res => setCourses(res.data.courses?.slice(0, 3) || []));
  }, []);

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Late Kalpana Chawla Mahila Senior Science & Arts College</h1>
          <h2>Gangakhed, Marathwada, Maharashtra</h2>
          <p>Empowering women through quality education — Affiliated to SNDT Women's University</p>
          <div className="hero-buttons">
            <Link to="/admissions" className="btn btn-primary">Apply Now</Link>
            <Link to="/about" className="btn btn-secondary">Learn More</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="stat-card">
          <h2>800+</h2>
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
          <p className="section-subtitle">Dedicated to empowering women with quality education</p>
          <p>Late Kalpana Chawla Mahila Senior Science and Arts College, Gangakhed is committed to providing excellent education to women in the Marathwada region. Named after the legendary astronaut Kalpana Chawla, our college inspires students to reach for the stars.</p>
          <br />
          <p>Affiliated to SNDT Women's University and run by Vidyaniketan Sevabhavi Sanstha, we offer undergraduate programs in Science and Arts with experienced faculty and a supportive learning environment.</p>
          <br />
          <Link to="/about" className="btn btn-primary">Read More</Link>
        </div>
        <div className="about-image">
          <div className="image-placeholder">🏫</div>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="courses-preview">
        <div className="container">
          <h2 className="section-title text-center">Our Courses</h2>
          <p className="section-subtitle text-center">Choose from our undergraduate programs</p>
          <div className="courses-grid">
            {courses.length > 0 ? courses.map(course => (
              <div className="course-card" key={course._id}>
                <div className="course-icon">📚</div>
                <h3>{course.name}</h3>
                <p>{course.type} • {course.duration}</p>
                <Link to={`/admissions?course=${course.type}`} className="btn btn-secondary">
                  Apply Now
                </Link>
              </div>
            )) : (
              <>
                <div className="course-card">
                  <div className="course-icon">📖</div>
                  <h3>Bachelor of Arts</h3>
                  <p>BA • 3 Years</p>
                  <Link to="/admissions?course=BA" className="btn btn-secondary">Apply Now</Link>
                </div>
                <div className="course-card">
                  <div className="course-icon">🔬</div>
                  <h3>Bachelor of Science</h3>
                  <p>BSc • 3 Years</p>
                  <Link to="/admissions?course=BSc" className="btn btn-secondary">Apply Now</Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Notices */}
      <section className="notices-preview container">
        <h2 className="section-title text-center">Latest Notices</h2>
        <p className="section-subtitle text-center">Stay updated with latest announcements</p>
        <div className="notices-list">
          {notices.length > 0 ? notices.map(notice => (
            <div className="notice-item" key={notice._id}>
              <span className="notice-badge">{notice.category}</span>
              <h4>{notice.title}</h4>
              <p>{new Date(notice.createdAt).toLocaleDateString()}</p>
            </div>
          )) : (
            <div className="notice-item">
              <span className="notice-badge">general</span>
              <h4>Welcome to Late Kalpana Chawla Mahila Senior Science & Arts College</h4>
              <p>Admissions open for 2024-25 academic year</p>
            </div>
          )}
        </div>
        <div className="text-center" style={{marginTop:'20px'}}>
          <Link to="/notices" className="btn btn-primary">View All Notices</Link>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Start Your Journey With Us</h2>
          <p>Join hundreds of women who have transformed their lives through education</p>
          <div className="hero-buttons">
            <Link to="/admissions" className="btn btn-primary">Apply for Admission</Link>
            <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
