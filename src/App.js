import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BarberPage from './pages/BarberPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BarberPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
