import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Layout from "../components/Layout";
import CartList from "../components/Carts/CartList";
import { useIsFocused } from "@react-navigation/native";
import { Auth } from "../Context/Auth";
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const {user,isLoggedIn}=useContext(Auth)
  const [cartItem, setCartItem] = useState([]);
  const isFocused = useIsFocused();
  const [selectedItems, setSelectedItems] = useState([]);
  const [total,setTotal] = useState(0)
  const [isAllSelected, setIsAllSelected] = useState(false);
  const navigation = useNavigation();
  const toggleSelection = (item) => {
    let newSelectedItems;
    if (selectedItems.some(i => i.id === item.id)) {
      newSelectedItems = selectedItems.filter(i => i.id !== item.id);
    } else {
      newSelectedItems = [...selectedItems, item];
    }
    setSelectedItems(newSelectedItems);
  };


useEffect(() => {
  setIsAllSelected(selectedItems.length === cartItem.length);
}, [selectedItems])

const selectAllItems = () => {
  if (isAllSelected) {
    setSelectedItems([])
  } else {
    setSelectedItems(cartItem)
  }
};
  const updateTotal = () => {
    const newTotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);
  };
  
  useEffect(() => {
    updateTotal();
  }, [selectedItems,cartItem]);
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
      console.log(e)
    }
  };
  

  useEffect(() => {
    if (isFocused) {
      getData();
    }
    setSelectedItems([])
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

        setSelectedItems([]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleOnSubmit= async()=>{
    if(selectedItems.length===0){
      ToastAndroid.showWithGravity(
        'Cần chọn sản phẩm trước',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return
    }
    if(!isLoggedIn){
      navigation.navigate("LoginScreen")
      ToastAndroid.showWithGravity(
        'Cần đăng nhập trước',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return
    }
    navigation.navigate("Order")
  }
  return (
    <Layout>
            <View style={{ flexDirection:'row',justifyContent:'flex-start',width:'100%',paddingHorizontal:15,backgroundColor:'#fff' }}>
        <CheckBox
            value={isAllSelected}
            onValueChange={selectAllItems}
        />
        <Text style={{ textAlignVertical:'center' }}>Tất cả</Text></View>
      <CartList data={cartItem} deleteItem={deleteItem} toggleSelection={toggleSelection} selectedItems={selectedItems}/>
      <View style={styles.boxOrder}>
        <View style={{ flexDirection:'row' }}>
          <Text style={{ fontSize:18,textAlignVertical:'center' }}>Tạm tính: </Text>
          <Text style={{  fontSize:18, textAlignVertical:'center',color:'#ee4d2d' }}> {`₫${Number(total).toLocaleString('en-US', {minimumFractionDigits: 0})}`}</Text>
        </View>
        <TouchableOpacity style={styles.boxButton} onPress={handleOnSubmit}>
          <Text style={styles.textButton}>Đặt hàng</Text>
        </TouchableOpacity>
      </View>
      
    </Layout>
  );
};
const styles = StyleSheet.create({
  boxOrder:{
    height:40,
    width:'100%',
    backgroundColor:'#fff',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:15,
    paddingBottom:8
  },
  boxButton:{
    backgroundColor:'#ee4d2d',
    alignItems:'center',
    justifyContent:'center',
    width:'auto',
  },
  textButton:{
    color:'#fff',
    paddingHorizontal:10
  }
})
export default CartScreen;
