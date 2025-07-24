import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AuthState } from '@/types/Index';

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction = 
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return { ...state, isLoading: false, error: action.payload };
    case 'LOGOUT':
      return { user: null, token: null, isLoading: false, error: null };
    case 'UPDATE_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: localStorage.getItem('token'),
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and get user data
      verifyToken(token);
    }
  }, []);

  const verifyToken = async (token: string) => {
    try {
      // In a real app, this would call your backend API
      const mockUser: User = {
        id: '1',
        username: 'ArtistUser',
        email: 'artist@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        bio: 'Digital artist and creative collaborator',
        createdAt: new Date().toISOString(),
      };
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: mockUser, token } });
    } catch (error) {
      localStorage.removeItem('token');
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid token' });
    }
  };

  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Mock login - in real app, call your backend API
      if (email && password) {
        const mockToken = 'mock-jwt-token-' + Date.now();
        const mockUser: User = {
          id: '1',
          username: email.split('@')[0],
          email,
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
          bio: 'Digital artist and creative collaborator',
          createdAt: new Date().toISOString(),
        };
        
        localStorage.setItem('token', mockToken);
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user: mockUser, token: mockToken } });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error instanceof Error ? error.message : 'Login failed' });
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Mock registration - in real app, call your backend API
      if (username && email && password) {
        const mockToken = 'mock-jwt-token-' + Date.now();
        const mockUser: User = {
          id: Date.now().toString(),
          username,
          email,
          avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face`,
          bio: 'New artist joining the community',
          createdAt: new Date().toISOString(),
        };
        
        localStorage.setItem('token', mockToken);
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user: mockUser, token: mockToken } });
      } else {
        throw new Error('All fields are required');
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error instanceof Error ? error.message : 'Registration failed' });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = async (userData: Partial<User>) => {
    if (state.user) {
      const updatedUser = { ...state.user, ...userData };
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
    }
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
