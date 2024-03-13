import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import Navbar from "../components/Navbar";
import {jwtDecode} from 'jwt-decode';

function validateJwt(token){
    const payload =  jwtDecode(token);
    return payload;
  }
const NotificationPage = () => {
    const cookies = new Cookies();
  const [notifications, setNotifications] = useState([]);
  const token = cookies.get('token');
  if ( !token) {
    return;
  }
  const user = validateJwt(token);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/notifications/get/${user._id}`, {withCredentials: true});
        if (Array.isArray(response.data.notifications)) {
          setNotifications(response.data.notifications);
        } else {
          console.error("Invalid data structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <>
    <Navbar>

    </Navbar>
     <div className="container mx-auto mt-8">
      
      <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
        {notifications.map(notification => (
          <div key={notification._id} className="bg-white rounded-md shadow-md mb-4 p-4">
            <p className="text-gray-800 text-lg mb-2">{notification.message}</p>
            <p className="text-gray-600 text-sm">Type: {notification.notificationType}</p>
            {/* Add any additional information you want to display */}
          </div>
        ))}
        {notifications.length === 0 && <p className="text-gray-600 text-lg">No notifications found.</p>}
      </div>
    </div>
    </>
   
  );
};

export default NotificationPage;
