import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you're using FontAwesome, but you can choose a different icon library
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

const Search = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmitSearch = async () => {
    if (searchQuery === "") return;
    try {
      const searchJSON = await AsyncStorage.getItem('search');
      let search = searchJSON != null ? JSON.parse(searchJSON) : [];
  
      // Xóa tìm kiếm cũ nếu nó tồn tại
      const index = search.indexOf(searchQuery);
      if (index > -1) {
        search.splice(index, 1);
      }
  
      // Thêm tìm kiếm mới vào đầu danh sách
      search.unshift(searchQuery);
  
      // Nếu số lượng tìm kiếm vượt quá 8, xóa tìm kiếm cũ nhất
      if (search.length > 8) {
        search.pop();
      }
  
      // Lưu lại danh sách tìm kiếm
      await AsyncStorage.setItem('search', JSON.stringify(search));
      navigation.navigate("SearchResult",{textSearch:searchQuery})
    } catch (e) {
      console.log(e);
    }
  }
  
  
  

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Icon name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        <TouchableOpacity onPress={handleSubmitSearch} style={styles.searchButton}>
          <Icon name="arrow-right" size={20} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width:300
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
  },
  searchButton: {
    padding: 10,
  },
});

export default Search;
