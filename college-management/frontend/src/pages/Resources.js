import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Resources.css';

const Resources = () => {
  const resources = [
    { title: 'Study Materials', desc: 'Notes, PDFs and subject materials for students.' },
    { title: 'Syllabus', desc: 'Semester-wise syllabus as per SNDT Women’s University.' },
    { title: 'Library Resources', desc: 'Books, journals and reference materials available in college library.' },
    { title: 'Digital Learning', desc: 'Online resources and e-learning materials for students.' }
  ];

  return (
    <div>
      <Navbar />

      <div className="page-header">
        <h1>Academic Resources</h1>
        <p>Learning materials and study support for students</p>
      </div>

      <section className="resources-section container">
        <div className="resources-grid">
          {resources.map((item, i) => (
            <div className="resource-card" key={i}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resources;
