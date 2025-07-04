import React, { createContext, useState, useEffect } from 'react';
import { login, logout, validate } from '../services/auth';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ao montar, valida a sessão através do cookie
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { authorized, user } = await validate();
        if (authorized) setUser(user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  // Função de login chamada pelos formulários
  const signIn = async (phone, pass) => {
    await login(phone, pass);
    const { authorized, user } = await validate();
    if (!authorized) {
      throw new Error('Invalid credentials');
    }
    setUser(user);
  };

  // Função de logout
  const signOut = async () => {
    await logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
