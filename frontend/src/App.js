import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigation from './modules/shared/components/Navigation';
//import Users from './modules/gerente/pages/Users';
import ManageUsers from './modules/gerente/pages/ManageUsers';
import Works from './modules/gerente/pages/Works';
import ManageWorks from './modules/gerente/pages/ManageWorks';
import WorksDashboard from './modules/gerente/pages/WorksDashboard';
import TextReports from './modules/gerente/pages/TextReports';
import LoginForm from './modules/shared/components/LoginForm';
//import DirectorWorks from './modules/director/pages/Works';
//import DirectorManageWorks from './modules/director/pages/ManageWorks';
//import DirectorDashboard from './modules/director/pages/Dashboard';
//import DirectorTextReports from './modules/director/pages/TextReports';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      {isLoggedIn && <Navigation handleLogout={handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route
          path="/manage_users"
          element={isLoggedIn ? <ManageUsers /> : <Navigate to="/" />}
        />
        <Route
          path="/products"
          element={isLoggedIn ? <Works /> : <Navigate to="/" />}
        />
        <Route
          path="/manage_products"
          element={isLoggedIn ? <ManageWorks /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <WorksDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/text_reports"
          element={isLoggedIn ? <TextReports /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;