import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUsers, FaTasks, FaCalendarAlt } from 'react-icons/fa';

const Sidebar = () => {
    const navItems = [
      { name: 'Home', path: '/', icon: <FaHome /> },
      { name: 'Community Modules', path: '/community-modules', icon: <FaUsers /> },
      { name: 'Sprints', path: '/sprints', icon: <FaTasks /> },
      { name: 'Sprint Planning', path: '/sprint-planning', icon: <FaCalendarAlt /> },
    ];
  
    const handleLogout = () => {
      localStorage.removeItem('userEmail'); // Clear user data
      window.location.href = '/login'; // Redirect to login page
    };
  
    return (
      <div className="w-64 bg-gray-800 text-white h-screen flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-600">Sprint.io</div>
        <nav className="flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 p-4 hover:bg-gray-700 ${
                  isActive ? 'bg-gray-700' : ''
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="p-4 text-left hover:bg-gray-700 border-t border-gray-600"
        >
          Log Out
        </button>
      </div>
    );
  };
  export default Sidebar;