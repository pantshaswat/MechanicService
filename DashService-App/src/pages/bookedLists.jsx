import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';

const BookingListPage = () => {
  const [bookings, setBookings] = useState([]);
  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get('token');
    const user = jwtDecode(token);

    const fetchData = async () => {
      try {
        const responseCenter = await axios.get(`http://localhost:3000/serviceCenter/get/${user._id}`, {
          withCredentials: true
        });
        setCenter(responseCenter.data);
        setLoading(false);
      } catch (error) {
        console.log(`error getting service center: ${error}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (center) {
          const response = await axios.get(`http://localhost:3000/appointments/view/${center._id}`, {
            withCredentials: true
          });
          console.log(response.data)
          setBookings(response.data);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    if (center && !loading) {
      fetchBookings();
    }
  }, [center, loading]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 p-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Booking List</h2>
        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            <p>Loading...</p>
          ) : center ? (
            <>
              {bookings.map(booking => (
                <div key={booking._id} className="p-4 border rounded-md">
                  <h3 className="text-lg font-semibold">Booking ID: {booking._id}</h3>
                  <p>Description: {booking.description}</p>
                  <p>User: {booking.userId.fullName}</p> 
                  <p>UserContact: {booking.userId.phoneNumber[0]}</p> 
                  <p>Vehicle: {booking.vehicleId.make} {booking.vehicleId.model}</p> 
                  <p>Booking Schedule: {booking.bookingSchedule}</p>
                  <p>Status: {booking.status}</p>
                </div>
              ))}
            </>
          ) : (
            <p>No center found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingListPage;
