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
        <Text>{userInfor.username}</Text>
        <Image style={styles.avatar} source={{ uri: userInfor.image?AppUrl.ImageURL+userInfor.image.url:'https://cf.shopee.vn/file/vn-50009109-32b657ab46fe8a558a29489a3b23fb6c_xxhdpi' }}/>
        <TouchableOpacity onPressOut={logout}>
          <Text>Logout</Text>
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
    backgroundColor:'#dddddd',
    justifyContent:'center',
    alignItems:'center'
  },
  avatar:{
    width:50,
    height:50,
    borderRadius:100
  }
})