import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import CountDown from 'react-native-countdown-component';
import ProductList from './ProductList';

const FlashSaleProduct = () => {

    const baseProduct = {
        id: 1,
        name: 'Product 1', 
        price: 30000,
        image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lo7o5sfsozjr01', 
        sold:2300,
        sale:30,
      };
      
      const additionalProducts = Array.from({ length: 10 }, (_, index) => ({
        ...baseProduct,
        id: baseProduct.id + index,
        name: `Product ${baseProduct.id + index}`,
      }));
      
      const productListData = [...additionalProducts];
    const handleSeeMore =()=>{
        Alert.alert("See more")
    }
  return (
    <View style={styles.container}>
    <View style={styles.containerFlashSale}>
      <Text style={styles.flashSaleText}>Flash Sale</Text>
      <CountDown
        until={3600} // Thời gian đếm ngược (đơn vị là giây)
        size={15}
        onFinish={()=>{}}
        digitStyle={{backgroundColor: '#ddd'}}
        digitTxtStyle={{color: '#000'}}
        timeToShow={['H', 'M', 'S']}
        timeLabels={{m: null, s: null}}
      />
      <TouchableOpacity onPress={handleSeeMore}>
            <Text style={styles.seeMore}>
                Xem thêm
            </Text>
      </TouchableOpacity>
    </View>

    </View>
  );
};

export default FlashSaleProduct;

const styles = StyleSheet.create({
    container:{

    },
    containerFlashSale: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor:"#fff"
  },
  flashSaleText: {
    fontSize: 20,
    fontWeight: 'bold',
      color:'#ee4d2d',

  },
  seeMore:{
    color:'#7e7c7c'
  }
});
