
import {  ActivityIndicator, BackHandler, Text, ToastAndroid, View } from 'react-native';
import 'expo-dev-client';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect, useContext } from 'react';
import { AuthProvider } from './src/Context/Auth';
import AppNavigator from './AppNavigator';
import AsyncStorage from "@react-native-async-storage/async-storage";



const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [lastBackPressed, setLastBackPressed] = useState(0);
  // console.log(isLoggedIn)
  // useEffect(() => {
  //   const setItems = async () => {
  //     const emptyCart = [];
  //     await AsyncStorage.setItem('cart', JSON.stringify(emptyCart));
  //   };
  //   setItems();
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
    };

    fetchData(); // Call the fetchData function

    const backAction = () => {
      if (lastBackPressed && new Date() - lastBackPressed < 2500) {
        BackHandler.exitApp();
        return true;
      }

      setLastBackPressed(new Date());
      ToastAndroid.showWithGravity(
        'Chạm lần nữa để thoát',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [lastBackPressed]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Vui lòng đợi...</Text>
      </View>
    );
  }

  return (
    <>
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator/>
      </NavigationContainer>
      </AuthProvider>
    </>
  );
}




