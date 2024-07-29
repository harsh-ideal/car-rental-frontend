import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../BookedCars.css';
import Shimmer from './Shimmer';

const MyBooking = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${process.env.REACT_APP_BASE_URL}api/mybooked-cars`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the booked cars!', error);
      });
  }, []);

  return !user ?(<Shimmer />) : (
    <>
      <h2 className="header">My Bookings</h2>
      <div className="container">
        {user?.bookings?.map((booking) => (
          <div key={booking._id} className="car-container">
            <p>
              <span className="field-label">Model:</span> {booking.bookCar.model}
            </p>
            <p>
              <span className="field-label">Number:</span> {booking.bookCar.number}
            </p>
                <p>
                  <span className="field-label">Capacity:</span> {booking.bookCar.capacity}
                </p>
                <p>
                  <span className="field-label">Rent/Day:</span> {booking.bookCar.rentPerDay}
                </p>
                <p>
                  <span className="field-label">Agency's Name:</span> {booking.bookCar.agency}
                </p>
                <p>
                  <span className="field-label">Agency's Email:</span> {booking.bookCar.agencyEmail}
                </p>
                <p>
                  <span className="field-label">Start Date:</span> {new Date(booking.startDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="field-label">Number of Days:</span> {booking.days}
                </p>
                <p>
                  <span className="field-label">Bill Amount:</span> ₹{booking.bookCar.rentPerDay * booking.days}
                </p>
              
           
          </div>
        ))}
      </div>
    </>
  );
};

export default MyBooking;