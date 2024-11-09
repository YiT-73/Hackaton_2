import React, { useState } from 'react';

interface AuthComponentProps {
    onLogin: (username: string, password: string) => void;
}

const AuthComponent: React.FC<AuthComponentProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Por favor completa todos los campos.');
            return;
        }

        // Simulación de autenticación (aquí deberías llamar a tu API)
        if (username === 'admin' && password === 'password') {
            onLogin(username, password);
        } else {
            setError('Nombre de usuario o contraseña incorrectos.');
        }
    };

    return (
        <div className="auth-component">
            <h2>Iniciar Sesión</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Nombre de usuario:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default AuthComponent;