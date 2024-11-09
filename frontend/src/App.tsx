import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import './App.css'; // Asegúrate de tener un archivo CSS para los estilos

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>Mi Aplicación de Productos</h1>
        <nav>
          <Link to="/register">
            <button>Registrar</button>
          </Link>
          <Link to="/login">
            <button>Iniciar Sesión</button>
          </Link>
          <Link to="/products">
            <button>Ver Productos</button>
          </Link>
        </nav>
        <AppRoutes />
      </div>
    </Router>
  );
};

export default App;