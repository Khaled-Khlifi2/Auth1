// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ClipboardList, Wrench } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-blue-950 text-white flex flex-col fixed top-16 left-0 z-40 shadow-md">
      {/* Logo or App Name */}
      <div className="flex items-center justify-center h-16 text-2xl font-bold border-b border-blue-800">
        GESTION
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-4 text-sm font-medium">
        <NavLink
          to="/discussion"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-800 transition ${
              isActive ? 'bg-blue-800' : ''
            }`
          }
        >
          <Home size={18} />
          Réclamations
        </NavLink>

        <NavLink
          to="/interventions"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-800 transition ${
              isActive ? 'bg-blue-800' : ''
            }`
          }
        >
          <Wrench size={18} />
          Interventions
        </NavLink>

        <NavLink
          to="/tickets"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-800 transition ${
              isActive ? 'bg-blue-800' : ''
            }`
          }
        >
          <ClipboardList size={18} />
          Tickets
        </NavLink>

        
      </nav>
    </aside>
  );
};

export default Sidebar;
