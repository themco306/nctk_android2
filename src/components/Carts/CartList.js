import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import CartItem from './CartItem'

const CartList = ({data,deleteItem,toggleSelection,selectedItems}) => {
  console.log('sss',selectedItems)
  return (
    <View  style={styles.container}>

    <FlatList
    style={styles.list}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
       <CartItem item={item} deleteItem={deleteItem} toggleSelection={toggleSelection} isSelected={selectedItems.includes(item)}/>
      )}
      numColumns={1}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    />
  </View>
  )
}

export default CartList

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        backgroundColor:'#fff',
        padding:10
    },
})