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

const RoadSideRequestPage = () => {
  const [serviceCenters, setServiceCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [formData, setFormData] = useState({
    centerid: '',
    description: '',
    location: [] // Location data will be stored here
  });

  const cookies = new Cookies();
  const token = cookies.get('token');
  const isAuthenticated = cookies.get('token') !== undefined;
  const navigate = useNavigate();

  // Redirect to homepage if user is not authenticated
  if (!isAuthenticated || !token) {
    return <HomePage />;
  }

  // Fetch service centers on component mount
  useEffect(() => {
    const fetchServiceCenters = async () => {
      try {
        const response = await axios.get('http://localhost:3000/appointments/getAllServiceProvider', { withCredentials: true });
        setServiceCenters(response.data['serviceProviders']);
      } catch (error) {
        console.error('Error fetching service centers:', error);
      }
    };

    fetchServiceCenters();
  }, []);

  // Function to handle selection of a service center
  const handleSelectCenter = (center) => {
    setSelectedCenter(center);
  };

  // Function to handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle booking road side assistance
  const handleBookService = async () => {
    const user = validateJwt(token);
    if (!user) return;

    // Check if a service center is selected
    if (selectedCenter) {
      // Get user's current location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = [latitude, longitude]; // Store latitude and longitude in location array
          
          // Prepare booking data
          const bookingData = {
            centerid: selectedCenter._id,
            description: formData.description,
            location: location 
          };

          // Send road side assistance request
          axios.post(`http://localhost:3000/appointments/roadSideRequest/${user._id}`, bookingData, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          })
            .then(response => {
              if (response.status === 201) {
                console.log('Road side assistance requested successfully');
                navigate('/');
              }
            })
            .catch(error => {
              console.error('Error requesting road side assistance:', error);
            });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      alert('Please select a service center before booking.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 p-8">
        {/* Service Center List */}
        <h2 className="text-2xl font-semibold mb-4 text-center">Choose Service Center</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {serviceCenters && serviceCenters.map((center, index) => (
            <div
              key={center._id}
              className={`p-4 border rounded-md cursor-pointer ${selectedCenter && selectedCenter._id === center._id ? 'border-blue-500 bg-blue-100' : 'border-gray-200 hover:border-blue-500 hover:bg-gray-50'}`}
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
          <h3 className="text-xl font-semibold mb-2">Roadside Assistance Form</h3>
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
          </form>

          {/* Book Button */}
          <div className="mt-4">
            <button
              onClick={handleBookService}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              disabled={!selectedCenter}
            >
              Request Roadside Assistance
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoadSideRequestPage;
