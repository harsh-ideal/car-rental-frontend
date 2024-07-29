import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${process.env.REACT_APP_BASE_URL}api/auth/user`, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => 
          {
            console.log(response.data);
            setUser(response.data);

        })
        .catch(() => localStorage.removeItem('token'));
        
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
