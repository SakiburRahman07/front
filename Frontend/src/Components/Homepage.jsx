import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css'; // Import the CSS file

const Homepage = () => {
  const [formData, setFormData] = useState({
    fromStation: '',
    toStation: '',
    date: '',
    seatType: '' // Add seatType to formData state
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Send form data to the backend via POST request
    fetch('http://localhost:8081/trains/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Train Data:', data);
        // Pass data to the next page with navigate
        navigate('/trains', { state: { trainData: data } });
      })
      .catch(error => console.error('Error fetching train data:', error));
  };

  return (
    <div className="homepage-container">
      <div className="image-container">
        <img 
          src="src/assets/train2.png" 
          className="App-logo" 
          alt="Train logo" 
          style={{ width: '400px', height: 'auto' }} 
        />
      </div>
      <div className="form-container">
        <h1>Railway Reservation System</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>From Station:</label>
            <input
              type="text"
              name="fromStation"
              value={formData.fromStation}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>To Station:</label>
            <input
              type="text"
              name="toStation"
              value={formData.toStation}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Seat Type:</label>
            <select
              name="seatType"
              value={formData.seatType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Seat Type</option>
              <option value="shovon">Shovon (Non-AC)</option>
              <option value="snigdha">Snigdha (AC)</option>
            </select>
          </div>
          <button type="submit">Next</button> 
        </form>
      </div>
    </div>
  );
};

export default Homepage;
