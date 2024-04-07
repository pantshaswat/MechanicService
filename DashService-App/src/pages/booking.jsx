import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import HomePage from './homePage';

function validateJwt(token) {
  const payload = jwtDecode(token);
  return payload;
}


const BookingPage = () => {



  const [serviceCenters, setServiceCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [v, setV] = useState([]);
  const [formData, setFormData] = useState({
    userId: '',
    description: '',
    vehicleId: '',
    centerId: '',
    bookingSchedule: '',

  });
  const cookies = new Cookies();
  const token = cookies.get('token');
  const isAuthenticated = cookies.get('token') !== undefined;
  if (!isAuthenticated || !token) {
    return <HomePage />
  }
  useEffect(() => {

    const fetchServiceCenters = async () => {
      try {
        // Replace with your actual backend API endpoint
        const response = await axios.get('http://localhost:3000/appointments/getAllServiceProvider',
          { withCredentials: true }


        );

        console.log(response.data['serviceProviders'])
        setServiceCenters(response.data['serviceProviders']);
      } catch (error) {
        console.error('Error fetching service centers:', error);
      }
    };
    const fetchVehicles = async () => {
      try {
        // Replace with your actual backend API endpoint
        const response = await axios.get(`http://localhost:3000/vehicle/byId/65d72bbe3d32d88c3e241543`,
          { withCredentials: true }

        );
        if (response.status === 400) {
          console.log('Error fetching vehicles:', response.data);
        }
        console.log("fetched vehicles", response.data)
        setV([response.data]);
      } catch (error) {
        console.error('Error fetching service centers:', error);
      }
    };
    fetchVehicles();
    fetchServiceCenters();

  }, []);


  const handleSelectCenter = (center) => {
    setSelectedCenter(center);
    console.log(selectedCenter);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const handleBookService = async () => {
    const user = validateJwt(token);
    if(!user) return;
    // Add your booking logic here
    if (selectedCenter) {
      console.log('Booking service at:', selectedCenter);
      console.log('Booking details:', formData);

      const bookingData = {
        userId: user._id,
        description: formData.description,
        vehicleId: formData.vehicleId,
        centerId: selectedCenter._id,
        bookingSchedule: formData.bookingSchedule,

      };

      // Replace 'http://localhost:3000/your-backend-endpoint' with your actual backend endpoint
      const response = await axios.post('http://localhost:3000/appointments/book', bookingData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
        .then(response => {
          if (response.status === 201) {
            console.log(`Booked: ${response.data}`);
            navigate('/');
          }
        })
        .catch(error => {
          console.log(error)
        })
     
    } else {
      alert('Please select a service center before booking.');
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto mt-8 p-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Book Service</h2>

        {/* Service Center List */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {serviceCenters && serviceCenters.map((center, index) => (
            <div
              key={center._id}
              className={`p-4 border rounded-md cursor-pointer ${selectedCenter && selectedCenter._id === center._id
                  ? 'border-blue-500 bg-blue-100'
                  : 'border-gray-200 hover:border-blue-500 hover:bg-gray-50'
                }`}
              onClick={() => handleSelectCenter(center)}
            >
              <h3 className="text-lg font-semibold">{center.name}</h3>

              <p className="text-sm text-black">{center.about}</p>

              <p className="text-sm text-gray-500">{center.address}</p>
              <p className="text-sm text-gray-500">{center.services}</p>
              <p className="text-sm text-gray-500">{center.phoneNumber}</p>

            </div>
          ))}
        </div>

        {/* Selected Center Details */}
        {selectedCenter && (
          <div className="mt-8 p-4 border rounded-md">
            <h3 className="text-xl font-semibold mb-2">Selected Service Center</h3>
            <p>{selectedCenter.name}</p>
            <p>{selectedCenter.address}</p>
            <p>{selectedCenter.phoneNumber}</p>

          </div>
        )}

        {/* Booking Form */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Booking Form</h3>
          <form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>

            {/* Vehicle Selection */}
            <div>
              <label htmlFor="vehicleId" className="block text-sm font-medium text-gray-600">
                Select Vehicle:
              </label>
              <select
                id="vehicleId"
                name="vehicleId"
                value={formData.vehicleId}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              >
                <option value="" disabled>
                  Choose a vehicle
                </option>
                {v && v.map((vehicle) => (
                  <option key={vehicle._id} value={vehicle._id}>
                    {vehicle.model}
                  </option>

                ))}

              </select>
            </div>

            {/* Booking Schedule */}
            <div>
              <label htmlFor="bookingSchedule" className="block text-sm font-medium text-gray-600">
                Booking Schedule:
              </label>
              <select
                id="bookingSchedule"
                name="bookingSchedule"
                value={formData.bookingSchedule}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              >
                <option value="none">None</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </form>

          {/* Book Button */}
          <div className="mt-4">
            <button
              onClick={handleBookService}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              disabled={!selectedCenter}
            >
              Book Service
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPage;
