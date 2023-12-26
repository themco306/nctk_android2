
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import ProductItem from './ProductItem';
import { productStyles } from '../../styles/productStyles';
import axios from 'axios';
import productApi from '../../API/productApi';
import Loading from '../Loading';



const ProductList = () => {
  const [products,setProducts]=useState({})
  const [loading,setLoading]=useState(true)
  var params={
    populate:'*',
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productApi.getAll(params);
        // console.log(response.data)
        setProducts(response.data.data); // Sửa ở đây
        setLoading(false)
      } catch (error) {
        console.error(error);
        console.error('Error Details:', error.response);
        setProducts([]);
        setLoading(false)
      }
    };
  
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <View  style={productStyles.productList}>
      <View style={productStyles.productList.labelBox}>
      <Text style={productStyles.productList.label} >Gợi Ý Hôm Nay</Text>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
         <ProductItem item={item}/>
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );
};

export default ProductList;
