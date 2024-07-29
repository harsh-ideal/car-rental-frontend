import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Registration from './components/Registration';
import Login from './components/Login';
import AddCar from './components/AddCar';
import AvailableCars from './components/AvailableCars';
import BookedCars from './components/BookedCars';
import  {AuthProvider}  from './context/AuthContext.js';
import EditCar from './components/EditCar'
import MyBooking from './components/MyBooking.js';
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<AvailableCars />} />
              <Route path="/register/:userType" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="/add-car" element={<AddCar />} />
              <Route path="/booked-cars" element={<BookedCars />} />
              <Route path="/edit/:carid" element={<EditCar />} />
              <Route path="/myBooking" element={<MyBooking />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
