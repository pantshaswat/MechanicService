import React from 'react';
import Dashboard from './Dashboard';
import Sidebar from '../components/SideBar';

const AdminPage = () => {
  	return (
		<div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
			<Sidebar />
			<div className="flex flex-col flex-1">
                    <Dashboard />
                    
				<div className="flex-1 p-4 min-h-0 overflow-auto">
					{/* <Outlet /> */}
				</div>  
			</div>
		</div>
	)
   
};

export default AdminPage;
