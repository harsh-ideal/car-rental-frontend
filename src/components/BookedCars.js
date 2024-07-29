import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../BookedCars.css';

const BookedCars = () => {
  const [bookedCars, setBookedCars] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${process.env.REACT_APP_BASE_URL}api/booked-cars`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setBookedCars(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the booked cars!', error);
      });
  }, []);

  return (
    <>
      <h2 className="header">Booked Cars</h2>
      <div className="container">
        {bookedCars.map((car) => (
          <div key={car._id} className="car-container">
            <p>
              <span className="field-label">Model:</span> {car.model}
            </p>
            <p>
              <span className="field-label">Number:</span> {car.number}
            </p>
            {car.bookings.map((booking) => (
              <div key={booking._id} className="booking-container">
                <p>
                  <span className="field-label">Customer:</span> {booking.customer.name}
                </p>
                <p>
                  <span className="field-label">Email:</span> {booking.customer.email}
                </p>
                <p>
                  <span className="field-label">Start Date:</span> {new Date(booking.startDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="field-label">Number of Days:</span> {booking.days}
                </p>
                <p>
                  <span className="field-label">Bill Amount:</span> ₹{car.rentPerDay * booking.days}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default BookedCars;
