import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { styles } from "../styles/styles";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import { Auth } from "../Context/Auth";
const Footer = () => {
  const navigation = useNavigation();
  const {isLoggedIn} = useContext(Auth)
  const handleShowHome = () => {
    navigation.navigate('Home')
  };
  const handleShowProducts = () => {
    navigation.navigate('Cart')

  };
  const handleShowProfiles = () => {
    navigation.navigate('Profile')

  };
  const handleShowLoginScreen = () => {
    navigation.navigate('LoginScreen')

  };
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.button} onPress={handleShowHome}>
        <Icon name="home" size={30} color="#900" />
        <Text>Home</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity style={styles.button} onPress={handleShowProducts}>
        <Icon name="shopping-cart" size={30} color="#900" />
        <Text>Cart</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      {isLoggedIn?<TouchableOpacity style={styles.button} onPress={handleShowProfiles}>
        <Icon name="user" size={30} color="#900" />
        <Text>User</Text>
      </TouchableOpacity>:<TouchableOpacity style={styles.button} onPress={handleShowLoginScreen}>
        <Icon name="sign-in" size={30} color="#900" />
        <Text>Login</Text>
      </TouchableOpacity>}
      

    </View>
  );
};

export default Footer;
