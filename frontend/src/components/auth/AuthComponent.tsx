import React, { useState } from 'react';
import { login } from '../../services/api';// Asegúrate de la ruta correcta

const AuthComponent: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      setMessage(`Inicio de sesión exitoso. Bienvenido ${response.user.username}`);
      // Aquí puedes guardar el token en el localStorage o en el estado de la aplicación
    } catch (error) {
      setMessage('Error en el inicio de sesión');
    }
  };

  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Nombre de usuario</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default AuthComponent;