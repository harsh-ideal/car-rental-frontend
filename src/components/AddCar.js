// AddCar.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../form.css';
import Loading from './loading'; // Import the Loading component

const AddCar = () => {
  const [formData, setFormData] = useState({
    model: '',
    number: '',
    capacity: '',
    rentPerDay: '',
    image: null,
  });
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    const data = new FormData();
    data.append('model', formData.model);
    data.append('number', formData.number);
    data.append('capacity', formData.capacity);
    data.append('rentPerDay', formData.rentPerDay);
    data.append('car_img', formData.image);
    const token = localStorage.getItem('token');

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}api/cars`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      alert('Car added successfully');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Error adding car');
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <>
      {loading ? ( // Conditionally render loading screen
        <Loading />
      ) : (
        <>
          <h2 className="form-heading">Add Your Car For Rent</h2>
          <form onSubmit={handleSubmit} className="car-form">
            <div className="form-group">
              <label htmlFor="model">Model</label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="number">Number</label>
              <input
                type="text"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="capacity">Capacity</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="rentPerDay">Rent per Day</label>
              <input
                type="number"
                id="rentPerDay"
                name="rentPerDay"
                value={formData.rentPerDay}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="car_img">Image</label>
              <input
                type="file"
                id="car_img"
                name="car_img"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">Add Car</button>
          </form>
        </>
      )}
    </>
  );
};

export default AddCar;
