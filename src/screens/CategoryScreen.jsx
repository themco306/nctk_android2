import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import productApi from '../API/productApi';
import { productStyles } from '../styles/productStyles';
import { FlatList } from 'react-native';
import ProductItem from '../components/Products/ProductItem';
import Loading from '../components/Loading';
import categoryApi from '../API/categoryApi';
import ModalBottom from '../components/ModalBottom';
import CategoryOption from '../components/Categories/CategoryOption';

function CategoryScreen({route}) {
    const { categoryId } = route.params;
    const [products,setProducts]=useState([])
    const [category,setCategory]=useState({})
    const [categories,setCategories]=useState([])
    const [loadingP,setLoadingP]=useState(true)
    const [loadingC,setLoadingC]=useState(true)
    const [modalVisible, setModalVisible] = useState(false);

    const handleOpenModal = () => {
      setModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setModalVisible(false);
    };
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await categoryApi.getAll();
            // console.log(response.data.data)
            setCategories(response.data.data); // Sửa ở đây
            setLoadingP(false)
          } catch (error) {
            setLoadingP(false)
    
            console.error(error);
            console.error('Error Details:', error.response);
          }
        };
      
        fetchData();
      }, [categoryId]);
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await categoryApi.get(categoryId);
            // console.log(response.data.data)
            setCategory(response.data.data); // Sửa ở đây
            setLoadingC(false)
          } catch (error) {
            setLoadingC(false)
    
            console.error(error);
            console.error('Error Details:', error.response);
          }
        };
      
        fetchData();
      }, [categoryId]);
    var params={
      populate:'image',
    }
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await productApi.getByCategoryId(categoryId,params);
        //   console.log(response.data.data)
          setProducts(response.data.data); // Sửa ở đây
          setLoadingP(false)
        } catch (error) {
          setLoadingP(false)
  
          console.error(error);
          console.error('Error Details:', error.response);
        }
      };
    
      fetchData();
    }, [categoryId]);

    if (loadingP) {
        return <Loading />;
      }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View  style={productStyles.productList}>
      <View style={productStyles.productList.labelBox}>
        {loadingC?<Loading />: <Text style={productStyles.productList.label} >{category.attributes.title}</Text>}
        <TouchableOpacity style={styles.boxOption} onPressOut={handleOpenModal}><Text style={styles.textOption}>+</Text>
        <ModalBottom
          title=""
          isVisible={modalVisible}
          handleCloseModal={handleCloseModal}
          height='60%'
        >
            
            <CategoryOption data={categories} picked={categoryId}/>
         
       
          
        </ModalBottom>
        </TouchableOpacity>
      </View>
      {products.length===0?<View><Text>Không tìm thấy sản phẩm</Text></View>:
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
      }
      
    </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff'
    },
    boxOption:{
        marginRight:10,
        backgroundColor:'#ee4d2d',
        height:20,
        width:20,
        alignItems:'center',
        borderRadius:50
    },
    textOption:{
        color:'#fff'
    }
})
export default CategoryScreen
