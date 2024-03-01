import React from 'react';
import SimpleLayout from '../components/SideBar';
import Dashboard from './Dashboard';
import { Routes, Route } from 'react-router-dom';
import UserDashPage from './userDashPage';

const AdminPage = () => {
  	return (
		<div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
			<SimpleLayout />
			<div className="flex flex-col flex-1">
			<Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<UserDashPage/>} />
          {/* Add other routes as needed */}
        </Routes> 
			</div>
		</div>
	)
   
};

export default AdminPage;
