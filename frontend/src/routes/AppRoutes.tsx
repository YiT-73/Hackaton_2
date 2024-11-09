import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegisterComponent from '../components/admin/RegisterComponent';
import LoginComponent from '../components/admin/LoginComponent';

const AppRoutes: React.FC = () => {
  const handleLoginSuccess = (token: string) => {
    // Aquí puedes manejar el token después del login exitoso
    // Por ejemplo:
    localStorage.setItem('authToken', token);
    // También podrías redirigir al usuario o actualizar el estado global
  };

  return (
    <Routes>
      <Route path="/register" element={<RegisterComponent />} />
      <Route 
        path="/login" 
        element={<LoginComponent onLoginSuccess={handleLoginSuccess} />} 
      />
    </Routes>
  );
};

export default AppRoutes;