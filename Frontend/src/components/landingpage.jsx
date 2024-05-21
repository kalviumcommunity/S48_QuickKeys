import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './landingpage.css';

const LandingPage = () => {
  const [shortcuts, setShortcuts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/dummy-data');
      setShortcuts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    console.log('Delete button clicked for id:', id);
    try {
      await axios.delete(`http://localhost:3000/shortcuts/${id}`);
      setShortcuts(shortcuts.filter((shortcut) => shortcut._id !== id));
    } catch (error) {
      console.error('Error deleting entity:', error);
    }
  };

  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="logo">QuickKeys</div>
        <div className="navbar-buttons">
          <Link to="/login" className="login">Login / Signup</Link>
          <Link to="/shortcuts" className="key">Add a Key</Link>
        </div>
      </nav>
      <div className="content">
        {shortcuts.map((shortcut, index) => (
          <div key={index} className="shortcut-box">
            <h2>{shortcut.name}</h2>
            <h4>{shortcut.description}</h4>
            <h4>Shortcut: {shortcut.shortcut}</h4>
            <div className='da-buttons'>
              <button className="delete" onClick={() => handleDelete(shortcut._id)}>Delete</button>
              <Link to={`/updateentity/${shortcut._id}`} className="update">Update</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
