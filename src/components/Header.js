// Header.js
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../Header.css';
import Loading from './loading'; // Import the Loading component

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    setLoading(true); // Set loading to true
    await logout();
    setLoading(false); // Set loading to false
    navigate('/');
    setIsOpen(false);
  };

  return (
    <>
      {loading ? (
        <Loading /> // Conditionally render loading screen
      ) : (
        <header>
          <nav>
            <div className={`hamburger ${isOpen ? 'toggle' : ''}`} onClick={toggleMenu}>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <ul className={isOpen ? 'show' : ''}>
              <li>
                <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
              </li>
              {user ? (
                <>
                  {user.userType === 'customer' && (
                    <>
                      <li>
                        <Link to="/" onClick={() => setIsOpen(false)}>Available Cars</Link>
                      </li>
                      <li>
                        <Link to="/myBooking" onClick={() => setIsOpen(false)}>My Booking</Link>
                      </li>
                      <li>
                        <button onClick={handleLogout}>Logout</button>
                      </li>
                    </>
                  )}
                  {user.userType === 'agency' && (
                    <>
                      <li>
                        <Link to="/add-car" onClick={() => setIsOpen(false)}>Add Car</Link>
                      </li>
                      <li>
                        <Link to="/booked-cars" onClick={() => setIsOpen(false)}>Booked Cars</Link>
                      </li>
                      <li>
                        <button onClick={handleLogout}>Logout</button>
                      </li>
                    </>
                  )}
                </>
              ) : (
                <>
                  <li>
                    <Link to="/register/customer" onClick={() => setIsOpen(false)}>Register as Customer</Link>
                  </li>
                  <li>
                    <Link to="/register/agency" onClick={() => setIsOpen(false)}>Register as Agency</Link>
                  </li>
                  <li>
                    <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </header>
      )}
    </>
  );
};

export default Header;
