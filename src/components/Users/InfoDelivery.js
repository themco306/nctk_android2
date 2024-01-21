import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading'
import { userApi } from '../../API/userApi'

const InfoDelivery = ({userInfor,id}) => {
    const [loading,setLoading]=useState(true)
    const [idDelivery,setIdDelivery]=useState(null)
    const [infoDelivery,setInfoDelivery]=useState({
        deliveryName:userInfor.username,
        deliveryEmail:userInfor.email,
        deliveryPhone:'',
        deliveryAddress:'',
    })
    var params={
      populate:'*',
          filters: {
        userId: { $eq:parseInt(id) }
    }
    }
    var dataPost={
        data:{
        ...infoDelivery,
        userId:parseInt(id)
        }
    }
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await userApi.getInfoDelivery(params)
          if(response.data.data.length>0){
            setIdDelivery(response.data.data[0].id)
          }
          console.log(response.data.data)
          
          if(response.data.data.length > 0){
            const attributes = response.data.data[0].attributes;
            setInfoDelivery(prevState => ({
              ...prevState,
              deliveryName: attributes.deliveryName !== '' ? attributes.deliveryName : prevState.deliveryName,
              deliveryEmail: attributes.deliveryEmail !== '' ? attributes.deliveryEmail : prevState.deliveryEmail,
              deliveryPhone: attributes.deliveryPhone !== '' ? attributes.deliveryPhone : prevState.deliveryPhone,
              deliveryAddress: attributes.deliveryAddress !== '' ? attributes.deliveryAddress : prevState.deliveryAddress,
            }));
          } else {
            await userApi.postInfoDelivery(dataPost);
            setInfoDelivery({});
          }
          
          setLoading(false)
        } catch (error) {
          console.error(error);
          console.error('Error Details:', error.response)
          setLoading(false)
        }
      };
    
      fetchData();
    }, []);
        const validate = () => {
            // Kiểm tra xem tất cả các trường thông tin có được điền đầy đủ không
            if (infoDelivery.deliveryName==='' || infoDelivery.deliveryEmail ==='' || infoDelivery.deliveryPhone ==='' || infoDelivery.deliveryAddress==='') {
              return false;
            }
            return true;
          }

  const handleSubmit = async()=>{
    if(validate()){
        try {
            const response=await userApi.putInfoDelivery(idDelivery,dataPost)
            if(response.status===200){
                ToastAndroid.showWithGravity(
                    'Thành công ',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                  );
            }
           
        } catch (error) {
            console.log('e',error)
        }
    }else{
        ToastAndroid.showWithGravity(
            'Điền đầy đủ ',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          return
    }
  }
    if (loading) {
      return <Loading />;
    }

  return (
    <View>
        <View style={styles.boxInfo}>
            <Text style={styles.labelInfo}>Tên gọi: </Text>
            <TextInput style={styles.inputInfo} value={infoDelivery.deliveryName}
            onChangeText={(text) => setInfoDelivery({...infoDelivery, deliveryName: text})}/>
        </View>
        <View style={styles.boxInfo}>
            <Text style={styles.labelInfo}>Email: </Text>
            <TextInput style={styles.inputInfo} value={infoDelivery.deliveryEmail}
            onChangeText={(text) => setInfoDelivery({...infoDelivery, deliveryEmail: text})}/>
        </View>
        <View style={styles.boxInfo}>
            <Text style={styles.labelInfo}>Điện thoại: </Text>
            <TextInput style={styles.inputInfo} value={infoDelivery.deliveryPhone }
            onChangeText={(text) => setInfoDelivery({...infoDelivery, deliveryPhone: text})}
            />
        </View>
        <View style={styles.boxInfo}>
            <Text style={styles.labelInfo}>Địa chỉ: </Text>
            <TextInput style={styles.inputInfo} value={infoDelivery.deliveryAddress }
            onChangeText={(text) => setInfoDelivery({...infoDelivery, deliveryAddress: text})}/>
        </View>
        <View style={{ width:'100%',        alignItems:'center', }}>
        <TouchableOpacity onPress={handleSubmit} style={styles.buttonSubmit}>
            <Text style={{ color:'#fff' }}>Lưu</Text>
        </TouchableOpacity>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    boxInfo:{
        flexDirection:'row',
        alignItems:'center',
        borderWidth:1,
        borderColor:'#DFDFDF',
        borderRadius:5,
        marginHorizontal:10,
        marginVertical:5,
        paddingHorizontal:10
    },
    labelInfo:{
        fontSize:16,
        flex:3
    },
    inputInfo:{
        flex:7
    },
    buttonSubmit:{
        alignItems:'center',
        justifyContent:'center',
        width:'20%',
        backgroundColor:'#ee4d2d',
        paddingVertical:10,
        borderRadius:10
    }
})
export default InfoDelivery