import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


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
      console.error('There was an error logging in!', error);
    }
  };

  return (
    <div>
      <h2>Login </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
