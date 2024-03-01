import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const linkClass =
  'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base';

export default function SimpleLayout() {
  const location = useLocation();

  const sidebarLinks = [
    { to: '/admin/', label: 'Dashboard', icon: '📊' },
    { to: '/admin/users', label: 'Users', icon: '💵' },
    { to: '/admin/services', label: 'Users', icon: '🛠️' },
      { to: '/admin/servicecenter', label: 'Service Centers', icon: '📅' },//requests for service center
    { to: '/admin/notifications', label: 'Send Notifications', icon: '🛠️' },
    
    // Add more links as needed
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <nav className="bg-[#0d1117] w-60 p-3 flex flex-col">
        <div className="flex items-center gap-2 px-1 py-3">
          <Link to="/" className="text-white font-bold text text-2xl text-center ml-12">
            DashService
          </Link>
        </div>
        <div className="py-8 flex flex-1 flex-col gap-0.5">
          {sidebarLinks.map((link) => (
            <SimpleSidebarLink
              key={link.to}
              to={link.to}
              label={link.label}
              icon={link.icon}
              pathname={location.pathname}
            />
          ))}
        </div>
      </nav>
      {/* Content on the right side */}
      <div className="flex-grow p-8 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

function SimpleSidebarLink({ to, label, icon, pathname }) {
  return (
    <Link
      to={to}
      className={`${linkClass} ${pathname === to ? 'bg-neutral-700 text-white' : 'text-neutral-400'}`}
    >
      <span className="text-xl">{icon}</span>
      {label}
    </Link>
  );
}
