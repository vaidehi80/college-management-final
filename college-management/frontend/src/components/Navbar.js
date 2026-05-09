import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (user?.role === 'admin') return '/admin/dashboard';
    if (user?.role === 'staff') return '/staff/dashboard';
    return '/student/dashboard';
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <img src="/college-logo.png" alt="LKCWSC Logo" className="brand-logo-img" />
          <div className="brand-text">
            <span className="brand-name">Late Kalpana Chawala Women's Senior College</span>
            <span className="brand-sub">Senior Science & Arts College, Gangakhed</span>
          </div>
        </Link>
      </div>
      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/courses" onClick={() => setMenuOpen(false)}>Courses</Link>
        <Link to="/faculty" onClick={() => setMenuOpen(false)}>Faculty</Link>
        <Link to="/gallery" onClick={() => setMenuOpen(false)}>Gallery</Link>
        <Link to="/events" onClick={() => setMenuOpen(false)}>Events</Link>
        <Link to="/admissions" onClick={() => setMenuOpen(false)}>Admissions</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        {user ? (
          <>
            <Link
              to={getDashboardLink()}
              onClick={() => setMenuOpen(false)}
              style={{ color: 'white', fontWeight: '600' }}>
              Dashboard
            </Link>
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" onClick={() => setMenuOpen(false)}>
            <button className="btn">Login</button>
          </Link>
        )}
      </div>
      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
