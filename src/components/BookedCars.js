import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookedCars = () => {
  const [bookedCars, setBookedCars] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${process.env.BASE_URL}api/booked-cars`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setBookedCars(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the booked cars!', error);
      });
  }, []);

  return (
    <div>
      <h2>Booked Cars</h2>
      {bookedCars.map((car) => (
        <div key={car._id}>
          <p>Model: {car.model}</p>
          <p>Number: {car.number}</p>
          {car.bookings.map((booking) => (
            <div key={booking._id}>
              <p>Customer: {booking.customer.name}</p>
              <p>Email: {booking.customer.email}</p>
              <p>Start Date: {booking.startDate}</p>
              <p>Number of Days: {booking.days}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BookedCars;
