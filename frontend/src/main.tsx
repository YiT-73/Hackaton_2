import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css'; // Asegúrate de importar tus estilos si los tienes

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);