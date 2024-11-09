import { login as apiLogin, register as apiRegister, getUserRole } from './api';
import { useState, useEffect } from 'react';

const saveToken = (token: string) => {
  localStorage.setItem('token', token);
};

const getToken = (): string | null => {
  return localStorage.getItem('token');
};

const clearToken = () => {
  localStorage.removeItem('token');
};

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getToken());
  const [token, setToken] = useState<string | null>(getToken());
  const [role, setRole] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const data = await apiLogin(username, password);
      saveToken(data.token);
      setToken(data.token);
      setIsAuthenticated(true);
      await fetchUserRole(data.token);
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  const register = async (username: string, password: string, role: string) => {
    try {
      const data = await apiRegister(username, password, role);
      return data;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  };

  const logout = () => {
    clearToken();
    setToken(null);
    setIsAuthenticated(false);
    setRole(null);
  };

  const fetchUserRole = async (authToken: string) => {
    try {
      const userData = await getUserRole(authToken);
      setRole(userData.role);
    } catch (error) {
      console.error('Error al obtener el rol del usuario:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserRole(token);
    }
  }, [token]);

  return {
    isAuthenticated,
    token,
    role,
    login,
    register,
    logout,
  };
};
