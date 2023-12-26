import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import  Icon  from 'react-native-vector-icons/FontAwesome'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
const LoginScreen = () => {
  const navigation = useNavigation();
    const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  GoogleSignin.configure({
    webClientId: '1066155628677-j4d4l5qqemttbi1ue55s53cls1lfflc0.apps.googleusercontent.com',
  });
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  const onGoogleButtonPress= async ()=> {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
  const handleLogOut = async () => {
    try {
      // Sign out from firebase
      await auth().signOut();
      // Sign out from Google Signin
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUser(null); // Remember to set user to null
    } catch (error) {
      console.error(error);
    }
  };
  
  if (initializing) return null;

  if (!user) {
    return (
      <View style={styles.container}>
      <Image source={require('../assets/images/background_login.jpg') } style={styles.image} />
      <View style={styles.boxText}>
        <Text style={styles.textWelcome}>Welcome to TK</Text>
  
        <Text style={styles.textChoice}>Login/Signup</Text>
        <TouchableOpacity style={styles.boxChoiceOther} onPress={() => onGoogleButtonPress().then(() => console.log(user))}>
          <Icon name="google-plus" size={30} color="#fff"/>
          <Text style={styles.textChoiceOther}>Sign in with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Text style={{ textDecorationLine:'underline',fontSize:16 }}>Quay lại</Text>
        </TouchableOpacity>
      </View>
  
      </View>
    )
  }

  return (
    <View style={styles.containerLogin}>
      <Text>Welcome {user.email}</Text>
      <Button title='LogOut' onPress={handleLogOut}/>
    </View>
  );

}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1,

    },
    containerLogin:{
      flex:1,
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
    },
    image:{
        width:'100%',
        height:'50%',
    },
    boxText:{
        position:'absolute',
        bottom:0,
        height:'60%',
        width:'100%',
        zIndex:2,
        display:'flex',
        // justifyContent:'center',
        alignItems:'center',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        shadowColor: '#000', // Màu đổ bóng
        shadowOffset: { width: 0, height: -2 }, // Vị trí đổ bóng
        shadowOpacity: 0.8, // Độ mờ của đổ bóng
        shadowRadius: 16, // Bán kính đổ bóng
        elevation: 10, // Độ nổi (chỉ dành cho Android)
    },
    textWelcome:{
        fontSize:45,
        padding:'15%',
        textAlign:'center'
    },
    textChoice:{
        fontSize:22,
        fontWeight:'600',
        marginBottom:'5%'
    },
    boxChoiceOther:{
        padding:10,
        marginVertical:10,
        backgroundColor:'#e74c3c',
        flexDirection:'row',
        display:'flex',
        alignItems:'center',
        shadowColor: '#000', // Màu đổ bóng
        shadowOffset: { width: 0, height: 2 }, // Vị trí đổ bóng
        shadowOpacity: 0.9, // Độ mờ của đổ bóng
        shadowRadius: 4, // Bán kính đổ bóng
        elevation: 10, // Độ nổi (chỉ dành cho Android)
        
    },
    textChoiceOther:{
        fontSize:15,
        color:'#fff',
        marginLeft:10
    }
})