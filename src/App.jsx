import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import MainMenu from './components/MainMenu';
import CalendarApp from './components/Calendar'; // Takvim bileşeni
import ExchangeRates from './components/ExchangeRates';
import SurveyForm from './components/SurveyForm'; // Anket Formu bileşeni

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  useEffect(() => {
    if (isAuthenticated) {
      const path = window.location.pathname;
      if (path === '/main' || path === '/main/calendar') {
        return;
      } else {
        window.location.replace('/main/calendar');
      }
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/main/calendar" /> : <Login onLogin={handleLogin} />} />
        <Route path="/main" element={isAuthenticated ? <MainMenu onLogout={handleLogout} /> : <Navigate to="/login" />}>
          <Route path="calendar" element={<CalendarApp />} />
          <Route path="exchange-rates" element={<ExchangeRates />} />
          <Route path="surveys" element={<SurveyForm />} /> {/* Anketler için yeni rota */}
        </Route>
        <Route path="*" element={<Navigate to={isAuthenticated ? "/main/calendar" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
