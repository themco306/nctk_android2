import React, { useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Layout from "../components/Layout";
import CartList from "../components/Carts/CartList";
import { useIsFocused } from "@react-navigation/native";
import { Auth } from "../Context/Auth";

const CartScreen = () => {
  const {user,isLoggedIn}=useContext(Auth)
  const [cartItem, setCartItem] = useState([]);
  const isFocused = useIsFocused();

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("cart");

      if (jsonValue != null) {
        let cart = JSON.parse(jsonValue);
        console.log(cart)
        // Nếu người dùng đã đăng nhập, chỉ lấy các mục thuộc về người dùng này
        if (isLoggedIn) {
          setCartItem(cart[user.id]);
        } else {
          // Nếu người dùng chưa đăng nhập, chỉ lấy các mục thuộc về 'temp'
          setCartItem(cart['0']);
        }
        
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

  const deleteItem = async (id) => {
    try {
      const jsonValue = await AsyncStorage.getItem("cart");
      if (jsonValue != null) {
        let cart = JSON.parse(jsonValue);
        // Xác định khóa cho giỏ hàng
        const cartKey = isLoggedIn ? user.id : '0';
        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        const index = cart[cartKey].findIndex(item => item.id === id);
        if (index !== -1) {
          // Nếu sản phẩm đã có trong giỏ hàng, xóa nó
          cart[cartKey].splice(index, 1)
        }
        // Lưu giỏ hàng trở lại AsyncStorage
        await AsyncStorage.setItem("cart", JSON.stringify(cart));
        setCartItem(cart[cartKey]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <Layout>
      
      <CartList data={cartItem} deleteItem={deleteItem}/>
    </Layout>
  );
};

export default CartScreen;
