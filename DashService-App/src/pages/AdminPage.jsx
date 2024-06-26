import React from 'react';
import Dashboard from '../components/Admin/Dashboard';
import { Routes, Route } from 'react-router-dom';
import UserDashPage from './userDashPage';
import Sidebar from '../components/SideBar';
import Users from '../components/Admin/users';
import ServiceReq from './serviceReq';
import NotificationScreen from './sendNotification';
import ServiceCenter from '../components/Admin/serviceCenter';
import Login from './Login';

const AdminPage = () => {

	

	
  	return (
		<div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
			<Sidebar />
			<div className="flex flex-col flex-1">
			<Routes>
						<Route path="/" element={<Dashboard />} />
					
						<Route path="/users" element={<Users />} />
          <Route path="/services" element={<ServiceReq/>} />
          <Route path="/users" element={<Users/>} />
						<Route path="/notifications" element={<NotificationScreen />} />
						{/* //logout button */}
						
						
						
						
          {/* Add other routes as needed */}
        </Routes> 
			</div>
		</div>
	)
   
};

export default AdminPage;
