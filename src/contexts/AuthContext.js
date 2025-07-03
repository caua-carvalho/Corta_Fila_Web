import React, { createContext, useState, useEffect } from 'react';
import { initAuth, login, logout } from '../services/auth';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Ao montar, inicializa header a partir do token salvo
  useEffect(() => {
    initAuth();
    // Opcional: buscar /me para validar e preencher user
  }, []);

  // Função de login chamada pelos formulários
  const signIn = async (phone, pass) => {
    const { token, expiresAt } = await login(phone, pass);
    setUser({ token, expiresAt });
  };

  // Função de logout
  const signOut = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
