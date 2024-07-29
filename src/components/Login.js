import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../form.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(process.env.REACT_APP_BASE_URL);
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}api/auth/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data);
      navigate('/');
    } catch (error) {
      alert('Correct your email or password and try again /n Thanks you');
      console.error('There was an error logging in!', error);
      navigate('/');
    }
  };

  return (
    <>
  <h2 className="form-heading">Login</h2>
  <form onSubmit={handleSubmit} className="car-form">
    <div className="form-group">
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    </div>
    <div className="form-group">
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    </div>
    <button type="submit" className="submit-button">Login</button>
  </form>
</>

  );
};

export default Login;
