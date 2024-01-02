// AppNavigator.js
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import CartScreen from './src/screens/CartScreen';
import { Auth } from './src/Context/Auth';
import ProductDetail from './src/screens/ProductDetail';
import HeaderCustom from './src/components/HeaderCustom';
import ProfileScreen from './src/screens/ProfileScreen';


const Stack = createStackNavigator();

export default function AppNavigator() {
    const {isLoggedIn} = useContext(Auth)
  return (
    <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            cardStyleInterpolator: ({ current }) => ({
              cardStyle: {
                opacity: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            }),
            headerShown: true,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} 
          options={{
            headerTitle: props => <HeaderCustom {...props} />, // Sử dụng SearchBar như một tiêu đề tùy chỉnh
          }}
          />
          {isLoggedIn?<Stack.Screen name="Profile" component={ProfileScreen}  />:<Stack.Screen name="LoginScreen" component={LoginScreen} options={{ 
            headerShown:false
           }} />}
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
        </Stack.Navigator>
  );
}
