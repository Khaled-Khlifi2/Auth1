import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Interventions from './pages/Interventions';
import Tickets from './pages/Tickets';
import Discussion from './pages/Discussion';
import DiscussionDetail from './pages/DiscussionDetail';
import MainContent from './pages/MainContent';
import LoginForm from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterForm from './pages/register';

function App() {
  return (
    <Routes>
      {/* Login route */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      {/* Protected app routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/interventions" replace />} />
        <Route path="interventions" element={<Interventions />} />
        <Route path="tickets" element={<Tickets />} />
        <Route path="discussion" element={<Discussion />} />
        <Route path="discussion/:clientId" element={<DiscussionDetail />} />
        <Route path="main" element={<MainContent />} />
      </Route>

      {/* Catch-all redirects to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
