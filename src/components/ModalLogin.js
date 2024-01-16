import React, { useContext, useState } from "react";
import { StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import { Auth } from "../Context/Auth";
import { userApi } from "../API/userApi";


const ModalLogin = () => {
  const {login } = useContext(Auth);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const handleChangePassword=(value)=>{
        setPassword(value);
    }
    const handleChangeEmail=(value)=>{
        setEmail(value)
    }
    const handleLogin= async ()=>{
      const data={
        identifier:email,
        password
      }
      try {
        const response = await userApi.login(data);
        if (response.status === 200){
          console.log(response.data)
          login(response.data.user)
        }
      } catch (error) {
        if(error.response.status){
          if(error.response.status===400){
            ToastAndroid.showWithGravity(
              'Sai mật khẩu hoặc tài khoản',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }
        }
      }
    }
  return (
    <View style={styles.container}>
      <View style={styles.boxInput}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={handleChangeEmail} />
      </View>
      <View style={styles.boxInput}>
        <Text style={styles.label}>Mật khẩu</Text>
        <TextInput style={styles.input} secureTextEntry={true} value={password} onChangeText={handleChangePassword}/>
      </View>
      <View style={styles.boxLogin}>
      <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
        <Text style={styles.textLogin}>Đăng nhập</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
    padding: 10,
    justifyContent: 'center'
  },
  boxInput: {
    marginVertical: 10,
  },
  label:{
    fontSize:20,
    paddingHorizontal:10,
    fontWeight:'600'
  },

  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius:10,
  },
  boxLogin:{
    alignItems:'center',
    marginVertical:10
  },
  buttonLogin:{
    backgroundColor:'#ee4d2d',
    shadowColor: '#000', // Màu đổ bóng
    shadowOffset: { width: 0, height: -2 }, // Vị trí đổ bóng
    shadowOpacity: 0.8, // Độ mờ của đổ bóng
    shadowRadius: 16, // Bán kính đổ bóng
    elevation: 10, // Độ nổi (chỉ dành cho Android)
  },
  textLogin:{
    fontSize:18,
    fontWeight:'500',
    color:'#fff',
    paddingHorizontal:5,
    paddingVertical:10
  }
});
export default ModalLogin;
