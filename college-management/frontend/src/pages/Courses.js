import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import API from '../api/axios';
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/courses')
      .then(res => {
        setCourses(res.data.courses || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const defaultCourses = [
    {
      _id: '1',
      name: 'Bachelor of Arts',
      code: 'BA',
      type: 'BA',
      duration: '3 Years',
      eligibility: '10+2 Pass from any recognized board',
      description: 'BA program covers subjects like Hindi, English, History, Geography, Political Science, Economics, Sociology and more.',
      syllabus: 'Semester-wise syllabus as per SNDT Women\'s University. 6 semesters over 3 years.'
    },
    {
      _id: '2',
      name: 'Bachelor of Science',
      code: 'BSc',
      type: 'BSc',
      duration: '3 Years',
      eligibility: '10+2 with Science stream (PCM or PCB)',
      description: 'BSc program covers Physics, Chemistry, Mathematics, Biology and Computer Science. Practical sessions in well-equipped laboratories.',
      syllabus: 'Semester-wise syllabus as per SNDT Women\'s University. 6 semesters over 3 years.'
    },
  ];

  const displayCourses = courses.length > 0 ? courses : defaultCourses;

  const courseIcons = {
    'BA': '📖',
    'BSc': '🔬',
    'Other': '📚'
  };

  return (
    <div>
      <Navbar />

      <div className="page-header">
        <h1>Our Courses</h1>
        <p>Undergraduate programs affiliated to SNDT Women's University</p>
      </div>

      <section className="courses-section container">
        {loading ? (
          <div className="loading">Loading courses...</div>
        ) : (
          <div className="courses-detail-grid">
            {displayCourses.map(course => (
              <div className="course-detail-card" key={course._id}>

                <div className="course-detail-header">
                  <div className="course-detail-icon">
                    {courseIcons[course.type] || '📚'}
                  </div>
                  <div>
                    <h2>{course.name}</h2>
                    <span className="course-type-badge">{course.type}</span>
                  </div>
                </div>

                <div className="course-info-grid">
                  <div className="course-info-item">
                    <span className="info-label">⏱ Duration</span>
                    <span className="info-value">{course.duration}</span>
                  </div>
                  <div className="course-info-item">
                    <span className="info-label">✅ Eligibility</span>
                    <span className="info-value">
                      {course.eligibility || '10+2 Pass'}
                    </span>
                  </div>
                  <div className="course-info-item">
                    <span className="info-label">🎓 Affiliation</span>
                    <span className="info-value">SNDT Women's University</span>
                  </div>
                  <div className="course-info-item">
                    <span className="info-label">🏫 College</span>
                    <span className="info-value">LKCWSC Gangakhed</span>
                  </div>
                </div>

                {course.description && (
                  <div className="course-description">
                    <h4>About This Course</h4>
                    <p>{course.description}</p>
                  </div>
                )}

                {course.syllabus && (
                  <div className="course-syllabus">
                    <h4>📋 Syllabus</h4>
                    <p>{course.syllabus}</p>
                  </div>
                )}

                <Link
                  to={`/admissions?course=${course.type}`}
                  className="btn btn-primary course-apply-btn">
                  Apply for {course.name}
                </Link>

              </div>
            ))}
          </div>
        )}
      </section>

      <section className="admission-cta">
        <div className="container">
          <h2>Ready to Apply?</h2>
          <p>Admissions open for 2024-25 academic year</p>
          <Link to="/admissions" className="btn btn-primary">
            Apply for Admission
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Courses;