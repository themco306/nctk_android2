import React, { useState } from 'react';
import { Button,  StyleSheet,  Text,  TextInput,  TouchableOpacity,  View } from 'react-native';

const ProductQuantity = ({ handleAddToCart }) => {
    const [quantity, setQuantity] = useState(1);
  
    const handleIncrease = () => {
      setQuantity(quantity + 1);
    };
  
    const handleDecrease = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.quantity}>
            <TouchableOpacity  style={styles.button} onPress={handleDecrease}><Text>-</Text></TouchableOpacity>
            <TextInput style={styles.showQuantity} value={quantity.toString()} />

            <TouchableOpacity style={styles.button}  onPress={handleIncrease} ><Text>+</Text></TouchableOpacity>
        </View>
        <Button title="Thêm vào giỏ hàng" onPress={() => handleAddToCart(quantity)} />
      </View>
    );
  };
  export default ProductQuantity

  const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:"center"
    },
    quantity:{
        display:'flex',
        flexDirection:'row',
        margin:5
    },
    button:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ee4d2d',
        paddingHorizontal:10
    },
    showQuantity:{
        width:30,
        padding:10,
        textAlign:'center'
    }
  })