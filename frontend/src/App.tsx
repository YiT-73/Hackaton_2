
import React, { useState } from 'react';
import AuthComponent from './components/auth/AuthComponent';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const handleLogin = (username: string, password: string) => {
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
      setUsername(username);
      console.log('Usuario autenticado:', username);
    } else {
      alert('Nombre de usuario o contraseña incorrectos');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername(null);
  };

  return (
    <div className="app">
      <h1>Bienvenido a la Aplicación</h1>
      {isAuthenticated ? (
        <div>
          <p>Hola, {username}</p>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      ) : (
        <AuthComponent onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;