import React, { useState } from 'react';
import axios from 'axios';

const AddCar = () => {
  const [formData, setFormData] = useState({
    model: '',
    number: '',
    capacity: '',
    rentPerDay: '',
    image: null,
  });

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

    const data = new FormData();
    data.append('model', formData.model);
    data.append('number', formData.number);
    data.append('capacity', formData.capacity);
    data.append('rentPerDay', formData.rentPerDay);
    data.append('car_img', formData.image);
    const token=localStorage.getItem('token')

    try {
      await axios.post(`${process.env.BASE_URL}api/cars`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      alert('Car added successfully');
    } catch (err) {
      console.error(err);
      alert('Error adding car');
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
      <div>
        <label>Image</label>
        <input type="file" name="car_img" accept="image/*" onChange={handleImageChange} required />
      </div>
      <button type="submit">Add Car</button>
    </form>
  );
};

export default AddCar;
