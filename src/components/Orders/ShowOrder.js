import { View, Text, Image } from 'react-native'
import React from 'react'

const ShowOrder = ({data}) => {
    const params={

    }
    
  return (
    <View>
        <Text>Mã đơn hàng: {data.attributes.code}</Text>
       <View>
            <Image/>
            <Text></Text>
        </View> 
      
    </View>
  )
}

export default ShowOrder