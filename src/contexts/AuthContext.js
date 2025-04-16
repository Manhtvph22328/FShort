// src/contexts/AuthContext.js
import React, { createContext, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null); // đổi từ userInfo -> user

  const login = async (username, password) => {
    const res = await axios.post('http://192.168.1.19:5000/api/users/login', {
      username,
      password,
    });

    const token = res.data.token;
    const userData = res.data.user;

    setUserToken(token);
    setUser(userData);

    await AsyncStorage.setItem('userToken', token);
    await AsyncStorage.setItem('userInfo', JSON.stringify(userData)); // vẫn lưu là userInfo cũng được

    return res;
  };

  const logout = async () => {
    setUserToken(null);
    setUser(null);
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider value={{ userToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
