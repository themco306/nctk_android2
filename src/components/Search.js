import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you're using FontAwesome, but you can choose a different icon library

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Handle your search logic here
    console.log("Search query:", searchQuery);
    // Perform your search logic or navigation here
  };

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
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
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
