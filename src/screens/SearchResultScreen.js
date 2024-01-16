import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Loading from '../components/Loading';
import productApi from '../API/productApi';
import { productStyles } from '../styles/productStyles';
import ProductItem from '../components/Products/ProductItem';

function SearchResultScreen({route}) {
    const [textSearch,setTextSearch]=useState(route.params.textSearch)
    const [products,setProducts]=useState([])
    const [loading,setLoading]=useState(true)
    const [clear,setClear]=useState(false)
    var params={
      populate:'*',
      filters: {
        title: { $contains: textSearch }
      }
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
    }, [clear]);
    const handleFilter = async (filterType) => {
      let sortedProducts=[];
    
      switch(filterType) {
        case 0:
          sortedProducts = [...products].sort((a, b) => new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt));
          setProducts(sortedProducts);
          break;
        case 1:
          sortedProducts = [...products].sort((a, b) => new Date(a.attributes.createdAt) - new Date(b.attributes.createdAt));
          setProducts(sortedProducts);
          break;
        case 2:
          sortedProducts = [...products].sort((a, b) => a.attributes.price - b.attributes.price);
          setProducts(sortedProducts);
          break;
        case 3:
          sortedProducts = [...products].sort((a, b) => b.attributes.price - a.attributes.price);
          setProducts(sortedProducts);
          break;
          case 4 :
          setClear(true)
          break;
        default:
          setClear(true)
          break;

      }
    
    
    }
    
    
    if (loading) {
      return <Loading />;
    }
  return (
    <View style={styles.container}>
        <View style={styles.boxFilters}>
            <TouchableOpacity style={styles.itemFilters} onPress={()=>handleFilter(0)}>
              <Text style={styles.textFilters}>Mới nhất</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemFilters} onPress={()=>handleFilter(1)}>
              <Text style={styles.textFilters}>Cũ nhất</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemFilters} onPress={()=>handleFilter(2)}>
              <Text style={styles.textFilters} >Giá Tăng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemFilters} onPress={()=>handleFilter(3)}>
              <Text style={styles.textFilters}>Giá Giảm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemClear} onPress={()=>handleFilter(4)}>
              <Text style={[styles.textClear,styles.textFilters]}>Xóa</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.boxTextResearch}>
             
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
    <View  style={productStyles.productList}>
  <View style={productStyles.productList.labelBox}>
    {/* {loadingC?<Loading />: <Text style={productStyles.productList.label} >{category.attributes.title}</Text>}
    <TouchableOpacity style={styles.boxOption} onPress={handleOpenModal}><Text style={styles.textOption}>+</Text>
    <ModalBottom
      title=""
      isVisible={modalVisible}
      handleCloseModal={handleCloseModal}
      height='60%'
    >
        
        <CategoryOption data={categories} picked={categoryId}/>
     
   
      
    </ModalBottom>
    </TouchableOpacity> */}
  </View>
  {products.length===0?<View><Text>Không tìm thấy sản phẩm</Text></View>:

  <FlatList
  data={products}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
      
   <ProductItem item={item} reSearch={true}/>
  )}
  numColumns={2}
  showsVerticalScrollIndicator={false}
  scrollEnabled={false}
/>
  }
  
</View>
</ScrollView>
        </View>
        
       
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff'
},
boxFilters:{
  flexDirection:'row',
  paddingHorizontal:15
},
itemFilters:{
  paddingHorizontal:5,
  marginVertical:10,
  borderEndWidth:1
},
itemClear:{
  paddingHorizontal:5,
  marginVertical:10,
  
},
textFilters:{
  fontSize:16
},
textClear:{
  color:'orange'
}
})
export default SearchResultScreen
