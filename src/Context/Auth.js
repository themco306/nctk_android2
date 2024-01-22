import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
      }
    };

    fetchUser();
  }, []);

  const login = async (userInfo) => {
    await AsyncStorage.setItem('user', JSON.stringify(userInfo));
    setUser(userInfo);
    setIsLoggedIn(true);
  }

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);

  }

  return (
    <Auth.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, logout, login }}>
      {children}
    </Auth.Provider>
  );
};
