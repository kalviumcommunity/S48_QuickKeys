import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "./UpdateEntity.css";

function UpdateEntity() {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the ID from the URL parameters
    const [formData, setFormData] = useState({
      name: '',
      shortcut: '',
      description: ''
    });

    useEffect(() => {
        // Fetch the existing data for the entity
        axios.get(`http://localhost:3000/shortcuts/${id}`)
          .then(response => {
              setFormData(response.data);
          })
          .catch(error => {
              console.error('Error fetching entity data:', error);
          });
    }, [id]);

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      axios.put(`http://localhost:3000/updateentity/${id}`, formData)
        .then((response) => {
          console.log('Entity updated successfully:', response.data);
          navigate('/');
        })
        .catch((err) => {
          console.log('Error updating entity:', err);
        });
    };

    return(
        <div className="update-entity">
        <form onSubmit={handleSubmit}>
          <h2>Update Entity</h2>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
          <input type="text" name="shortcut" value={formData.shortcut} onChange={handleChange} placeholder="Shortcut" required />
          <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
          <button type="submit">Update Entity</button>
        </form>
      </div>

    );
}

export default UpdateEntity;
