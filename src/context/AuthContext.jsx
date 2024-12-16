import React, { createContext, useContext, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Provide the context to the app
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('userEmail') // Check if user is already logged in
  );

  const login = (email) => {
    localStorage.setItem('userEmail', email);
    setIsAuthenticated(true); // Update the state
  };

  const logout = () => {
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false); // Update the state
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
