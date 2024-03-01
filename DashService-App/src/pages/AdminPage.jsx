import React from 'react';
import SimpleLayout from '../components/SideBar';
import Dashboard from './Dashboard';

const AdminPage = () => {
  	return (
		<div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
			<SimpleLayout />
			<div className="flex flex-col flex-1">
				<Dashboard/>
				<div className="flex-1 p-4 min-h-0 overflow-auto">
					{/* <Outlet /> */}
				</div>  
			</div>
		</div>
	)
   
};

export default AdminPage;
