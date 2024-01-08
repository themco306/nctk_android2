import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  ToastAndroid,
} from "react-native";
import Swiper from "react-native-swiper";
import FooterProductDetail from "../components/Products/FooterProductDetail";
import  Icon  from "react-native-vector-icons/FontAwesome";
import productApi from "../API/productApi";
import AppUrl from "../API/AppUrl";
import Loading from "../components/Loading";
import ModalBottom from "../components/ModalBottom";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Auth } from "../Context/Auth";

const ProductDetail = ({ route }) => {
  const {user,isLoggedIn}=useContext(Auth)
  const { productId } = route.params;
  const [product,setProduct]=useState({})
  const [loading,setLoading]=useState(true)
  var params={
    populate:'*',
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productApi.get(productId,params);
        console.log(response.data.data)
        setProduct(response.data.data); // Sửa ở đây
        setLoading(false)
      } catch (error) {
        setLoading(false)

        console.error(error);
        console.error('Error Details:', error.response);
      }
    };
  
    fetchData();
  }, [productId]);


  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };


  const handleAddToCart = async (quantity) => {
    console.log('quantity', quantity);
    console.log('addtocart', product.id);
  
    // Tạo một đối tượng để lưu trữ dữ liệu
    const newCartItem = {
      id: product.id,
      title: product.attributes.title,
      image: AppUrl.ImageURL + product.attributes.image.data[0].attributes.url,
      price: product.attributes.price,
      sold:product.attributes.sold,
      quantity: quantity
    };
  
    try {
      // Xác định khóa cho giỏ hàng
      const cartKey = isLoggedIn ? user.id : 0;
      console.log(cartKey)
      // Lấy giỏ hàng hiện tại từ AsyncStorage
      const cartJSON = await AsyncStorage.getItem('cart');
      const cart = cartJSON != null ? JSON.parse(cartJSON) : {};
  
      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      const userCart = cart[cartKey] || [];
      const index = userCart.findIndex(item => item.id === newCartItem.id);
  
      if (index !== -1) {
        // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
        userCart[index].quantity += quantity;
      } else {
        // Nếu sản phẩm chưa có trong giỏ hàng, thêm vào giỏ hàng
        userCart.push(newCartItem);
      }
  
      // Cập nhật giỏ hàng cho người dùng hiện tại
      cart[cartKey] = userCart;
  
      // Lưu giỏ hàng trở lại AsyncStorage
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      ToastAndroid.showWithGravity(
        'Thêm thành công',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } catch (e) {
      // Lưu trữ dữ liệu không thành công
      console.log(e);
    }
  };
  
  
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
    } catch(e) {
      // Xóa dữ liệu không thành công
      console.log(e);
    }
  };
  
  // Gọi hàm để xóa tất cả dữ liệu
  // clearStorage();
  
  if (loading) {
    return <Loading />;
  }
  return (
    <View  style={styles.container}>
    <View style={{ flex:12.5 }}>
    <ScrollView  showsVerticalScrollIndicator={false}>
      <Swiper autoplay={true} autoplayTimeout={5.5} style={{ height: 350 }}>
        {product.attributes.image.data.map((imageUrl, index) => (
          <Image key={index} source={{ uri: AppUrl.ImageURL+imageUrl.attributes.url }} style={styles.image} />
        ))}
      </Swiper>
      <View style={{ padding: 0 }}>
        <View style={styles.viewName}>
        <Text style={styles.title}>{product.attributes.title}</Text>
        <Text style={styles.price}>{`₫${parseInt(product.attributes.price).toFixed(0)}`}</Text>
        </View>
        <TouchableOpacity onPress={handleOpenModal}
          style={styles.detailTouch}
        >
          <Text style={styles.detailTouch.detailLabel}>Chi tiết sản phẩm</Text>
          <Text style={styles.detailTouch.detail}> {product.attributes.detail.substring(0, 10) + '...'}</Text>
        </TouchableOpacity>
        <ModalBottom
          title="Chi tiết sản phẩm"
          isVisible={modalVisible}
          handleCloseModal={handleCloseModal}
        >
          <Text>{product.attributes.detail}</Text>
        </ModalBottom>
        <View style={styles.descriptionBox}>
      <Text style={styles.descriptionBox.descriptionLabel}>Mô tả sản phẩm</Text>
      <Text style={styles.descriptionBox.description}>
  {showFullDescription || typeof product.attributes.description !== 'string' 
    ? product.attributes.description 
    : `${product.attributes.description.slice(0, 400)}...`}
</Text>

      {!showFullDescription && (
        <TouchableOpacity onPress={toggleDescription} style={styles.showBoxMore}>
          <Text style={styles.showBoxMore.showMore}>Xem thêm
        
          </Text>
          <Icon style={styles.showBoxMore.showIcon} name="angle-down" size={30} color="#900" />
          
        </TouchableOpacity>
      )}
      {showFullDescription && (
        <TouchableOpacity onPress={toggleDescription} style={styles.showBoxMore}>
          <Text style={styles.showBoxMore.showLess}>Thu gọn</Text>
          <Icon style={styles.showBoxMore.showIcon} name="angle-up" size={30} color="#900" />

        </TouchableOpacity>
      )}
    </View>
      </View>
    </ScrollView>
    </View>
    <FooterProductDetail handleAddToCart={handleAddToCart}/>
    </View>

  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#dddddd'
  },
  image: {
    width: "100%",
    height: 350,
  },
  viewName:{
    backgroundColor:"#fff",
    padding:5
  },
  detailTouch:{
    backgroundColor:"#fff",
    padding:10,
    marginTop:5,
    flexDirection: 'row',
    detailLabel:{
      flex:7,
      fontSize:15,
      fontWeight:'500'
    },
    detail:{
      flex:3,
    }
  },
  title: {
    fontSize: 15,
    fontWeight: "normal",
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ee4d2d",
  },
  descriptionBox: {
    backgroundColor: '#fff',
    padding: 10,
    descriptionLabel: {
      fontSize: 15,
      fontWeight: '500',
    },
    description: {
      // Define styles for the description text
    },
  },
  showBoxMore:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    showMore: {
      fontSize:16,
      color: '#900',
      marginTop: 5,
    },
    showLess: {
      fontSize:16,
      color: '#900',
      marginTop: 5,
    },
    showIcon:{
      paddingTop:6,
      paddingLeft:2
    },
    
  },
 

 
});

export default ProductDetail;
