import { View, Text, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import orderApi from '../../API/orderApi'
import Loading from '../Loading'
import ShowOrder from './ShowOrder'
import { Auth } from '../../Context/Auth'

const TabInDelivery = () => {
  const [orders,setOrders]=useState([])
  const {user}=useContext(Auth)

  const [loading,setLoading]=useState(true)
  var params={
    populate:'*',
    filters: {
      userId: { $eq: parseInt(user.id) },
      status:{ $eq:1}
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
    <ScrollView>
      {orders&&orders.map((order)=>(
      
      <ShowOrder key={order.id} data={order} notAllowReceiving={true}/>
      ))}
    </ScrollView>
  )
}


export default TabInDelivery