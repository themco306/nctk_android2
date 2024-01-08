import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import CartItem from './CartItem'
const CartList = ({data,deleteItem}) => {

  return (
    <View  style={styles.container}>
    <FlatList
    style={styles.list}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
       <CartItem item={item} deleteItem={deleteItem}/>
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