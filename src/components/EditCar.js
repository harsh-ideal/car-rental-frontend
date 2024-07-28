import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditCar = () => {
  const { carid } = useParams();
  const [item, setItem] = useState({});
  const [formData, setFormData] = useState({
    model: '',
    number: '',
    capacity: '',
    rentPerDay: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/car/edit/${carid}`);
        setItem(response.data);
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
  }, [carid]);

  console.log(item);

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
    } catch (err) {
      console.error(err);
      alert('Error modifying car');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Model</label>
        <input type="text" name="model" value={formData.model} onChange={handleChange} required />
      </div>
      <div>
        <label>Number</label>
        <input type="text" name="number" value={formData.number} onChange={handleChange} required />
      </div>
      <div>
        <label>Capacity</label>
        <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} required />
      </div>
      <div>
        <label>Rent per Day</label>
        <input type="number" name="rentPerDay" value={formData.rentPerDay} onChange={handleChange} required />
      </div>
      <button type="submit">Edit Car</button>
    </form>
  );
};

export default EditCar;
