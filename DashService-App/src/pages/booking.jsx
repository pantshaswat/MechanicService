import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const BookingPage = () => {
    
   const dummyServiceCenters = [
    {
      id: 1,
      name: 'Service Center 1',
      location: '123 Main St, Cityville',
      services: 'Repair, Maintenance, Inspection',
    },
    {
      id: 2,
      name: 'Service Center 2',
      location: '456 Broad St, Townsville',
      services: 'Oil Change, Tire Rotation, Diagnostics',
    },
    {
      id: 3,
      name: 'Service Center 3',
      location: '789 Center St, Villagetown',
      services: 'Brake Service, Engine Tune-up, Alignment',
    },
    {
      id: 4,
      name: 'Service Center 4',
      location: '101 Oak St, Countryside',
      services: 'Battery Replacement, AC Repair, Transmission',
    },
  ];
  const dummyVehicles = [
    { id: '101', model: 'Car A' },
    { id: '102', model: 'Car B' },
    { id: '103', model: 'Car C' },
  ];

  const [serviceCenters, setServiceCenters] = useState(dummyServiceCenters);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    vehicleId: '',
    bookingSchedule: 'none',
  });

//   useEffect(() => {
//     const fetchServiceCenters = async () => {
//       try {
//         // Replace with your actual backend API endpoint
//           const response = await axios.get('http://localhost:3000/appointments/view');
//           console.log(response.data)
//         setServiceCenters(response.data);
//       } catch (error) {
//         console.error('Error fetching service centers:', error);
//       }
//     };

//     fetchServiceCenters();
//   }, []);

  const handleSelectCenter = (center) => {
    setSelectedCenter(center);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBookService = () => {
    // Add your booking logic here
    if (selectedCenter) {
      console.log('Booking service at:', selectedCenter);
      console.log('Booking details:', formData);
      // Reset selected center and form data after booking
      setSelectedCenter(null);
      setFormData({
        description: '',
        vehicleId: '',
        bookingSchedule: 'none',
      });
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
          {serviceCenters.map((center) => (
            <div
              key={center.id}
              className={`p-4 border rounded-md cursor-pointer ${
                selectedCenter && selectedCenter.id === center.id
                  ? 'border-blue-500 bg-blue-100'
                  : 'border-gray-200 hover:border-blue-500 hover:bg-gray-50'
              }`}
              onClick={() => handleSelectCenter(center)}
            >
              <h3 className="text-lg font-semibold">{center.name}</h3>
              <p className="text-sm text-gray-500">{center.location}</p>
              <p className="text-sm text-gray-500">{center.services}</p>
            </div>
          ))}
        </div>

        {/* Selected Center Details */}
        {selectedCenter && (
          <div className="mt-8 p-4 border rounded-md">
            <h3 className="text-xl font-semibold mb-2">Selected Service Center</h3>
            <p>{selectedCenter.name}</p>
            <p>{selectedCenter.location}</p>
            <p>{selectedCenter.services}</p>
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
                {dummyVehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
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
