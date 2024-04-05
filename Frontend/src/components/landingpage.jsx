import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import './landingpage.css';

const LandingPage = () => {
  const [shortcuts, setShortcuts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/dummy-data'); // Use Axios to make GET request
      setShortcuts(response.data); // Set shortcuts state with response data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="logo">QuickKeys</div>
        <div className="navbar-buttons">
          <Link to="/login" className="button">Login / Signup</Link>
        </div>
      </nav>
      <div className="content">
        {shortcuts.map((shortcut, index) => (
          <div key={index} className="shortcut-box">
            <h2>{shortcut.name}</h2>
            <p>{shortcut.description}</p>
            <p>Shortcut: {shortcut.shortcut}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
