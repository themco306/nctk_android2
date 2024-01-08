import React from 'react'

import { Image, Text, TouchableOpacity, View } from 'react-native'
import { categoryStyles } from '../../styles/categoryStyles'
import AppUrl from '../../API/AppUrl'
import { useNavigation } from "@react-navigation/native";


const CategoryItem = ({item}) => {
  const navigation = useNavigation();
  const handleShowCategory = () => {
    navigation.navigate("Category", { categoryId: item.id,title:item.title });
  };
  return (
    <TouchableOpacity style={categoryStyles.categoryItem} onPressOut={handleShowCategory}>

    <Image source={{ uri: AppUrl.ImageURL+item.attributes.image.data.attributes.url }} style={categoryStyles.categoryImage} />
    <Text style={categoryStyles.title}>{item.attributes.title}</Text>
  </TouchableOpacity>
  )
}

export default CategoryItem