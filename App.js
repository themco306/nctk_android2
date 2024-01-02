
import {  ActivityIndicator, BackHandler, Text, ToastAndroid, View } from 'react-native';
import 'expo-dev-client';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect, useContext } from 'react';
import { AuthProvider } from './src/Context/Auth';
import AppNavigator from './AppNavigator';



const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [lastBackPressed, setLastBackPressed] = useState(0);
  // console.log(isLoggedIn)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
    };

    fetchData(); // Call the fetchData function

    const backAction = () => {
      if (lastBackPressed && new Date() - lastBackPressed < 2500) {
        BackHandler.exitApp();
        return true;
      }

      setLastBackPressed(new Date());
      ToastAndroid.showWithGravity(
        'Chạm lần nữa để thoát',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [lastBackPressed]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Vui lòng đợi...</Text>
      </View>
    );
  }

  return (
    <>
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator/>
      </NavigationContainer>
      </AuthProvider>
    </>
  );
}



// export default function App() {
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState();
//   GoogleSignin.configure({
//     webClientId: '1066155628677-j4d4l5qqemttbi1ue55s53cls1lfflc0.apps.googleusercontent.com',
//   });
//   function onAuthStateChanged(user) {
//     setUser(user);
//     if (initializing) setInitializing(false);
//   }
//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, []);
//   const onGoogleButtonPress= async ()=> {
//     // Check if your device supports Google Play
//     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
//     // Get the users ID token
//     const { idToken } = await GoogleSignin.signIn();
  
//     // Create a Google credential with the token
//     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
//     // Sign-in the user with the credential
//     return auth().signInWithCredential(googleCredential);
//   }
//   const handleLogOut = async () => {
//     try {
//       // Sign out from firebase
//       await auth().signOut();
//       // Sign out from Google Signin
//       await GoogleSignin.revokeAccess();
//       await GoogleSignin.signOut();
//       setUser(null); // Remember to set user to null
//     } catch (error) {
//       console.error(error);
//     }
//   };
  
//   if (initializing) return null;

//   if (!user) {
//     return (
//       <View style={styles.container}>
//          <GoogleSigninButton
//       title="Google Sign-In"
//       onPress={() => onGoogleButtonPress().then(() => console.log(user))}
//     />
    
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text>Welcome {user.email}</Text>
//       <Button title='LogOut' onPress={handleLogOut}/>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
