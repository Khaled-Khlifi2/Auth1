// src/components/AppLayout.jsx
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AppHeader from './AppHeader';
import Sidebar from './Sidebar';

const AppLayout = () => {
  const [user, setUser] = useState({ name: 'Khaled Khlifi' });
  const navigate = useNavigate(); // <-- add this

  const handleLogin = () => setUser({ name: 'Khaled Khlifi' });

  const handleLogout = () => {
    localStorage.removeItem('token'); // remove token
    navigate('/login'); // redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader user={user} onLogout={handleLogout} />

      <div className="flex pt-16">
        <Sidebar />

        <main className="flex-1 p-6 ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
