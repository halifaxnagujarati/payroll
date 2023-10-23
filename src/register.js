import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from './img/logo.jpg';


// Register component definition
function Register() {
  // Hooks for routing and state management
  const history = useHistory();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    location: ''
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation logic
    if (formData.location === '') {
      alert('Please select a location.');
    } else {
      try {
        // Fetch API to post the registration data
        const response = await fetch('http://localhost:5000/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        // Error handling and success handling
        if (response.ok) {
          const data = await response.json();
          alert(data.message);
          history.push('/login'); // ensure you have a "/login" route in your Router
        } else {
          const errorData = await response.json();
          alert(errorData.error || 'User registration failed');
        }
      } catch (error) {
        console.error('Error registering user:', error.message);
        alert('User registration failed');
      }
    }
  };

  // JSX template
  return (
    <div className="container">
      <img src={logo} alt="Logo" style={{width: '100%', marginBottom: '20px'}} />
        <h2 style={{color: '#007BFF'}}>Register</h2>
        <form id="registrationForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <select id="location" name="location" value={formData.location} onChange={handleChange} required>
            <option value="">Select a location</option>
            <option value="Metro">Metro</option>
            <option value="Valley">Valley</option>
            <option value="Bridgewater">Bridgewater</option>
          </select>
        </div>
        <div>
                <label className="label" htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div style={{marginTop: '20px'}}>
                <button className="button" type="submit">Register</button>
            </div>
      </form>
    </div>
  );
}

// Exporting the component
export default Register;
