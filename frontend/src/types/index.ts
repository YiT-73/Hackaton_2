export interface User {
    username: string;
    role: 'admin' | 'client';
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
  }
  
  