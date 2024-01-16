import React, { useContext, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Layout from '../components/Layout'
import { Auth } from '../Context/Auth'
import { userApi } from '../API/userApi'
import Loading from '../components/Loading'
import AppUrl from '../API/AppUrl'

const ProfileScreen = () => {
  const {user,logout}=useContext(Auth)
  const [loading,setLoading]=useState(true)
  const [userInfor,setUserInfor]=useState({})
  var params={
    populate:'*',
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userApi.me(user.id,params);
        // console.log(response.data.image.url)
        setUserInfor(response.data)
        setLoading(false)
      } catch (error) {
        console.error(error);
        console.error('Error Details:', error.response);
        setLoading(false)
      }
    };
  
    fetchData();
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
    borderRadius:5
  },
  logoutText:{
    color:'#fff',
    fontWeight:'500'
  }
})