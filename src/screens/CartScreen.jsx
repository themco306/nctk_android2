import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Layout from "../components/Layout";
import CartList from "../components/Carts/CartList";
import { useIsFocused } from "@react-navigation/native";

const CartScreen = () => {
  const [cartItem, setCartItem] = useState([]);
  const isFocused = useIsFocused();

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("cart");
      if (jsonValue != null) {
        setCartItem(JSON.parse(jsonValue));
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
  return (
    <Layout>
      <CartList data={cartItem}/>
    </Layout>
  );
};

export default CartScreen;
