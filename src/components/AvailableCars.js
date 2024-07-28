import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../card_style.css';
import { AuthContext } from '../context/AuthContext';

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [days, setDays] = useState('');
  const [startDate, setStartDate] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  console.log(user?.userid);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}api/cars`)
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the cars!', error);
      });
  }, []);

  const handleLogin=()=>{
    navigate('/login');
  }

  const handleRent = async (carId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    


    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/rent/${carId}`,
        { startDate, days },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Car rented successfully');
    } catch (error) {
      console.error('There was an error renting the car!', error);
    }
  };

  const handleEdit=async (carid)=>{
    navigate(`/edit/${carid}`);
  }

  const handleRemove=async (carid)=>{
    const token = localStorage.getItem('token');
    try{
      await axios.delete(`${process.env.REACT_APP_BASE_URL}api/car/remove/${carid}`,{headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }})
      alert('Car Remove Succesfully')
    }
    catch(err){
      console.log(err);
    }
    navigate('/');
  }


  return (
    <>
    <h2>Available Cars to Rent</h2>
    <div className='cards'>
  {cars.map((car) => (
    <div key={car._id} className='card'>
      {console.log(car)}
      <div className='card_img'>
        <img src={car.image.url} alt={car.model} />
      </div>
      <div className='card_content'>
        <p>Model: {car.model}</p>
        <p>Number: {car.number}</p>
        <p>Capacity: {car.capacity}</p>
        <p>Rent Per Day: {car.rentPerDay}</p>
        <p>Rent Per Day: {user?.userid}</p>
        <p>Rent Per Day: {car.agency}</p>
        {user?(
          <>
          {user.userType==="customer"&&(
          <>
          <div className='card_form'>
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
          <button onClick={() => handleRent(car._id)}>Book Car</button>
        </div></>)}
         {
          user?.userid===car.agency &&(<>
          <button onClick={() => handleRemove(car._id)}>Remove Car</button>
          <button onClick={() => handleEdit(car._id)}>Edit Information</button>
          </>)
         }
         {
          user?.userid!==car.agency &&(<></>)
         }
        </>):(
          <>
          <button onClick={() => handleLogin()}>Book Car</button>
        </>
      )}
        
      </div>
    </div>
  ))}
</div>

    </>
  );
};

export default AvailableCars;
