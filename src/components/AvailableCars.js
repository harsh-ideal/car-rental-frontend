import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../card_style.css';
import { AuthContext } from '../context/AuthContext';
import Shimmer from './Shimmer';

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [days, setDays] = useState('');
  const [startDate, setStartDate] = useState('');
  const [loadingCarId, setLoadingCarId] = useState(null); // Loading state for each car
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}api/cars`)
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the cars!', error);
      });
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRent = async (carId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setLoadingCarId(carId); // Set loading state for the specific car

    try {
      await axios.post(
       `${process.env.REACT_APP_BASE_URL}api/rent/${carId}`,
        { startDate, days },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('Car rented successfully');
      navigate('/');
    } catch (error) {
      console.error('There was an error renting the car!', error);
    } finally {
      setLoadingCarId(null); // Clear loading state after the request is finished
    }
  };

  const handleEdit = async (carId) => {
    navigate(`/edit/${carId}`);
  };

  const handleRemove = async (carId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}api/car/remove/${carId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization:` Bearer ${token}`
        }
      });
      alert('Car removed successfully. Let\'s add a new car');
      navigate("/add-car");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {(!user && !cars) ? (
        <Shimmer />
      ) : (
        <>
          <h2 className="header">Available Cars to Rent</h2>
          <div className="cards">
            {cars.map((car) => (
              <div key={car._id} className="card">
                <div className="card_img">
                  <img src={car.image.url} alt={car.model} />
                </div>
                <div className="card_content">
                  <p><span>Model:</span> {car.model}</p>
                  <p><span>Number:</span> {car.number}</p>
                  <p><span>Capacity:</span> {car.capacity}</p>
                  <p><span>Rent Per Day:</span> ₹{car.rentPerDay}</p>
                  <p><span>Agency's Name:</span> {car.agency.name}</p>
                  <p><span>Agency's Email:</span> {car.agency.email}</p>
                  {user ? (
                    <>
                      {user.userType === "customer" && (
                        <div className="card_form">
                          <input
                            type="number"
                            placeholder="Number of Days"
                            value={days}
                            onChange={(e) => setDays(e.target.value)}
                          />
                          <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                          <button className="card_button" onClick={() => handleRent(car._id)}>
                            {loadingCarId === car._id ? 'Loading...' : 'Book Car'}
                          </button>
                        </div>
                      )}
                      {user.userid === car.agency._id && (
                        <div className="agency_actions">
                          <button className="card_button" onClick={() => handleRemove(car._id)}>Remove Car</button>
                          <button className="card_button" onClick={() => handleEdit(car._id)}>Edit Information</button>
                        </div>
                      )}
                    </>
                  ) : (
                    <button className="card_button" onClick={handleLogin}>Book Car</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default AvailableCars;