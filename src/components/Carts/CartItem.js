import React from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CheckBox from '@react-native-community/checkbox';
const CartItem = ({ item,deleteItem,toggleSelection,selectedItems }) => {
  const isSelected = selectedItems.includes(item);
    const navigation = useNavigation();
    const handleShowProduct=()=>{
        navigation.navigate("ProductDetail", { productId: item.id });
    }
    const handelDeleteCart =()=>{
      Alert.alert(
        "Xác nhận", // Tiêu đề của hộp thoại
        "Bạn có chắc chắn muốn xóa không?", // Nội dung của hộp thoại
        [
          {
            text: "Không",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Có", onPress: () => deleteItem(item.id) }
        ],
        { cancelable: false }
      );
    }
    const handleToggleSelection = () => {
      toggleSelection(item);
    }
  return (
  
          
    <View style={styles.container}>
    <CheckBox style={{ marginEnd:5 }}
    value={isSelected}
      onValueChange={handleToggleSelection}
    />
    <TouchableOpacity style={styles.image} onPress={handleShowProduct}>
      <Image style={{ width:'100%',height:'100%' }}  source={{ uri: item.image }} />
    </TouchableOpacity>
      <View style={styles.boxText}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View>
          <Text style={styles.price}>₫{item.price}</Text>
          <Text style={styles.price}>số lượng {item.quantity}</Text>
          
        </View>
       
      </View>
      
      <TouchableOpacity style={styles.boxDelete} onPress={handelDeleteCart}>
          <Text style={styles.textDelete}>Xóa</Text>
      </TouchableOpacity>
     
    </View>
   

  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 120,
    flexDirection: "row",
    // backgroundColor:'#000',
    display: "flex",
    alignItems: "center",
    margin: 5,
  },
  image: {
    flex: 3,
    height: "70%",
    borderRadius: 10,
  },
  boxDelete:{
    backgroundColor:'#ee4d2d',
    padding:5,
    borderRadius:5
  },
  textDelete:{
    color:'#fff'
  },
  boxText: {
    marginLeft: 10,

    flex: 7,
    flexDirection: "column",
  },
  title: {
    fontSize: 18,
  },
  price: {
    color: "#ee4d2d",
    fontSize: 16,
  },
});
