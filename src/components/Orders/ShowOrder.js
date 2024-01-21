import { View, Text, Image, StyleSheet, TouchableOpacity, ToastAndroid, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Loading from "../Loading";
import orderDetailApi from "../../API/orderDetailApi";
import AppUrl from "../../API/AppUrl";
import orderApi from "../../API/orderApi";
import { Auth } from "../../Context/Auth";
import ModalBottom from "../ModalBottom";
import { useNavigation } from "@react-navigation/native"
const ShowOrder = ({
  data,
  setUpdateTrigger,
  allowReceiving = false,
  notAllowReceiving = false,
  allowCancel = false,
  allowReOrder = false,
  allowRate=false
}) => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isVisible,setIsVisible]=useState(false);
  const navigation = useNavigation();
  const {user}=useContext(Auth)
  const handleShowModal =()=>{
    setIsVisible(true)
  }
  const handleCloseModal=()=>{
    setIsVisible(false)
  }
  var params = {
    populate: {
      product: {
        populate: ["image"],
      },
    },
    filters: {
      orderId: { $eq: parseInt(data.id) },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await orderDetailApi.getAll(params);
        setTotalAmount(
          response.data.data.reduce((accumulator, orderDetail) => {
            return accumulator + parseInt(orderDetail.attributes.amount);
          }, 0)
        );
        console.log(response.data.data[0].attributes);
        setOrderDetails(response.data.data); // Sửa ở đâ
        setLoading(false);
      } catch (error) {
        console.error(error);
        console.error("Error Details:", error.response);
        setOrderDetails([]);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCancelOrder =async()=>{

    try {
      let dataSent={
        data:{
          deliveryName: data.attributes.deliveryName,
          deliveryEmail: data.attributes.deliveryEmail,
          deliveryPhone: data.attributes.deliveryPhone,
          code: data.attributes.code,
          deliveryAddress: data.attributes.deliveryAddress,
          status: 4,
          userId:user.id
        }
    }
      const response = await orderApi.update(data.id,dataSent)
      if(response.status===200){
        ToastAndroid.showWithGravity(
          'Hủy thành công',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        setUpdateTrigger(prev => prev + 1);
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleReceiveOrder =async()=>{
    try {
      let dataSent={
        data:{
          deliveryName: data.attributes.deliveryName,
          deliveryEmail: data.attributes.deliveryEmail,
          deliveryPhone: data.attributes.deliveryPhone,
          code: data.attributes.code,
          deliveryAddress: data.attributes.deliveryAddress,
          status: 3,
          userId:user.id
        }
    }
      const response = await orderApi.update(data.id,dataSent)
      if(response.status===200){
        ToastAndroid.showWithGravity(
          'Xác nhận đã nhận được hàng',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        setUpdateTrigger(prev => prev + 1);
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleRateOrder =()=>{
    ToastAndroid.showWithGravity(
      'Chức năng này chưa có',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    return
  }
  const handleReOrder =()=>{
    ToastAndroid.showWithGravity(
      'Chức năng này chưa có',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    return
  }


  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Text>Mã đơn hàng: {data.attributes.code}</Text>
      <View style={styles.boxMain}>
        {orderDetails && orderDetails[0] && (
          <TouchableOpacity 
          onPress={()=> (navigation.navigate("ProductDetail", { productId:  orderDetails[0].attributes.product.data.id }))}>
            <Image
              source={{
                uri:
                  AppUrl.ImageURL +
                  orderDetails[0].attributes.product.data.attributes.image
                    .data[0].attributes.url,
              }}
              style={styles.image}
            />
            <View style={styles.boxText}>
              <Text>
                {orderDetails[0].attributes.product.data.attributes.title}
              </Text>
              <Text style={{}}>x{orderDetails[0].attributes.qty}</Text>
              <Text style={[styles.price]}>{`₫${Number(
                orderDetails[0].attributes.price
              ).toLocaleString("en-US", { minimumFractionDigits: 0 })}`}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
      {orderDetails.length > 1 && (
        <View style={{ width: "100%" }}>
          <TouchableOpacity
            style={{
              width: "100%",
              alignItems: "center",
              paddingVertical: 5,
              backgroundColor: "#EAEAEA",
            }}
            onPress={handleShowModal}
          >
            <Text style={{ fontSize: 16 }}>Xem thêm</Text>

          </TouchableOpacity>
          <ModalBottom
      title="Chi tiết đơn hàng"
      height='85%'
      center={true}
        handleCloseModal={handleCloseModal}
        isVisible={isVisible}
      >
        <ScrollView>
        {orderDetails && orderDetails.map((item)=>(<TouchableOpacity key={item.id +'vll'}
        onPress={()=>{ 
          setIsVisible(false)
          navigation.navigate("ProductDetail", { productId: item.attributes.product.data.id })}}
        >
            <Image
              source={{
                uri:
                  AppUrl.ImageURL +
                  item.attributes.product.data.attributes.image
                    .data[0].attributes.url,
              }}
              style={styles.image}
            />
            <View style={styles.boxText}>
              <Text>
                {item.attributes.product.data.attributes.title}
              </Text>
              <Text style={{}}>x{item.attributes.qty}</Text>
              <Text style={[styles.price]}>{`₫${Number(
                item.attributes.price
              ).toLocaleString("en-US", { minimumFractionDigits: 0 })}`}</Text>
            </View>
          </TouchableOpacity>)) 
          
        }
        </ScrollView>
      </ModalBottom>
        </View>
      )}
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 16 }}>Thành tiền:</Text>
        <Text style={[styles.price]}>
          {" "}
          {`₫${Number(totalAmount).toLocaleString("en-US", {
            minimumFractionDigits: 0,
          })}`}
        </Text>
      </View>
      <View style={styles.boxBottom}>
        {allowCancel && (
          <TouchableOpacity style={[styles.boxBtn]} onPress={handleCancelOrder}>
            <Text style={styles.textBtn}>Hủy Đặt Hàng</Text>
          </TouchableOpacity>
        )}
        {allowReceiving && (
          <TouchableOpacity style={styles.boxBtn} onPress={handleReceiveOrder}>
            <Text style={styles.textBtn}>Đã nhận hàng</Text>
          </TouchableOpacity>
        )}
        {notAllowReceiving && (
          <View style={[styles.boxBtn, { backgroundColor: "#A6B1B5" }]}>
            <Text style={styles.textBtn}>Đã nhận hàng</Text>
          </View>
        )}
        {allowReOrder && (
          <TouchableOpacity style={styles.boxBtn} onPress={handleReOrder}>
            <Text style={styles.textBtn}>Đặt lại</Text>
          </TouchableOpacity>
        )}
         {allowRate && (
          <TouchableOpacity style={styles.boxBtn} onPress={handleRateOrder}>
            <Text style={styles.textBtn}>Đánh giá</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  boxMain: {
    width: "100%",
    maxHeight: 150,
    flexDirection: "row",
    margin: 5,
  },
  price: {
    color: "#ee4d2d",
  },
  boxText: {
    // flex:7
    marginLeft: 5,
  },
  image: {
    // flex:3,
    width: 90,
    height: 90,
  },
  boxBottom: {
    justifyContent: "center",
    alignItems: "flex-end",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  boxBtn: {
    marginHorizontal: 10,
    backgroundColor: "#ee4d2d",
    padding: 10,
    marginBottom: 5,
  },
  textBtn: {
    fontSize: 16,
    color: "#fff",
  },
});
export default ShowOrder;
