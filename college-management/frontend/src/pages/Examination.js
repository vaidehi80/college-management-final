import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Examination.css';

const Examination = () => {
  const exams = [
    { title: 'Exam Schedule', desc: 'Semester and annual examination timetable.' },
    { title: 'Results', desc: 'Check examination results and updates.' },
    { title: 'Hall Tickets', desc: 'Download hall tickets for upcoming examinations.' },
    { title: 'Exam Notices', desc: 'Important examination announcements and guidelines.' }
  ];

  return (
    <div>
      <Navbar />

      <div className="page-header">
        <h1>Examination</h1>
        <p>Exam schedules, results and important notices</p>
      </div>

      <section className="exam-section container">
        <div className="exam-grid">
          {exams.map((item, i) => (
            <div className="exam-card" key={i}>
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

export default Examination;
