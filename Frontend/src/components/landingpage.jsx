import React from 'react';
import { Link } from 'react-router-dom';
import './landingpage.css'; // Assuming you have a corresponding CSS file

const LandingPage = () => {
  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="logo">QuickKeys</div>
        <div className="navbar-buttons">
          <Link to="/login" className="button">Login / Signup</Link>
          <button className="liked-button">Liked</button>
        </div>
      </nav>
      <div className="content">
        <div className="shortcut-box" onClick={() => { window.location.href = '/windows-shortcuts' }}>
          <h2>Windows</h2>
          <p>Click here to view Windows shortcut keys</p>
        </div>
        <div className="shortcut-box" onClick={() => { window.location.href = '/macos-shortcuts' }}>
          <h2>macOS</h2>
          <p>Click here to view macOS shortcut keys</p>
        </div>
        <div className="shortcut-box" onClick={() => { window.location.href = '/linux-shortcuts' }}>
          <h2>Linux</h2>
          <p>Click here to view Linux shortcut keys</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
