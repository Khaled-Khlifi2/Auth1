// src/components/AppHeader.jsx
import React from 'react';

const AppHeader = ({ user, onLogin, onLogout }) => {
  return (
    <header className="w-full bg-gray-900 text-white px-6 py-4 shadow-md flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <img src="src\assets\img.jpg" alt="Logo" className="h-10 w-10" />
        <h1 className="text-xl font-semibold">Reclamation App</h1>
      </div>

      {/* Right: User section */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center font-bold uppercase">
                {user.name.charAt(0)}
              </div>
              <span>{user.name}</span>
            </div>
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={onLogin}
            className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
