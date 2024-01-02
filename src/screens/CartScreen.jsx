import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Layout from "../components/Layout";
import CartList from "../components/Carts/CartList";
import { useIsFocused } from "@react-navigation/native";

const CartScreen = () => {
  const [cartItem, setCartItem] = useState([]);
  const [user,setUser]=useState('')
  const isFocused = useIsFocused();

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("cart");
      const usergg = await AsyncStorage.getItem("user");
      if (jsonValue != null) {
        setCartItem(JSON.parse(jsonValue));
      }
      if (usergg != null) {
        setUser(JSON.parse(usergg));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  console.log(cartItem);
  console.log('user',user);
  return (
    <Layout>
      
      <CartList data={cartItem}/>
    </Layout>
  );
};

export default CartScreen;
