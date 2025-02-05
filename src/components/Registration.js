// Registration.js
import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Loading from './loading';

const Registration = () => {
  const { userType } = useParams();
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}api/auth/register/${userType}`, formData);
      setUser(response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      console.error('Error registering:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <>
      {loading ? ( // Conditionally render loading screen
        <Loading />
      ) : (
        <>
          <h2 className="form-heading">Register as {userType}</h2>
          <form onSubmit={handleSubmit} className="car-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">Register</button>
          </form>
        </>
      )}
    </>
  );
};

export default Registration;
