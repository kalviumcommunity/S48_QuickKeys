import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./addentity.css";


function AddEntity() {
    const [formData, setFormData] = useState({
      name: '',
      Shortcut: '',
      description: ''
    });
  
    // const [entityAdded, setEntityAdded] = useState(false); // State for tracking form submission
    const navigate = useNavigate()
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('http://localhost:3000/shortcuts', formData)
        .then((response) => {
          console.log('Entity added successfully:', response.data);
          // setEntityAdded(true); // Set state to true for successful form submission
          navigate('/')
        })
        .catch((err) => {
          console.log('Error adding entity:', err);
        });
    };
  
    return (
      <div className="add-entity">
        <form onSubmit={handleSubmit}>
          <h2>Add New Entity</h2>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
          <input type="text" name="shortcut" value={formData.shortcut} onChange={handleChange} placeholder="shortcut" required />
          <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="description" required />
          <button type="submit">Add Entity</button>
        </form>
      </div>
    );
  }
  
  export default AddEntity;