import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
 console.log(user?.userid);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
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
                    <button onClick={() => { logout(); setIsOpen(false); }}>Logout</button>
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
                    <button onClick={() => { logout(); setIsOpen(false); }}>Logout</button>
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
  );
};

export default Header;
