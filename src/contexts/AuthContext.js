import React, { createContext, useState, useEffect } from 'react';
import auth from '../services/auth';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ao montar, valida a sessão através do cookie
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { authorized, user } = await auth.login.validate();
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
    await auth.login.execute(phone, pass);
    const { authorized, user } = await auth.login.validate();
    if (!authorized) {
      throw new Error('Invalid credentials');
    }
    setUser(user);
  };

  // Função de logout
  const signOut = async () => {
    await auth.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
