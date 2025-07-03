// src/index.js

import React from 'react';
import { createRoot } from 'react-dom/client';      
import App from './App.js';
import { AuthProvider } from './contexts/AuthContext.js';

const container = document.getElementById('root');
const root = createRoot(container);                

root.render(                                     
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
