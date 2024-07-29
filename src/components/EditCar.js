import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../form.css';

const EditCar = () => {
  const { carid } = useParams();
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    model: '',
    number: '',
    capacity: '',
    rentPerDay: ''
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}api/car/edit/${carid}`);
        setFormData({
          model: response.data.model,
          number: response.data.number,
          capacity: response.data.capacity,
          rentPerDay: response.data.rentPerDay
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [formData,carid]);

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    const token = localStorage.getItem('token');

    try {
      await axios.put(`${process.env.REACT_APP_BASE_URL}api/car/edit/${carid}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      alert('Car modified successfully');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Error modifying car');
    }
  };

  return (
    <>
  <h2 className="form-heading">Edit Car Information</h2>
  <form onSubmit={handleSubmit} className="car-form">
    <div className="form-group">
      <label htmlFor="model">Model</label>
      <input type="text" id="model" name="model" value={formData.model} onChange={handleChange} required />
    </div>
    <div className="form-group">
      <label htmlFor="number">Number</label>
      <input type="text" id="number" name="number" value={formData.number} onChange={handleChange} required />
    </div>
    <div className="form-group">
      <label htmlFor="capacity">Capacity</label>
      <input type="number" id="capacity" name="capacity" value={formData.capacity} onChange={handleChange} required />
    </div>
    <div className="form-group">
      <label htmlFor="rentPerDay">Rent per Day</label>
      <input type="number" id="rentPerDay" name="rentPerDay" value={formData.rentPerDay} onChange={handleChange} required />
    </div>
    <button type="submit" className="submit-button">Edit Car</button>
  </form>
</>

  );
};

export default EditCar;
