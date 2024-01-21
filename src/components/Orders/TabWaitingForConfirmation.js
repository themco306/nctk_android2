import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Loading from '../Loading'
import orderApi from '../../API/orderApi'
import { Auth } from '../../Context/Auth'
import ShowOrder from './ShowOrder'


const TabWaitingForConfirmation = () => {
  const [orders,setOrders]=useState([])
  const {user}=useContext(Auth)

  const [loading,setLoading]=useState(true)
  var params={
    populate:'*',
    filters: {
      userId: { $eq: parseInt(user.id) },
      status:{ $eq:0}
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await orderApi.getAll(params);
        // console.log(response.data)
        setOrders(response.data.data); // Sửa ở đây
        setLoading(false)
      } catch (error) {
        console.error(error);
        console.error('Error Details:', error.response);
        setOrders([]);
        setLoading(false)
      }
    };
  
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }
  console.log(orders)
  return (
    <View>
      {orders&&orders.map((order)=>(<ShowOrder data={order}/>))}
    </View>
  )
}

export default TabWaitingForConfirmation