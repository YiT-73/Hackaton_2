import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User } from '../types';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (token: string, user: User) => void;
  logout: () => void;
}

interface AuthAction {
  type: 'LOGIN' | 'LOGOUT' | 'SET_LOADING' | 'SET_ERROR';
  payload?: {
    token?: string;
    user?: User;
    error?: string;
  };
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload?.user || null,
        token: action.payload?.token || null,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        isLoading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'SET_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload?.error || null,
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        
        if (token && userStr) {
          const user = JSON.parse(userStr) as User;
          dispatch({
            type: 'LOGIN',
            payload: { token, user },
          });
        } else {
          dispatch({ type: 'LOGOUT' });
        }
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({
          type: 'SET_ERROR',
          payload: { error: 'Failed to restore authentication state' },
        });
      }
    };

    initializeAuth();
  }, []);

  const login = (token: string, user: User) => {
    try {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({
        type: 'LOGIN',
        payload: { token, user },
      });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: { error: 'Failed to login' },
      });
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: { error: 'Failed to logout' },
      });
    }
  };

  const value = {
    ...state,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const API_BASE_URL = 'https://nn1h052dp5.execute-api.us-east-2.amazonaws.com/v1';

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Ha ocurrido un error');
  }

  return response.json();
}