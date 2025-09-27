import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['x-access-token'] = token;
      localStorage.setItem('token', token);
      // Here you would typically fetch the user profile
      // For now, we'll just set a dummy user
      setUser({ id: 1, email: 'test@example.com' });
    } else {
      delete axios.defaults.headers.common['x-access-token'];
      localStorage.removeItem('token');
      setUser(null);
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password });
    setToken(res.data.token);
  };

  const register = async (email, password) => {
    const res = await axios.post('/api/auth/register', { email, password });
    setToken(res.data.token);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
