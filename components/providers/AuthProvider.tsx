'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AuthContextType {
  user: any | null;
  login: (userData: any) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user in localStorage on mount
    const storedUser = localStorage.getItem('gowut_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user data:', e);
      }
    }
    setLoading(false);
  }, []);

  const login = (userData: any) => {
    setUser(userData);
    localStorage.setItem('gowut_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gowut_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};