import React, { useContext, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Layout from '../components/Layout'
import { Auth } from '../Context/Auth'
import { userApi } from '../API/userApi'
import Loading from '../components/Loading'
import AppUrl from '../API/AppUrl'
import Icon from "react-native-vector-icons/FontAwesome";
import ModalBottom from '../components/ModalBottom'
import InfoDelivery from '../components/Users/InfoDelivery'
import { useNavigation } from "@react-navigation/native";
const ProfileScreen = () => {
  const {user,logout}=useContext(Auth)
  const navigation = useNavigation();
  const [isVisibleInfoDelivery,setIsVisibleInfoDelivery]=useState(false);
  const [loading,setLoading]=useState(true)
  const [userInfor,setUserInfor]=useState({})
  const handleShowModelInfoDelivery =()=>{
    setIsVisibleInfoDelivery(true)
  }
  const handleCloseModalInfoDelivery=()=>{
    setIsVisibleInfoDelivery(false)
  }
  var params={
    populate:'*',
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userApi.me(user.id,params);
        console.log(response.data)
        setUserInfor(response.data)
        setLoading(false)
      } catch (error) {
        console.error(error);
        console.error('Error Details:', error.response);
        setLoading(false)
      }
    };
    if(user!==null){
      fetchData();

    }
    else{
      navigation.navigate("Home")
    }


  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.boxTop}>
        <View style={styles.boxUsername}>
        <Image style={styles.avatar} source={{ uri: userInfor.image?AppUrl.ImageURL+userInfor.image.url:'https://cf.shopee.vn/file/vn-50009109-32b657ab46fe8a558a29489a3b23fb6c_xxhdpi' }}/>
        
        <Text style={styles.username}>{userInfor.username}</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.boxLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.boxOption} onPress={handleShowModelInfoDelivery}>
          <Text style={styles.textOption}>Thông tin vận chuyển</Text>
          <Icon
          style={styles.iconOption}
          name="chevron-right"
          size={30}
          color="#900"
        />
         <ModalBottom
      title="Thông tin vận chuyển"
      height='80%'
      center={true}
        handleCloseModal={handleCloseModalInfoDelivery}
        isVisible={isVisibleInfoDelivery}
      >
        <InfoDelivery id={userInfor.id} userInfor={userInfor}/>
      </ModalBottom>
        </TouchableOpacity>
        <TouchableOpacity style={styles.boxOption} onPress={
          ()=>(navigation.navigate("Order"))
        }>
          <Text style={styles.textOption}>Đơn hàng của bạn</Text>
          <Icon
          style={styles.iconOption}
          name="chevron-right"
          size={30}
          color="#900"
        />
        </TouchableOpacity>
        <TouchableOpacity style={styles.boxOption}>
          <Text style={styles.textOption}>Đổi mật khẩu</Text>
          <Icon
          style={styles.iconOption}
          name="chevron-right"
          size={30}
          color="#900"
        />
        </TouchableOpacity>
        </View>
    </Layout>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    backgroundColor:'#fff',

  },
  boxTop:{
    marginBottom:10,
    flexDirection:'row',
    justifyContent:"space-between",
    padding:10,
    backgroundColor:'#dddd',
    borderRadius:10
  },
  avatar:{
    width:70,
    height:70,
    borderRadius:100,
  },
  boxUsername:{
    padding:10,
    flexDirection:'row',
  },
  username:{
    color:'#ee4d2d',
    fontSize:20,
    margin:10
  },
  boxLogout:{
    justifyContent:'center',
    backgroundColor:'#ee4d2d',
    height:30,
    padding:5,
    borderRadius:10
  },
  logoutText:{
    color:'#fff',
    fontWeight:'500'
  },
  boxOption:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderWidth:1,
    borderColor:'#DFDFDF',
    borderRadius:5,
    marginHorizontal:10,
    marginVertical:5
  },
  textOption:{
    fontSize:16,
    marginLeft:10,
    paddingVertical:10
  },
  iconOption:{
    fontSize:30,
    marginRight:5,
    color:'#000'
  }
})