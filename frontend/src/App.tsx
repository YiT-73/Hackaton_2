import React from 'react';
import AuthComponent from '../components/AuthComponent';

const App: React.FC = () => {
    const handleLogin = (username: string, password: string) => {
        console.log('Usuario autenticado:', username);
        // Aquí puedes redirigir al usuario o realizar otras acciones después de iniciar sesión
    };

    return (
        <div className="app">
            <h1>Bienvenido a la Aplicación</h1>
            <AuthComponent onLogin={handleLogin} />
        </div>
    );
};

export default App;