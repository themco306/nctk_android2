import React from 'react'

import { Image, Text, View } from 'react-native'
import { categoryStyles } from '../../styles/categoryStyles'
import AppUrl from '../../API/AppUrl'

const CategoryItem = ({item}) => {
  return (
    <View style={categoryStyles.categoryItem}>
    <Image source={{ uri: AppUrl.ImageURL+item.attributes.image.data.attributes.url }} style={categoryStyles.categoryImage} />
    <Text style={categoryStyles.title}>{item.attributes.title}</Text>
  </View>
  )
}

export default CategoryItem