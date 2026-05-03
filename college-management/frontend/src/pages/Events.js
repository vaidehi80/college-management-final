import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import API from '../api/axios';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/events')
      .then(res => {
        setEvents(res.data.events || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categoryColors = {
    cultural: '#AD1457',
    sports: '#1565C0',
    academic: '#2E7D32',
    other: '#546E7A'
  };

  return (
    <div>
      <Navbar />

      <div className="page-header">
        <h1>Events</h1>
        <p>Stay updated with college events and activities</p>
      </div>

      <section className="events-section container">
        {loading ? (
          <div className="loading">Loading events...</div>
        ) : events.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <p style={{ fontSize: '4rem' }}>🗓️</p>
            <h3 style={{ color: '#333', marginBottom: '8px' }}>No Events Yet</h3>
            <p style={{ color: '#888' }}>Check back soon for upcoming events!</p>
          </div>
        ) : (
          <div className="events-list">
            {events.map(event => (
              <div className="event-list-card" key={event._id}>
                <div className="event-date-box">
                  <span className="event-day">
                    {new Date(event.date).getDate()}
                  </span>
                  <span className="event-month">
                    {new Date(event.date).toLocaleString('default', { month: 'short' })}
                  </span>
                  <span className="event-year">
                    {new Date(event.date).getFullYear()}
                  </span>
                </div>
                <div className="event-list-info">
                  <div className="event-list-header">
                    <h3>{event.title}</h3>
                    <span
                      className="event-category-badge"
                      style={{ background: categoryColors[event.category] || '#1565C0' }}>
                      {event.category}
                    </span>
                  </div>
                  {event.description && <p>{event.description}</p>}
                  {event.venue && (
                    <p className="event-venue">📍 {event.venue}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Events;