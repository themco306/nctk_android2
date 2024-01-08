import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation } from "@react-navigation/native";
function CategoryOption({data,picked}) {
    const [searchValue, setSearchValue] = useState('');
    const categories=data
    const navigation = useNavigation();
    const handleShowCategory = (id,title) => {
      navigation.navigate("Category", { categoryId: id,title:title });
    };
  return (
<View style={styles.container}>
  <TextInput
    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
    onChangeText={text => setSearchValue(text)}
    value={searchValue}
  />
  <ScrollView scrollEnabled={true}  style={styles.boxCates}>
  {categories.filter(item => item.attributes.title.includes(searchValue)).map((item) => {
  return (
    <TouchableOpacity 
      style={[
        styles.boxCate, 
        {backgroundColor: item.id === picked ? 'orange' : 'transparent'}
      ]}
      key={item.id}
      onPress={()=>(handleShowCategory(item.id,item.title))}
    >
      <Text>{item.attributes.title}</Text>
    </TouchableOpacity>
  )
})}

  </ScrollView>
</View>
  )
}
const styles = StyleSheet.create({
    container:{
        marginHorizontal:10
    },
    boxCates:{
        height:300
    },
    boxCate: {
        margin: 5,
        padding:5,
        borderColor: 'orange', // Màu cam
        borderWidth: 2, // Độ rộng của viền
      }
      
})
export default CategoryOption
