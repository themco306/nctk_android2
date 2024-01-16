import React, { useEffect, useState } from 'react';
import Search from './Search';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";

const HeaderCustom = () => {
    const navigation = useNavigation();
  const handleShowSearchScreen=()=>{
    navigation.navigate("Search");
  }
  const [showSearchQuery,setShowSearchQuery] =useState("Tìm kiếm")
  const isFocused = useIsFocused();
  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const searchJSON = await AsyncStorage.getItem('search');
        const search = searchJSON != null ? JSON.parse(searchJSON) : [];
        setShowSearchQuery(search[0]??"Tìm kiếm");
      } catch (e) {
        console.log(e);
      }
    };
  
    fetchSearchData();
  }, [isFocused]);
  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.searchBarContainer} onPress={handleShowSearchScreen}>
       <Icon name="search" size={20} color="gray" style={styles.searchIcon} />
      <View style={styles.searchBar}><Text style={{ color:'orange' }}>{showSearchQuery}</Text></View>
      <Icon name="arrow-right" size={20} color="gray" style={styles.searchButton} />
      
    </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center'

  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    width:325,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    width:50
  },
  searchButton: {
    padding: 10,
  },
});
export default HeaderCustom;
