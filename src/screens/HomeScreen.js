import React from 'react'
import Layout from '../components/Layout'
import { ScrollView, Text } from 'react-native'
import ProductList from '../components/Products/ProductList';
import CategoryList from '../components/Categories/CategoryList';
import SliderHome from '../components/Slider/SliderHome';
// import FlashSaleProduct from '../components/Products/FlashSaleProduct';

const HomeScreen = () => {
  return (
    <Layout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SliderHome/>
        {/* <FlashSaleProduct/> */}
        <CategoryList/>
        <ProductList />
        </ScrollView>
        
    </Layout>
  )
}

export default HomeScreen
