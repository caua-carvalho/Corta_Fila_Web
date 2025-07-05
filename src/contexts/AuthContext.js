// src/services/auth.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/Corta_Fila_Back/public',
});

// 1) Contexto de autenticação
const AuthContext = createContext();

// 2) Core de autenticação (token + endpoints)
const core = {
  // --- Token management ---
  setToken(token) {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  },

  init() {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  },

  isAuthenticated() {
    return Boolean(localStorage.getItem('token'));
  },

  // --- Login namespace ---
  login: {
    async execute(phone, password) {
      const { data } = await api.post('/login.php', { phone, password });
      core.setToken(data.token);
      return data;
    },
    async validate() {
      const { data } = await api.get('/validate.php');
      return data; // { authorized, user }
    },
  },

  // --- Register namespace ---
  register: {
    async execute({ name, phone, email, password }) {
      const payload = { name, phone, email, password };
      const { data } = await api.post('/register.php', payload);
      core.setToken(data.token);
      return data;
    },
  },

  // --- Logout ---
  logout() {
    core.setToken(null);
  },
};

// 3) Provider encapsulado
function AuthProvider({ children }) {
  const [user, setUser]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    core.init(); // seta header se existir token
    (async () => {
      try {
        const { authorized, user: u } = await core.login.validate();
        if (authorized) setUser(u);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const signIn = async (phone, pass) => {
    await core.login.execute(phone, pass);
    const { authorized, user: u } = await core.login.validate();
    if (!authorized) throw new Error('Invalid credentials');
    setUser(u);
  };

  const signOut = () => {
    core.logout();
    setUser(null);
  };

  const register = (data) => core.register.execute(data);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, register }}>
      {children}
    </AuthContext.Provider>
  );
}

// 4) Export final
const auth = {
  ...core,
  Context: AuthContext,
  Provider: AuthProvider,
};

export default auth;
export const AuthContextExport = AuthContext;
export const AuthProviderExport = AuthProvider;
